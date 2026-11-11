import { renderOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { SITE, locationLabel } from "@/constants/site";

export const alt = `${SITE.brand} – Freelance Web App Developer in ${locationLabel}`;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOg({ title: "Freelance Web App Developer" });
}
