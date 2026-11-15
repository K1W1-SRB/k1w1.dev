"use client";

import { useState } from "react";
import ImageUploadField from "./ImageUploadField";

export type RepeaterFieldDef = {
  key: string;
  label: string;
  type?: "text" | "textarea" | "image" | "checkbox" | "select";
  placeholder?: string;
  rows?: number;
  /** For type "select". */
  options?: { value: string; label: string }[];
};

type Row = Record<string, string | boolean>;
type KeyedRow = Row & { _k: string };

let keyCounter = 0;
const nextKey = () => `row-${++keyCounter}`;

export const inputClass =
  "w-full rounded-md border border-blue-100 bg-blue-100 px-4 py-2 text-white outline-none focus:border-white-50";

/**
 * Editable list of objects (features, decisions, FAQ...). The rows are serialised
 * to JSON in a hidden input named `name`, which the server action parses.
 */
export default function RepeaterField({
  name,
  label,
  fields,
  defaultValue,
  addLabel = "Add item",
  help,
}: {
  name: string;
  label: string;
  fields: RepeaterFieldDef[];
  defaultValue: Row[];
  addLabel?: string;
  help?: string;
}) {
  // Each row gets a stable client-side key so reordering doesn't remount inputs with the wrong values.
  const [rows, setRows] = useState<KeyedRow[]>(() => defaultValue.map((r) => ({ ...r, _k: nextKey() })));

  const blank = (): KeyedRow => ({
    ...Object.fromEntries(fields.map((f) => [f.key, f.type === "checkbox" ? false : ""])),
    _k: nextKey(),
  });

  const update = (k: string, key: string, value: string | boolean) =>
    setRows((rs) => rs.map((r) => (r._k === k ? { ...r, [key]: value } : r)));

  const move = (index: number, dir: -1 | 1) =>
    setRows((rs) => {
      const next = [...rs];
      const target = index + dir;
      if (target < 0 || target >= next.length) return rs;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const serialised = JSON.stringify(rows.map(({ _k, ...rest }) => rest));

  return (
    <fieldset className="rounded-lg border border-black-50 p-4">
      <legend className="px-2 text-sm text-white-50">{label}</legend>
      {help && <p className="mb-3 text-xs text-blue-50">{help}</p>}
      <input type="hidden" name={name} value={serialised} />

      <div className="flex flex-col gap-4">
        {rows.map((row, index) => (
          <div key={row._k} className="rounded-md bg-black-200 p-4">
            <div className="mb-3 flex items-center justify-between text-xs text-white-50">
              <span>#{index + 1}</span>
              <div className="flex gap-3">
                <button type="button" onClick={() => move(index, -1)} disabled={index === 0} className="disabled:opacity-30">
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => move(index, 1)}
                  disabled={index === rows.length - 1}
                  className="disabled:opacity-30"
                >
                  ↓
                </button>
                <button
                  type="button"
                  onClick={() => setRows((rs) => rs.filter((r) => r._k !== row._k))}
                  className="text-red-400 hover:text-red-300"
                >
                  Remove
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {fields.map((f) => {
                const value = row[f.key];
                if (f.type === "image") {
                  return (
                    <ImageUploadField
                      key={f.key}
                      label={f.label}
                      defaultValue={typeof value === "string" ? value : ""}
                      onChange={(v) => update(row._k, f.key, v)}
                    />
                  );
                }
                if (f.type === "checkbox") {
                  return (
                    <label key={f.key} className="flex items-center gap-2 text-sm text-white-50">
                      <input
                        type="checkbox"
                        checked={value === true}
                        onChange={(e) => update(row._k, f.key, e.target.checked)}
                      />
                      {f.label}
                    </label>
                  );
                }
                return (
                  <div key={f.key}>
                    <label className="mb-1 block text-xs text-white-50">{f.label}</label>
                    {f.type === "select" ? (
                      <select
                        value={typeof value === "string" ? value : ""}
                        onChange={(e) => update(row._k, f.key, e.target.value)}
                        className={inputClass}
                      >
                        {(f.options ?? []).map((o) => (
                          <option key={o.value} value={o.value}>
                            {o.label}
                          </option>
                        ))}
                      </select>
                    ) : f.type === "textarea" ? (
                      <textarea
                        value={typeof value === "string" ? value : ""}
                        onChange={(e) => update(row._k, f.key, e.target.value)}
                        rows={f.rows ?? 3}
                        placeholder={f.placeholder}
                        className={inputClass}
                      />
                    ) : (
                      <input
                        value={typeof value === "string" ? value : ""}
                        onChange={(e) => update(row._k, f.key, e.target.value)}
                        placeholder={f.placeholder}
                        className={inputClass}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setRows((rs) => [...rs, blank()])}
        className="mt-4 rounded-md border border-white-50/30 px-4 py-2 text-sm text-white-50 hover:text-white"
      >
        + {addLabel}
      </button>
    </fieldset>
  );
}
