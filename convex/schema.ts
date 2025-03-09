import { defineSchema , defineTable} from "convex/server";
import { v } from "convex/values";
import { init } from "next/dist/compiled/webpack/webpack";
import { title } from "process";

export default defineSchema({
    documents:defineTable({
        title:v.string(),
        initialContent: v.optional(v.string()),
        ownerId: v.string(),
        roomId: v.optional(v.string()),
        organizationId: v.optional(v.string()),

    })
    .index("by_owner_Id",["ownerId"])
    .index("by_roomId",["roomId"])
    .index("by_organizationId",["organizationId"])
    .searchIndex("search_title",{
        searchField: "title",
        filterFields: ["ownerId","organizationId"]
    })
})