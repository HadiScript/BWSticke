"use client";
import Link from "next/link";
import ImageLoader from "../Common/ImageLoader";
// import { useDispatch, useSelector } from "react-redux";
// import { addQty, deleteCart } from "@/features/shopSlice";

const CartItems = ({ cart, increaseQty, decreaseQty, decimalBalance, removeFromCart, dispatch }) => {


  // const dispatch = useDispatch();

  // delete cart item
  const deleteCartHandler = (id) => {
    // dispatch(deleteCart(id));
  };

  // qty handler
  const qtyHandler = (id, qty) => {
    // dispatch(addQty({ id, qty }));
  };

  return (
    <>
      {/* {JSON.stringify(cart)} */}
      {cart?.items?.map((item) => (
        <tr className="cart-item" key={item.id}>
          <td className="product-thumbnail">
            <div className="d-flex flex-wrap align-items-center justify-content-center gap-5">
              <ImageLoader
                src={`${process.env.NEXT_PUBLIC_URL}/imgs/products/9.jpg`}
                // src={item.image[0]?.url}
                height={90}
                width={90}
                alt={item.name}
                className={"rounded"}
              />
              <div className="d-flex flex-column align-items-start">
                <span className="product-name">{item?.name}, { }</span>
                <b className="product-price">${item?.price}</b>
              </div>
            </div>
          </td>

          {/* <td className="product-name">
            <Link href={`/shop/${item.id}`}>{item.title}</Link>
          </td> */}

          {/* <td className="product-price">${item.price.max}</td> */}

          <td className="d-flex justify-content-center align-items-center gap-2 py-5">
            <span className="p-2 rounded-3  border"> ${item.qty}</span>
            <span className="mx-3" />
            <span role="button" className="p-2 rounded-3  border" onClick={() => increaseQty(item.uid)}>+</span>
            <span role="button" className="p-2 rounded-3  border" onClick={() => decreaseQty(item.uid)}>-</span>
            <span role="button" className="p-2 rounded-3  border product-subtotal" onClick={() => dispatch(removeFromCart(item.uid))}>remove</span>
          </td>

          <td className="product-subtotal">
            <span className="amount">${decimalBalance(item.qty * item.price)}</span>
          </td>

          {/* <td className="product-remove">
            <button onClick={() => deleteCartHandler(item?.id)} className="remove">
              <span className="flaticon-dustbin">Remove</span>
            </button>
          </td> */}
        </tr>
      ))}
    </>
  );
};

export default CartItems;
