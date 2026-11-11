import Link from "next/link";
import { notFound } from "next/navigation";
import PageIntro from "@/components/layout/PageIntro";
import Section from "@/components/layout/Section";
import Markdown from "@/components/Markdown";
import JsonLd, { breadcrumbs } from "@/components/JsonLd";
import Packages from "@/sections/Packages";
import Faq, { faqSchema } from "@/sections/Faq";
import CtaBand from "@/sections/CtaBand";
import { getPublishedProjects, getServices } from "@/lib/content-store";
import { pageMetadata } from "@/lib/metadata";
import { SITE, locationLabel } from "@/constants/site";

type Params = { params: Promise<{ service: string }> };

async function getService(slug: string) {
  const { services } = await getServices();
  return services.find((s) => s.slug === slug) ?? null;
}

export async function generateMetadata({ params }: Params) {
  const { service } = await params;
  const svc = await getService(service);
  if (!svc) return {};
  return pageMetadata({
    title: `${svc.title} in ${SITE.locations.join(" & ")}`,
    description: svc.summary,
    path: `/services/${svc.slug}`,
  });
}

export default async function ServicePage({ params }: Params) {
  const { service } = await params;
  const svc = await getService(service);
  if (!svc) notFound();

  const [{ packages, faq }, projects] = await Promise.all([getServices(), getPublishedProjects()]);
  const proof = projects.find((p) => p.slug === svc.proofProjectSlug) ?? null;
  const faqLd = faqSchema(faq);
  const relevantPackages = packages.filter((p) => p.service === svc.slug || p.service === "");

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Service",
              name: svc.title,
              description: svc.summary,
              provider: { "@id": `${SITE.url}/#business` },
              areaServed: locationLabel,
              url: `${SITE.url}/services/${svc.slug}`,
            },
            breadcrumbs([
              { name: "Services", path: "/services" },
              { name: svc.title, path: `/services/${svc.slug}` },
            ]),
            ...(faqLd ? [faqLd] : []),
          ],
        }}
      />

      <PageIntro
        title={svc.title}
        intro={svc.summary}
        crumbs={[{ name: "Services", href: "/services" }]}
        aside={
          proof?.caseStudy && (
            <Link
              href={`/work/${proof.slug}`}
              className="group block overflow-hidden rounded-2xl border border-black-50 bg-[#1b1b1b] transition-colors hover:border-white-50/30"
            >
              <div className="aspect-[16/9] overflow-hidden bg-black-200">
                {proof.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={proof.image}
                    alt={proof.imageAlt || `Screenshot of ${proof.title}`}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                )}
              </div>
              <div className="p-6">
                <p className="text-xs uppercase tracking-widest text-accent">Proof</p>
                <p className="mt-2 text-xl font-semibold">{proof.title}</p>
                <p className="mt-2 text-sm text-white-50">{proof.summary}</p>
                <span className="read-more mt-4 inline-block text-sm">Read the case study →</span>
              </div>
            </Link>
          )
        }
      >
        {svc.bullets.length > 0 && (
          <ul className="mt-8 flex flex-col gap-3">
            {svc.bullets.map((b) => (
              <li key={b} className="flex gap-3 text-white-50 md:text-lg">
                <span aria-hidden="true" className="text-green-400">
                  ✓
                </span>
                {b}
              </li>
            ))}
          </ul>
        )}
      </PageIntro>

      {svc.intro && (
        <Section id="overview" narrow className="!pt-6">
          <Markdown>{svc.intro}</Markdown>
        </Section>
      )}

      {relevantPackages.length > 0 && (
        <Section id="packages" eyebrow="Packages" title="Packages for this">
          <Packages packages={relevantPackages} projects={projects} />
        </Section>
      )}

      <Faq faq={faq} />
      <CtaBand secondary={{ href: "/services", text: "All services" }} />
    </>
  );
}
