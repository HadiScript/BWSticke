import ImageLoader from "../Common/ImageLoader";


const PaymentGatewayList = ({ selectPaymentMethod, submitOrder, settings }) => {

  return (
    <div>
      <h6>Select a payment method :</h6>
      <div className={""}>
        {settings.cod && (
          <label className={""}>
            <input
              type="radio"
              name="payment_method"
              value="cod"
              defaultChecked
              onChange={selectPaymentMethod}
            />
            <div className={""}>
              <ImageLoader
                src={`${process.env.NEXT_PUBLIC_URL}/images/cash-on-del-logo.png`}
                width={100}
                height={50}
                alt="Cash On Delivery"
              />
              <span>Cash On Delivery</span>
            </div>
          </label>
        )}
        {settings.paypal && (
          <label className={""}>
            <input
              type="radio"
              name="payment_method"
              value="paypal"
              onChange={selectPaymentMethod}
            />
            <div className={""}>
              <ImageLoader
                src={`${process.env.NEXT_PUBLIC_URL}/images/paypal-logo.png`}
                width={100}
                height={50}
                alt="Paypal"
              />
              <span>Paypal</span>
            </div>
          </label>
        )}
        {settings.stripe && (
          <label className={""}>
            <input
              type="radio"
              name="payment_method"
              value="stripe"
              onChange={selectPaymentMethod}
            />
            <div className={""}>
              <ImageLoader
                src={`${process.env.NEXT_PUBLIC_URL}/images/stripe-logo.png`}
                width={100}
                height={50}
                alt="Stripe"
              />
              <span>Stripe</span>
            </div>
          </label>
        )}
        {settings.sslCommerz && (
          <label className={classes.payment_card_label}>
            <input
              type="radio"
              name="payment_method"
              value="sslcommerz"
              onChange={selectPaymentMethod}
            />
            <div className={classes.payment_card}>
              <ImageLoader
                src={`${process.env.NEXT_PUBLIC_URL}/images/ssl-logo.png`}
                width={100}
                height={50}
                alt="Sslcommerz"
              />
              <span>Sslcommerz</span>
            </div>
          </label>
        )}
        {settings.razorpay && (
          <label className={classes.payment_card_label}>
            <input
              type="radio"
              name="payment_method"
              value="razorpay"
              onChange={selectPaymentMethod}
            />
            <div className={classes.payment_card}>
              <ImageLoader
                src={`${process.env.NEXT_PUBLIC_URL}/images/razorpay-logo.png`}
                width="100"
                height="50"
                alt="Razorpay"
              />
              <span>Razorpay</span>
            </div>
          </label>
        )}
        <button className="my-3" onClick={submitOrder}>
          Complete Order
        </button>
      </div>
    </div>
  );
};

export default PaymentGatewayList;
