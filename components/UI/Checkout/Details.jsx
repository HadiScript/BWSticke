import { decimalBalance } from "~/lib/clientFunctions"



const Details = ({
  cartData,
  currencySymbol,
  getTotalPrice,

  getTotalTax,
  getTotalVat,
  discountPrice,
  deliveryInfo,
  finalPrice,


}) => {
  let isActive = {
    key: 1
  }

  return (
    <div className="col-lg-6 col-md-12">
      <div className="your-order mb-30 ">
        <h3>Your order</h3>
        <div className="your-order-table table-responsive">
          <table>
            <thead>
              <tr>
                <th className="product-name">Product</th>
                <th className="product-total">Total</th>
              </tr>
            </thead>
            <tbody>

              {cartData.items.map((item, index) => (
                <tr className="cart_item" key={index + 1}>
                  <td className="product-name">
                    <div className="d-flex flex-column">
                      <div>
                        <b>{item.name}</b>  × {item.qty}
                      </div>
                      <div>
                        {item.color.name && (
                          <span>Color: {item.color.name}</span>
                        )}
                        {item.attribute.name && (
                          <span>{`${item.attribute.for}: ${item.attribute.name}`}</span>
                        )}
                      </div>
                    </div>

                  </td>
                  <td className="product-total">
                    {currencySymbol}
                    {decimalBalance(item.price)}
                  </td>
                </tr>
              ))}


            </tbody>
            <tfoot>
              <tr className="cart-subtotal">
                <th>Subtotal</th>
                <td>
                  <span className="amount">
                    {currencySymbol}
                    {decimalBalance(getTotalPrice)}
                  </span>
                </td>
              </tr>
              <tr className="shipping">
                <th>Tax</th>
                <td>
                  <span className="amount">
                    {currencySymbol}
                    {decimalBalance(getTotalTax)}
                  </span>
                </td>
              </tr>
              <tr className="shipping">
                <th>Vat</th>
                <td>
                  <span className="amount">
                    {currencySymbol}
                    {decimalBalance(getTotalVat)}
                  </span>
                </td>
              </tr>

              <tr className="shipping">
                <th>Discount</th>
                <td>
                  <span className="amount">
                    {currencySymbol}
                    {decimalBalance(discountPrice)}
                  </span>
                </td>
              </tr>

              <tr className="shipping">
                <th>Delivery Charges</th>
                <td>
                  <span className="amount">
                    {currencySymbol}
                    {decimalBalance(deliveryInfo.cost || 0)}
                  </span>
                </td>
              </tr>

              <tr>
                <th><strong>
                  Total
                </strong></th>
                <td>
                  <span>
                    {currencySymbol}
                    {decimalBalance(finalPrice)}
                  </span>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

      </div>
    </div>
  )
}

export default Details