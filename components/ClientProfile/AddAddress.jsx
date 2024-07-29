import { Button, Drawer } from "antd"
import { toast } from "react-toastify";
import { formField, updateData } from "~/lib/clientFunctions";
import countryData from "~/data";
import { useState } from "react";

const AddAddress = ({ open, setOpen, data }) => {
  const [buttonState, setButtonState] = useState("");

  async function handleInfo(e) {
    try {
      e.preventDefault();
      setButtonState("loading");
      const data = formField(e.target.elements);
      const resp = await updateData("/api/profile/address", data);

      console.log(resp, "here isthe address update respon")
      resp.success
        ? (toast.success("Address Updated Successfully"), setOpen())
        : toast.error("No changes have been made to the data.");
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
            <input type="hidden" name="_id" defaultValue={data._id} />

            <div className="mb-3">
              {/* <label className="mb-3">add_address</label> */}
              <div className="mb-3">
                <input
                  type="text"
                  placeholder={`Full name*`}
                  name="name"
                  required
                  className="form-control"
                  defaultValue={data?.name}
                />
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <input type="tel" placeholder={`Phone*`} defaultValue={data.phone} name="phone" required className="form-control" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <input type="email" defaultValue={data.email} placeholder={`Email*`} name="email" required className="form-control" />
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <textarea className="form-control" defaultValue={data.house} placeholder={`House street*`} name="house" required rows="2" />
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <input type="text" defaultValue={data.city} placeholder={`City*`} name="city" required className="form-control" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <input type="text" defaultValue={data.state} placeholder={`State province*`} name="state" required className="form-control" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <input type="text" defaultValue={data.zipCode} placeholder={`Post zip code*`} name="zipCode" required className="form-control" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <select defaultValue={data.country} className="form-control" required name="country">
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
                      defaultValue={data.addressTitle}
                      name="addressTitle"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card p-2 mb-3">
                    <div className="form-check">
                      <input
                        defaultChecked={data.addressType === "main address"}
                        key={data.addressType === "main address"}
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
            {/* <div className="row">
              <div className="col-lg-6">
                <div className="tpcontact__input mb-20">
                  <input name="name" type="text" placeholder="Full name" required />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="tpcontact__input mb-20">
                  <input name="email" type="email" placeholder="Email address" required />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="tpcontact__input mb-20">
                  <input type="tel" placeholder="Phone number" required />
                </div>
              </div>

              <div className="col-lg-12">
                <div className="tpcontact__input mb-30">
                  <input name="house" required rows="2" placeholder="House/Street" />
                </div>
              </div>

              <div className="col-lg-6">
                <div className="tpcontact__input mb-30">
                  <input name="city" type="text" placeholder="City" required />
                </div>
              </div>

              <div className="col-lg-6">
                <div className="tpcontact__input mb-20">
                  <input name="state" type="text" placeholder="State/Province" required />
                </div>
              </div>

              <div className="col-lg-6">
                <div className="tpcontact__input mb-20">
                  <input name="zipCode" type="text" placeholder="Post/Zip Code" required />
                </div>
              </div>

              <div className="col-lg-6">
                <div className="tpcontact__input mb-20">
                  <select className="form-control" name="country" type="text" placeholder="Select Country" >
                    <option value="" disabled>
                      Select Country
                    </option>
                    {countryData.country.map((ct) => (
                      <option value={ct.name} key={ct.name}>
                        {ct.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="tpcontact__input mb-20">
                  <input name="addressTitle" type="text" placeholder="Save as" required />
                </div>
              </div>

              <div className="col-lg-6 d-flex align-items-center">
                <div className="d-flex gap-2">
                  <label>Default Address</label>
                  <input name="addressType" type="checkbox" placeholder="" required />
                </div>
              </div>


            </div> */}
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