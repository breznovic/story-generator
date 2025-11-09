"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="navigation">
      <Link href="/" className={`nav-link ${pathname === "/" ? "active" : ""}`}>
        Generate Story
      </Link>
      <Link
        href="/stories"
        className={`nav-link ${pathname === "/stories" ? "active" : ""}`}
      >
        View Stories
      </Link>
    </nav>
  );
}
