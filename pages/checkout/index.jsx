import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import AddAddress from "~/components/ClientProfile/AddAddress";
import CheckoutForms from "~/components/UI/Checkout/CheckoutForms";
import Details from "~/components/UI/Checkout/Details";

import { checkPercentage, fetchData, postData } from "~/lib/clientFunctions";
import { applyCoupon, resetCart, updateBillingData } from "~/redux/cart.slice";
// import SignIn from "~/components/Auth/signin";


const ClientLayout = dynamic(() => import("~/components/UI/Layouts/ClientLayout"))


const Checkout = () => {


  const cartData = useSelector((state) => state.cart);
  const settings = useSelector((state) => state.settings);
  const currencySymbol = settings.settingsData.currency.symbol;
  const dispatch = useDispatch();
  const router = useRouter();
  const couponCode = useRef("");
  const { session, status } = useSelector((state) => state.localSession);
  const [visibleTab, setVisibleTab] = useState(1);
  const [changeTab, setChangeTab] = useState(false);
  const [sameShippingAddressValue, setSameShippingAddressValue] =
    useState(false);
  const [deliveryInfo, setDeliveryInfo] = useState({});
  const [shippingChargeInfo, setShippingChargeInfo] = useState({});
  const [newCustomer, setNewCustomer] = useState(false);
  const [_address, _setAddress] = useState([]);
  const [addressId, setAddressId] = useState("");
  const [shippingId, setShippingId] = useState("");
  const [hasMainAddress, setHasMainAddress] = useState(false);
  const [preInfo, setPreInfo] = useState({
    billingInfo: {},
    shippingInfo: {},
  });
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const deliveryLocation = useRef();
  const deliveryArea = useRef();
  const infoForm = useRef();

  useEffect(() => {
    if (status === "unauthenticated") {
      return router.push('/sign-in')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  async function fetchShippingCharge() {
    try {
      const response = await fetchData(`/api/home/shipping`);
      if (response.success) {
        setShippingChargeInfo(response.shippingCharge);
      } else {
        toast.error("something went wrong");
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function fetchAddress() {
    try {
      const response = await fetchData(`/api/profile/address`);
      if (response.success && response.user?.address) {
        _setAddress(response.user.address);
        const resp = response.user.address.find(
          (e) => e.addressType === "main address"
        );
        if (resp) {
          const {
            name,
            email,
            phone,
            house,
            city,
            state,
            zipCode,
            country,
            addressTitle,
          } = resp;
          const data = {
            fullName: name,
            phone,
            email,
            house,
            city,
            state,
            zipCode,
            country,
            addressTitle,
          };
          const preData = {
            billingInfo: data,
            shippingInfo: data,
          };
          setPreInfo(preData);
          setAddressId(resp._id);
          setShippingId(resp._id);
          setHasMainAddress(true);
        }
      } else {
        const { billingInfo, shippingInfo } = cartData;
        setPreInfo({ billingInfo, shippingInfo });
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchShippingCharge();
    fetchAddress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sameShippingAddress = (e) => {
    const isChecked = e.target.checked;
    setSameShippingAddressValue(isChecked);
    let preData = { ...preInfo };
    preData.shippingInfo = preData.billingInfo;
    setPreInfo(preData);
    setShippingId(addressId);
  };

  function selectInfo(id, type) {
    const resp = _address.find((e) => e._id === id);
    if (resp) {
      const {
        name,
        email,
        phone,
        house,
        city,
        state,
        zipCode,
        country,
        addressTitle,
      } = resp;
      const data = {
        fullName: name,
        phone,
        email,
        house,
        city,
        state,
        zipCode,
        country,
        addressTitle,
      };
      let preData = { ...preInfo };
      preData[type === "billing_address" ? "billingInfo" : "shippingInfo"] =
        data;
      setPreInfo(preData);
      type === "billing_address"
        ? setAddressId(resp._id)
        : setShippingId(resp._id);
    }
  }

  const handleInfoSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!deliveryInfo.cost && !deliveryInfo.area) {
        return toast.warning("Please Update The Delivery Information");
      }
      if (!preInfo.billingInfo?.fullName && !preInfo.shippingInfo?.fullName) {
        return toast.warning("Please Update The Billing Information");
      }

      dispatch(
        updateBillingData({
          billingInfo: preInfo.billingInfo,
          shippingInfo: preInfo.shippingInfo,
          deliveryInfo,
        })
      );
      setVisibleTab(2);
      setChangeTab(true);
    } catch (err) {
      console.log(err);
    }
  };

  const setDeliveryLocation = () => {
    const loc = deliveryLocation.current.value;
    if (loc.length > 0) {
      if (loc === "International Delivery") {
        const deliveryData = {
          type: "International Delivery",
          cost: shippingChargeInfo.internationalCost,
          area: null,
        };
        setDeliveryInfo(deliveryData);
      } else {
        const deliveryData = {
          type: "Local Delivery",
          cost: 0,
          area: null,
        };
        setDeliveryInfo(deliveryData);
      }
    }
  };

  const setDeliveryArea = () => {
    const area = deliveryArea.current.value;
    const areaInfo = shippingChargeInfo.area.filter((item) =>
      area.includes(item._id)
    );
    if (area.length > 0) {
      const deliveryData = {
        type: "Local Delivery",
        cost: areaInfo[0]?.price,
        area: areaInfo[0]?.name,
      };
      setDeliveryInfo(deliveryData);
    }
  };

  const decimalBalance = (num) => Math.round(num * 10) / 10;

  const selectPaymentMethod = (e) => setPaymentMethod(e.target.value);

  const getTotalPrice = decimalBalance(
    cartData.items.reduce(
      (accumulator, item) => accumulator + item.qty * item.price,
      0
    )
  );

  const discountPrice = (cartData.coupon.discount / 100) * getTotalPrice;

  const getTotalVat = decimalBalance(
    cartData.items.reduce(
      (accumulator, item) =>
        accumulator + checkPercentage(item.qty * item.price, item.vat),
      0
    )
  );

  const getTotalTax = decimalBalance(
    cartData.items.reduce(
      (accumulator, item) =>
        accumulator + checkPercentage(item.qty * item.price, item.tax),
      0
    )
  );

  const finalPrice =
    getTotalPrice +
    getTotalVat +
    getTotalTax +
    (deliveryInfo.cost || 0) -
    discountPrice;

  async function processOrder(method) {
    const data = {
      coupon: cartData.coupon,
      products: cartData.items,
      billingInfo: preInfo.billingInfo,
      shippingInfo: preInfo.shippingInfo,
      deliveryInfo,
      paymentData: {
        method: method,
        id: null,
      },
    };
    const url = `/api/order/new`;
    const formData = new FormData();
    formData.append("checkoutData", JSON.stringify(data));
    const response = await postData(url, formData);
    response && response.success
      ? (dispatch(resetCart()),
        toast.success("Order successfully placed"),
        router.push(`/checkout/success/${response.createdOrder._id}`))
      : toast.error(response.message || "Something Went Wrong (500)");
  }

  const submitOrder = async () => {
    try {
      if (cartData.items.length === 0) {
        return toast.warning("Your Cart Is Empty");
      }
      if (!deliveryInfo.cost && !deliveryInfo.area) {
        return toast.warning("Please Update The Delivery Information");
      }
      if (!preInfo.billingInfo?.fullName && !preInfo.shippingInfo?.fullName) {
        return toast.warning("Please Update The Billing Information");
      }
      if (paymentMethod === "cod") {
        await processOrder("Cash On Delivery");
      } else if (paymentMethod === "wallet") {
        await processOrder("Wallet");
      } else {
        router.push(`/checkout/${paymentMethod}`);
      }
    } catch (err) {
      toast.error(`Something Went Wrong ${err}`);
      console.log(err);
    }
  };

  function deliveryTypeJsx() {
    return (
      <div>
        <div className="mb-3">
          <div className={"checkbox-form"}>
            <h5>Select Delivery Type*</h5>
            <select
              className="form-control mb-3"
              defaultValue=""
              onChange={setDeliveryLocation}
              ref={deliveryLocation}
            >
              <option value="" disabled>
                Select Delivery Type*
              </option>
              <option value="International Delivery">
                International Delivery
              </option>
              <option value="Local Delivery">Local Delivery</option>
            </select>
            {deliveryInfo.type && deliveryInfo.type === "Local Delivery" && (
              <div>
                <label>Select Delivery Area*</label>
                <select
                  className="form-control mb-3"
                  defaultValue=""
                  onChange={setDeliveryArea}
                  ref={deliveryArea}
                >
                  <option value="" disabled>
                    Select delivery area*
                  </option>
                  {shippingChargeInfo.area.map((ct, idx) => (
                    <option value={ct._id} key={idx}>
                      {ct.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <ClientLayout>

      <section className="checkout-area pt-80  pb-50 wow fadeInUp" data-wow-duration=".8s" data-wow-delay=".2s">
        <div className="container">
          {/* <form action="#"> */}
          <div className="row">
            <CheckoutForms
              handleInfoSubmit={handleInfoSubmit}
              infoForm={infoForm}
              deliveryTypeJsx={deliveryTypeJsx}
              billingInfoJsx={billingInfoJsx}
              sameShippingAddressValue={sameShippingAddressValue}
              shippingInfoJsx={shippingInfoJsx}
              visibleTab={visibleTab}
              selectPaymentMethod={selectPaymentMethod}
              submitOrder={submitOrder}
              settings={settings}

            />

            <Details />

          </div>
        </div>
      </section>


    </ClientLayout>
  )


  function billingInfoJsx() {
    return (
      <div className="mt-50 border rounded-2 px-4">
        {session && (
          <div className="d-flex justify-content-end ">
            <button
              className={""}
              onClick={() => setNewCustomer(true)}
              type="button"
            >
              Add Address
            </button>
          </div>
        )}
        <div className="mb-3">
          <div className="checkbox-form">
            <h5 className={""}>Billing Info</h5>
          </div>
          <div className={"d-flex flex-wrap gap-2"}>
            {_address.map((x, i) => (
              <label className={"d-flex flex-column gap-2 align-items-start border rounded-3 p-3"} style={{ width: "200px" }} key={i}>
                <input
                  type="radio"
                  name="billing_address"
                  value={x._id}
                  defaultChecked={x._id === addressId}
                  onChange={() => selectInfo(x._id, "billing_address")}
                />
                <div
                  className={``}
                >
                  <small style={{ fontSize: "13px" }}>{x.name}</small>
                  <small style={{ fontSize: "13px" }}>{x.phone}</small>
                  <small style={{ fontSize: "13px" }}>{`${x.house} ${x.state} ${x.zipCode} ${x.country}`}</small>
                  <br />
                  {x.addressType === "main address" && (
                    <small className="text-primary">default</small>
                  )}
                </div>
              </label>
            ))}
          </div>
          <div className="py-2 mt-4 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="Check1"
              onClick={sameShippingAddress}
            />
            <label className="form-check-label" htmlFor="Check1">
              Shipping address same as billing address
            </label>
          </div>
        </div>

        <AddAddress open={newCustomer} setOpen={setNewCustomer} />
      </div>
    );
  }



  function shippingInfoJsx() {
    return (
      <div className="mt-50 border rounded-2 px-4 py-3">
        <div className="mb-3">
          <h5>Shipping Info</h5>
          <div className={""}>
            {_address.map((x, i) => (
              <label className={""} key={i}>
                <input
                  type="radio"
                  name="shipping_address"
                  value={x._id}
                  defaultChecked={x._id === shippingId}
                  onChange={() => selectInfo(x._id, "shipping_address")}
                />
                <div
                  className={``}
                >
                  <span>{x.name}</span>
                  <span>{x.phone}</span>
                  <span>{`${x.house} ${x.state} ${x.zipCode} ${x.country}`}</span>
                  {x.addressType === "main address" && (
                    <div className="badge bg-primary">default</div>
                  )}
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>
    );
  }

}

export default Checkout