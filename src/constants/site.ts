// Single source of truth for site-wide facts used in metadata, JSON-LD, the footer and contact section.
// Empty URLs are skipped wherever they're rendered.
export const SITE = {
  url: "https://k1w1.dev",
  name: "Sebastian",
  brand: "K1W1",
  title: "Sebastian at K1W1 – Freelance Web App Developer | Glasgow & Perth",
  description:
    "Freelance web app developer in Glasgow & Perth, Scotland. I build custom web and mobile apps with Next.js, React Native and Node.js for small businesses.",
  // Stored split so the full address never appears in the HTML or as a plain string scrapers can match.
  // It's assembled client-side by <ProtectedEmail />.
  emailParts: ["softwaredeveloper.k1w1", "gmail.com"],
  locations: ["Glasgow", "Perth"],
  region: "Scotland",
  country: "GB",
  github: "https://github.com/K1W1-SRB",
  linkedin: "", // TODO: add LinkedIn profile URL
  pt2cUrl: "", // TODO: add PT2C URL
  availability: "Available for new projects", // TODO: update as your availability changes
  replyTime: "Within 24 hours on weekdays",
} as const;

export const locationLabel = `${SITE.locations.join(" & ")}, ${SITE.region}`;
