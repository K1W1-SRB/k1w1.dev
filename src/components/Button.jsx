/**
 * A reusable CTA button component.
 * When clicked, it scrolls smoothly to the section whose ID is passed in `id`,
 * with a small offset from the top for better visual placement.
 */

const Button = ({ text, className, id }) => {
  return (
    <a
      href={id ? `#${id}` : undefined}
      onClick={(e) => {
        e.preventDefault();

        const target = document.getElementById(id);

        if (target && id) {
          const offset = window.innerHeight * 0.15;

          const top =
            target.getBoundingClientRect().top + window.scrollY - offset;

          window.scrollTo({ top, behavior: "smooth" });
        }
      }}
      className={`${className ?? ""} cta-wrapper`}
    >
      <div className="cta-button group">
        <div className="bg-circle" />
        <p className="text">{text}</p>
        <div className="arrow-wrapper">
          <img src="/images/arrow-down.svg" alt="" />
        </div>
      </div>
    </a>
  );
};

export default Button;
