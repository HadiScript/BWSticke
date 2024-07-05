
import dynamic from 'next/dynamic';
import React from 'react'
import ClientLayout from '~/components/UI/Layouts/ClientLayout'
import { setSettingsData } from '~/lib/clientFunctions';
import categoryPageData from '~/lib/dataLoader/category';
import { wrapper } from '~/redux/store';


const ImageLoader = dynamic(() => import('~/components/UI/Common/ImageLoader'));
const Link = dynamic(() => import("next/link"));
const Error500 = dynamic(() => import("~/components/error/500"));

const Categories = ({ data, error }) => {
  return (
    <ClientLayout>

      {error ? (
        <Error500 />
      ) : (
        <section className="selected-product-area pt-95 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="tpsection mb-40">
                  <h4 className="tpsection__title">
                    Top{" "}
                    <span>
                      {" "}
                      Categories <img src="/assets/img/icon/title-shape-01.jpg" alt="" />
                    </span>
                  </h4>
                </div>
              </div>
            </div>
            <div className="row">
              {
                data?.category?.map((cat, index) => (
                  <div key={index} className="col-xxl-3 col-lg-6 col-md-6">
                    <div className="tpselectproduct">
                      <ImageLoader src={cat.icon[0]?.url} alt={cat.name} width={60} height={60} />
                      <h4 className="tpselectproduct__heading mb-35 mt-5">
                        <Link href={`/collections?category=${cat.slug}`}>
                          {cat.name}
                        </Link>
                      </h4>
                      {
                        cat?.subCategories?.map((sub, idx) => (
                          <div key={idx + 1} className="tpselectproduct__item d-flex align-items-center mb-25">
                            <div className="tpselectproduct__content">
                              <h4 className="tpselectproduct__title">
                                <Link
                                  href={`/collections?category=${sub.slug}&parent=${cat.slug}`}
                                >
                                  <b> {sub.name}</b>
                                </Link>
                              </h4>
                              {
                                sub?.child?.map((ch, chIdx) => (
                                  <div key={chIdx + 1} className="tpselectproduct__item d-flex align-items-center mb-5">
                                    <div className="tpselectproduct__content">
                                      <h4 className="tpselectproduct__title">
                                        <Link
                                          href={`/collections?category=${sub.slug}&child=${ch.slug}&parent=${cat.slug}`}
                                        >
                                          {ch.name}
                                        </Link>
                                      </h4>
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                ))
              }



            </div>
          </div>
        </section>
      )}
    </ClientLayout >
  )
}


export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, res, locale, ...etc }) => {
  if (res) {
    res.setHeader("Cache-Control", "public, s-maxage=10800, stale-while-revalidate=59");
  }
  const _data = await categoryPageData();
  const data = JSON.parse(JSON.stringify(_data));
  if (data.success) {
    setSettingsData(store, data);
  }
  return {
    props: {
      data,
      error: !data.success,
    },
  };
});

export default Categories