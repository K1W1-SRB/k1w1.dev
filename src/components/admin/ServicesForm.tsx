"use client";

import { useActionState } from "react";
import { saveServices } from "@/lib/admin-actions";
import type { ServicesContent } from "@/lib/content-store";
import RepeaterField, { inputClass } from "./RepeaterField";

export default function ServicesForm({
  services,
  projects,
}: {
  services: ServicesContent;
  projects: { slug: string; title: string }[];
}) {
  const [state, formAction, pending] = useActionState(saveServices, null);

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <RepeaterField
        name="packages"
        label="Packages"
        addLabel="Add package"
        help='A badge of exactly "Most popular" also gets the highlighted border. Leave the button link blank to send people to the contact form with this package pre-filled.'
        defaultValue={services.packages.map((p) => ({ ...p, includes: p.includes.join("\n") }))}
        fields={[
          { key: "id", label: "ID (used in links, e.g. care-plan)", placeholder: "generated from the name" },
          { key: "name", label: "Name" },
          { key: "priceFrom", label: "Price", placeholder: "£1,500" },
          {
            key: "billing",
            label: "Price shown as",
            type: "select",
            options: [
              { value: "from", label: "From £X (one-off)" },
              { value: "monthly", label: "£X/month" },
            ],
          },
          { key: "timeline", label: "Typical timeline", placeholder: "3–4 weeks" },
          { key: "summary", label: "Summary", type: "textarea", rows: 2 },
          { key: "includes", label: "What's included (one per line)", type: "textarea", rows: 5 },
          {
            key: "proofProjectSlug",
            label: "Proof project",
            type: "select",
            options: [{ value: "", label: "None" }, ...projects.map((p) => ({ value: p.slug, label: p.title }))],
          },
          {
            key: "service",
            label: "Show on",
            type: "select",
            options: [
              { value: "", label: "Both service pages" },
              { value: "web-apps", label: "/services/web-apps" },
              { value: "websites", label: "/services/websites" },
            ],
          },
          { key: "badge", label: "Badge (optional)", placeholder: "Most popular" },
          { key: "ctaText", label: "Button text", placeholder: "Get a quote" },
          { key: "ctaHref", label: "Button link (optional)", placeholder: "/contact?package=care-plan" },
        ]}
      />

      <RepeaterField
        name="process"
        label='"How I work" timeline steps'
        addLabel="Add step"
        defaultValue={services.process}
        fields={[
          { key: "title", label: "Step" },
          { key: "body", label: "Description", type: "textarea", rows: 2 },
          { key: "duration", label: "Duration (optional)", placeholder: "2–3 days" },
        ]}
      />

      <RepeaterField
        name="faq"
        label="FAQ"
        addLabel="Add question"
        defaultValue={services.faq}
        fields={[
          { key: "q", label: "Question" },
          { key: "a", label: "Answer", type: "textarea", rows: 3 },
        ]}
      />

      {services.services.map((svc) => (
        <fieldset key={svc.slug} className="flex flex-col gap-3 rounded-lg border border-black-50 p-4">
          <legend className="px-2 text-sm text-white-50">/services/{svc.slug}</legend>
          <div>
            <label className="mb-1 block text-xs text-white-50">Title</label>
            <input name={`svc-${svc.slug}-title`} defaultValue={svc.title} className={inputClass} />
          </div>
          <div>
            <label className="mb-1 block text-xs text-white-50">Summary (meta description and card text)</label>
            <textarea name={`svc-${svc.slug}-summary`} defaultValue={svc.summary} rows={2} className={inputClass} />
          </div>
          <div>
            <label className="mb-1 block text-xs text-white-50">Intro (Markdown)</label>
            <textarea name={`svc-${svc.slug}-intro`} defaultValue={svc.intro} rows={4} className={inputClass} />
          </div>
          <div>
            <label className="mb-1 block text-xs text-white-50">Benefits (one per line)</label>
            <textarea
              name={`svc-${svc.slug}-bullets`}
              defaultValue={svc.bullets.join("\n")}
              rows={4}
              className={inputClass}
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-white-50">Proof project</label>
            <select name={`svc-${svc.slug}-proof`} defaultValue={svc.proofProjectSlug} className={inputClass}>
              <option value="">None</option>
              {projects.map((p) => (
                <option key={p.slug} value={p.slug}>
                  {p.title}
                </option>
              ))}
            </select>
          </div>
        </fieldset>
      ))}

      {state && !state.error && <p className="text-sm text-green-400">Saved.</p>}

      <button
        type="submit"
        disabled={pending}
        className="w-fit rounded-md bg-white px-6 py-2 font-medium text-black-100 disabled:opacity-50"
      >
        {pending ? "Saving..." : "Save"}
      </button>
    </form>
  );
}
