import Link from "next/link";
import PageIntro from "@/components/layout/PageIntro";
import Section from "@/components/layout/Section";
import JsonLd, { breadcrumbs } from "@/components/JsonLd";
import Packages, { formatPrice } from "@/sections/Packages";
import ProcessSteps from "@/sections/ProcessSteps";
import Faq, { faqSchema } from "@/sections/Faq";
import TechnologiesSection from "@/sections/Technologies";
import CtaBand from "@/sections/CtaBand";
import { getPublishedProjects, getServices } from "@/lib/content-store";
import { pageMetadata } from "@/lib/metadata";
import { SITE } from "@/constants/site";

export const metadata = pageMetadata({
  title: "Services & Packages – Web Apps and Websites",
  description:
    "Fixed-price packages for custom web apps and business websites in Glasgow, Perth and across Scotland. See what's included, how I work, and common questions.",
  path: "/services",
});

export default async function ServicesPage() {
  const [{ packages, faq, process, services }, projects] = await Promise.all([getServices(), getPublishedProjects()]);
  const faqLd = faqSchema(faq);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            breadcrumbs([{ name: "Services", path: "/services" }]),
            ...(faqLd ? [faqLd] : []),
            {
              "@type": "OfferCatalog",
              name: `${SITE.brand} packages`,
              itemListElement: packages.map((p) => ({
                "@type": "Offer",
                name: p.name,
                description: p.summary,
                itemOffered: { "@type": "Service", name: p.name },
                offeredBy: { "@id": `${SITE.url}/#business` },
              })),
            },
          ],
        }}
      />

      <PageIntro
        title="Web apps and websites, built properly"
        intro="Clear scope, fixed prices and regular check-ins. You deal with me directly from the first call to launch, and after."
        aside={
          packages.length > 0 && (
            <div className="rounded-2xl border border-black-50 bg-[#1b1b1b] p-6">
              <p className="mb-4 text-xs uppercase tracking-widest text-blue-50">At a glance</p>
              <ul className="divide-y divide-black-50">
                {packages.map((p) => (
                  <li key={p.id}>
                    <a href={`#package-${p.id}`} className="group flex items-center justify-between gap-4 py-3">
                      <span>
                        <span className="block font-medium group-hover:underline underline-offset-4">{p.name}</span>
                        {p.timeline && <span className="text-sm text-white-50">{p.timeline}</span>}
                      </span>
                      <span className="shrink-0 text-sm font-semibold text-white">{formatPrice(p)}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )
        }
      />

      {packages.length > 0 && (
        <Section id="packages" eyebrow="Packages" title="Pick a starting point" lead="Every project starts with a free call and a fixed quote. Prices are starting points; your quote is based on what you actually need.">
          <Packages packages={packages} projects={projects} />
        </Section>
      )}

      <ProcessSteps steps={process} />

      {services.length > 0 && (
        <Section id="which" eyebrow="Not sure?" title="Which do I need?">
          <div className="grid gap-4 md:grid-cols-2">
            {services.map((svc) => (
              <Link
                key={svc.slug}
                href={`/services/${svc.slug}`}
                className="group rounded-xl border border-black-50 p-6 transition-colors hover:border-white-50/30"
              >
                <h3 className="text-xl font-semibold">{svc.title} →</h3>
                <p className="mt-2 text-white-50">{svc.summary}</p>
              </Link>
            ))}
          </div>
        </Section>
      )}

      <TechnologiesSection />
      <Faq faq={faq} />
      <CtaBand />
    </>
  );
}
