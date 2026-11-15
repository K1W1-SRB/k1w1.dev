"use client";

import { useActionState, useState } from "react";
import { saveProject } from "@/lib/admin-actions";
import type { Project } from "@/lib/content-store";
import ImageUploadField from "./ImageUploadField";
import RepeaterField, { inputClass } from "./RepeaterField";

function Field({
  label,
  name,
  defaultValue,
  help,
  textarea,
  rows = 4,
  required,
  placeholder,
  type = "text",
}: {
  label: string;
  name: string;
  defaultValue: string;
  help?: string;
  textarea?: boolean;
  rows?: number;
  required?: boolean;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm text-white-50" htmlFor={name}>
        {label}
      </label>
      {textarea ? (
        <textarea id={name} name={name} defaultValue={defaultValue} rows={rows} placeholder={placeholder} className={inputClass} />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          defaultValue={defaultValue}
          required={required}
          placeholder={placeholder}
          className={inputClass}
        />
      )}
      {help && <p className="mt-1 text-xs text-blue-50">{help}</p>}
    </div>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-4 rounded-xl border border-black-50 p-6">
      <h2 className="text-lg font-semibold">{title}</h2>
      {children}
    </section>
  );
}

export default function ProjectForm({ project }: { project: Project }) {
  const [state, formAction, pending] = useActionState(saveProject, null);
  const [hasCaseStudy, setHasCaseStudy] = useState(project.caseStudy !== null);
  const cs = project.caseStudy;

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <input type="hidden" name="id" defaultValue={project.id} />

      <Group title="Basics">
        <Field label="Title" name="title" defaultValue={project.title} required />
        <Field
          label="URL slug"
          name="slug"
          defaultValue={project.slug}
          placeholder="pt2c"
          help="The case study lives at /work/<slug>. Leave blank to generate it from the title."
        />
        <Field
          label="One-line summary"
          name="summary"
          defaultValue={project.summary}
          textarea
          rows={2}
          help="Shown on project cards and under the case-study title."
        />
        <ImageUploadField name="image" label="Main image" defaultValue={project.image} />
        <Field label="Main image alt text" name="imageAlt" defaultValue={project.imageAlt} placeholder="PT2C workout plan view on a phone" />
        <div className="grid gap-4 md:grid-cols-3">
          <Field label="Your role" name="role" defaultValue={project.role} placeholder="Founder & developer" />
          <Field label="Year" name="year" defaultValue={project.year} placeholder="2025" />
          <Field label="Status" name="status" defaultValue={project.status} placeholder="Live" />
        </div>
        <Field label="Live link" name="liveUrl" type="url" defaultValue={project.liveUrl} placeholder="https://..." />
        <div className="flex flex-wrap gap-6">
          <label className="flex items-center gap-2 text-sm text-white-50">
            <input type="checkbox" name="featured" defaultChecked={project.featured} />
            Featured (leads on the homepage and /work)
          </label>
          <label className="flex items-center gap-2 text-sm text-white-50">
            <input type="checkbox" name="published" defaultChecked={project.published} />
            Published (visible on the live site)
          </label>
        </div>
      </Group>

      <Group title="SEO">
        <Field
          label="SEO title"
          name="seoTitle"
          defaultValue={project.seoTitle}
          help='Defaults to "<Title> – Case Study". Aim for under 60 characters.'
        />
        <Field
          label="Meta description"
          name="seoDescription"
          defaultValue={project.seoDescription}
          textarea
          rows={2}
          help="Defaults to the summary. Aim for 140–160 characters."
        />
      </Group>

      <Group title="Case study">
        <label className="flex items-center gap-2 text-sm text-white-50">
          <input
            type="checkbox"
            name="hasCaseStudy"
            checked={hasCaseStudy}
            onChange={(e) => setHasCaseStudy(e.target.checked)}
          />
          This project has a case study page
        </label>

        {hasCaseStudy && (
          <>
            <Field
              label="The problem (Markdown)"
              name="problem"
              defaultValue={cs?.problem ?? ""}
              textarea
              rows={5}
              help="Who it's for and what was wrong with the existing options."
            />
            <RepeaterField
              name="features"
              label="What I built: key features"
              addLabel="Add feature"
              defaultValue={cs?.features ?? []}
              fields={[
                { key: "title", label: "Feature" },
                { key: "body", label: "Description (Markdown)", type: "textarea" },
                { key: "image", label: "Screenshot", type: "image" },
                { key: "imageAlt", label: "Screenshot alt text" },
              ]}
            />
            <RepeaterField
              name="decisions"
              label="Decisions"
              addLabel="Add decision"
              help="The interesting choices you made, e.g. pricing, and what you deliberately left out."
              defaultValue={cs?.decisions ?? []}
              fields={[
                { key: "title", label: "Decision" },
                { key: "body", label: "Why (Markdown)", type: "textarea" },
              ]}
            />
            <RepeaterField
              name="stack"
              label="Stack"
              addLabel="Add technology"
              defaultValue={cs?.stack ?? []}
              fields={[
                { key: "name", label: "Technology", placeholder: "Next.js" },
                { key: "why", label: "Why, in one sentence" },
              ]}
            />
            <Field
              label="Outcome section title"
              name="outcomeTitle"
              defaultValue={cs?.outcomeTitle ?? "Outcome"}
              placeholder='Outcome, or "What I learned"'
            />
            <Field label="Outcome (Markdown)" name="outcome" defaultValue={cs?.outcome ?? ""} textarea rows={4} help="Users, feedback or results." />
            <div className="grid gap-4 md:grid-cols-2">
              <Field
                label="Testimonial quote"
                name="testimonialQuote"
                defaultValue={cs?.testimonial.quote ?? ""}
                textarea
                rows={3}
                help="Real, attributed quotes only. Hidden unless both fields are filled."
              />
              <Field label="Testimonial from" name="testimonialAuthor" defaultValue={cs?.testimonial.author ?? ""} placeholder="Jane Doe, PT2C user" />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="CTA text" name="ctaText" defaultValue={cs?.ctaText ?? ""} placeholder="Need something like this for your business?" />
              <Field label="CTA link" name="ctaHref" defaultValue={cs?.ctaHref ?? ""} placeholder="/services/web-apps" />
            </div>
          </>
        )}
      </Group>

      {state?.error && <p className="text-sm text-red-400">{state.error}</p>}

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
