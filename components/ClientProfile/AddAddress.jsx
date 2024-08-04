import { Drawer } from "antd";
import { useState } from "react";
import { toast } from "react-toastify";
import { formField, postData } from "~/lib/clientFunctions";
import countryData from "~/data";


const AddAddress = ({ open, setOpen }) => {
  const [buttonState, setButtonState] = useState("");

  async function handleInfo(e) {
    try {
      e.preventDefault();
      setButtonState("loading");
      const data = formField(e.target.elements);
      // console.log(data, "here is te")
      // return;
      const resp = await postData("/api/profile/address", data);
      resp.success ? (toast.success("Customer Added Successfully"), e.target.reset()) : toast.error("Something Went Wrong");
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
    setButtonState("");
  }

  return (
    <Drawer width={755} open={open} onClose={setOpen} >

      <div className="px-2">
        <div className="tpcontact__form">
          <div className="tpcontact__info mb-35">
            <h4 className="tpcontact__title">Add Address</h4>
          </div>
          <form onSubmit={handleInfo}>
            {/* <input type="hidden" name="_id" /> */}

            <div className="mb-3">
              {/* <label className="mb-3">add_address</label> */}
              <div className="mb-3">
                <input
                  type="text"
                  placeholder={`Full name*`}
                  name="name"
                  required
                  className="form-control"
                />
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <input type="tel" placeholder={`Phone*`} name="phone" required className="form-control" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <input type="email" placeholder={`Email*`} name="email" required className="form-control" />
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <textarea className="form-control" placeholder={`House street*`} name="house" required rows="2" />
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <input type="text" placeholder={`City*`} name="city" required className="form-control" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <input type="text" placeholder={`State province*`} name="state" required className="form-control" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <input type="text" placeholder={`Post zip code*`} name="zipCode" required className="form-control" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <select className="form-control" required name="country">
                      <option value="" disabled>
                        {`Select Country*`}
                      </option>
                      {countryData.country.map((ct) => (
                        <option value={ct.name} key={ct.name}>
                          {ct.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <input
                      type="text"
                      placeholder={`"Save As? For example: Home Address, Office Address, etc.." *`}
                      className="form-control"
                      required

                      name="addressTitle"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card p-2 mb-3">
                    <div className="form-check">
                      <input
                        className="form-check-input" type="checkbox" value="main address" id="flexCheckDefault" name="addressType" />
                      <label className="form-check-label" for="flexCheckDefault">
                        Default Address
                      </label>
                    </div>
                    <small>Your existing default address setting will be replaced if you make some changes here.</small>
                  </div>
                </div>
              </div>
            </div>

            <div className="tpcontact__submit">
              <button type="submit" className="btn btn-dark">{buttonState} {" "} Save</button>
            </div>
          </form>
          <p className="ajax-response mt-30" />
        </div>

      </div>
    </Drawer>
  )
}

export default AddAddress