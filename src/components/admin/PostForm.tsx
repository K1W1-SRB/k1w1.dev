"use client";

import { useActionState, useState } from "react";
import { savePost } from "@/lib/admin-actions";
import type { Post } from "@/lib/content-store";
import Markdown from "@/components/Markdown";
import ImageUploadField from "./ImageUploadField";
import { inputClass } from "./RepeaterField";

export default function PostForm({ post }: { post: Post }) {
  const [state, formAction, pending] = useActionState(savePost, null);
  const [body, setBody] = useState(post.body);
  const [tab, setTab] = useState<"write" | "preview">("write");

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <input type="hidden" name="id" defaultValue={post.id} />

      <div>
        <label className="mb-2 block text-sm text-white-50">Title</label>
        <input name="title" defaultValue={post.title} required className={inputClass} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm text-white-50">URL slug</label>
          <input name="slug" defaultValue={post.slug} placeholder="generated from the title" className={inputClass} />
        </div>
        <div>
          <label className="mb-2 block text-sm text-white-50">Publish date</label>
          <input name="publishedAt" type="date" defaultValue={post.publishedAt} className={inputClass} />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm text-white-50">Excerpt</label>
        <textarea name="excerpt" defaultValue={post.excerpt} rows={2} className={inputClass} />
        <p className="mt-1 text-xs text-blue-50">Shown on the blog index. Also the meta description unless you set one below.</p>
      </div>

      <div>
        <div className="mb-2 flex items-center gap-4 text-sm">
          <span className="text-white-50">Body (Markdown)</span>
          <button
            type="button"
            onClick={() => setTab("write")}
            className={tab === "write" ? "text-white underline" : "text-white-50"}
          >
            Write
          </button>
          <button
            type="button"
            onClick={() => setTab("preview")}
            className={tab === "preview" ? "text-white underline" : "text-white-50"}
          >
            Preview
          </button>
        </div>
        <textarea
          name="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={18}
          className={`${inputClass} font-mono text-sm ${tab === "write" ? "" : "hidden"}`}
        />
        {tab === "preview" && (
          <div className="min-h-64 rounded-md border border-black-50 p-6">
            {body ? <Markdown>{body}</Markdown> : <p className="text-white-50">Nothing to preview yet.</p>}
          </div>
        )}
      </div>

      <ImageUploadField name="coverImage" label="Cover image (optional)" defaultValue={post.coverImage} />
      <div>
        <label className="mb-2 block text-sm text-white-50">Cover image alt text</label>
        <input name="coverAlt" defaultValue={post.coverAlt} className={inputClass} />
      </div>

      <div>
        <label className="mb-2 block text-sm text-white-50">Tags (comma separated)</label>
        <input name="tags" defaultValue={post.tags.join(", ")} className={inputClass} />
      </div>

      <div>
        <label className="mb-2 block text-sm text-white-50">Meta description (optional)</label>
        <textarea name="seoDescription" defaultValue={post.seoDescription} rows={2} className={inputClass} />
      </div>

      <label className="flex items-center gap-2 text-sm text-white-50">
        <input type="checkbox" name="published" defaultChecked={post.published} />
        Published (visible on the live site)
      </label>

      {state?.error && <p className="text-sm text-red-400">{state.error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="mt-2 w-fit rounded-md bg-white px-6 py-2 font-medium text-black-100 disabled:opacity-50"
      >
        {pending ? "Saving..." : "Save"}
      </button>
    </form>
  );
}
