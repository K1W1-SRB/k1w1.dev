"use client";

import { useState } from "react";

export default function ImageUploadField({
  name,
  label,
  defaultValue,
}: {
  name: string;
  label: string;
  defaultValue: string;
}) {
  const [value, setValue] = useState(defaultValue);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
    const data = await res.json();

    if (res.ok) {
      setValue(data.path);
    } else {
      setError(data.error ?? "Upload failed");
    }
    setUploading(false);
  }

  return (
    <div className="mb-4">
      <label className="mb-2 block text-sm text-white-50">{label}</label>
      <input type="hidden" name={name} value={value} />
      {value && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={value} alt="" className="mb-2 h-24 rounded-md border border-black-50 object-cover" />
      )}
      <input
        type="file"
        accept="image/png,image/jpeg,image/webp"
        onChange={handleFileChange}
        className="block text-sm text-white-50"
      />
      {uploading && <p className="mt-1 text-xs text-white-50">Uploading...</p>}
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
}
