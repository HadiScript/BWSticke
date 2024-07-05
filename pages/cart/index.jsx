import Link from "next/link"
import { useRouter } from "next/router";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { checkPercentage, postData } from "~/lib/clientFunctions";
import { applyCoupon, decrementQuantity, incrementQuantity, removeFromCart } from "~/redux/cart.slice";


import CartItems from "~/components/UI/Cart/Items"
import ClientLayout from "~/components/UI/Layouts/ClientLayout"

const Cart = () => {

  const total = 100;

  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const router = useRouter();
  const settings = useSelector((state) => state.settings);
  const { session } = useSelector((state) => state.localSession);

  const decimalBalance = (num) => Math.round(num * 10) / 10;
  const getTotalPrice = decimalBalance(cart.items.reduce((accumulator, item) => accumulator + item.qty * item.price, 0));

  const discountPrice = decimalBalance((cart.coupon.discount / 100) * getTotalPrice);

  const getTotalVat = decimalBalance(
    cart.items.reduce((accumulator, item) => accumulator + checkPercentage(item.qty * item.price, item.vat), 0)
  );

  const getTotalTax = decimalBalance(
    cart.items.reduce((accumulator, item) => accumulator + checkPercentage(item.qty * item.price, item.tax), 0)
  );

  const finalPrice = getTotalPrice + getTotalVat + getTotalTax - discountPrice;
  const checkMaxQty = (uid) => {
    const product = cart.items.find((item) => item.uid === uid);
    if (product && product.quantity === -1) {
      return true;
    }
    return product && product.quantity >= product.qty + 1;
  };

  const increaseQty = (uid) => {
    if (checkMaxQty(uid)) {
      dispatch(incrementQuantity(uid));
    } else {
      toast.error("This item is out of stock!");
    }
  };

  const decreaseQty = (uid) => {
    dispatch(decrementQuantity(uid));
  };


  const checkoutProcess = () => {
    if (settings.settingsData.security.loginForPurchase && !session) {
      toast.info("Please Login To Continue");
      return router.push("/sign-in");
    } else {
      return router.push("/checkout");
    }
  };

  return (
    <ClientLayout>
      <section className="cart-area pt-80 pb-80 wow fadeInUp" data-wow-duration=".8s" data-wow-delay=".2s">
        <div className="container">
          <div className="col-lg-6 col-md-6">
            <div className="tpsection mb-20">
              <h4 className="tpsection__title">
                Your {" "}
                <span>
                  Cart <img src="/assets/img/icon/title-shape-01.jpg" alt="" />
                </span>
              </h4>
            </div>
          </div>

          <div className="row">
            <div className="col-12 col-lg-12 mt-3">
              <div className="table-content table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th >Product</th>
                      {/* <th >Unit Price</th> */}
                      <th >Quantity</th>
                      <th >Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <CartItems
                      cart={cart}
                      getTotalPrice={getTotalPrice}
                      increaseQty={increaseQty}
                      decreaseQty={decreaseQty}
                      decimalBalance={decimalBalance}
                      removeFromCart={removeFromCart}
                      dispatch={dispatch}
                    />
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-12 col-lg-4 mt-3">
              <div className="cart-page-total">

                <ul className="mb-20">
                  <li>
                    Subtotal <span>${decimalBalance(getTotalPrice)}</span>
                  </li>
                  <li>
                    Total <span>${decimalBalance(getTotalPrice)}</span>
                  </li>
                </ul>
                <div onClick={checkoutProcess}>
                  <Link href="#" className="tp-btn tp-color-btn banner-animation">
                    Proceed to Checkout
                  </Link>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </ClientLayout>
  )
}

export default Cart