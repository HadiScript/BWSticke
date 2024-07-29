"use client";
import Link from "next/link";


export default function MobileMenu() {


  return (
    <>
      <div className="mobile-menu mean-container">
        <div className="mean-bar">
          <Link href="#" className="meanmenu-reveal">
            <span>
              <span>
                <span />
              </span>
            </span>
          </Link>
          <nav className="mean-nav">
            <ul>
              <li className="">
                <Link href="/">Home</Link>
              </li>
              <li className="">
                <Link href="/collections">Collections</Link>

              </li>
              <li className="">
                <Link href="/categories">Categories</Link>
              </li>
              <li className="/about">
                <Link href="/track">Track</Link>
              </li>
              <li>
                <Link href="/contact">Become a Partner</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
