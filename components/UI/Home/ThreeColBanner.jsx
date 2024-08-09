"use client";
import Link from "next/link";
import { useState } from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import BannerCats from "./BannerCats";
import ImageLoader from "../Common/ImageLoader";
import Image from "next/image";
import { HeroData, HeroDataSmall } from "~/data/Hero";
import { Grid } from "antd";


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

export default function ThreeColBanner() {
  const [isToggled, setToggled] = useState(true);
  const handleToggle = () => setToggled(!isToggled);
  const points = Grid.useBreakpoint()
  return (
    <>
      <section className="slider-area slider-bg-overlay pb-30 pt-60 " data-background="assets/img/banner/banner-bg-05.jpg">
        <div className="container">
          <div className="row justify-content-xl-end">
            <div className="col-xl-2 d-none d-xl-block">
              <BannerCats isToggled={isToggled} handleToggle={handleToggle} />
            </div>
            <div className="col-xl-7 col-lg-9 align-items-center">
              <div className="tp-slider-area p-relative">
                <div className="swiper-container slider-active">
                  <Swiper {...swiperOptions}>
                    {HeroData?.map((x, index) =>
                      <SwiperSlide key={index + 1}>
                        <div className="tp-slide-item tpslider-item-5">
                          <div className="tp-slide-item__content">
                            <h4 className="tp-slide-item__sub-title">{x.upper}</h4>
                            <h3 className="tp-slide-item__title text-white mb-25">
                              {x.heading}
                            </h3>
                            <Link className="tp-slide-item__slide-btn tp-btn" href="/collections">
                              {x.btn} <i className="fal fa-long-arrow-right" />
                            </Link>
                          </div>
                          <div className="tp-slide-item__img">
                            <img src={`${process.env.NEXT_PUBLIC_URL}${x.img}`} alt="heroimage" />
                          </div>
                        </div>
                      </SwiperSlide>
                    )}


                  </Swiper>
                </div>
                <div className="slider-pagination" />
              </div>
            </div>
            <div className="col-xl-3 col-lg-3">
              <div className="row">

                {HeroDataSmall?.map((x, index) => <div key={index + 1} className="col-lg-12 col-md-6 col-sm-6">
                  <div className="tpslider-banner white-banner mb-4">
                    <Link href="/collections">
                      <div className="tpslider-banner__img tpbannerthumb-5">
                        <img src={`${process.env.NEXT_PUBLIC_URL}${x.img}`} alt="heroimage" />
                        {/* <Image src={`${process.env.NEXT_PUBLIC_URL}${x.img}`} alt="small-1" height={220} width={300} /> */}
                        <div className="tpslider-banner__content">
                          <span className={`tpslider-banner__sub-title `}>{x.upper}</span>
                          <h4 className={`tpslider-banner__title  ${x.blackText ? "text-dark" : ""}`}>
                            {x.heading}
                          </h4>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>)}
              </div>
            </div>
          </div>
          {/* <div className="row pt-60">
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
          </div> */}
        </div>
      </section>
    </>
  );
}
