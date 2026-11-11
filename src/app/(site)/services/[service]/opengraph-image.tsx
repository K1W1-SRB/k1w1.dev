import { renderOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getServices } from "@/lib/content-store";
import { locationLabel } from "@/constants/site";

export const alt = "K1W1 service";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({ params }: { params: Promise<{ service: string }> }) {
  const { service } = await params;
  const svc = (await getServices()).services.find((s) => s.slug === service);
  return renderOg({ eyebrow: "Services", title: svc?.title ?? "Services", subtitle: locationLabel });
}
