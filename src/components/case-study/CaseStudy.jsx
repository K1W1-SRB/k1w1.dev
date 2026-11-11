import Link from "next/link";
import Markdown from "../Markdown";
import Container from "../layout/Container";
import PageIntro from "../layout/PageIntro";
import LinkButton from "../ui/LinkButton";
import CtaBand from "../../sections/CtaBand";

function Block({ id, title, children }) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="scroll-mt-28">
      <h2 id={`${id}-heading`} className="section-title mb-6">
        {title}
      </h2>
      {children}
    </section>
  );
}

/**
 * The shared case-study template. Sections with no content are skipped, so a
 * project with only some of its copy written still looks finished.
 */
function CaseStudy({ project, prev, next }) {
  const cs = project.caseStudy;
  const hasTestimonial = Boolean(cs.testimonial.quote && cs.testimonial.author);

  const meta = [
    { label: "Role", value: project.role },
    { label: "Year", value: project.year },
    { label: "Status", value: project.status },
  ].filter((m) => m.value);

  const sections = [
    cs.problem && { id: "problem", title: "The problem" },
    cs.features.length > 0 && { id: "built", title: "What I built" },
    cs.decisions.length > 0 && { id: "decisions", title: "Decisions" },
    cs.stack.length > 0 && { id: "stack", title: "Stack" },
    (cs.outcome || hasTestimonial) && { id: "outcome", title: cs.outcomeTitle || "Outcome" },
  ].filter(Boolean);

  return (
    <article>
      <PageIntro
        title={project.title}
        intro={project.summary}
        crumbs={[{ name: "Work", href: "/work" }]}
      >
        {(meta.length > 0 || project.liveUrl) && (
          <dl
            className="mt-8 grid max-w-3xl grid-cols-1 gap-px overflow-hidden rounded-xl border border-black-50 bg-black-50 sm:[grid-template-columns:repeat(var(--cells),minmax(0,1fr))]"
            style={{ "--cells": meta.length + (project.liveUrl ? 1 : 0) }}
          >
            {meta.map((m) => (
              <div key={m.label} className="bg-background p-4">
                <dt className="text-xs uppercase tracking-widest text-blue-50">{m.label}</dt>
                <dd className="mt-1 text-sm font-medium text-white">{m.value}</dd>
              </div>
            ))}
            {project.liveUrl && (
              <div className="bg-background p-4">
                <dt className="text-xs uppercase tracking-widest text-blue-50">Live site</dt>
                <dd className="mt-1 text-sm font-medium">
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="read-more">
                    Visit ↗
                  </a>
                </dd>
              </div>
            )}
          </dl>
        )}
      </PageIntro>

      {project.image && (
        <Container className="mt-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.image}
            alt={project.imageAlt || `Screenshot of ${project.title}`}
            className="aspect-[16/9] w-full rounded-2xl border border-black-50 object-cover"
          />
        </Container>
      )}

      <Container className="mt-16 md:mt-20">
        <div className="grid gap-12 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-16">
          {/* Sidebar: section links + a small CTA, desktop only */}
          <aside className="hidden lg:block">
            <div className="sticky top-28 flex flex-col gap-8">
              {sections.length > 1 && (
                <nav aria-label="On this page">
                  <p className="mb-3 text-xs uppercase tracking-widest text-blue-50">On this page</p>
                  <ul className="flex flex-col gap-2 text-sm">
                    {sections.map((s) => (
                      <li key={s.id}>
                        <a href={`#${s.id}`} className="text-white-50 hover:text-white transition-colors">
                          {s.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}
              <div className="rounded-xl border border-black-50 p-5">
                <p className="text-sm font-medium">{cs.ctaText}</p>
                <LinkButton href={cs.ctaHref || "/services"} variant="secondary" block className="mt-4 !py-2 text-sm">
                  See packages
                </LinkButton>
              </div>
            </div>
          </aside>

          <div className="flex min-w-0 max-w-3xl flex-col gap-16 md:gap-20">
            {cs.problem && (
              <Block id="problem" title="The problem">
                <Markdown>{cs.problem}</Markdown>
              </Block>
            )}

            {cs.features.length > 0 && (
              <Block id="built" title="What I built">
                <div className="flex flex-col gap-10">
                  {cs.features.map((f, i) => (
                    <div key={`${i}-${f.title}`} className="overflow-hidden rounded-2xl border border-black-50 bg-[#1b1b1b]">
                      <div className="p-6 md:p-8">
                        <h3 className="text-xl md:text-2xl font-semibold">{f.title}</h3>
                        <Markdown className="mt-3">{f.body}</Markdown>
                      </div>
                      {f.image && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={f.image}
                          alt={f.imageAlt || `${project.title}: ${f.title}`}
                          loading="lazy"
                          className="aspect-[16/10] w-full border-t border-black-50 object-cover"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </Block>
            )}

            {cs.decisions.length > 0 && (
              <Block id="decisions" title="Decisions">
                <ol className="grid gap-4 md:grid-cols-2">
                  {cs.decisions.map((d, i) => (
                    <li key={`${i}-${d.title}`} className="rounded-xl border border-black-50 bg-[#1b1b1b] p-6">
                      <p className="text-xs uppercase tracking-widest text-accent">Decision {i + 1}</p>
                      <h3 className="mt-2 text-lg font-semibold">{d.title}</h3>
                      <Markdown className="mt-2 !text-base">{d.body}</Markdown>
                    </li>
                  ))}
                </ol>
              </Block>
            )}

            {cs.stack.length > 0 && (
              <Block id="stack" title="Stack">
                <dl className="divide-y divide-black-50 rounded-xl border border-black-50">
                  {cs.stack.map((t, i) => (
                    <div key={`${i}-${t.name}`} className="grid gap-1 p-5 sm:grid-cols-[10rem_1fr] sm:gap-6">
                      <dt className="font-semibold">{t.name}</dt>
                      <dd className="text-white-50">{t.why}</dd>
                    </div>
                  ))}
                </dl>
              </Block>
            )}

            {(cs.outcome || hasTestimonial) && (
              <Block id="outcome" title={cs.outcomeTitle || "Outcome"}>
                <Markdown>{cs.outcome}</Markdown>
                {hasTestimonial && (
                  <figure className="mt-8 rounded-xl border-l-2 border-accent bg-[#1b1b1b] p-6 md:p-8">
                    <blockquote className="text-xl text-white">“{cs.testimonial.quote}”</blockquote>
                    <figcaption className="mt-4 text-blue-50">— {cs.testimonial.author}</figcaption>
                  </figure>
                )}
              </Block>
            )}
          </div>
        </div>
      </Container>

      <CtaBand
        title={cs.ctaText}
        text="Tell me what you're trying to build and I'll tell you honestly how I'd approach it."
        href="/contact"
        buttonText="Get in touch"
        secondary={{ href: cs.ctaHref || "/services", text: "See packages" }}
      />

      {(prev || next) && (
        <Container>
          <nav className="grid gap-4 sm:grid-cols-2" aria-label="More case studies">
            {prev ? (
              <Link href={`/work/${prev.slug}`} className="rounded-xl border border-black-50 p-5 hover:border-white-50/30 transition-colors">
                <span className="text-xs uppercase tracking-widest text-blue-50">← Previous</span>
                <span className="mt-1 block font-semibold">{prev.title}</span>
              </Link>
            ) : (
              <span className="hidden sm:block" />
            )}
            {next && (
              <Link
                href={`/work/${next.slug}`}
                className="rounded-xl border border-black-50 p-5 text-right hover:border-white-50/30 transition-colors"
              >
                <span className="text-xs uppercase tracking-widest text-blue-50">Next →</span>
                <span className="mt-1 block font-semibold">{next.title}</span>
              </Link>
            )}
          </nav>
        </Container>
      )}
    </article>
  );
}

export default CaseStudy;
