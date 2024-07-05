import Link from "next/link"

const SmallTopHeader = () => {

  return (
    <div className="header-top theme-bg-2 red-header-top">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 d-none  d-lg-block">
            <div className="headertoplag ">
              <div className="menu-top-social">
                <Link href="/about">About Us</Link>
                <Link href="/sign-in">My account</Link>
                <Link href="/wishlist">Wishlist </Link>
                <Link href="/track">Order Tracking</Link>
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
  )

}

export default SmallTopHeader