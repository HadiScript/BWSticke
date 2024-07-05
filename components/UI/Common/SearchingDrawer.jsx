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
    <Drawer open={open} onClose={() => setOpen(false)}>
      <input type="text" ref={search} className={""} onInput={searchItem} placeholder={"Search Product..."} />

      <ul className={"classes.searchData_def"}>
        {searchData?.map((product, index) => (
          <li key={index}>
            <Link href={`/product/${product.item.slug}`} onClick={hideSearchBar}>
              <div className={"classes.thumb"}>
                <ImageLoader src={product.item.image[0]?.url} alt={product.item.name} width={80} height={80} />
              </div>
              <div className={"classes.content"}>
                <p>{product.item.name}</p>
                <div className={"classes.unit"}>{`${product.item.unitValue} ${product.item.unit}`}</div>
                <span>
                  {/* {settings.settingsData.currency.symbol + product.item.discount} */}
                  {/* {product.item.discount < product.item.price && <del> */}
                  {/* </del>} */}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </Drawer >
  )
}

export default SearchingDrawer