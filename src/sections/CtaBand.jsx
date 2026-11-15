import Container from "../components/layout/Container";
import LinkButton from "../components/ui/LinkButton";
import { SITE } from "../constants/site";

/**
 * End-of-page call to action.
 * @param {{ title?: string, text?: string, href?: string, buttonText?: string, secondary?: { href: string, text: string } }} props
 */
function CtaBand({
  title = "Got a project in mind?",
  text = `Tell me what you need. Typical reply: ${SITE.replyTime.toLowerCase()}.`,
  href = "/contact",
  buttonText = "Get in touch",
  secondary,
}) {
  return (
    <section className="py-14 md:py-20" aria-label="Call to action">
      <Container>
        <div className="cta-band">
          <div className="max-w-xl">
            <h2 className="text-2xl md:text-3xl font-semibold">{title}</h2>
            <p className="mt-3 text-white-50 md:text-lg">{text}</p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            {secondary && (
              <LinkButton href={secondary.href} variant="secondary">
                {secondary.text}
              </LinkButton>
            )}
            <LinkButton href={href}>{buttonText}</LinkButton>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default CtaBand;
