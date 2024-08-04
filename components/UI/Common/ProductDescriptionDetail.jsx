import Link from 'next/link'
import React from 'react'
import ProductQ_A from './Product_QnA'

const ProductDescriptionDetail = ({ activeIndex, handleOnClick, product, postQuestion, question, refreshData }) => {
  return (
    <div className="product-details-area">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="tpproduct-details__navtab mb-60">
              {/* {JSON.stringify(product)} */}

              {/* BUTTONs */}
              <div className="tpproduct-details__nav mb-30">
                <ul className="nav nav-tabs pro-details-nav-btn" id="myTabs" role="tablist">
                  <li className="nav-item" onClick={() => handleOnClick(1)}>
                    <button className={activeIndex == 1 ? "nav-links active" : "nav-links"}>Description</button>
                  </li>
                  <li className="nav-item" onClick={() => handleOnClick(3)}>
                    <button className={activeIndex == 3 ? "nav-links active" : "nav-links"}>Reviews ({product?.review?.length})</button>
                  </li>
                  <li className="nav-item" onClick={() => handleOnClick(2)}>
                    <button className={activeIndex == 2 ? "nav-links active" : "nav-links"}>Q/A ({product?.question?.length})</button>
                  </li>
                </ul>
              </div>

              {/* DESCRIPTION */}
              <div className="tab-content tp-content-tab" id="myTabContent-2">
                <div className={activeIndex == 1 ? "tab-para tab-pane fade show active" : "tab-para tab-pane fade"}>
                  {product.description && product.description.length > 0 ?

                    <p className="mb-30" dangerouslySetInnerHTML={{
                      __html: product?.description,
                    }}>
                    </p>
                    :
                    <p className="mb-30" >This product has no description
                    </p>
                  }

                </div>

                {/* ADDITIONAL INFO */}
                <div className={activeIndex == 2 ? "tab-pane fade show active" : "tab-pane fade"}>
                  <ProductQ_A
                    product={product}
                    question={question}
                    postQuestion={postQuestion}
                    refreshData={refreshData}

                  />
                  {/* <div className="product__details-info table-responsive">
                    <table className="table table-striped">
                      <tbody>
                        <tr>
                          <td className="add-info">Weight</td>
                          <td className="add-info-list"> 2 lbs</td>
                        </tr>
                        <tr>
                          <td className="add-info">Dimensions</td>
                          <td className="add-info-list"> 12 × 16 × 19 in</td>
                        </tr>
                        <tr>
                          <td className="add-info">Product</td>
                          <td className="add-info-list"> Purchase this product on rag-bone.com</td>
                        </tr>
                        <tr>
                          <td className="add-info">Color</td>
                          <td className="add-info-list"> Gray, Black</td>
                        </tr>
                        <tr>
                          <td className="add-info">Size</td>
                          <td className="add-info-list"> S, M, L, XL</td>
                        </tr>
                        <tr>
                          <td className="add-info">Model</td>
                          <td className="add-info-list"> Model </td>
                        </tr>
                        <tr>
                          <td className="add-info">Shipping</td>
                          <td className="add-info-list"> Standard shipping: $5,95L</td>
                        </tr>
                        <tr>
                          <td className="add-info">Care Info</td>
                          <td className="add-info-list"> Machine Wash up to 40ºC/86ºF Gentle Cycle</td>
                        </tr>
                        <tr>
                          <td className="add-info">Brand</td>
                          <td className="add-info-list"> Kazen</td>
                        </tr>
                      </tbody>
                    </table>
                  </div> */}
                </div>


                <div className={activeIndex == 3 ? "tab-pane fade show active" : "tab-pane fade"}>
                  <div className="product-details-review">
                    <h3 className="tp-comments-title mb-35">{product?.review?.length} reviews for “{product?.name}”</h3>
                    <div className="latest-comments mb-55">
                      <ul>

                        {product.review && product.review.length > 0 ? (
                          <>
                            <li>
                              <div className="comments-box d-flex">
                                {/* <div className="comments-avatar mr-25">
                              <img src="/assets/img/shop/reviewer-01.png" alt="" />
                            </div> */}
                                <div className="comments-text">
                                  <div className="comments-top d-sm-flex align-items-start justify-content-between mb-5">
                                    <div className="avatar-name">
                                      <b>Siarhei Dzenisenka</b>
                                      <div className="comments-date mb-20">
                                        <span>March 27, 2018 9:51 am</span>
                                      </div>
                                    </div>
                                    <div className="user-rating">
                                      <ul>
                                        <li>
                                          <Link href="#">
                                            <i className="fas fa-star" />
                                          </Link>
                                        </li>
                                        <li>
                                          <Link href="#">
                                            <i className="fas fa-star" />
                                          </Link>
                                        </li>
                                        <li>
                                          <Link href="#">
                                            <i className="fas fa-star" />
                                          </Link>
                                        </li>
                                        <li>
                                          <Link href="#">
                                            <i className="fas fa-star" />
                                          </Link>
                                        </li>
                                        <li>
                                          <Link href="#">
                                            <i className="fal fa-star" />
                                          </Link>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                  <p className="m-0">
                                    This is cardigan is a comfortable warm classic piece. Great to layer with a light top and you can
                                    dress up or down given the jewel buttons. Im 68 128lbs a 34A and the Small fit fine.
                                  </p>
                                </div>
                              </div>
                            </li>

                          </>
                        ) : (
                          <p>This product has no reviews yet</p>
                        )}


                      </ul>
                    </div>

                    {/* ADD REVIEWS */}
                    {/* <div className="product-details-comment">
                      <div className="comment-title mb-20">
                        <h3>Add a review</h3>
                        <p>Your email address will not be published. Required fields are marked*</p>
                      </div>
                      <div className="comment-rating mb-20 d-flex">
                        <span>Overall ratings</span>
                        <ul>
                          <li>
                            <Link href="#">
                              <i className="fas fa-star" />
                            </Link>
                          </li>
                          <li>
                            <Link href="#">
                              <i className="fas fa-star" />
                            </Link>
                          </li>
                          <li>
                            <Link href="#">
                              <i className="fas fa-star" />
                            </Link>
                          </li>
                          <li>
                            <Link href="#">
                              <i className="fas fa-star" />
                            </Link>
                          </li>
                          <li>
                            <Link href="#">
                              <i className="fal fa-star" />
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div className="comment-input-box">
                        <form action="#">
                          <div className="row">
                            <div className="col-xxl-12">
                              <div className="comment-input">
                                <textarea placeholder="Your review..." />
                              </div>
                            </div>
                            <div className="col-xxl-6">
                              <div className="comment-input">
                                <input type="text" placeholder="Your Name*" />
                              </div>
                            </div>
                            <div className="col-xxl-6">
                              <div className="comment-input">
                                <input type="email" placeholder="Your Email*" />
                              </div>
                            </div>
                            <div className="col-xxl-12">
                              <div className="comment-submit">
                                <button type="submit" className="tp-btn pro-submit">
                                  Submit
                                </button>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDescriptionDetail