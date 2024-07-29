import { Button, Divider, Modal, Rate, Tag } from "antd";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { checkPercentage, dateFormat, postData } from "~/lib/clientFunctions";
import RefundForm from "./RefundForm";
// import classes from "~/styles/orderTrack.module.css";
// import LoadingButton from "../Ui/Button";
// import StarRating from "../Ui/Rating/ratingInput";
// import cls from "./purchaseDetails.module.css";
// import { useTranslation } from "react-i18next";
// import RefundForm from "./refundForm";


const ProductReviewComponent = ({ data, open, setOpen, update }) => {
  const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];
  const [rating, setRating] = useState(1);
  const [loading, setLoading] = useState("");
  const comment = useRef();
  async function postReview(e) {
    try {
      e.preventDefault();
      setLoading("loading");
      const _data = {
        pid: data.id,
        oid: data.oid,
        rating,
        comment: comment.current.value.trim(),
      };
      const resp = await postData("/api/review", _data);
      resp.success
        ? (toast.success("Review Added Successfully"), setOpen(false), update())
        : toast.error("Something Went Wrong 500");
    } catch (err) {
      console.log(err);
      toast.error(`Something Went Wrong - ${err.message}`);
    }
    setLoading("");
  }

  return (
    <Modal open={open} onCancel={() => setOpen(false)} footer={null} centered>
      <b> {data.name}</b>
      <Divider />
      <Rate tooltips={desc} onChange={setRating} value={rating} />
      <div className="my-3">
        <label className="form-label">Comment</label>
        <textarea className="form-control" ref={comment} required></textarea>
      </div>
      <Button className="myBtn-black" loading={loading} onClick={postReview}>Submit</Button>
    </Modal>
  )
}




const PurchaseDetails = ({ open, oncancel, data, update }) => {

  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({
    id: null,
    name: null,
    oid: null,
  });
  const [refundDrawer, setrefundDrawer] = useState(false)
  const [selectedRefund, setSelectedRefund] = useState({
    product: {},
    oid: null,
  });

  const settings = useSelector((state) => state.settings);
  const currencySymbol = settings.settingsData.currency.symbol;
  const decimalBalance = (num) => Math.round(num * 10) / 10;

  const [productReviewModel, setproductReviewModel] = useState(false)
  const product_review = (id, name, oid) => {
    setSelectedProduct({ id, name, oid });
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <Modal footer={null} width={750} open={open} onCancel={oncancel} centered>
      <div className="card border-0">
        <div className="card-header bg-white py-3 fw-bold">Order Details - {data.orderId}</div>
        <div className="card-body">

          <div className="row">
            <div className="col-md-6">

              <div className="my-2">Order Id: <b>{data.orderId}</b></div>
              <div className="my-2">Order Date: <b>{dateFormat(data.orderDate)}</b></div>
              <div className="my-2">Payment Status: {data.paymentStatus === "Unpaid" ? (
                <Tag color="red">Unpaid</Tag>
              ) : (
                <Tag color="green">Paid</Tag>
              )}</div>
              <div className="my-2">Order Status: <Tag color="blue">{data.status}</Tag></div>
              <div className="my-2">Payment Method: <b>{data.paymentMethod}</b></div>


            </div>

            <div className="col-md-6">
              <div className="my-2">Delivery Type: <b>{data.deliveryInfo.type}</b></div>
              {data.deliveryInfo.area && (
                <div className="my-2">Delivery Area: <b>{data.deliveryInfo.area}</b></div>
              )}
              <div className="my-2">Delivery Cost: <b>{currencySymbol + data.deliveryInfo.cost}</b></div>


            </div>
          </div>

          <div className="table-responsive mt-4">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Products</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Price</th>
                  <th scope="col">Review</th>
                </tr>
              </thead>
              <tbody>
                {data.products.map((product, idx) => (
                  <tr key={idx + product._id}>
                    <th scope="row">{idx + 1}</th>
                    <td>{product.name}</td>
                    <td>{product.qty}</td>
                    <td>{currencySymbol + product.price}</td>
                    <td>
                      {data.status === "Delivered" ? (
                        <div className="d-flex flex-column gap-3 align-items-start">
                          <Button
                            className={""}
                            onClick={() => {
                              setproductReviewModel(true)
                              product_review(product._id, product.name, data.orderId)
                            }}
                            disabled={product.review ? true : false}
                          >
                            {product.review ? "reviewed" : "Review"}
                          </Button>
                          <Button
                            className={""}
                            onClick={() => {
                              setrefundDrawer(true)
                              setSelectedRefund({
                                product,
                                oid: data.orderId,
                              })
                            }}
                            disabled={product.refundRequest ? true : false}
                          >
                            {product.refundRequest ? "Refund requested" : "Refund request"}
                          </Button>
                        </div>
                      ) : (
                        "Not Delivered Yet"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4">
            <div className="d-flex justify-content-between align-items-center border-bottom pb-2">
              <span>Sub Total</span>
              <span><b>{currencySymbol + data.totalPrice}</b> </span>
            </div>

            <div className="d-flex justify-content-between align-items-center border-bottom pb-2">
              <span>Discount</span>
              <span><b>{currencySymbol + decimalBalance(checkPercentage(data.totalPrice, data.coupon?.discount || 0))}</b> </span>
            </div>

            <div className="d-flex justify-content-between align-items-center border-bottom pb-2">
              <span>Delivery Charge</span>
              <span><b>{currencySymbol + data.deliveryInfo.cost}</b> </span>
            </div>

            <div className="d-flex justify-content-between align-items-center border-bottom pb-2">
              <span>Vat</span>
              <span><b>
                {currencySymbol}
                {decimalBalance(data.vat)}
              </b> </span>
            </div>

            <div className="d-flex justify-content-between align-items-center border-bottom pb-2">
              <span>Tax</span>
              <span><b>
                {currencySymbol}
                {decimalBalance(data.tax)}
              </b> </span>
            </div>

            <div className="d-flex justify-content-between align-items-center border-bottom pb-2">
              <span>Total</span>
              <span><b>
                {currencySymbol + data.payAmount}
              </b> </span>
            </div>


          </div>


        </div>
      </div>

      <RefundForm
        data={selectedRefund}
        orderData={data}
        update={update}
        refundDrawer={refundDrawer}
        setrefundDrawer={setrefundDrawer}
        close={() => setSelectedRefund({ product: {}, oid: null })}
      />

      <ProductReviewComponent
        data={selectedProduct}
        open={productReviewModel}
        setOpen={setproductReviewModel}
        update={update}
        close={() => setSelectedRefund({ product: {}, oid: null })}

      />

    </Modal>
  )
}
export default PurchaseDetails