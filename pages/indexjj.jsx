import HeadData from "~/components/SEO/HeadData"
import FeatureProduct from "~/components/UI/Common/Features"
import SingleCardProduct from "~/components/UI/Common/SingleCardProduct"
import DataBg from "~/components/UI/DataBg"
import TopHeader from "~/components/UI/Header/TopHeader"
import Banner from "~/components/UI/Home/Banner"
import Footer from "~/components/UI/Home/Footer"
import Hero from "~/components/UI/Home/Hero"
import TopCategory from "~/components/UI/Home/TopCategory"
import TopProducts from "~/components/UI/Home/TopProducts"
import ClientLayout from "~/components/UI/Layouts/ClientLayout"
import Error500 from "~/components/error/500"
import homePageData from "~/lib/dataLoader/home"
import { wrapper } from "~/redux/store";


const Home = ({ data, error }) => {

  console.log(data)

  return (
    <>
      {
        error ? (
          <Error500 />
        ) :
          <ClientLayout categories={data?.category}>
            <HeadData />
            <DataBg />
            <Hero />
            {/* <SingleCardProduct /> */}

            <TopProducts list={data?.bestSelling} title={"Best Selling"} />
            <Banner />
            <TopProducts list={data?.newProduct} title={"New Product"} />
            <FeatureProduct />
            <TopCategory />
          </ClientLayout>
      }
    </>
  )
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