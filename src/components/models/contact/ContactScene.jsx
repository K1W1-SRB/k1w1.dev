"use client";
import ContactExperience from "./ContactExperience";

/** The 3D desk scene shown under the contact form, at a fixed, modest height. */
function ContactScene() {
  return (
    <div className="h-72 md:h-96 w-full overflow-hidden rounded-2xl bg-accent hover:cursor-grab" aria-hidden="true">
      <ContactExperience />
    </div>
  );
}

export default ContactScene;
