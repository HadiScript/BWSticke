import Filters from "~/components/UI/Collections/Filters"
import CollectionsList from "~/components/UI/Collections/List"
import ClientLayout from "~/components/UI/Layouts/ClientLayout"
import { wrapper } from "../../redux/store"
import galleryPageData from "../../lib/dataLoader/gallery"
import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"
import { compareData, fetchData } from "~/lib/clientFunctions"
import InfiniteScroll from "react-infinite-scroll-component"


const Collections = ({ data, error }) => {


  const router = useRouter();
  const _items = data.product || [];
  const [_productList, _setProductList] = useState(_items);
  const [sortedItemList, setSortedItemList] = useState(_items);
  const [loading, setLoading] = useState(false);
  const [productLength, setProductLength] = useState(data.product_length || 0);
  const [isOpen, setIsOpen] = useState(false);
  const [sortKey, setSortKey] = useState("db");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [selectedChildCategory, setSelectedChildCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState({
    min: data.priceRange?.min || 0,
    max: data.priceRange?.max || 1,
  });
  const isInitialMount = useRef(true);


  async function updateFilteredProduct() {
    try {
      setLoading(true);
      let brandArr = "&";
      selectedBrand.forEach((el) => {
        brandArr = brandArr + `brands=${el}&`;
      });
      const cat = `category=${selectedCategory.length > 0 ? selectedCategory : ""}`;
      const sub = `&subcategory=${selectedSubCategory.length > 0 ? selectedSubCategory : ""}`;
      const child = `&childcategory=${selectedChildCategory.length > 0 ? selectedChildCategory : ""}`;
      const priceRange = `&price_min=${selectedPriceRange.min}&price_max=${selectedPriceRange.max}`;
      const prefix = `${cat}${sub}${child}${brandArr}${priceRange}`;
      const response = await fetchData(`/api/gallery?${prefix}`);
      _setProductList(response.product);
      setProductLength(response.product_length);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      updateFilteredProduct();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, selectedSubCategory, selectedChildCategory, selectedBrand, selectedPriceRange]);



  //Global Data Sorting function
  function sortDataHandler(key) {
    setLoading(true);
    const sortedData = compareData(_productList, key);
    const __sdt = sortedData ? sortedData : _productList;
    setSortedItemList([...__sdt]);
    setLoading(false);
  }

  //Item sorting event handler
  const sortItems = (key) => {
    setSortKey(key);
    sortDataHandler(key);
  };

  //modal close handler
  // const handleCloseModal = () => {
  //   router.push("/gallery", undefined, { shallow: true });
  //   setIsOpen(false);
  // };

  //popup product viewer track
  // useEffect(() => {
  //   if (router.query.slug) {
  //     setIsOpen(true);
  //   }
  // }, [router.query.slug]);

  //Load more items
  const moreProduct = async () => {
    await fetchData(`/api/gallery/more-product?product_length=${_productList.length}`)
      .then((data) => {
        _setProductList([..._productList, ...data]);
      })
      .catch((err) => {
        console.error(err);
        toast.error(`Something went wrong...(${err.message})`);
      });
  };

  //on data change sort data
  useEffect(() => {
    sortDataHandler(sortKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_productList]);


  return (
    <ClientLayout>

      <div className="product-area pt-70 pb-20">
        <div className="container">
          <div className="row">

            <div className="col-lg-2 col-md-12">
              <div className="tpsidebar product-sidebar__product-category">
                <Filters
                  category={data.category}
                  brand={data.brand}
                  sort={sortItems}
                  updateCategory={setSelectedCategory}
                  updateSubCategory={setSelectedSubCategory}
                  updateChildCategory={setSelectedChildCategory}
                  updateBrand={setSelectedBrand}
                  updatePriceRange={setSelectedPriceRange}
                  priceRange={data.priceRange}

                />
              </div>
            </div>

            <div className="col-lg-10 col-md-12">
              <div className="product-sidebar__product-item">
                {!loading && sortedItemList.length === 0 ? (
                  <div className="text-center">
                    <p >No Product Found :(</p>
                  </div>
                ) : !loading ? (
                  <CollectionsList items={sortedItemList} data_length={productLength} loadMore={moreProduct} />
                ) : (
                  <div style={{ height: "80vh" }}>
                    Please wait...
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

    </ClientLayout>
  )
}

export default Collections



export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, res, query }) => {
  if (res) {
    res.setHeader("Cache-Control", "public, s-maxage=10800, stale-while-revalidate=59");
  }
  const { category: Qc, brand: Qb } = query;
  let type = null;
  let _query = null;
  if ((Qc && Qc.length > 0) || (Qb && Qb.length > 0)) {
    type = true;
    _query = true;
  }
  const _data = await galleryPageData(type, _query);
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
});