import Link from "next/link";
import LinkButton from "../components/ui/LinkButton";

export function formatPrice(pkg) {
  if (!pkg.priceFrom) return "";
  return pkg.billing === "monthly" ? `${pkg.priceFrom}/month` : `From ${pkg.priceFrom}`;
}

/**
 * Package cards.
 * @param {{ packages: any[], projects?: { slug: string, title: string }[], compact?: boolean }} props
 * `projects` are the published projects, used for each package's "See it in action" link.
 * `compact` is the home-page preview (no inclusions or timeline).
 */
function Packages({ packages, projects = [], compact = false }) {
  if (!packages?.length) return null;

  return (
    <div className={`grid grid-cols-1 gap-6 md:auto-rows-fr ${packages.length >= 3 ? "lg:grid-cols-3" : "md:grid-cols-2"}`}>
      {packages.map((pkg) => {
        const proof = projects.find((p) => p.slug === pkg.proofProjectSlug);
        const price = formatPrice(pkg);
        const highlighted = pkg.badge === "Most popular";

        return (
          <div
            key={pkg.id}
            id={`package-${pkg.id}`}
            className={`card-border rounded-xl p-8 flex flex-col gap-4 ${highlighted ? "ring-1 ring-accent" : ""}`}
          >
            {/* Badge row is always reserved so names and prices line up across cards. */}
            <div className="h-6">
              {pkg.badge && (
                <span className={`badge inline-block ${highlighted ? "!border-accent !text-accent" : ""}`}>{pkg.badge}</span>
              )}
            </div>
            <h3 className="text-2xl font-semibold">{pkg.name}</h3>
            {price && <p className="text-3xl font-bold text-white">{price}</p>}
            <p className="text-white-50">{pkg.summary}</p>

            {!compact && (
              <>
                {pkg.timeline && (
                  <p className="text-sm text-blue-50">
                    Typical timeline: <span className="text-white">{pkg.timeline}</span>
                  </p>
                )}
                {pkg.includes.length > 0 && (
                  <ul className="flex flex-col gap-2 border-t border-black-50 pt-4">
                    {pkg.includes.map((item) => (
                      <li key={item} className="flex gap-2 text-white-50">
                        <span aria-hidden="true" className="text-green-400">
                          ✓
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
                {proof && (
                  <Link href={`/work/${proof.slug}`} className="read-more text-sm">
                    See it in action: {proof.title} →
                  </Link>
                )}
              </>
            )}

            <div className="mt-auto pt-4">
              {compact ? (
                <Link href={`/services#package-${pkg.id}`} className="read-more">
                  See what&apos;s included →
                </Link>
              ) : (
                <LinkButton href={pkg.ctaHref} variant={highlighted ? "primary" : "secondary"} block>
                  {pkg.ctaText}
                </LinkButton>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Packages;
