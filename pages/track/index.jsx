import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import ImageLoader from "~/components/UI/Common/ImageLoader"
import ClientLayout from "~/components/UI/Layouts/ClientLayout"
import { checkPercentage, dateFormat, fetchData } from "~/lib/clientFunctions";


const Track = () => {

  const orderId = useRef("");
  const [orderData, setOrderData] = useState(null);
  const settings = useSelector((state) => state.settings);
  const currencySymbol = settings.settingsData.currency.symbol;

  const decimalBalance = (num) => Math.round(num * 10) / 10;

  const trackOrder = async () => {
    try {
      const id = orderId.current?.value?.trim();
      if (id.length > 0) {
        const response = await fetchData(`/api/home/order-track?id=${id}`);
        if (response.order) {
          setOrderData(response.order);
        } else {
          toast.error("Invalid Reference");
        }
      }
    } catch (err) {
      toast.error(err.message);
    }
  };


  return (
    <ClientLayout>
      <section className="track-area pt-80 pb-80">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-sm-12">
              <div className="tptrack__product">

                <div className="tptrack__content grey-bg-3">
                  <div className="tptrack__item d-flex mb-20">
                    <div className="tptrack__item-icon">
                      <img src="/assets/img/icon/track-1.png" alt="" />
                    </div>
                    <div className="tptrack__item-content">
                      <h4 className="tptrack__item-title">Track Your Order</h4>
                      <p>To track your order please enter your Order ID in the box below and press the Track button. This was  given to you on your receipt and in the confirmation email you should have received.</p>
                    </div>
                  </div>
                  <div className="tptrack__id mb-10">
                    <form >
                      <span><i className="fal fa-address-card" /></span>
                      <input ref={orderId} type="text" placeholder="Your order refrence no" />
                    </form>
                  </div>

                  <div className="tptrack__btn">
                    <button onClick={trackOrder} className="tptrack__submition">Track Now<i className="fal fa-long-arrow-right" /></button>
                  </div>
                </div>
              </div>
            </div>



          </div>


          {orderData && <div className="row justify-content-center mt-5">
            <div className="col-lg-6 col-sm-12">
              <div className="tptrack__product">
                <div className="tptrack__content grey-bg-3">
                  {/* {JSON.stringify(orderData)} */}
                  <h6><strong>Order Details</strong></h6>
                  <hr />


                  <div className="row">
                    <div className="col-md-12 col-sm-12 ">
                      <div className="d-flex flex-column gap-2 tptrack__item-content" style={{ fontSize: "16px" }}>
                        <span className="tptrack__item-title">
                          Details
                        </span>

                        <span>Order Id: {orderData?.orderId} </span>
                        <span>Order Date: {dateFormat(orderData?.orderDate)}</span>
                        <span>Payment Status:  {orderData?.paymentStatus === "Unpaid" ? (
                          <span className="badge bg-danger">Unpaid</span>
                        ) : (
                          <span className="badge bg-success">Paid</span>
                        )}
                        </span>
                        <span>Order Status: {orderData?.status}</span>
                        <span>Payment Method: {orderData?.paymentMethod} </span>
                      </div>

                      <div className="d-flex flex-column gap-2 tptrack__item-content mt-15" style={{ fontSize: "16px" }}>
                        <span className="tptrack__item-title">
                          Delivery Information
                        </span>

                        <span> Delivery Type: {orderData?.deliveryInfo?.type} </span>
                        {orderData?.deliveryInfo?.area && (
                          <span>
                            Delivery Area: {orderData?.deliveryInfo?.area}
                          </span>
                        )}

                        <span> Delivery Cost : {currencySymbol + orderData?.deliveryInfo?.cost}</span>
                      </div>


                      <div className="table-responsive mt-15">
                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <th scope="col">#</th>
                              <th scope="col">Products</th>
                              <th scope="col">Quantity</th>
                              <th scope="col">Price</th>
                            </tr>
                          </thead>
                          <tbody>
                            {orderData?.products?.map((product, idx) => (
                              <tr key={idx + product._id}>
                                <th scope="row">{idx + 1}</th>
                                <td>{product.name}</td>
                                <td>{product.qty}</td>
                                <td>{currencySymbol + product.price}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      <div className="d-flex flex-column gap-2 mt-15" style={{ fontSize: "16px" }}>
                        <div className="d-flex justify-content-between align-items-center">
                          <span>Sub Total</span>
                          <span>{currencySymbol + orderData?.totalPrice}</span>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                          <span>Discount</span>
                          <span>{currencySymbol + decimalBalance(checkPercentage(orderData?.totalPrice, orderData?.coupon?.discount || 0))}</span>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                          <span>Delivery Charge</span>
                          <span>{currencySymbol + orderData?.deliveryInfo.cost}</span>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                          <span>Vat</span>
                          <span>
                            {currencySymbol}
                            {decimalBalance(orderData?.vat || 0)}
                          </span>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                          <span>Tax</span>
                          <span>
                            {currencySymbol}
                            {decimalBalance(orderData?.tax || 0)}
                          </span>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                          <span>Total</span>
                          <span>{currencySymbol + orderData?.payAmount}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          }
        </div>
      </section>
    </ClientLayout>
  )
}

export default Track