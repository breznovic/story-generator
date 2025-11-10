"use client";

import Link from "next/link";

export default function FloatingActionButton() {
  return (
    <Link href="/stories" className="floating-btn">
      📖
      <span className="floating-text">View Stories</span>
    </Link>
  );
}
