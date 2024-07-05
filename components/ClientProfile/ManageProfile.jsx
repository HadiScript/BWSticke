import {
  Button,
} from 'antd';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import useSWR from 'swr';
import { fetchData, postData } from '~/lib/clientFunctions';


const ManageProfile = ({ id }) => {
  const url = `/api/profile?id=${id}`;
  const { data, error, mutate } = useSWR(id ? url : null, fetchData);
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState("");


  useEffect(() => {
    if (data && data.user) {
      setUserData(data.user);
    }
  }, [data]);

  const name = useRef();
  const phone = useRef();
  const email = useRef();
  const house = useRef();
  const city = useRef();
  const state = useRef();
  const zip = useRef();
  const country = useRef();

  const updateUserInfo = async (e) => {
    try {
      e.preventDefault();
      setLoading("loading");
      const userData = {
        name: name.current.value,
        email: email.current.value,
        phone: phone.current.value,
        house: house.current.value,
        city: city.current.value,
        state: state.current.value,
        zipCode: zip.current.value,
        country: country.current.value,
      };
      const response = await postData(`/api/profile?scope=info&id=${props.id}`, userData);
      response.success
        ? toast.success("Profile Updated Successfully")
        : response.duplicate
          ? toast.error("A user with the given email is already registered")
          : toast.error("Something Went Wrong (500)");
      setLoading("");
    } catch (err) {
      setLoading("");
      console.log(err);
      toast.error(`Something Went Wrong (${err.message})`);
    }
  };



  return (
    <>
      {
        error ? <div className="text-center text-danger">failed to load</div>
          : !data ? "please wait" :
            <div className="px-2">
              <div className="tpcontact__form">
                <div className="tpcontact__info mb-35">
                  <h4 className="tpcontact__title">Manage Your Profile</h4>
                </div>
                <form onSubmit={updateUserInfo}>
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="tpcontact__input mb-20">
                        <input name="name" type="text" placeholder="Full name" required ref={name} defaultValue={userData.name} />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="tpcontact__input mb-20">
                        <input name="email" type="email" placeholder="Email address" ref={email} defaultValue={userData.email} required />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="tpcontact__input mb-20">
                        <input type="text" placeholder="Phone number" required ref={phone} defaultValue={userData.phone} />
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="tpcontact__input mb-30">
                        <input placeholder="House/Street" required ref={house} defaultValue={userData.house} />
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="tpcontact__input mb-20">
                        <input type="text" placeholder="City" ref={city} defaultValue={userData.city} required />
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="tpcontact__input mb-20">
                        <input type="text" placeholder="State/Province" ref={state} defaultValue={userData.state} required />
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="tpcontact__input mb-20">
                        <input type="text" placeholder="Post/Zip Code" ref={zip} defaultValue={userData.zip} required />
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="tpcontact__input mb-20">
                        <input type="text" placeholder="Select Country" ref={country} defaultValue={userData.country} required />
                      </div>
                    </div>


                  </div>
                  <div className="tpcontact__submit">
                    <Button>Save</Button>
                  </div>
                </form>
                <p className="ajax-response mt-30" />
              </div>

            </div>
      }

    </>
  )
}

export default ManageProfile