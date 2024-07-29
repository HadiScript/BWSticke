
import Link from "next/link";
import HeaderMobSticky from "../HeaderMobSticky";
import SearchingDrawer from "../../Common/SearchingDrawer";
import { useState } from "react";
import Image from "next/image";
// import HeaderSticky from "../HeaderSticky";
// import HeaderTabSticky from "../HeaderTabSticky";

export default function Navbar({ scroll, isMobileMenu, handleMobileMenu, isCartSidebar, handleCartSidebar }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <header>

        {/* Little Navbar */}
        <div className="header-top theme-bg-2 red-header-top">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6 d-none  d-lg-block">
                <div className="headertoplag ">
                  <div className="menu-top-social">
                    <Link href="/about-us">About Us</Link>
                    <Link href="/compare">Compare</Link>
                   
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="header-welcome-text text-end">
                  <span>Enjoy free shipping on orders $100 up.</span>
                  <Link href="/shop-2">
                    Shop Now
                    <i className="fal fa-long-arrow-right" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Top Header */}
        <div id="header-sticky" className="logo-area d-none d-xl-block mainmenu-5">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-xl-2 col-lg-3">
                <div className="logo">
                  <Link href="/">
                    <Image src={`${process.env.NEXT_PUBLIC_URL}/assets/img/logo/logo.png`} alt="logo" height={60} width={150} />
                  </Link>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6">
                <div className="main-menu">
                  <nav id="mobile-menu">
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
              <div className="col-xl-4 col-lg-9">
                <div className="header-meta-info d-flex align-items-center justify-content-end">
                  <div className="header-meta__social  d-flex align-items-center">
                    <Link href={'/cart'} className="header-cart p-relative tp-cart-toggle" onClick={handleCartSidebar}>
                      <i className="fal fa-shopping-cart" />
                      {/* <CartShow /> */}
                    </Link>

                    <Link href="/wishlist" className="header-cart p-relative tp-cart-toggle">
                      <i className="fal fa-heart" />
                      <span className="tp-product-count">9</span>
                    </Link>

                    <Link href="#" className="header-cart p-relative tp-cart-toggle" onClick={() => setOpen(true)}>
                      <i className="fal fa-search" />
                    </Link>
                    <Link href="/sign-in">
                      <i className="fal fa-user" />
                    </Link>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </header >

      {/* <HeaderSticky scroll={scroll} isCartSidebar={isCartSidebar} handleCartSidebar={handleCartSidebar} />
      <HeaderTabSticky
        scroll={scroll}
        isMobileMenu={isMobileMenu}
        handleMobileMenu={handleMobileMenu}
        isCartSidebar={isCartSidebar}
        handleCartSidebar={handleCartSidebar}
      /> */}
      <HeaderMobSticky
        scroll={scroll}
        isMobileMenu={isMobileMenu}
        handleMobileMenu={handleMobileMenu}
        isCartSidebar={isCartSidebar}
        handleCartSidebar={handleCartSidebar}
      />

      <SearchingDrawer open={open} setOpen={setOpen} />
    </>
  );
}
