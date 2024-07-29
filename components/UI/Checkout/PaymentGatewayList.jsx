import ImageLoader from "../Common/ImageLoader";


const PaymentGatewayList = ({ selectPaymentMethod, submitOrder, settings }) => {

  return (
    <div>
      <h6>Select a payment method :</h6>
      <div className={"d-flex flex-wrap gap-3"}>
        {settings.cod && (
          <>
            <input
              name="payment_method"
              value="cod"
              defaultChecked
              onChange={selectPaymentMethod}

              type="radio"
              className="btn-check"
              id="success-outlined"
              autocomplete="off"
            />
            <label className="btn btn-outline-success" for="success-outlined">
              <div className="d-flex align-items-center gap-3">
                <ImageLoader
                  src={`${process.env.NEXT_PUBLIC_URL}/images/cash-on-del-logo.png`}
                  width={100}
                  height={50}
                  alt="Cash On Delivery"
                />
                <span>Cash On Delivery</span>
              </div>
            </label>
          </>
        )}

        {settings.paypal && (
          <>
            <input

              name="payment_method"
              value="paypal"
              onChange={selectPaymentMethod}
              type="radio" className="btn-check"
              id="danger-outlined"
              autocomplete="off"
            />
            <label className="btn btn-outline-success" for="danger-outlined">
              <div className="d-flex align-items-center gap-3">
                <ImageLoader
                  src={`${process.env.NEXT_PUBLIC_URL}/images/paypal-logo.png`}
                  width={100}
                  height={50}
                  alt="Paypal"
                />
                <span>Paypal</span>
              </div>
            </label>

          </>
        )}

        {settings.stripe && (
          <>
            <input

              name="payment_method"
              value="stripe"
              onChange={selectPaymentMethod}
              type="radio" className="btn-check"
              id="danger-outlined"
              autocomplete="off"
            />
            <label className="btn btn-outline-success" for="danger-outlined">
              <div className="d-flex align-items-center gap-3">
                <ImageLoader
                  src={`${process.env.NEXT_PUBLIC_URL}/images/stripe-logo.png`}
                  width={100}
                  height={50}
                  alt="Stripe"
                />
                <span>Stripe</span>
              </div>
            </label>

          </>
        )}

        {settings.sslCommerz && (
          <>
            <input

              name="payment_method"
              value="sslcommerz"
              onChange={selectPaymentMethod}
              type="radio" className="btn-check"
              id="danger-outlined"
              autocomplete="off"
            />
            <label className="btn btn-outline-success" for="danger-outlined">
              <div className="d-flex align-items-center gap-3">
                <ImageLoader
                  src={`${process.env.NEXT_PUBLIC_URL}/images/ssl-logo.png`}
                  width={100}
                  height={50}
                  alt="Sslcommerz"
                />
                <span>Sslcommerz</span>
              </div>
            </label>

          </>
        )}


        {settings.sslCommerz && (
          <>
            <input

              name="payment_method"
              value="razorpay"
              onChange={selectPaymentMethod}
              type="radio" className="btn-check"
              id="danger-outlined"
              autocomplete="off"
            />
            <label className="btn btn-outline-success" for="danger-outlined">
              <div className="d-flex align-items-center gap-3">
                <ImageLoader
                  src={`${process.env.NEXT_PUBLIC_URL}/images/razorpay-logo.png`}
                  width="100"
                  height="50"
                  alt="Razorpay"
                />
                <span>Razorpay</span>
              </div>
            </label>

          </>
        )}
      </div>

      <div className="order-button-payment mt-20">
        <button type="submit" className="tp-btn tp-color-btn w-100 banner-animation" onClick={submitOrder}>
          Continue
        </button>
      </div>
      
    </div>
  );
};

export default PaymentGatewayList;
