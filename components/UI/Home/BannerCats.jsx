import Link from "next/link"
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { fetchData } from "~/lib/clientFunctions";
import ImageLoader from "../Common/ImageLoader";


const BannerCats = ({ isToggled, handleToggle }) => {


  const [cat, setCat] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCategory, setShowCategory] = useState(false);
  const router = useRouter();
  // const { t } = useTranslation();
  async function GetData() {
    const url = `/api/home/categories?only_category=true`;
    const data = await fetchData(url);
    data.success ? setCat(data.category) : setCat(null);
    setLoading(false);
  }
  useEffect(() => {
    GetData();
  }, []);

  const toggleCategory = () => setShowCategory(!showCategory);

  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setShowCategory(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  console.log(cat, "here isthe catas");

  return (
    <div className="cat-menu__category category-style-five p-relative">
      <a onClick={handleToggle} href="#">
        <i className="fal fa-bars" />
        Categories
      </a>
      <div className="category-menu" style={{ display: `${isToggled ? "block" : "none"}` }}>
        <ul className="cat-menu__list">
          {cat?.slice(0, 8)?.map((x, idx) => <React.Fragment key={idx}>
            {
              !x?.subCategories ?
                <li>
                  <Link href={`/collections?category=${x.slug}`}>
                    <ImageLoader height={15} width={15} src={x.icon[0].url} cat="alt-logo" /> <span className="mx-2">{x.name}</span>
                  </Link>
                </li>
                :
                <li className="menu-item-has-children">
                  <Link href={`/collections?category=${x.slug}`}>
                    <ImageLoader height={15} width={15} src={x.icon[0].url} cat="alt-logo" /> <span className="mx-2">{x.name}</span>
                  </Link>
                  {x.subCategories && x.subCategories.length > 0 &&
                    <ul className="submenu">
                      {x.subCategories?.slice(0, 8).map((subItem, subIdx) =>
                        <li
                          className="col-lg-4 col-sm-6 col "
                          key={subIdx}
                        >
                          <Link
                            href={`/collections?category=${subItem.slug}&parent=${x.slug}`}
                            shallow={true}

                          >
                            {subItem.name}
                          </Link>
                          {/* <ul>
                            {subItem.child.map((childItem, childIdx) => (
                              <li key={childIdx}>
                                <Link
                                  href={`/collections?category=${subItem.slug}&child=${childItem.slug}&parent=${x.slug}`}
                                  shallow={true}
                                >
                                  <span>{childItem.name}</span>
                                </Link>
                              </li>
                            ))}
                          </ul> */}
                        </li>

                      )}

                    </ul>
                  }
                </li>
            }
          </React.Fragment>

          )}


        </ul>
        <div className="daily-offer d-xl-none d-xxl-block">
          <ul>
            <li>
              <Link href="/categories">See All Categories</Link>
            </li>
            {/* <li>
              <Link href="/shop-2">Top 100 Offers</Link>
            </li>
            <li>
              <Link href="/shop-2">New Arrivals</Link>
            </li> */}
          </ul>
        </div>
      </div>
      {/* {JSON.stringify(cat)} */}
    </div>
  )
}

export default BannerCats