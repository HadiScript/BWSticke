import { Trash3, Link45deg } from "@styled-icons/bootstrap";

import { Button } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import ClientLayout from "~/components/UI/Layouts/ClientLayout"
import { postData, stockInfo } from "~/lib/clientFunctions";
import { updateComparelist } from "~/redux/cart.slice";



const Compare = () => {


  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { compare } = useSelector((state) => state.cart);
  const { settingsData } = useSelector((state) => state.settings);
  const dispatch = useDispatch();

  async function getData() {
    const url = `/api/home/compare`;
    const resp = await postData(url, { idList: compare });
    resp.success ? setData(resp.data) : null;
  }

  useEffect(() => {
    if (compare.length > 0) {
      getData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [compare]);

  //popup product viewer track
  useEffect(() => {
    if (router.query.slug) {
      setIsOpen(true);
    }
  }, [router.query.slug]);


  function removeItem(id) {
    const filtered = compare.filter((x) => x !== id);
    dispatch(updateComparelist(filtered));
    toast.success("Item has been removed from compare list");
  }





  return (
    <ClientLayout>

      <section className="cart-area pt-80 pb-80 wow fadeInUp" data-wow-duration=".8s" data-wow-delay=".2s">
        <div className="container">
          <div className="col-lg-6 col-md-6">
            <div className="tpsection mb-20">
              <h4 className="tpsection__title">
                Compare {" "}
                <span>
                  Products <img src="/assets/img/icon/title-shape-01.jpg" alt="" />
                </span>
              </h4>
            </div>
          </div>

          {compare && compare.length > 0 ?
            <div class="table-responsive">
              <table class="table table-bordered my-5">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Photo</th>
                    <th scope="col">Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Availability</th>
                    <th scope="col">Color</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, idx) => (
                    <tr key={idx + 1}>
                      <th scope="row">{++idx}</th>
                      <td> <Image className="rounded" src={item.image[0]?.url} width={80} height={80} /></td>
                      <td>{item?.name}</td>
                      <td>
                        <span className={'c.price'}>
                          {item.discount < item.price && <del className="mx-2">{item.price + settingsData.currency.symbol}</del>}
                          <b>{item.discount + settingsData.currency.symbol}</b>
                        </span>
                      </td>
                      <td>
                        {stockInfo(item) ? (
                          <span className="text-success fw-bold">In stock</span>
                        ) : (
                          <span className="text-danger fw-bold">
                            Out of stock
                          </span>
                        )}
                      </td>
                      <td>
                        {item.colors.length > 0 ?
                          item.colors.map((x, i) => (
                            <span
                              key={i}
                              style={{ backgroundColor: x.value }}
                              title={x.label}
                              className={c.color}
                            ></span>
                          )) : "-"
                        }
                      </td>
                      <td className="d-flex gap-3">

                        {stockInfo(item) && (
                          <Link
                            href={`/product/${item.slug}`}
                            className={'c.button'}
                          >
                            <Button icon={<Link45deg width={15} height={15} />}> Detail</Button>
                          </Link>
                        )}

                        <Button icon={<Trash3 width={15} height={15} />} onClick={() => removeItem(item._id)}>Delete</Button>

                      </td>
                    </tr>
                  ))}

                </tbody>
              </table>
            </div>
            :
            <p className="text-center py-5 mt-3 mb-_5 fw-bold">No products in compare list</p>
          }


        </div>
      </section>
    </ClientLayout>
  )
}

export default Compare