import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { wrapper } from "~/redux/store";

import { _simpleProductCart, _variableProductCart } from "~/lib/cartHandle"
import { postData, setSettingsData, stockInfo } from "~/lib/clientFunctions";
import productDetailsData from '~/lib/dataLoader/productDetails'

const MainProductDetail = dynamic(() => import("~/components/UI/Common/MainProductDetail"));
const ProductDescriptionDetail = dynamic(() => import("~/components/UI/Common/ProductDescriptionDetail"));

const TopProducts = dynamic(() => import("~/components/UI/Home/TopProducts"))

const Error404 = dynamic(() => import("~/components/error/404"));
const Error500 = dynamic(() => import("~/components/error/500"));
const ClientLayout = dynamic(() => import("~/components/UI/Layouts/ClientLayout"));
// const HeadData = dynamic(() => import("~/components/Head"));


const ProductDetail = ({ data, error }) => {

  const [activeIndex2, setActiveIndex2] = useState(0);
  const handleOnClick2 = (index) => {
    setActiveIndex2(index);
  };

  const [activeIndex, setActiveIndex] = useState(1);
  const handleOnClick = (index) => {
    setActiveIndex(index);
  };


  const [selectedColor, setSelectedColor] = useState({
    name: null,
    value: null,
  });
  const [selectedAttribute, setSelectedAttribute] = useState({
    name: null,
    value: null,
    for: null,
  });
  const { session } = useSelector((state) => state.localSession);
  const [price, setPrice] = useState(0);

  const dispatch = useDispatch();
  const quantityAmount = useRef();
  const question = useRef();
  const cartData = useSelector((state) => state.cart);
  const router = useRouter();
  const relatedItem =
    data.related &&
    data.related.filter((obj) => {
      return obj._id !== data.product._id;
    });


  useEffect(() => {
    if (data && data.product) {
      setPrice(data.product.discount);
      if (data.product.type !== "variable") {
        return;
      }
      if (data.product.colors && data.product.colors.length > 0) {
        setSelectedColor({
          name: data.product.colors[0]?.label,
          value: data.product.colors[0]?.value,
        });
      }
      if (data.product.attributes && data.product.attributes.length > 0) {
        setSelectedAttribute({
          name: data.product.attributes[0]?.label,
          value: data.product.attributes[0]?.value,
          for: data.product.attributes[0]?.for,
        });
      }
    }
  }, [data]);

  const checkVariantInfo = (color, attr) => {
    const colorName = color || selectedColor.name;
    const attrName = attr || selectedAttribute.name;
    return data.product.variants.find((item) => item.color === colorName && item.attr === attrName);
  };

  const stepUpQty = () => {
    quantityAmount.current.stepUp();
  };

  const stepDownQty = () => {
    quantityAmount.current.stepDown();
  };

  const updatePrice = (color, attr) => {
    const variantData = checkVariantInfo(color, attr);
    if (variantData && variantData.price) {
      const itemPrice = data.product.discount + Number(variantData.price);
      setPrice(itemPrice);
      // selectPreviewImage(variantData);
    }
  };

  const changeColor = (e) => {
    try {
      const value = {
        name: e.label,
        value: e.value,
      };
      setSelectedColor(value);
      updatePrice(value.name, null);
    } catch (err) {
      console.log(err);
    }
  };

  const changeVariant = (e) => {
    try {
      const value = {
        name: e.label,
        value: e.value,
        for: e.for,
      };
      setSelectedAttribute(value);
      updatePrice(null, value.name);
    } catch (err) {
      console.log(err);
    }
  };


  const simpleProductCart = _simpleProductCart(data, cartData, price, dispatch);

  const checkQty = (prevQty, currentQty, availableQty) => {
    const avQty = Number(availableQty);
    if (avQty === -1) {
      return true;
    } else {
      return prevQty + currentQty <= avQty;
    }
  };

  const variableProductCart = _variableProductCart(
    data,
    selectedColor,
    selectedAttribute,
    cartData,
    checkVariantInfo,
    checkQty,
    price,
    dispatch
  );

  const addItemToCart = () => {
    const qty = Number(quantityAmount.current.value);
    if (data.product.type === "simple") {
      simpleProductCart(qty);
    } else {
      variableProductCart(qty);
    }
  };

  const refreshData = () => router.replace(router.asPath);

  useEffect(() => {
    if (data.product) {
      const cl = data.product.colors?.length || 0;
      const al = data.product.attributes?.length || 0;
      if (cl > 0 && al > 0) {
        updatePrice(selectedColor.name, selectedAttribute.name);
      }
      if (cl > 0 && al === 0) {
        updatePrice(selectedColor.name, null);
      }
      if (cl === 0 && al > 0) {
        updatePrice(null, selectedAttribute.name);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedColor, selectedAttribute]);


  if (error) return <Error500 />;
  if (!data.product) return <Error404 />;

  return (
    <ClientLayout>

      <MainProductDetail
        addItemToCart={addItemToCart}
        activeIndex2={activeIndex2}
        handleOnClick2={handleOnClick2}
        product={data.product}
        changeColor={changeColor}
        stepUpQty={stepUpQty}
        stepDownQty={stepDownQty}
        quantityAmount={quantityAmount}
      />
      <ProductDescriptionDetail activeIndex={activeIndex} handleOnClick={handleOnClick} product={data.product} />
      <div className="related-product-area pt-65 pb-50 related-product-border">
        <TopProducts list={relatedItem} title={"Related Products"} />
      </div>


    </ClientLayout>
  )
}



export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, res, query }) => {
      if (res) {
        res.setHeader(
          "Cache-Control",
          "public, s-maxage=10800, stale-while-revalidate=59"
        );
      }
      const _data = await productDetailsData(query.name);
      const data = JSON.parse(JSON.stringify(_data));
      // if (data.success) {
      //   setSettingsData(store, data);
      // }
      return {
        props: {
          data,
          error: !data.success,
        },
      };
    }
);



export default ProductDetail