import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import Invoice from "~/components/UI/Checkout/Invoice";
import ClientLayout from "~/components/UI/Layouts/ClientLayout";
import { fetchData } from "~/lib/clientFunctions";

const Link = dynamic(() => import("next/link"));
const Error500 = dynamic(() => import("~/components/error/500"));
const Error404 = dynamic(() => import("~/components/error/404"));

const CheckoutSuccess = () => {

  const [orderData, setOrderData] = useState({});
  const router = useRouter();
  const url = `/api/home/order?id=${router.query.id}`;
  const { data, error } = useSWR(router.query.id ? url : null, fetchData);

  useEffect(() => {
    if (data && data.order) {
      setOrderData(data.order);
    }
  }, [data]);

  async function printDoc() {
    const { printDocument } = await import("~/lib/clientFunctions");
    await printDocument(orderData);
  }

  return (
    <ClientLayout>

      <div className="d-flex   justify-content-center  mt-50 mb-50 " >
        <div className="checkbox-form border rounded p-3" style={{ width: "700px" }}>
          <h3>Your Invoice</h3>
          <Invoice data={orderData} />
        </div>


      </div>



    </ClientLayout>
  )
}

export default CheckoutSuccess