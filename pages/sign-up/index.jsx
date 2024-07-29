import Link from "next/link"
import { useRef } from "react";
import { toast } from "react-toastify";
import ClientLayout from "~/components/UI/Layouts/ClientLayout"
import { postData } from "~/lib/clientFunctions";



const SignUp = () => {

  const name = useRef();
  const email = useRef();
  const password = useRef();
  const passwordConfirm = useRef();


  const handleForm = async (e) => {
    e.preventDefault();
    // console.log(name?.current?.value)
    // return;

    try {
      if (password.current.value === passwordConfirm.current.value) {
        const data = new FormData();
        data.append("name", name.current.value);
        data.append("email", email.current.value);
        data.append("password", password.current.value);
        const response = await postData(`/api/auth/signup`, data);
        response.success
          ? (toast.success("New account added successfully"),
            document.querySelector("#signup_form").reset())
          : !response.success && response.duplicate
            ? toast.error("User with the given email is already exists")
            : toast.error("Something went Wrong");
      } else {
        toast.error("Both Password Field Value Not Matched");
        passwordConfirm.current.focus();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ClientLayout>
      <section className="track-area pt-80 pb-40">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-sm-12">
              <div className="tptrack__product mb-40">
                <div className="tptrack__thumb">
                  <img src="/assets/img/banner/sign-bg.jpg" alt="" />
                </div>
                <div className="tptrack__content grey-bg-3">
                  <div className="tptrack__item d-flex mb-20">
                    <div className="tptrack__item-icon">
                      <img src="/assets/img/icon/sign-up.png" alt="" />
                    </div>
                    <div className="tptrack__item-content">
                      <h4 className="tptrack__item-title">Sign Up</h4>
                      <p>
                        Your personal data will be used to support your experience throughout this website, to manage access to your
                        account.
                      </p>
                    </div>
                  </div>
                  <form onSubmit={handleForm}>
                    <div className="tptrack__id mb-10">
                      <span>
                        <i className="fal fa-user" />
                      </span>
                      <input className="form-control" ref={name} type="text" placeholder="Name" />
                    </div>

                    <div className="tptrack__id mb-10">
                      <span>
                        <i className="fal fa-envelope" />
                      </span>
                      <input className="form-control" ref={email} type="email" placeholder="Email address" />
                    </div>
                    <div className="tptrack__email mb-10">
                      <span>
                        <i className="fal fa-key" />
                      </span>
                      <input className="form-control" ref={password} type="text" placeholder="Password" />
                    </div>

                    <div className="tptrack__email mb-10">
                      <span>
                        <i className="fal fa-key" />
                      </span>
                      <input className="form-control" ref={passwordConfirm} type="text" placeholder="Confirm Password" />
                    </div>

                    <div className="tpsign__account">
                      <Link href="#">Already Have Account?</Link>
                    </div>
                    <div className="tptrack__btn">
                      <button className="tptrack__submition tpsign__reg">
                        Register Now
                        <i className="fal fa-long-arrow-right" />
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </ClientLayout>
  )
}

export default SignUp