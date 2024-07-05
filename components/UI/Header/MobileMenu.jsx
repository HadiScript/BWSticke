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
                <Link href="/order-tracking">Order Tracking</Link>
              </li>
              <li className="">
                <Link href="/blogs">Blogs</Link>
              </li>
              <li className="">
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
