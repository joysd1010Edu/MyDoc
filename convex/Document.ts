import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { paginationOptsValidator } from "convex/server";

export const createDoc = mutation({
  args: {
    title: v.optional(v.string()),
    initialContent: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) {
      throw new ConvexError("User is unauthorized");
    }
    const organizationID = (user.organization_id ?? undefined) as
      | string
      | undefined;

    return await ctx.db.insert("documents", {
      title: args.title ?? "Untitled Document",
      ownerId: user.subject,
      organizationId: organizationID,
      initialContent: args.initialContent,
    });
  },
});

export const getByIds = query({
  args: { ids: v.array(v.id("documents")) },
  handler: async (ctx, { ids }) => {
    const documents = [];
    for (const id of ids) {
      const document = await ctx.db.get(id);
      if (document) {
        documents.push({ id: document._id, name: document.title });
      } else {
        documents.push({ id, name: "[deleted]" });
      }
    }
    return documents;
  },
});

export const GetDocs = query({
  args: {
    paginationOpts: paginationOptsValidator,
    search: v.optional(v.string()),
  },
  handler: async (ctx, { search, paginationOpts }) => {
    const user = await ctx.auth.getUserIdentity();
    // console.log(user)

    if (!user) {
      throw new ConvexError("User is unauthorized");
    }

    const organizationID = (user.organization_id ?? undefined) as
      | string
      | undefined;
    if (search && organizationID) {
      return await ctx.db
        .query("documents")
        .withSearchIndex("search_title", (q) =>
          q.search("title", search).eq("organizationId", organizationID)
        )
        .paginate(paginationOpts);
    }

    if (search) {
      return await ctx.db
        .query("documents")
        .withSearchIndex("search_title", (q) =>
          q.search("title", search).eq("ownerId", user.subject)
        )
        .paginate(paginationOpts);
    }
    if (organizationID) {
      return await ctx.db
        .query("documents")
        .withIndex("by_organizationId", (q) =>
          q.eq("organizationId", organizationID)
        )
        .order("desc")
        .paginate(paginationOpts);
    }

    return await ctx.db
      .query("documents")
      .withIndex("by_owner_Id", (q) => q.eq("ownerId", user.subject))
      .order("desc")
      .paginate(paginationOpts);
  },
});

export const removeDoc = mutation({
  args: { id: v.id("documents") },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      throw new ConvexError("User is unauthorized");
    }
    const doc = await ctx.db.get(args.id);
    if (!doc) {
      throw new ConvexError("Document not found");
    }
    if (doc.ownerId !== user.subject) {
      throw new ConvexError("User is unauthorized");
    }
    return await ctx.db.delete(args.id);
  },
});
export const UpdateDoc = mutation({
  args: { id: v.id("documents"), title: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      throw new ConvexError("User is unauthorized");
    }
    const doc = await ctx.db.get(args.id);
    if (!doc) {
      throw new ConvexError("Document not found");
    }
    if (doc.ownerId !== user.subject) {
      throw new ConvexError("User is unauthorized");
    }
    return await ctx.db.patch(args.id, { title: args.title });
  },
});

export const getById = query({
  args: { id: v.id("documents") },
  handler: async (ctx, { id }) => {
    const document = await ctx.db.get(id);

    if (!document) {
      throw new ConvexError("Document not found");
    }
    return document;
  },
});
