import Section from "../components/layout/Section";

/** FAQPage structured data for a list of questions. Returns null when there are none. */
export function faqSchema(faq) {
  if (!faq?.length) return null;
  return {
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/**
 * FAQ accordion using <details>, so it works without JavaScript.
 * @param {{ faq: { q: string, a: string }[], title?: string }} props
 */
function Faq({ faq, title = "Frequently asked questions" }) {
  if (!faq?.length) return null;

  return (
    <Section id="faq" eyebrow="FAQ" title={title}>
      <div className="grid gap-3 lg:grid-cols-2 lg:items-start">
        {faq.map((f, i) => (
          <details key={`${i}-${f.q}`} className="faq-item group">
            <summary>
              <h3>{f.q}</h3>
              <span aria-hidden="true" className="transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-4 text-white-50">{f.a}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}

export default Faq;
