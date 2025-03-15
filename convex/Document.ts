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
    const documentId = await ctx.db.insert("documents", {
      title: args.title ?? "Untitled",
      initialContent: args.initialContent,
      ownerId: user.subject,
    });
  },
});

export const GetDocs = query({
  args: {
    paginationOpts: paginationOptsValidator,
    search: v.optional(v.string()),
  },
  handler: async (ctx, { search, paginationOpts }) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      throw new ConvexError("User is unauthorized");
    }
    if (search) {
      return await ctx.db
        .query("documents")
        .withSearchIndex("search_title", (q) =>
          q.search("title", search).eq("ownerId", user.subject)
        )
        .paginate(paginationOpts);
    }
    return await ctx.db
      .query("documents")
      .withIndex("by_owner_Id", (q) => q.eq("ownerId", user.subject))
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
