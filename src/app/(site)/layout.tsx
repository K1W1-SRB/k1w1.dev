import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

// Content lives in data/content.json on the server and is edited through /admin, so
// render on each request rather than baking in whatever the build machine had.
export const dynamic = "force-dynamic";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
