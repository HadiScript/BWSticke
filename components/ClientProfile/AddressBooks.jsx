import { Button, Tag } from "antd"
import { useRef, useState } from "react"
import EditAddress from "./EditAddress";
import { deleteData, fetchData } from "~/lib/clientFunctions";
import { toast } from "react-toastify";
import useSWR from "swr";
import PageLoader from "~/utils/PageLoader";
import AddAddress from "./AddAddress";

const AddressBooks = ({ id }) => {
  const [open, setOpen] = useState(false);
  const [addNew, setAddNew] = useState(false)

  // const [isOpen, setIsOpen] = useState(false);
  // const [addNew, setAddNew] = useState(false);
  const [selected, setSelected] = useState({});
  const [data, setData] = useState({});
  const updateRef = useRef();





  const handleCloseModal = () => {
    // setIsOpen(false);
    setOpen(false)
    setSelected({});
    updateRef.current.update();
  };

  function edit(id) {
    const resp = data.user?.address.find((x) => x._id === id);
    setSelected(resp || {});
    setOpen(true);
  }

  const deleteAddress = async (id) => {
    try {
      const data = {
        id,
      };
      const response = await deleteData(`/api/profile/address`, data);
      response.success
        ? (toast.success("Address has been removed"), updateRef.current.update())
        : toast.error("Something went wrong (500)");
    } catch (err) {
      toast.error(err.message);
    }
  };



  return (
    <PageLoader url={`/api/profile/address`} setData={setData} ref={updateRef}>
      <div className="px-2">
        <div className="tpcontact__form">
          <div className="tpcontact__info mb-35">
            <h4 className="">Address Book</h4>
          </div>

          <Button onClick={() => setAddNew(true)} type="dashed">Add New Address</Button>


          <div className="mt-4 d-flex flex-wrap gap-2 align-items-center">
            {data.user?.address.length === 0 && (
              <p className="text-center p-3 w-100">You have no saved address</p>
            )}
            {data.user?.address.map((x, idx) => (
              <div key={idx} className={"border rounded p-3 d-flex flex-column gap-2"} style={{ width: "300px" }}>
                <small>
                  <b className="text-primary">{x.addressTitle}</b>
                </small>

                <small>{x.name}</small>

                <small>{x.phone}</small>
                <small>{`${x.house} ${x.state} ${x.zipCode} ${x.country}`}</small>
                {x.addressType === "main address" && (
                  <Tag color="blue">default</Tag>
                )}

                <div className="row ">
                  <div className="col-6">
                    <small className="text-success" role="button" onClick={() => edit(x._id)}> Edit</small>
                  </div>
                  <div className="col-6 text-end">
                    <small role="button" className="text-danger" onClick={() => deleteAddress(x._id)}> Delete</small>
                  </div>
                </div>
              </div>
            ))}

          </div>

          <p className="ajax-response mt-30" />
        </div>

      </div>

      <EditAddress data={selected} open={open} setOpen={handleCloseModal} />
      <AddAddress open={addNew} setOpen={() => setAddNew(false)} />


    </PageLoader>
  )
}

export default AddressBooks