import { notFound } from "next/navigation";
import { getContent, normalizePost } from "@/lib/content-store";
import PostForm from "@/components/admin/PostForm";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let post = { ...normalizePost({}), id: "", slug: "" };
  if (id !== "new") {
    const { posts } = await getContent();
    const found = posts.find((p) => p.id === id);
    if (!found) notFound();
    post = found;
  }

  return (
    <div className="max-w-3xl">
      <h1 className="mb-6 text-xl font-semibold">{id === "new" ? "New post" : "Edit post"}</h1>
      <PostForm post={post} />
    </div>
  );
}
