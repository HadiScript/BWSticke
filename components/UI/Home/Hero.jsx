import Link from "next/link";
import { useState } from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ImageLoader from "../Common/ImageLoader";

const swiperOptions = {
  modules: [Autoplay, Pagination, Navigation],
  slidesPerView: 1,
  spaceBetween: 30,
  autoplay: {
    delay: 2500,
  },

  // Navigation
  navigation: {
    nextEl: ".h1n",
    prevEl: ".h1p",
  },

  // Pagination
  pagination: {
    el: ".slider-pagination",
    clickable: true,
  },
};

export default function Hero() {
  const [isToggled, setToggled] = useState(true);
  const handleToggle = () => setToggled(!isToggled);
  return (
    <>
      <section className="slider-area slider-bg-overlay pb-30 pt-60" style={{ backgroundColor: "black" }}  >
        <div className="container">
          <div className="row justify-content-xl-end">
            <div className="col-xl-3 d-none d-xl-block">
              <div className="row">
                <div className="col-lg-12 col-md-6 col-sm-6">
                  <div className="tpslider-banner mb-30 tpbnner-height-5">
                    <Link href="/shop-2">
                      <div className="tpslider-banner__img tpbannerthumb-5">
                        <img src="/imgs/hero/slider1.jpg" alt="" />
                        <div className="tpslider-banner__content">
                          <span className="tpslider-banner__sub-title">Best Bakery Products</span>
                          <h4 className="tpslider-banner__title">
                            100% Fresh Product <br /> Every Hour
                          </h4>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="col-lg-12 col-md-6 col-sm-6">
                  <div className="tpslider-banner white-banner">
                    <Link href="/shop">
                      <div className="tpslider-banner__img tpbannerthumb-5">
                        <img src="/imgs/hero/slider1.jpg" alt="" />
                        <div className="tpslider-banner__content">
                          <span className="tpslider-banner__sub-title">Best Bakery Products</span>
                          <h4 className="tpslider-banner__title">
                            100% Fresh Product <br /> Every Hour
                          </h4>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-9 align-items-center">
              <div className="tp-slider-area p-relative">
                <div className="swiper-container slider-active">
                  <Swiper {...swiperOptions}>
                    <SwiperSlide>
                      <div className="tp-slide-item tpslider-item-5">
                        <div className="tp-slide-item__content">
                          <h4 className="tp-slide-item__sub-title">Quality Fresh Products</h4>
                          <h3 className="tp-slide-item__title mb-25">
                            Fresh Grocery <br /> Products.
                          </h3>
                          <Link className="tp-slide-item__slide-btn tp-btn" href="/shop-2">
                            Shop Now <i className="fal fa-long-arrow-right" />
                          </Link>
                        </div>
                        <div className="tp-slide-item__img">
                          <img height={480} width={'100%'} src="/imgs/hero/slider1.jpg" alt="" />
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="tp-slide-item tpslider-item-5">
                        <div className="tp-slide-item__content">
                          <h4 className="tp-slide-item__sub-title">Quality Fresh Products</h4>
                          <h3 className="tp-slide-item__title mb-25">
                            Fresh Grocery <br /> Products.
                          </h3>
                          <Link className="tp-slide-item__slide-btn tp-btn" href="/shop-2">
                            Shop Now <i className="fal fa-long-arrow-right" />
                          </Link>
                        </div>
                        <div className="tp-slide-item__img">
                          <img height={480} width={'100%'} src="/imgs/hero/slider2.jpg" alt="" />
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="tp-slide-item tpslider-item-5">
                        <div className="tp-slide-item__content">
                          <h4 className="tp-slide-item__sub-title">Quality Fresh Products</h4>
                          <h3 className="tp-slide-item__title mb-25">
                            Fresh Grocery <br /> Products.
                          </h3>
                          <Link className="tp-slide-item__slide-btn tp-btn" href="/shop-2">
                            Shop Now <i className="fal fa-long-arrow-right" />
                          </Link>
                        </div>
                        <div className="tp-slide-item__img">
                          <img height={480} width={'100%'} src="/imgs/hero/slider3.jpg" alt="" />
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="tp-slide-item tpslider-item-5">
                        <div className="tp-slide-item__content">
                          <h4 className="tp-slide-item__sub-title">Quality Fresh Products</h4>
                          <h3 className="tp-slide-item__title mb-25">
                            Fresh Grocery <br /> Products.
                          </h3>
                          <Link className="tp-slide-item__slide-btn tp-btn" href="/shop-2">
                            Shop Now <i className="fal fa-long-arrow-right" />
                          </Link>
                        </div>
                        <div className="tp-slide-item__img">
                          <img height={480} width={'100%'} src="/imgs/hero/slider4.jpg" alt="" />
                        </div>
                      </div>
                    </SwiperSlide>
                  </Swiper>
                </div>
                <div className="slider-pagination" />
              </div>
            </div>
            <div className="col-xl-3 col-lg-3">
              <div className="row">
                <div className="col-lg-12 col-md-6 col-sm-6">
                  <div className="tpslider-banner mb-30 tpbnner-height-5">
                    <Link href="/shop-2">
                      <div className="tpslider-banner__img tpbannerthumb-5">
                        <img src="/imgs/hero/slider1.jpg" alt="" />
                        <div className="tpslider-banner__content">
                          <span className="tpslider-banner__sub-title">Best Bakery Products</span>
                          <h4 className="tpslider-banner__title">
                            100% Fresh Product <br /> Every Hour
                          </h4>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="col-lg-12 col-md-6 col-sm-6">
                  <div className="tpslider-banner white-banner">
                    <Link href="/shop">
                      <div className="tpslider-banner__img tpbannerthumb-5">
                        <ImageLoader src="/imgs/hero/slider1.jpg" alt="" />
                        <div className="tpslider-banner__content">
                          <span className="tpslider-banner__sub-title">Best Bakery Products</span>
                          <h4 className="tpslider-banner__title">
                            100% Fresh Product <br /> Every Hour
                          </h4>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>



          {/* bottom */}
          <div className="row pt-60">
            <div className="col-lg-3 col-sm-6">
              <div className="tpservicesitem tpservices-border d-flex align-items-center mb-30">
                <div className="tpservicesitem__icon mr-20">
                  <img src="/assets/img/svg/services05.svg" alt="" className="fn__svg" />
                </div>
                <div className="tpservicesitem__content">
                  <h4 className="tpservicesitem__title">Free shipping</h4>
                  <p>Free shipping orders over $65.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6">
              <div className="tpservicesitem tpservices-border d-flex align-items-center mb-30">
                <div className="tpservicesitem__icon mr-20">
                  <img src="/assets/img/svg/services06.svg" alt="" className="fn__svg" />
                </div>
                <div className="tpservicesitem__content">
                  <h4 className="tpservicesitem__title">Free Returns</h4>
                  <p>30-days free return policy</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6">
              <div className="tpservicesitem tpservices-border d-flex align-items-center mb-30">
                <div className="tpservicesitem__icon mr-20">
                  <img src="/assets/img/svg/services07.svg" alt="" className="fn__svg" />
                </div>
                <div className="tpservicesitem__content">
                  <h4 className="tpservicesitem__title">Secured Payments</h4>
                  <p>We accept all major credit cards</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6">
              <div className="tpservicesitem tpservices-border d-flex align-items-center mb-30">
                <div className="tpservicesitem__icon mr-20">
                  <img src="/assets/img/svg/services08.svg" alt="" className="fn__svg" />
                </div>
                <div className="tpservicesitem__content">
                  <h4 className="tpservicesitem__title">Customer Service</h4>
                  <p>Top notch customer setvice</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}