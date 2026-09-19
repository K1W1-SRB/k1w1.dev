import Link from "next/link";
import { logoutAdmin } from "@/lib/admin-actions";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-black-100 text-white">
      <header className="flex items-center justify-between border-b border-black-50 px-6 py-4">
        <nav className="flex gap-6 text-sm">
          <Link href="/admin/projects" className="hover:text-white-50">
            Projects
          </Link>
          <Link href="/admin/experience" className="hover:text-white-50">
            Experience
          </Link>
          <Link href="/" className="hover:text-white-50">
            View site
          </Link>
        </nav>
        <form action={logoutAdmin}>
          <button type="submit" className="text-sm text-white-50 hover:text-white">
            Log out
          </button>
        </form>
      </header>
      <main className="p-6">{children}</main>
    </div>
  );
}
