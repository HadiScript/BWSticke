"use client";
import { Fragment, useState } from "react";
import products from "../../../data/products";
import InfiniteScroll from "react-infinite-scroll-component";
import ShopCard from "../Common/ShopChard";
import Link from "next/link";
// import ShopCard from "./ShopCard";
// import ShopCardList from "./ShopCardList";

const   CollectionsList = ({ items, data_length, loadMore }) => {


  return (
    <>
      <div className="product-filter-content mb-40">
        <div className="row align-items-center">
          <div className="col-sm-6">
            <div className="product-item-count">
              <span>
                <b>{data_length}</b> Item On List
              </span>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="product-navtabs d-flex justify-content-end align-items-center">
              <div className="tp-shop-selector">
                {/* {price?.min !== 0 ||
                  price?.max !== 100 ||
                  category?.length !== 0 ||
                  color?.length !== 0 ||
                  brand?.length !== 0 ||
                  sort !== "" ||
                  perPage.start !== 0 ||
                  perPage.end !== 0 ? (
                  <button
                    onClick={clearAll}
                    className="btn btn-danger text-nowrap me-2"
                    style={{ minHeight: "45px", marginBottom: "15px" }}
                  >
                    Clear All
                  </button>
                ) : undefined} */}

                {/* <select className="chosen-single form-select" >
                  <option value="">Sort by (default)</option>
                  <option value="asc">Newest</option>
                  <option value="des">Oldest</option>
                </select> */}

                {/* <select className="chosen-single form-select ms-3 " >
                  <option
                    value={JSON.stringify({
                      start: 0,
                      end: 0,
                    })}
                  >
                    All
                  </option>
                  <option
                    value={JSON.stringify({
                      start: 0,
                      end: 10,
                    })}
                  >
                    10 per page
                  </option>
                  <option
                    value={JSON.stringify({
                      start: 0,
                      end: 20,
                    })}
                  >
                    20 per page
                  </option>
                  <option
                    value={JSON.stringify({
                      start: 0,
                      end: 30,
                    })}
                  >
                    30 per page
                  </option>
                </select> */}
              </div>
              <div className="tpproductnav tpnavbar product-filter-nav">
                {/* <nav>
                  <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <button className={activeIndex == 1 ? "nav-link active" : "nav-link"} onClick={() => handleOnClick(1)}>
                      <i className="fal fa-list-ul" />
                    </button>
                    <button className={activeIndex == 2 ? "nav-link active" : "nav-link"} onClick={() => handleOnClick(2)}>
                      <i className="fal fa-th" />
                    </button>
                  </div>
                </nav> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mb-50">
        <div className="col-lg-12">
          <div className="tab-content" id="nav-tabContent">
            <InfiniteScroll
              style={{ overflowX: "hidden", overflowY: "hidden" }}
              dataLength={items.length}
              next={loadMore}
              hasMore={items.length >= data_length ? false : true}
              loader={<p>Please wait...</p>}
              endMessage={<div className="text-center mt-120"><small >Nothing more to show</small></div>}
            >

              <div className="tab-pane fade show active">

                <div className="row row-cols-xxl-4 row-cols-xl-4 row-cols-lg-3 row-cols-md-3 row-cols-sm-2 row-cols-1 tpproduct">
                  {items.map((data) => (
                    <ShopCard key={data._id} product={data} button={true} />
                  ))}
                </div>
              </div>

            </InfiniteScroll >

          </div>
        </div>
      </div >
    </>
  );
};

export default CollectionsList;
