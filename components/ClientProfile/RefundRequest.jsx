
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { dateFormat } from "~/lib/clientFunctions";
// import PageLoader from "../Ui/pageLoader";
// import Card from "../Ui/Card";
// import GlobalModal from "../Ui/Modal/modal";
import Table from "./Table";
import { Eye } from "@styled-icons/bootstrap";
import PageLoader from "~/utils/PageLoader";

const RefundRequest = ({ id }) => {

  const settings = useSelector((state) => state.settings);

  const [data, setData] = useState({});
  const [showReason, setShowReason] = useState(null);
  const updateRef = useRef();

  const columns = [
    {
      name: "Tracking Number",
      selector: (row) => row.orderId,
      grow: 1,
    },
    {
      name: "Date",
      selector: (row) => dateFormat(row.date),
      sortable: true,
    },
    {
      name: "Product",
      selector: (row) => row.product.name,
      sortable: true,
    },
    {
      name: "Amount",
      selector: (row) => `${settings.settingsData?.currency?.symbol}${row.refundAmount.toFixed(2)}`,
    },
    {
      name: "Status",
      selector: (row) => (
        <>
          <span
            className={`badge rounded-pill fs-6 ${row.status === "Pending" ? "bg-primary" : row.status === "Approved" ? "bg-success" : "bg-danger"
              }`}
          >
            {row.status}
          </span>
          {row.status !== "Pending" && row.note && (
            <div className="btn btn-sm m-2 btn-info rounded-pill" title="Note" onClick={() => setShowReason(row.note)}>
              <Eye width={20} height={20} />
            </div>
          )}
        </>
      ),
      sortable: true,
    },
  ];

  return (
    <PageLoader url={`/api/profile?id=${id}&scope=refund`} setData={setData} ref={updateRef}>

      <div className="tpcontact__info mb-35">
        <h4 className="">Refund Request</h4>
      </div>


      <Table columns={columns} data={data.user?.refundRequest || []} searchKey={"orderId"} searchPlaceholder={"Tracking Number"} />


    </PageLoader>
  )
}

export default RefundRequest