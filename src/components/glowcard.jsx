"use client";
import React from "react";

// Testimonials only render when they're attributed (quote + reviewer).
// Leave both blank until a real client quote is available.
function GlowCard({ card, children }) {
  const hasTestimonial = Boolean(card.review && card.reviewer);

  return (
    <div className="card card-border timeline-card rounded-xl p-10">
      {hasTestimonial && (
        <figure className="mb-5">
          <blockquote className="text-white-50 text-lg">“{card.review}”</blockquote>
          <figcaption className="mt-3 text-sm text-[#839CB5]">— {card.reviewer}</figcaption>
        </figure>
      )}
      {children}
    </div>
  );
}

export default GlowCard;
