import Link from "next/link";

const VARIANTS = {
  primary: "bg-white text-black hover:bg-white-50",
  secondary: "border border-white-50/30 text-white hover:border-white hover:bg-white/5",
};

/** Class string for the site's button style, for use on <button> elements too. */
export function buttonClass({ variant = "primary", block = false, className = "" } = {}) {
  return `inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 font-semibold transition-colors ${VARIANTS[variant]} ${block ? "w-full" : ""} ${className}`;
}

/**
 * The site's one button style, as a link.
 * @param {{ href: string, children: React.ReactNode, variant?: "primary" | "secondary", block?: boolean, className?: string }} props
 */
function LinkButton({ href, children, variant = "primary", block = false, className = "" }) {
  return (
    <Link href={href} className={buttonClass({ variant, block, className })}>
      {children}
    </Link>
  );
}

export default LinkButton;
