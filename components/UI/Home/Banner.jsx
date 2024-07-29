
import Link from "next/link";

const Banner = () => {
  return (
    <section className="banner-area pt-100 pb-95">
      <div className="container">
        <div className="row g-0">
          <div className="col-lg-4 col-md-4">
            <div className="banneritem__thumb banner-animation text-center p-relative">
              <img src="/imgs/banner/1.webp" alt="" />
              <div className="banneritem__content">
                <Link href="/shop-2">
                  <i className="far fa-long-arrow-right" />
                </Link>
                <p>Top Category</p>
                <h4 className="banneritem__content-tiele">
                  <Link href="/shop" className="text-white">New Added</Link>
                </h4>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-4">
            <div className="banneritem__thumb banner-animation text-center p-relative">
              <img src="/imgs/banner/2.webp" alt="" />
              <div className="banneritem__content">
                <Link href="/shop-2">
                  <i className="far fa-long-arrow-right" />
                </Link>
                <p>13 Items</p>
                <h4 className="banneritem__content-tiele">
                  <Link href="/shop" className="text-white">New Added</Link>
                </h4>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-4">
            <div className="banneritem__thumb banner-animation text-center p-relative">
              <img src="/imgs/banner/3.jpg" alt="" />
              <div className="banneritem__content">
                <Link href="/shop-2">
                  <i className="far fa-long-arrow-right" />
                </Link>
                <p>13 Items</p>
                <h4 className="banneritem__content-tiele">
                  <Link href="/shop" className="text-white">New Added</Link>
                </h4>
              </div>
            </div>
          </div>


        </div>
      </div>
    </section>
  )
}
export default Banner