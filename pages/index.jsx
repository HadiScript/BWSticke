import dynamic from "next/dynamic";

import { wrapper } from "~/redux/store";
import homePageData from "~/lib/dataLoader/home";



import SocialImages from "~/components/UI/Home/SocialImages";
import Brands from "~/components/UI/Home/Brands";
import Exclusive from "~/components/UI/Home/Exclusive";
import TopCategories from "~/components/UI/Home/TopCategory";
import Features from "~/components/UI/Collections/Features";



const TopProducts = dynamic(() => import("~/components/UI/Home/TopProducts"));
const ThreeColBanner = dynamic(() => import("~/components/UI/Home/ThreeColBanner"))
const ClientLayout = dynamic(() => import("~/components/UI/Layouts/ClientLayout"))

const Error500 = dynamic(() => import("~/components/error/500"));

const Home = ({ data, error }) => {
  return <ClientLayout>
    <ThreeColBanner />
    <Features />



    <TopProducts list={data?.bestSelling} title={"Best Selling"} />
    <TopCategories />
    {/* <div className="my-5">
    </div> */}
    <Brands />

    {/* <div className="my-5">
    </div> */}
    <TopProducts list={data?.bestSelling} title={"Best Selling"} />

    {/* <div className="d-none d-md-block">
    </div> */}
    <Exclusive />

    {/* heom */}
    <SocialImages />
  </ClientLayout>
}




export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, res, locale, ...etc }) => {
  if (res) {
    res.setHeader("Cache-Control", "public, s-maxage=10800, stale-while-revalidate=59");
  }
  const _data = await homePageData();
  const data = JSON.parse(JSON.stringify(_data));
  if (data.success) {
    // setSettingsData(store, data);
  }
  return {
    props: {
      data,
      error: !data.success,
    },
  };
});


export default Home