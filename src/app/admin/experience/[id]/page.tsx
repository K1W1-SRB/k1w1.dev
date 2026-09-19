import { notFound } from "next/navigation";
import { getContent } from "@/lib/content-store";
import { saveExpCard } from "@/lib/admin-actions";
import ImageUploadField from "@/components/admin/ImageUploadField";
import type { ExpCard } from "@/lib/content-store";

const BLANK: ExpCard = {
  id: "",
  review: "",
  imgPath: "",
  logoPath: "",
  title: "",
  date: "",
  responsibilities: [],
  published: false,
};

export default async function EditExpCardPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let card: ExpCard = BLANK;
  if (id !== "new") {
    const { expCards } = await getContent();
    const found = expCards.find((c) => c.id === id);
    if (!found) notFound();
    card = found;
  }

  return (
    <div className="max-w-2xl">
      <h1 className="mb-6 text-xl font-semibold">{id === "new" ? "Add experience" : "Edit experience"}</h1>
      <form action={saveExpCard} className="flex flex-col gap-4">
        <input type="hidden" name="id" defaultValue={card.id} />

        <div>
          <label className="mb-2 block text-sm text-white-50">Role title</label>
          <input
            name="title"
            defaultValue={card.title}
            required
            className="w-full rounded-md border border-blue-100 bg-blue-100 px-4 py-2 text-white outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-white-50">Date range</label>
          <input
            name="date"
            defaultValue={card.date}
            placeholder="2025 - Present"
            required
            className="w-full rounded-md border border-blue-100 bg-blue-100 px-4 py-2 text-white outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-white-50">Review / testimonial</label>
          <textarea
            name="review"
            defaultValue={card.review}
            rows={3}
            className="w-full rounded-md border border-blue-100 bg-blue-100 px-4 py-2 text-white outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-white-50">Responsibilities (one per line)</label>
          <textarea
            name="responsibilities"
            defaultValue={card.responsibilities.join("\n")}
            rows={5}
            className="w-full rounded-md border border-blue-100 bg-blue-100 px-4 py-2 text-white outline-none"
          />
        </div>

        <ImageUploadField name="imgPath" label="Card image" defaultValue={card.imgPath} />
        <ImageUploadField name="logoPath" label="Logo" defaultValue={card.logoPath} />

        <label className="flex items-center gap-2 text-sm text-white-50">
          <input type="checkbox" name="published" defaultChecked={card.published} />
          Published (visible on the live site)
        </label>

        <button type="submit" className="mt-2 w-fit rounded-md bg-white px-6 py-2 font-medium text-black-100">
          Save
        </button>
      </form>
    </div>
  );
}
