import { Drawer } from "antd"
import Link from "next/link";
import { useRef, useState } from "react";
import ImageLoader from "./ImageLoader";
import { fetchData } from "~/lib/clientFunctions";

// Or Modal
const SearchingDrawer = ({ open, setOpen }) => {

  const [searchData, setSearchData] = useState([]);
  const [searching, setSearching] = useState(false);
  const search = useRef("");
  // const settings = useSelector((state) => state.settings);

  const hideSearchBar = () => {
    search.current.value = "";
    setSearchData([]);
  };
  const searchItem = async () => {
    setSearching(true);
    try {
      const options = {
        threshold: 0.3,
        keys: ["name"],
      };
      const product = await fetchData(`/api/home/product_search`);
      const Fuse = (await import("fuse.js")).default;
      const fuse = new Fuse(product.product, options);
      setSearchData(fuse.search(search.current.value));
    } catch (err) {
      console.log(err);
    }
    setSearching(false);
  };

  return (
    <Drawer width={800} open={open} onClose={() => setOpen(false)}>
      <input style={{ width: "100%", borderTop: "none", borderLeft: "none", borderRight: "none", fontSize: "18px" }} type="text" ref={search} onInput={searchItem} placeholder={"Search Product..."} />

      {searchData?.length === 0 ?
        <div style={{ height: "100%" }} className="d-flex justify-content-center align-items-center">
          <h6>Please search product by its name.</h6>
        </div>
        :
        <div className="mt-4">
          {searchData?.map((product, index) => (

            <Link href={`/product/${product.item.slug}`} onClick={hideSearchBar} className="d-flex align-items-center gap-4 border-bottom py-4" key={index}>
              <div>
                <ImageLoader src={product.item.image[0]?.url} alt={product.item.name} width={60} height={60} />
              </div>
              <div >
                <span>{product.item.name}</span>
              </div>
            </Link>

          ))}
        </div>
      }
    </Drawer >
  )
}

export default SearchingDrawer