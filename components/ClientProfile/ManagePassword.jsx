import { Button } from "antd";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { postData } from "~/lib/clientFunctions";

const ManagePassword = ({ id }) => {


  const [loading, setLoading] = useState("");
  // const { t } = useTranslation();
  const form = useRef();
  const password = useRef();
  const passwordRef = useRef();

  const updateUserInfo = async (e) => {
    try {
      e.preventDefault();
      if (password.current.value.length === 0 || password.current.value !== passwordRef.current.value) {
        return toast.error("Passwords in both fields do not match");
      }
      setLoading("loading");
      const userData = {
        password: password.current.value.trim(),
      };
      const response = await postData(`/api/profile?scope=password&id=${id}`, userData);
      response.success ? (toast.success("Password Updated Successfully"), form.current.reset()) : toast.error("Something Went Wrong (500)");
      setLoading("");
    } catch (err) {
      setLoading("");
      console.log(err);
      toast.error(`Something Went Wrong (${err.message})`);
    }
  };



  return (
    <div className="px-2">
      <div className="tpcontact__form">
        <div className="tpcontact__info mb-35">
          <h4 className="">Manage Your Password</h4>
        </div>
        <form onSubmit={updateUserInfo} ref={form}>
          <div className="row">
            <div className="col-lg-12">
              <input className='form-control mb-20' type="text" placeholder="Password" required ref={password} />
            </div>
            <div className="col-lg-12">
              <input type="text" className='form-control mb-20' placeholder="Confirm Password" ref={passwordRef} required />
            </div>
          </div>
          <div className="tpcontact__submit">
            <Button type="submit" className="myBtn-black" loading={loading} style={{ width: "100%" }}>Save</Button>
          </div>
        </form>
        <p className="ajax-response mt-30" />
      </div>

    </div>
  )
}

export default ManagePassword