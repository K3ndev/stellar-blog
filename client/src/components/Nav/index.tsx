import React from "react";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="mx-auto max-w-[872px] w-full">
      <nav className="flex justify-between my-3">
        <Link href="/">STRAPI BLOGS</Link>
        <ul className="flex gap-4">
          <li>
            <a href="./login" className="text-neutral-400">
              login
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};
