"use client";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// import { useDispatch, useSelector } from "react-redux";
// import { addBrand } from "../../features/filterSlice";
// import { brandCheck } from "../../features/productSlice";

const BrandLevel = ({ brand, updateBrand }) => {
  const [clicked, setClicked] = useState([]);
  const router = useRouter();

  //handle brand selection
  function brandSelected(slug) {
    if (clicked.find((x) => x === slug)) {
      const filtered = clicked.filter((x) => x !== slug);
      setClicked(filtered);
      updateBrand(filtered);
    } else {
      const newList = [...clicked, slug];
      setClicked(newList);
      updateBrand(newList);
    }
  }

  //detect query change
  useEffect(() => {
    const { brand } = router.query;
    if (brand && brand.length > 1) {
      const query = decodeURI(brand);
      setClicked([query]);
      updateBrand([query]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.brand]);

  return (
    <>
      {brand &&
        brand.map?.map((item) => (
          <div className="form-check" key={item.id}>
            <input
              className="form-check-input"
              id={`brand${item.id}`}
              type="checkbox"
              value={item.value}
              checked={item.isChecked || false}
              onChange={(e) => brandHandler(e, item.id)}
            />
            <label className="form-check-label" htmlFor={`brand${item.id}`}>
              {item.name}
            </label>
          </div>
        ))}
    </>
  );
};

export default BrandLevel;
