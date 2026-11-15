import Link from "next/link";
import Container from "./Container";

/**
 * Top of every subpage: breadcrumb, the page's single <h1>, intro, and an optional
 * right-hand `aside` (e.g. "At a glance" or a proof project) on desktop.
 * @param {{
 *   title: string,
 *   intro?: string,
 *   crumbs?: { name: string, href: string }[],
 *   aside?: React.ReactNode,
 *   narrow?: boolean,
 *   children?: React.ReactNode,
 * }} props
 */
function PageIntro({ title, intro, crumbs = [], aside, narrow = false, children }) {
  return (
    <header className="pt-28 md:pt-36 pb-6 md:pb-10">
      <Container narrow={narrow}>
        <div className={aside ? "grid gap-10 lg:grid-cols-12 lg:items-start" : ""}>
          <div className={aside ? "lg:col-span-7" : "max-w-3xl"}>
            {crumbs.length > 0 && (
              <nav aria-label="Breadcrumb" className="mb-5 text-sm text-blue-50">
                <ol className="flex flex-wrap items-center gap-2">
                  {crumbs.map((c) => (
                    <li key={c.href} className="flex items-center gap-2">
                      <Link href={c.href} className="hover:text-white transition-colors">
                        {c.name}
                      </Link>
                      <span aria-hidden="true">/</span>
                    </li>
                  ))}
                </ol>
              </nav>
            )}
            <h1 className="text-4xl md:text-5xl font-semibold leading-tight tracking-tight">{title}</h1>
            {intro && <p className="mt-5 max-w-2xl text-white-50 md:text-xl">{intro}</p>}
            {children}
          </div>
          {aside && <div className="lg:col-span-5">{aside}</div>}
        </div>
      </Container>
    </header>
  );
}

export default PageIntro;
