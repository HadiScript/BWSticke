
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import useSWR from "swr";
import ImageLoader from "~/components/UI/Common/ImageLoader";
import ClientLayout from "~/components/UI/Layouts/ClientLayout";
import { deleteData, fetchData } from "~/lib/clientFunctions";
import { updateWishlist } from "~/redux/cart.slice";



const Wishlist = () => {
  const { session } = useSelector((state) => state.localSession);
  const ID = session?.user?.id;
  const url = `/api/profile?id=${ID}&scope=favorite`;


  const { data, error, mutate } = useSWR(ID ? url : null, fetchData);
  const [wishlist, setWishlist] = useState([]);

  const { wishlist: wishlistState } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    if (data && data.user) {
      setWishlist(data.user.favorite);
    }
  }, [data]);




  function updateWishlistCount() {
    const __data = wishlistState && wishlistState > 0 ? wishlistState - 1 : 0;
    dispatch(updateWishlist(__data));
  }

  const removeFromWishlist = async (pid) => {
    try {
      const data = {
        pid,
        id: session?.user?.id,
      };
      const response = await deleteData(`/api/wishlist`, data);
      response.success
        ? (toast.success("Item has been removed from your wishlist"),
          mutate(),
          updateWishlistCount())
        : toast.error("Something went wrong (500)");
    } catch (err) {
      toast.error(err.message);
    }
  };



  // console.log(wishlist)
  return (
    <ClientLayout>

      <section className="cart-area pt-80 pb-80 wow fadeInUp" data-wow-duration=".8s" data-wow-delay=".2s">
        <div className="container">
          <div className="col-lg-6 col-md-6">
            <div className="tpsection mb-20">
              <h4 className="tpsection__title">
                Your {" "}
                <span>
                  Wishlist <img src="/assets/img/icon/title-shape-01.jpg" alt="" />
                </span>
              </h4>
            </div>
          </div>

          <div className="row">
            <div className="col-12 col-lg-12 mt-3">
              <div className="table-content table-responsive">
                <form action="#">
                  <div className="table-content table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th className="product-thumbnail">Images</th>
                          <th className="cart-product-name">Name</th>
                          <th className="product-price">Unit Price</th>

                          <th className="product-add-to-cart">Detail</th>
                          <th className="product-remove">Remove</th>
                        </tr>
                      </thead>
                      <tbody>

                        {wishlist?.map((item) => (
                          <tr className="cart-item" key={item.id}>
                            <td className="product-thumbnail">
                              <Link href={`/product/${item?.name}}`}>
                                <ImageLoader src={item?.image[0]?.url} height={90} width={90} alt={item.name} />
                                {/* <img src={`/assets/img/product/${item.imgf}`} alt="cart added product" /> */}
                              </Link>
                            </td>

                            <td className="product-name">
                              <Link href={`/product/${item?.name}`}>{item?.name}</Link>
                            </td>




                            <td className="product-subtotal">
                              <span className="amount">${item?.price}</span>
                            </td>
                            <td className="product-add-to-cart">
                              <Link href={`/product/${item?.name}}`} className="tp-btn tp-color-btn  tp-wish-cart banner-animation">
                                Detail
                              </Link>
                            </td>
                            <td className="product-remove">
                              <button onClick={() => removeFromWishlist(item?._id)} className="remove">
                                <span className="flaticon-dustbin">Remove</span>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    {wishlist.length === 0 && <p className="text-center mt-5 p-3">You have no items on your wishlist</p>}
                    {/* {!session && <p className="text-center mt-5 p-3">You </p>} */}
                  </div>
                </form>
              </div>
            </div>

          </div>

        </div>
      </section>

    </ClientLayout>
  )
}

export default Wishlist