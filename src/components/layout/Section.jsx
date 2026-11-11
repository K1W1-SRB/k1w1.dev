import Container from "./Container";

/**
 * A page section with consistent vertical spacing and an optional heading block.
 * @param {{
 *   id?: string,
 *   eyebrow?: string,
 *   title?: string,
 *   lead?: string,
 *   align?: "left" | "center",
 *   narrow?: boolean,
 *   className?: string,
 *   children?: React.ReactNode,
 * }} props
 */
function Section({ id, eyebrow, title, lead, align = "left", narrow = false, className = "", children }) {
  const headingId = id ? `${id}-heading` : undefined;
  const centered = align === "center";

  return (
    <section id={id} aria-labelledby={title ? headingId : undefined} className={`py-14 md:py-20 ${className}`}>
      <Container narrow={narrow}>
        {(eyebrow || title || lead) && (
          <div className={`mb-10 md:mb-12 ${centered ? "text-center mx-auto max-w-2xl" : "max-w-2xl"}`}>
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            {title && (
              <h2 id={headingId} className="section-title">
                {title}
              </h2>
            )}
            {lead && <p className="mt-4 text-white-50 md:text-lg">{lead}</p>}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}

export default Section;
