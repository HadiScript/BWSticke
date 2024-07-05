import PaymentGatewayList from "./PaymentGatewayList"

const CheckoutForms = (
  {
    handleInfoSubmit,
    infoForm,
    deliveryTypeJsx,
    billingInfoJsx,
    sameShippingAddressValue,
    shippingInfoJsx,
    visibleTab,
    selectPaymentMethod,
    submitOrder,
    settings,
  }
) => {
  return (
    <div className="col-lg-6 col-md-12">
      <div className="checkbox-form">
        <h3>Billing Details</h3>
        <div className="row">
          <div className="col-md-12">

            <form
              className={""}
              onSubmit={handleInfoSubmit}
              ref={infoForm}
              style={{ display: visibleTab === 1 ? "block" : "none" }}
            >
              <div className={""}>{deliveryTypeJsx()}</div>
              <div className={""}>
                {billingInfoJsx()}
                {!sameShippingAddressValue && shippingInfoJsx()}
                <button type="submit">Continue</button>
              </div>
            </form>

          </div>
        </div>
      </div>

      <div
        className={'checkbox-form'}
        style={{ display: visibleTab === 2 ? "block" : "none" }}
      >
        <div className={""}>
          <PaymentGatewayList
            selectPaymentMethod={selectPaymentMethod}
            submitOrder={submitOrder}
            settings={settings.settingsData.paymentGateway}
          />
        </div>
      </div>

    </div>
  )
}
export default CheckoutForms