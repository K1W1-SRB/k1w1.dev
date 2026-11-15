import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Raw HTML in the markdown is not rendered (react-markdown's default), so admin content can't inject scripts.
function Markdown({ children, className = "" }) {
  if (!children) return null;
  return (
    <div className={`prose-k1w1 ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ href, children: c }) => {
            const external = href?.startsWith("http");
            return (
              <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                {c}
              </a>
            );
          },
          // Keep the page's single H1: markdown "#" headings render as h2.
          h1: ({ children: c }) => <h2>{c}</h2>,
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}

export default Markdown;
