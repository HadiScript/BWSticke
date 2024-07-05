// simplest Card
import Link from "next/link";
import ImageLoader from "./ImageLoader";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { postData, stockInfo } from "~/lib/clientFunctions";


// import ReviewCount from "~/components/Review/count";
import { updateComparelist, updateWishlist } from "~/redux/cart.slice";



const ShopCard = ({ product, addToCart, addToWishlist }) => {


  const { session } = useSelector((state) => state.localSession);
  const { wishlist: wishlistState, compare: compareState } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const discountInPercent = Math.round((100 - (product.discount * 100) / product.price) * 10) / 10;

  function updateWishlistCount() {
    const __data = wishlistState ? wishlistState + 1 : 1;
    dispatch(updateWishlist(__data));
  }

  const addToWishList = async () => {
    try {
      if (!session) {
        return toast.warning("You need to login to create a Wishlist");
      }
      const data = {
        pid: product._id,
        id: session.user.id,
      };
      const response = await postData(`/api/wishlist`, data);
      response.success
        ? (toast.success("Item has been added to wishlist"), updateWishlistCount())
        : response.exists
          ? toast.warning("This Item already exists on your wishlist")
          : toast.error("Something went wrong (500)");
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  const addToCompareList = () => {
    const pid = product._id;
    const exists = compareState.find((x) => x === pid);
    if (exists) {
      toast.warning("This Item already exists on your compare list");
    } else {
      const __data = [...compareState, product._id];
      dispatch(updateComparelist(__data));
      toast.success("Item has been added to compare list");
    }
  };

  // const itemLink = link ? link : `/gallery?slug=${product.slug}`;
  // const ItemLayout = layout ? layout : "col-lg-3 col-md-4 col-6";


  return (
    <>
      <div className="tpratingitem tpproduct text-center">
        <div className="tpproduct__thumb p-relative">
          <Link href={`/shop/$`}>
            <ImageLoader
              src={`${process.env.NEXT_PUBLIC_URL}/imgs/products/8.jpg`}
              // src={product.image[0]?.url}
              alt={product.name}
              width={300}
              height={200}
              style={{ width: "100%", height: "auto" }}
              quality={100}
            />
          </Link>
          <div className="tpproduct__thumb-action">
            <Link href="#" onClick={() => addToCart(item.id)}>
              <i className="fal fa-shopping-basket" />
            </Link>
            <Link className="quckview" href="#">
              <i className="fal fa-eye" />
            </Link>
            <Link onClick={addToWishList} className="wishlist" href={'/collections'}>
              <i className="fal fa-heart" />
            </Link>
          </div>
        </div>
        <div className="tpratingitem__content">
          <h4 className="tpratingitem__title mb-5">
            {" "}
            <Link href={`/product/${product?.slug}`}>{product?.name}</Link>
          </h4>
          <span>$31.00</span>
          <div className="tpratingitem__star mt-5">
            <i className="fas fa-star" />
            <i className="fas fa-star" />
            <i className="fas fa-star" />
            <i className="fas fa-star" />
            <i className="far fa-star" />
            <span>81 Reviews</span>
          </div>
        </div>
      </div>
      {/* <div className="tpproduct tpproductitem mb-15 p-relative">
        <div className="tpproduct__thumb">
          <div className="tpproduct__thumbitem p-relative">
            <Link href={`/shop/${product.id}`}>
              <ImageLoader
                src={`${process.env.NEXT_PUBLIC_URL}/imgs/products/8.jpg`}
                // src={product.image[0]?.url}
                alt={product.name}
                width={300}
                height={200}
                style={{ width: "100%", height: "auto" }}
                quality={100}
              />
              <ImageLoader
                src={product.image[1]?.url}
                alt={product.name}
                width={200}
                height={200}
                className="thumbitem-secondary"
                style={{ width: "100%", height: "auto" }}
                quality={100}
              />
            </Link>
            <div className="tpproduct__thumb-bg">
              <div className="tpproductactionbg">
                <a onClick={() => addToCart(product.id)} className="add-to-cart">
                  <i className="fal fa-shopping-basket" />
                </a>
                <Link href="#">
                  <i className="fal fa-exchange" />
                </Link>
                <Link href="#">
                  <i className="fal fa-eye" />
                </Link>
                <a onClick={addToWishList} className="wishlist">
                  <i className="fal fa-heart" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="tpproduct__content-area">
          <h3 className="tpproduct__title mb-5">
            <Link href={`/shop/${product.id}`}>{product.title}</Link>
          </h3>
          <div className="tpproduct__priceinfo p-relative">
            <div className="tpproduct__ammount">
              <span>${product.price.max}.00</span>
            </div>
          </div>
        </div>
        <div className="tpproduct__ratingarea">
          <div className="d-flex align-items-center justify-content-between">
            <div className="tpproductdot">
              <Link className="tpproductdot__variationitem" href={`/shop/${product.id}`}>
                <div className="tpproductdot__termshape">
                  <span className="tpproductdot__termshape-bg" />
                  <span className="tpproductdot__termshape-border" />
                </div>
              </Link>
              <Link className="tpproductdot__variationitem" href={`/shop/${product.id}`}>
                <div className="tpproductdot__termshape">
                  <span className="tpproductdot__termshape-bg red-product-bg" />
                  <span className="tpproductdot__termshape-border red-product-border" />
                </div>
              </Link>
              <Link className="tpproductdot__variationitem" href={`/shop/${product.id}`}>
                <div className="tpproductdot__termshape">
                  <span className="tpproductdot__termshape-bg orange-product-bg" />
                  <span className="tpproductdot__termshape-border orange-product-border" />
                </div>
              </Link>
              <Link className="tpproductdot__variationitem" href={`/shop/${product.id}`}>
                <div className="tpproductdot__termshape">
                  <span className="tpproductdot__termshape-bg purple-product-bg" />
                  <span className="tpproductdot__termshape-border purple-product-border" />
                </div>
              </Link>
            </div>
            <div className="tpproduct__rating">
              <ul>
                <li>
                  <Link href="#">
                    <i className="fas fa-star" />
                  </Link>
                  <Link href="#">
                    <i className="fas fa-star" />
                  </Link>
                  <Link href="#">
                    <i className="fas fa-star" />
                  </Link>
                  <Link href="#">
                    <i className="fas fa-star" />
                  </Link>
                  <Link href="#">
                    <i className="far fa-star" />
                  </Link>
                </li>
                <li>
                  <span>(81)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default ShopCard;
