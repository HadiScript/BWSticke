import { useEffect, useState } from "react";
import BrandLevel from "./filter/Brand";
import CategoryLevel from "./filter/Categories";
import ColorLevel from "./filter/Colors";
import PriceRangeSlider from "./filter/PriceRangeSlider";
import Menus from "./filter/Menus";

const Filters = (props) => {


  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [hideTopBar, setHideTopBar] = useState(false);
  // const { t } = useTranslation();

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    const position = window.pageYOffset;
    const width = window.innerWidth;
    if (width < 992) {
      setHideTopBar(true);
    } else if (position > 110) {
      setHideTopBar(true);
    } else {
      setHideTopBar(false);
    }
  };

  const toggleFilter = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="product-sidebar">
      <div className="product-sidebar__widget mb-30">
        <div className="product-sidebar__info product-info-list">
          <h4 className="product-sidebar__title mb-25">Sort By</h4>
          <Menus update={props.sort} />
        </div>
      </div>

      <div className="product-sidebar__widget mb-30">
        <div className="product-sidebar__info product-info-list">
          <h4 className="product-sidebar__title mb-25">Category</h4>
          <CategoryLevel
            category={props.category}
            updateCategory={props.updateCategory}
            updateSubCategory={props.updateSubCategory}
            updateChildCategory={props.updateChildCategory}

          />
        </div>
      </div>
      <div className="product-sidebar__widget mb-30">
        <div className="product-sidebar__info product-info-list">
          <h4 className="product-sidebar__title mb-25">Range</h4>
          <PriceRangeSlider
            min={props.priceRange?.min || 0}
            max={Math.round(props.priceRange?.max + 1 || 1)}
            onChange={props.updatePriceRange}
          />
        </div>
      </div>
      {/* <div className="product-sidebar__widget mb-30">
        <div className="product-sidebar__info product-info-list">
          <h4 className="product-sidebar__title mb-25">Color</h4>
          <ColorLevel />
        </div>
      </div> */}
      <div className="product-sidebar__widget mb-30">
        <div className="product-sidebar__info product-info-list">
          <h4 className="product-sidebar__title mb-25">Brands</h4>
          <BrandLevel />
        </div>
      </div>
    </div>
  );
};

export default Filters;
