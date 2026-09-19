import Link from "next/link";
import { getContent } from "@/lib/content-store";
import { moveExpCard, removeExpCard } from "@/lib/admin-actions";

export default async function AdminExperiencePage() {
  const { expCards } = await getContent();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Experience</h1>
        <Link href="/admin/experience/new" className="rounded-md bg-white px-4 py-2 text-sm font-medium text-black-100">
          Add experience
        </Link>
      </div>
      <div className="flex flex-col gap-3">
        {expCards.map((card, index) => (
          <div
            key={card.id}
            className="flex items-center gap-4 rounded-lg border border-black-50 bg-black-200 p-4"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={card.logoPath} alt="" className="h-16 w-16 rounded-md object-cover" />
            <div className="flex-1">
              <p className="font-medium">{card.title}</p>
              <p className="text-sm text-white-50">
                {card.date} {!card.published && "· Draft"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <form action={moveExpCard.bind(null, card.id, "up")}>
                <button type="submit" disabled={index === 0} className="px-2 text-white-50 disabled:opacity-30">
                  ↑
                </button>
              </form>
              <form action={moveExpCard.bind(null, card.id, "down")}>
                <button
                  type="submit"
                  disabled={index === expCards.length - 1}
                  className="px-2 text-white-50 disabled:opacity-30"
                >
                  ↓
                </button>
              </form>
              <Link href={`/admin/experience/${card.id}`} className="text-sm text-white-50 hover:text-white">
                Edit
              </Link>
              <form action={removeExpCard.bind(null, card.id)}>
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
