
import Image from "next/image";
import Link from "next/link";
import FooterNewsLetter from "./FooterNewsLetter";

export default function Footer() {
  return (
    <>
      <footer>
        <div className="footer-area secondary-footer black-bg-2 pt-65">
          <div className="container">
            <div className="main-footer pb-15 mb-30">
              <div className="row">
                <div className="col-lg-3 col-md-4 col-sm-6">
                  <div className="footer-widget footer-col-1 mb-40">
                    <div className="footer-logo mb-30">
                      <Link href="/">
                        <Image height={100} width={200} src="/assets/img/logo/red-white.svg" alt="logo" />
                      </Link>
                    </div>
                    <div className="footer-content">
                      <p>
                        Nottingham UK.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-2 col-md-4 col-sm-6">
                  <div className="footer-widget footer-col-2 ml-30 mb-40">
                    <h4 className="footer-widget__title mb-30">Information</h4>
                    <div className="footer-widget__links">
                      <ul>
                        <li>
                          <Link href="/about-us">About Us</Link>
                        </li>
                        <li>
                          <Link href="/faqs">FAQs</Link>
                        </li>
                        <li>
                          <Link href="/track">Ordering Tracking</Link>
                        </li>
                        <li>
                          <Link href="/contact">Contacts</Link>
                        </li>
                        <li>
                          <Link href="/become-a-partner">Become a Partner</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-lg-2 col-md-4 col-sm-6">
                  <div className="footer-widget footer-col-3 mb-40">
                    <h4 className="footer-widget__title mb-30">My Account</h4>
                    <div className="footer-widget__links">
                      <ul>
                        <li>
                          <Link href="#">Delivery Information</Link>
                        </li>
                        <li>
                          <Link href="#">Privacy Policy</Link>
                        </li>
                        {/* <li>
                          <Link href="#">Discount</Link>
                        </li> */}
                        {/* <li>
                          <Link href="#">Custom Service</Link>
                        </li> */}
                        <li>
                          <Link href="#">Terms Condition</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-lg-2 col-md-4 col-sm-6">
                  <div className="footer-widget footer-col-4 mb-40">
                    <h4 className="footer-widget__title mb-30">Social Network</h4>
                    <div className="footer-widget__links">
                      <ul>
                        <li>
                          <Link href="#">
                            <i className="fab fa-facebook-f" />
                            Facebook
                          </Link>
                        </li>
                        <li>
                          <Link href="#">
                            <i className="fab fa-dribbble" />
                            Dribbble
                          </Link>
                        </li>
                        <li>
                          <Link href="#">
                            <i className="fab fa-twitter" />
                            Twitter
                          </Link>
                        </li>
                        <li>
                          <Link href="#">
                            <i className="fab fa-behance" />
                            Behance
                          </Link>
                        </li>
                        <li>
                          <Link href="#">
                            <i className="fab fa-youtube" />
                            Youtube
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4">
                  <FooterNewsLetter />
                </div>
              </div>
            </div>
            <div className="footer-cta pb-20">
              <div className="row justify-content-between align-items-center">
                <div className="col-xl-6 col-lg-4 col-md-4 col-sm-6">
                  <div className="footer-cta__contact">
                    <div className="footer-cta__icon">
                      <i className="far fa-phone" />
                    </div>
                    <div className="footer-cta__text">
                      <Link href="/tel:+447446498337" className="my-2">+44 7446 498337 (UK)</Link>
                      <Link href="/tel:+447446498337" className="my-2">+44 7446 498337 (Globally)</Link>
                      {/* <span>Working 8:00 - 22:00</span> */}
                    </div>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-4 col-md-4 col-sm-6 text-white text-end">
                  <div className="" style={{ fontSize: "16px" }}>
                    Copyright 2024 BWSTRIKE. All rights reserved. Developed by <a href="#">HadiScripts</a>.
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="footer-copyright footer-bg">
            <div className="container">
              <div className="row">
                <div className="col-xl-6 col-lg-7 col-md-5 col-sm-12">
                  <div className="footer-copyright__content">
                    <span>
                      Copyright {new Date().getFullYear()} <Link href="/">©Ninico</Link>. All rights reserved. Developed by
                      <Link href="https://themeforest.net/user/alithemes/portfolio"> AliThemes</Link>.
                    </span>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-5 col-md-7 col-sm-12">
                  <div className="footer-copyright__brand">
                    <img src="/assets/img/footer/f-brand-icon-01.png" alt="footer-brand" />
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </footer>
    </>
  );
}
