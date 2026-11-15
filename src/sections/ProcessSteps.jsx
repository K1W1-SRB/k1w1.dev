import Section from "../components/layout/Section";

/**
 * Compact "How I work": one row of numbered steps (stacked on mobile).
 * @param {{ steps: { title: string, body: string, duration: string }[] }} props
 */
function ProcessSteps({ steps }) {
  if (!steps?.length) return null;

  return (
    <Section id="process" eyebrow="Process" title="How I work">
      <ol className="process-steps" style={{ "--steps": steps.length }}>
        {steps.map((step, i) => (
          <li key={`${i}-${step.title}`}>
            <span className="step-number" aria-hidden="true">
              {i + 1}
            </span>
            <h3 className="mt-4 text-lg font-semibold max-lg:mt-0">{step.title}</h3>
            <p className="mt-1 text-sm text-white-50">{step.body}</p>
            {step.duration && <p className="mt-1 text-xs text-blue-50">{step.duration}</p>}
          </li>
        ))}
      </ol>
    </Section>
  );
}

export default ProcessSteps;
