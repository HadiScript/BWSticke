import Link from "next/link"

const SmallTopHeader = () => {

  return (
    <div className="header-top theme-bg-2 red-header-top" >
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-12">
            <div className="header-welcome-text text-center">
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