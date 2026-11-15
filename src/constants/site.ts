// Single source of truth for site-wide facts used in metadata, JSON-LD, the footer and contact section.
// Empty URLs are skipped wherever they're rendered.
export const SITE = {
  url: "https://k1w1.dev",
  name: "Sebastian",
  brand: "K1W1",
  // How the brand is said. Used in JSON-LD alternateName and visible copy so searches for "kiwi" can match.
  alternateNames: ["Kiwi", "Kiwi Dev"],
  title: "Freelance Software Developer, Glasgow & Perth | K1W1",
  description:
    "Freelance software developer in Glasgow & Perth, Scotland. I build custom web apps, websites and mobile apps for small businesses with Next.js and Node.js.",
  // Stored split so the full address never appears in the HTML or as a plain string scrapers can match.
  // It's assembled client-side by <ProtectedEmail />.
  emailParts: ["softwaredeveloper.k1w1", "gmail.com"],
  locations: ["Glasgow", "Perth"],
  region: "Scotland",
  country: "GB",
  github: "https://github.com/K1W1-SRB",
  linkedin: "", // TODO: add LinkedIn profile URL
  pt2cUrl: "https://pt2c.com",
  availability: "Available for new projects", // TODO: update as your availability changes
  replyTime: "Within 24 hours on weekdays",
} as const;

export const locationLabel = `${SITE.locations.join(" & ")}, ${SITE.region}`;
