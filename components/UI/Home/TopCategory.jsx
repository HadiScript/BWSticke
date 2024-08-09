import { Grid } from "antd";
import Image from "next/image";
import Link from "next/link";

export default function TopCategories() {
  const points = Grid.useBreakpoint()
  return (
    <>
      <section className="banner-area pt-15 pb-15">
        <div className="bannerborder">
          <div className="container-fluid">
            <div className="row gx-3">
              <div className="d-none d-md-block col-lg-4 col-md-12">
                <div className="banneritem banneroverlay p-relative">
                  {/* <Image src={`${process.env.NEXT_PUBLIC_URL}/assets/img/h/4cats/big-1.webp`} alt="big-2" height={points.md ? 585 : 285} width={2000} /> */}
                  <img src={`${process.env.NEXT_PUBLIC_URL}/assets/img/h/4cats/big-1.webp`} alt="big-2" />
                  <div className="bannertext text-center">
                    <span className="bannertext__subtitle">Sports  Color</span>
                    <h4 className="bannertext__title mb-40">
                      <Link href="/collections">
                        Reactive Providence <br /> Sports  Color
                      </Link>
                    </h4>
                    <div className="bannertext__btn tpexclusive__btn">
                      <Link href="/shop" className="tp-btn  banner-animation">
                        Shop Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-12">
                <div className="banneritem banner-animation mb-15 p-relative">
                  <img src={`${process.env.NEXT_PUBLIC_URL}/assets/img/h/4cats/small-1.webp`} alt="small-2" />
                  {/* <Image src={`${process.env.NEXT_PUBLIC_URL}/assets/img/h/4cats/small-1.webp`} alt="small-2" height={285} width={2000} /> */}
                  <div className="bannerbox">
                    <span className="bannerbox__subtitle">Gloves</span>
                    <h4 className="bannerbox__title mb-95 text-white">
                      <Link href="/collections">
                        New Modern <br /> Gloves
                      </Link>
                    </h4>
                    <div className="bannerbox__btn">
                      <Link className="tp-btn banner-animation mr-25" href="/collections">
                        Shop Now
                        <i className="fal fa-long-arrow-right" />
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="banneritem banner-animation p-relative">
                  {/* <Image src={`${process.env.NEXT_PUBLIC_URL}/assets/img/h/4cats/small-2.webp`} alt="small-1" height={285} width={200} /> */}
                  <img src={`${process.env.NEXT_PUBLIC_URL}/assets/img/h/4cats/small-2.webp`} alt="small-1" />

                  <div className="bannerbox">
                    <h4 className="bannerbox__title banner-bottom-title text-white">
                      <Link href="/shop">50% Offer On</Link>
                    </h4>
                    <span className="bannerbox__subtitle banner-bottom-bg mb-130">
                      Intensive <Link href="/shop">Gloves</Link>
                    </span>
                    <div className="bannerbox__btn">
                      <Link className="tp-btn banner-animation mr-25" href="/collections">
                        Shop Now
                        <i className="fal fa-long-arrow-right" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-none d-md-block col-lg-4 col-md-12">
                <div className="banneritem banner-animation p-relative">
                  <img src={`${process.env.NEXT_PUBLIC_URL}/assets/img/h/4cats/big-2.webp`} alt="big-1" />

                  <div className="bannerbox">
                    <span className="bannerbox__subtitle banner-right-bg mb-200">Featured Sports Product</span>
                    <div className="bannerbox__btn">
                      <Link className="tp-btn banner-animation mr-25" href="/collections">
                        Shop Now
                        <i className="fal fa-long-arrow-right" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
