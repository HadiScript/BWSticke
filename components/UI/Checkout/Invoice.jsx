import { useSelector } from "react-redux";
import { checkPercentage, decimalBalance } from "~/lib/clientFunctions"

const Invoice = ({ data }) => {

  const settings = useSelector((state) => state.settings);
  const currencySymbol = settings.settingsData.currency.symbol;
  return (
    <div className="checkbox-form mt-20">

      <div className="d-flex flex-column align-items-center border-bottom gap-3">
        <h1>Logo</h1>

        <h4>We have received your order</h4>
        <h6>
          Order no# {data.orderId}
        </h6>
      </div>



      <div className={"my-4"}>
        <h5 className="mb-3">Delivery Details</h5>
        <div className="row">
          <div className="col-md-6">
            <div className="d-flex align-items-center gap-2">
              <p style={{ fontSize: "17px" }}><b>Delivery for:</b></p>
              <p style={{ fontSize: "16px" }}>{data.billingInfo.fullName}</p>
            </div>
            <div className="d-flex align-items-center gap-2">
              <p style={{ fontSize: "17px" }}><b>Phone:</b></p>
              <p style={{ fontSize: "16px" }}>{data.billingInfo.phone}</p>
            </div>
            <div className="d-flex flex-column justify-content-center ">
              <p style={{ fontSize: "17px" }}><b>Address:</b></p>
              <p style={{ fontSize: "15px" }}>{`${data.billingInfo.house} ${data.billingInfo.state} ${data.billingInfo.zipCode} ${data.billingInfo.country}`}</p>
            </div>
          </div>


          <div className="col-md-6">
            <div className="d-flex align-items-center gap-2">
              <p style={{ fontSize: "17px" }}><b>Delivery type:</b></p>
              <p style={{ fontSize: "16px" }}>{data.deliveryInfo.type}</p>
            </div>

            <div className="d-flex align-items-center gap-2">
              <p style={{ fontSize: "17px" }}><b>Payment method:</b></p>
              <p style={{ fontSize: "16px" }}>{data.paymentMethod}</p>
            </div>
          </div>
        </div>
        <h5 className="mb-3 mt-5">Delivery Details</h5>
        <div className={"d-flex flex-column gap-2"}>
          {data.products.map((item, index) => (
            <div className={"d-flex flex-column border-bottom pb-3"} key={index}>
              <b style={{ fontSize: "17px" }}>{item.name}</b>
              {
                item.color.name && <span className="d-flex align-items-center gap-2">
                  <b style={{ fontSize: "15px" }}>Color:</b>
                  <span style={{ fontSize: "14px" }}>{item.color.name}</span>
                </span>
              }
              {
                item.attribute.name && <span className="d-flex align-items-center gap-2">
                  <span style={{ fontSize: "15px" }}><b>{item.attribute.for}:</b></span>
                  <span style={{ fontSize: "14px" }}>{item.attribute.name}</span>
                </span>
              }

              {
                <span className="d-flex align-items-center gap-2">
                  <span style={{ fontSize: "15px" }}><b>Qty:</b></span>
                  <span style={{ fontSize: "14px" }}>{item.qty}</span>
                </span>
              }

              {
                <span className="d-flex align-items-center gap-2">
                  <span style={{ fontSize: "15px" }}><b>Price:</b></span>
                  <span style={{ fontSize: "14px" }}>{currencySymbol} {item.price}</span>
                </span>
              }

            </div>

          ))}
        </div>


        <div className={"mt-4"}>
          <div className="d-flex justify-content-between mb-1">
            <span style={{ fontSize: "17px" }}>Sub total</span>
            <span style={{ fontSize: "16px" }}>
              {currencySymbol}
              {decimalBalance(data.totalPrice)}
            </span>
          </div>

          <div className="d-flex justify-content-between mb-1">
            <span style={{ fontSize: "17px" }}>Discount</span>
            <span style={{ fontSize: "16px" }}>
              {currencySymbol}
              {decimalBalance(checkPercentage(data.totalPrice, data.coupon?.discount || 0))}
            </span>
          </div>

          <div className="d-flex justify-content-between mb-1">
            <span style={{ fontSize: "17px" }}>Delivery charge</span>
            <span style={{ fontSize: "16px" }}>
              {currencySymbol}
              {data.deliveryInfo.cost}
            </span>
          </div>

          <div className="d-flex justify-content-between mb-1">
            <span style={{ fontSize: "17px" }}>Vat</span>
            <span style={{ fontSize: "16px" }}>
              {currencySymbol}
              {decimalBalance(data.vat)}
            </span>
          </div>

          <div className="d-flex justify-content-between mb-1">
            <span style={{ fontSize: "17px" }}>Tax</span>
            <span style={{ fontSize: "16px" }}>
              {currencySymbol}
              {decimalBalance(data.tax)}
            </span>
          </div>

          <div className="d-flex justify-content-between mb-1">
            <span style={{ fontSize: "17px" }}><b>Total</b></span>
            <span style={{ fontSize: "16px" }}>
              {currencySymbol}
              {decimalBalance(data.payAmount)}
            </span>
          </div>

        </div>
      </div>

    </div >
  )
}

export default Invoice