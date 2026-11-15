import PageIntro from "@/components/layout/PageIntro";
import Container from "@/components/layout/Container";
import JsonLd, { breadcrumbs } from "@/components/JsonLd";
import ContactForm from "@/sections/Contact";
import ContactScene from "@/components/models/contact/ContactScene";
import { pageMetadata } from "@/lib/metadata";
import { getServices } from "@/lib/content-store";
import { SITE, locationLabel } from "@/constants/site";

export const metadata = pageMetadata({
  title: "Contact a Freelance Developer in Scotland",
  description: `Get in touch about a web app or website project. Based in ${locationLabel}. Typical reply: ${SITE.replyTime.toLowerCase()}.`,
  path: "/contact",
});

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ package?: string }> }) {
  // Package CTAs link here as /contact?package=<id>: start the message off for them.
  const { package: packageId } = await searchParams;
  const pkg = packageId ? (await getServices()).packages.find((p) => p.id === packageId) : undefined;
  const initialMessage = pkg ? `Hi, I'm interested in the ${pkg.name} package. ` : "";

  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", ...breadcrumbs([{ name: "Contact", path: "/contact" }]) }} />
      <PageIntro
        title="Let's talk about your project"
        intro="Tell me what you need: what it's for, who'll use it, and any deadline. I'll come back to you with honest next steps."
        aside={<ContactForm initialMessage={initialMessage} />}
      >
        <ul className="mt-10 flex flex-col gap-4">
          <li className="flex items-center gap-3">
            <span className="relative flex size-3" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex size-3 rounded-full bg-green-500" />
            </span>
            <span className="font-medium">{SITE.availability}</span>
          </li>
          <li className="text-white-50">
            Typical reply: <span className="text-white">{SITE.replyTime}</span>
          </li>
          <li className="text-white-50">
            Based in <span className="text-white">{locationLabel}</span>, working with clients anywhere in the UK
          </li>
        </ul>
      </PageIntro>

      <Container className="pb-6 pt-6">
        <ContactScene />
      </Container>
    </>
  );
}
