import type { Metadata } from "next";
import "./admin.css";

export const metadata: Metadata = {
  title: "Admin · Ocean of Careers",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="adm">{children}</div>;
}
