import { SITE, locationLabel } from "@/constants/site";
import OpengraphImage from "./opengraph-image";

// Route segment config must be declared statically in each file, so it's repeated here.
export const alt = `${SITE.brand} – Freelance Web App Developer in ${locationLabel}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default OpengraphImage;
