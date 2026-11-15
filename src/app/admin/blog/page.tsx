import Link from "next/link";
import { getContent } from "@/lib/content-store";
import { removePost } from "@/lib/admin-actions";

export default async function AdminBlogPage() {
  const { posts } = await getContent();
  const sorted = [...posts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Blog posts</h1>
        <Link href="/admin/blog/new" className="rounded-md bg-white px-4 py-2 text-sm font-medium text-black-100">
          New post
        </Link>
      </div>
      {sorted.length === 0 && <p className="text-sm text-white-50">No posts yet.</p>}
      <div className="flex flex-col gap-3">
        {sorted.map((post) => (
          <div key={post.id} className="flex items-center gap-4 rounded-lg border border-black-50 bg-black-200 p-4">
            <div className="flex-1">
              <p className="font-medium">{post.title || "(untitled)"}</p>
              <p className="text-sm text-white-50">
                /blog/{post.slug} · {post.publishedAt}
                {!post.published && " · Draft"}
              </p>
            </div>
            <div className="flex items-center gap-3">
              {post.published && (
                <Link href={`/blog/${post.slug}`} target="_blank" className="text-sm text-white-50 hover:text-white">
                  View ↗
                </Link>
              )}
              <Link href={`/admin/blog/${post.id}`} className="text-sm text-white-50 hover:text-white">
                Edit
              </Link>
              <form action={removePost.bind(null, post.id)}>
                <button type="submit" className="text-sm text-red-400 hover:text-red-300">
                  Delete
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
