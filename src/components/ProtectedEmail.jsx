"use client";
import { useSyncExternalStore } from "react";
import { SITE } from "@/constants/site";

const noopSubscribe = () => () => {};
const getEmail = () => SITE.emailParts.join("@");
const getServerEmail = () => null;

// Renders the contact email only on the client, so it isn't in the server HTML
// that spam scrapers harvest. The server render shows a neutral "Email me" label.
function ProtectedEmail({ className, children }) {
  const email = useSyncExternalStore(noopSubscribe, getEmail, getServerEmail);

  return (
    <a
      href={email ? `mailto:${email}` : undefined}
      className={className}
      aria-label={email ? `Email ${email}` : "Email me"}
    >
      {children}
      {email ?? "Email me"}
    </a>
  );
}

export default ProtectedEmail;
