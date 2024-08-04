import Link from "next/link"
import ImageLoader from "./ImageLoader";

const MainProductDetail = ({ handleOnClick2, activeIndex2, product, addItemToCart, changeColor, stepUpQty, stepDownQty, quantityAmount }) => {

  return (
    <section className="product-area pt-80 pb-25">
      <div className="container">
        <div className="row">
          <div className="col-lg-5 col-md-12">
            <div className="tpproduct-details__nab pr-50 mb-40">
              <div className="d-flex align-items-start">
                <div className="nav flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                  {product?.gallery?.map((item, index) => <button key={index} className={activeIndex2 == index ? "nav-link active" : "nav-link"} onClick={() => handleOnClick2(index)}>
                    {/* <img src="/assets/img/product/product-1.jpg" alt="" /> */}
                    <ImageLoader
                      src={`${process.env.NEXT_PUBLIC_URL}/imgs/products/9.jpg`}
                      // src={item.image[0]?.url}
                      // height={90}
                      // width={90}
                      alt={item.name}
                      className={"rounded"}
                    />
                  </button>
                  )}
                </div>
                <div className="tab-content" id="v-pills-tabContent">
                  {product?.gallery?.map((item, index) => <div key={index} className={activeIndex2 == index ? "tab-pane fade show active" : "tab-pane fade"}>
                    <ImageLoader
                      src={`${process.env.NEXT_PUBLIC_URL}/imgs/products/9.jpg`}
                      // src={item.image[0]?.url}
                      height={500}
                      width={500}
                      alt={item.name}
                      className={"rounded"}
                    />
                    {/* <img src="/assets/img/product/product-1.jpg" alt="" /> */}
                    {/* item.url */}
                  </div>
                  )}
                  {/* <div className={activeIndex2 == 4 ? "tab-pane fade show active" : "tab-pane fade"}>
                    <img src="/assets/img/product/product-1.jpg" alt="" />
                  </div>
                  <div className={activeIndex2 == 5 ? "tab-pane fade show active" : "tab-pane fade"}>
                    <img src="/assets/img/product/product-2.jpg" alt="" />
                  </div>
                  <div className={activeIndex2 == 6 ? "tab-pane fade show active" : "tab-pane fade"}>
                    <img src="/assets/img/product/product-3.jpg" alt="" />
                  </div> */}
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-5 col-md-7">
            <div className="tpproduct-details__content">
              <div className="tpproduct-details__tag-area d-flex align-items-center mb-5">
                <span className="tpproduct-details__tag">{product?.bestSelling ? "Best Selling" : product?.trending && "Trending"}</span>
                <div className="tpproduct-details__rating">
                  <Link href="#">
                    <i className="fas fa-star" />
                  </Link>
                  <Link href="#">
                    <i className="fas fa-star" />
                  </Link>
                  <Link href="#">
                    <i className="fas fa-star" />
                  </Link>
                </div>
                <a className="tpproduct-details__reviewers">{product?.review?.length} Reviews</a>
              </div>
              <div className="tpproduct-details__title-area d-flex align-items-center flex-wrap mb-5">
                <h3 className="tpproduct-details__title">{product?.name}</h3>
                <span className="tpproduct-details__stock">{product?.quantity > 0 ? "In Stock" : "Out of Stock"}</span>
              </div>
              <div className="tpproduct-details__price mb-30">
                <del>${product?.price}</del>
                <span>${product?.price}</span>
              </div>
              <div className="tpproduct-details__pera">
                <p style={{ maxWidth: "400px" }}>
                  {product?.shortDescription}
                </p>
              </div>
              <div className="tpproduct-details__count d-flex align-items-center flex-wrap mb-25">
                <div className="tpproduct-details__quantity">
                  <span onClick={stepDownQty} className="cart-minus">
                    <i className="far fa-minus" />
                  </span>

                  <input
                    // className="tp-cart-input text-center"
                    ref={quantityAmount}
                    min="1"
                    max={product.quantity === -1 ? 100000 : product.quantity}
                    defaultValue="1"
                    type="number"
                    disabled
                  />
                  <span onClick={stepUpQty} className="cart-plus">
                    <i className="far fa-plus" />
                  </span>
                </div>
                <div className="tpproduct-details__cart ml-20">
                  <button onClick={() => addItemToCart()}>
                    <i className="fal fa-shopping-cart" /> Add To Cart
                  </button>
                </div>
                {/* <div className="tpproduct-details__wishlist ml-20">
                  <Link href="#">
                    <i className="fal fa-heart" />
                  </Link>
                </div> */}
              </div>

              {/* COLORS */}
              <div className="tpproductdot mb-30">

                {product?.colors?.map((color, i) => (
                  <Link className="tpproductdot__variationitem" href="#" key={i} onClick={() => changeColor(color)} title={color.name}>
                    <div className="tpproductdot__termshape">
                      <span className="tpproductdot__termshape-bg" />
                      <span className="tpproductdot__termshape-border" />
                    </div>
                  </Link>
                ))}
              </div>


              <div className="tpproduct-details__information tpproduct-details__code">
                <p>SKU:</p>
                <span>{product?.sku}</span>
              </div>
              <div className="tpproduct-details__information tpproduct-details__categories">
                <p>Categories:</p>
                {product?.categories?.map((x, index) => <span key={index + 1}>
                  <Link className="text-capitalize" href="#">{x},</Link>
                </span>)}

              </div>
              <div className="tpproduct-details__information tpproduct-details__tags">
                <p>Sub Categories:</p>
                {product?.subcategories
                  ?.map((x, index) => <span key={index + 1}>
                    <Link className="text-capitalize" href="#">{x},</Link>
                  </span>)}
              </div>
              {/* <div className="tpproduct-details__information tpproduct-details__social">
                <p>Share:</p>
                <Link href="#">
                  <i className="fab fa-facebook-f" />
                </Link>
                <Link href="#">
                  <i className="fab fa-twitter" />
                </Link>
                <Link href="#">
                  <i className="fab fa-behance" />
                </Link>
                <Link href="#">
                  <i className="fab fa-youtube" />
                </Link>
                <Link href="#">
                  <i className="fab fa-linkedin" />
                </Link>
              </div> */}
            </div>
          </div>
          <div className="col-lg-2 col-md-5">
            <div className="tpproduct-details__condation">
              <ul>
                <li>
                  <div className="tpproduct-details__condation-item d-flex align-items-center">
                    <div className="tpproduct-details__condation-thumb">
                      <img src="/assets/img/icon/product-det-1.png" alt="" className="tpproduct-details__img-hover" />
                    </div>
                    <div className="tpproduct-details__condation-text">
                      <p>
                        Free Shipping apply to all
                        <br />
                        orders over $100
                      </p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="tpproduct-details__condation-item d-flex align-items-center">
                    <div className="tpproduct-details__condation-thumb">
                      <img src="/assets/img/icon/product-det-2.png" alt="" className="tpproduct-details__img-hover" />
                    </div>
                    <div className="tpproduct-details__condation-text">
                      <p>
                        Guranteed 100% Organic
                        <br />
                        from natural farmas
                      </p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="tpproduct-details__condation-item d-flex align-items-center">
                    <div className="tpproduct-details__condation-thumb">
                      <img src="/assets/img/icon/product-det-3.png" alt="" className="tpproduct-details__img-hover" />
                    </div>
                    <div className="tpproduct-details__condation-text">
                      <p>
                        1 Day Returns if you change
                        <br />
                        your mind
                      </p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="tpproduct-details__condation-item d-flex align-items-center">
                    <div className="tpproduct-details__condation-thumb">
                      <img src="/assets/img/icon/product-det-4.png" alt="" className="tpproduct-details__img-hover" />
                    </div>
                    <div className="tpproduct-details__condation-text">
                      <p>
                        Covid-19 Info: We keep
                        <br />
                        delivering.
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
export default MainProductDetail