"use client";
import { useState } from "react";
import { buttonClass } from "../components/ui/LinkButton";
import ProtectedEmail from "../components/ProtectedEmail";

/**
 * The contact form card. Layout around it (intro, availability, 3D model) is up to the page.
 * @param {{ initialMessage?: string }} props
 */
const ContactForm = ({ initialMessage = "" }) => {
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [form, setForm] = useState({ name: "", email: "", message: initialMessage });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to send");
      setForm({ name: "", email: "", message: "" });
      setStatus("sent");
    } catch (err) {
      console.error("SendGrid Error:", err);
      setStatus("error");
    }
  };

  return (
    <div id="contact-form" className="rounded-2xl border border-black-50 bg-[#1b1b1b] p-6 md:p-8">
      <form onSubmit={handleSubmit} className="flex w-full flex-col gap-6">
        <div>
          <label htmlFor="name">Your name</label>
          <input
            type="text"
            id="name"
            name="name"
            autoComplete="name"
            value={form.name}
            onChange={handleChange}
            placeholder="What's your name?"
            required
          />
        </div>

        <div>
          <label htmlFor="email">Your email</label>
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
            placeholder="What's your email address?"
            required
          />
        </div>

        <div>
          <label htmlFor="message">Your message</label>
          <textarea
            id="message"
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="What are you looking to build?"
            rows={6}
            required
          />
        </div>

        <button type="submit" disabled={status === "sending"} className={buttonClass({ block: true, className: "disabled:opacity-60" })}>
          {status === "sending" ? "Sending..." : "Send message"}
        </button>

        <p role="status" aria-live="polite" className="text-sm">
          {status === "sent" && <span className="text-green-400">Thanks, your message is on its way. I&apos;ll reply soon.</span>}
          {status === "error" && (
            <span className="text-red-400">
              Something went wrong sending that. Please email me instead: <ProtectedEmail className="underline" />
            </span>
          )}
          {(status === "idle" || status === "sending") && (
            <span className="text-white-50">
              Prefer email? <ProtectedEmail className="text-white underline hover:text-white-50" />
            </span>
          )}
        </p>
      </form>
    </div>
  );
};

export default ContactForm;
