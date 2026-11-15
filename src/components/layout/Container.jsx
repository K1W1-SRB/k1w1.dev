const WIDTHS = { narrow: "max-w-3xl", medium: "max-w-4xl", default: "max-w-6xl" };

/**
 * Shared page width, so every section lines up on the same left and right edges.
 * @param {{ children: React.ReactNode, narrow?: boolean, medium?: boolean, className?: string, as?: any } & Record<string, any>} props
 */
function Container({ children, narrow = false, medium = false, className = "", as: Tag = "div", ...rest }) {
  const width = narrow ? WIDTHS.narrow : medium ? WIDTHS.medium : WIDTHS.default;
  return (
    <Tag className={`mx-auto w-full px-5 md:px-10 ${width} ${className}`} {...rest}>
      {children}
    </Tag>
  );
}

export default Container;
