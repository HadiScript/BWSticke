import { Button } from "antd"
import { useRef, useState } from "react"
import AddAddress from "./AddAddress";
import { deleteData } from "~/lib/clientFunctions";
import { toast } from "react-toastify";

const AddressBooks = ({ id }) => {
  const [open, setOpen] = useState(false);

  const [addNew, setAddNew] = useState(false);
  const [selected, setSelected] = useState({});
  const [data, setData] = useState({});
  const updateRef = useRef();

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
        ? (toast.success("Address has been removed"),
          updateRef.current.update())
        : toast.error("Something went wrong (500)");
    } catch (err) {
      toast.error(err.message);
    }
  };



  return (
    <>
      <div className="px-2">
        <div className="tpcontact__form">
          <div className="tpcontact__info mb-35">
            <h4 className="tpcontact__title">Address Book</h4>
          </div>

          <Button onClick={() => setOpen(true)} type="dashed">Add New Address</Button>
          {/* <form onSubmit={updateUserInfo}>
          <div className="row">
            <div className="col-lg-12">
              <div className="tpcontact__input mb-20">
                <input type="text" placeholder="Password" required ref={password} />
              </div>
            </div>
            <div className="col-lg-12">
              <div className="tpcontact__input mb-20">
                <input type="text" placeholder="Confirm Password" ref={passwordRef} required />
              </div>
            </div>
          </div>
          <div className="tpcontact__submit">
            <Button>Save</Button>
          </div>
        </form> */}
          <p className="ajax-response mt-30" />
        </div>

      </div>

      <AddAddress open={open} setOpen={setOpen} />


    </>
  )
}

export default AddressBooks