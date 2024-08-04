import products from "../../../data/products.json";
// import { addCart } from "@/features/shopSlice";
import Link from "next/link";
// import { useDispatch } from "react-redux";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import PriHeading from "../Common/PriHeading";
import ShopCard from "../Common/ShopChard";
import { _simpleProductCart, _variableProductCart } from "~/lib/cartHandle";

const swiperOptions = {
  modules: [Autoplay, Pagination, Navigation],
  slidesPerView: 4,
  spaceBetween: 30,
  autoplay: {
    delay: 3000,
  },
  breakpoints: {
    1400: {
      slidesPerView: 4,
    },
    1200: {
      slidesPerView: 3,
    },
    992: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 2,
    },
    576: {
      slidesPerView: 1,
    },
    0: {
      slidesPerView: 1,
    },
  },
  // Navigation arrows
  navigation: {
    nextEl: ".tpplatiarrow__nxt",
    prevEl: ".tpplatiarrow__prv",
  },
};

export default function TopProducts({ list, title }) {
  const currentTime = new Date();
  // const dispatch = useDispatch();

  const addToCart = (id) => {
    // const item = products?.find((item) => item.id === id);
    // dispatch(addCart({ product: item }));
  };






  return (
    <>
      <section className="platinam-product-area pt-65 pb-65">
        <div className="container">
          <div className="row">

            <PriHeading one={title?.split(" ")[0]} two={title?.split(" ")[1]} />

            <div className="col-lg-6 col-md-6">
              <div className="tpplatiarrow d-flex align-items-center justify-content-end">
                <div className="tpplatiarrow__prv">
                  <i className="far fa-long-arrow-left" />
                  Prev
                </div>
                <div className="tpplatiarrow__nxt">
                  Next
                  <i className="far fa-long-arrow-right" />
                </div>
              </div>
            </div>
          </div>
          <div className="swiper-container platinam-pro-active">
            <Swiper {...swiperOptions}>
              {list?.slice(0, 6).map((item, i) => (
                <SwiperSlide key={i}>
                  <ShopCard product={item} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>
    </>
  );
}
