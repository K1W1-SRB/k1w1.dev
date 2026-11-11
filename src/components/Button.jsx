import Link from "next/link";

/** CTA button. Renders a Next.js link to `href`. */
const Button = ({ text, className, href = "/contact" }) => {
  return (
    <Link href={href} className={`${className ?? ""} cta-wrapper block`}>
      <div className="cta-button group">
        <div className="bg-circle" />
        <p className="text">{text}</p>
        <div className="arrow-wrapper">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/arrow-right.svg" alt="" />
        </div>
      </div>
    </Link>
  );
};

export default Button;
