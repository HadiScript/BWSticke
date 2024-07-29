import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import useSWR from "swr";
import { dateFormat, fetchData } from "~/lib/clientFunctions";
import FilterComponent from "./FilterComponent";
import DataTable from "react-data-table-component";
import PurchaseDetails from "./PurchaseDetail";


const PurchaseHistory = ({ id }) => {

  const url = `/api/profile?id=${id}&scope=orders`;
  const { data, error, mutate } = useSWR(id ? url : null, fetchData);
  const [userData, setUserData] = useState([]);
  const settings = useSelector((state) => state.settings);

  useEffect(() => {
    if (data && data.user) {
      setUserData(data.user.orders);
    }
  }, [data]);

  const [showDetails, setShowDetails] = useState(false);
  const [detailsData, setDetailsData] = useState(null);

  function showPurchaseDetails(id) {
    const _data = userData.find((d) => d.orderId === id);
    setDetailsData(_data);
    setShowDetails(true);
  }

  function hidePurchaseDetails() {
    setDetailsData(null);
    setShowDetails(false);
  }


  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const filteredItems = userData.filter((item) => item.orderId && item.orderId.toLowerCase().includes(filterText.toLowerCase()));



  const subHeaderComponentMemo = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };
    return (
      <FilterComponent onFilter={(e) => setFilterText(e)} onClear={handleClear} filterText={filterText} placeholder="Tracking Number" />
    );
  }, [filterText, resetPaginationToggle]);

  const columns = [
    {
      name: "Tracking number",
      selector: (row) => row.orderId,
      grow: 1.5,
    },
    {
      name: "Date",
      selector: (row) => dateFormat(row.orderDate),
      sortable: true,
    },
    {
      name: "Amount",
      selector: (row) => settings.settingsData.currency.symbol + row.payAmount,
    },
    {
      name: "Delivery status",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "Payment status",
      selector: (row) => row.paymentStatus,
      sortable: true,
    },
    {
      name: "Action",
      selector: (row) => (
        <div role="button" className={"classes.button"}>
          <span title="view" onClick={() => showPurchaseDetails(row.orderId)} >
            Detail
          </span>
        </div>
      ),
    },
  ];

  const customStyles = {
    rows: {
      style: {
        minHeight: "92px",
        fontSize: "15px",
      },
    },
    headCells: {
      style: {
        fontSize: "15px",
      },
    },
  };



  return (
    <>
      <div className="tpcontact__info mb-35">
        <h4 className="">Purchase History</h4>
      </div>

      {error ? (
        <div className="text-center text-danger">failed to load</div>
      ) : !data ? (
        <p>Please wait...</p>
      ) : (
        <>
          <DataTable
            columns={columns}
            data={filteredItems}
            pagination
            paginationResetDefaultPage={resetPaginationToggle}
            subHeader
            subHeaderComponent={subHeaderComponentMemo}
            persistTableHead
            customStyles={customStyles}
          />
          {
            showDetails && detailsData && <>
              <PurchaseDetails
                open={showDetails}
                oncancel={hidePurchaseDetails}
                data={detailsData}
                update={mutate}
              />
              {/* <PurchaseDetails data={detailsData} hide={hidePurchaseDetails} update={mutate} /> */}
            </>
          }
        </>
      )}

    </>
  )
}

export default PurchaseHistory