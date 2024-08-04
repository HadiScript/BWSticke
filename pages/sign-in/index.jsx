import { signIn, useSession } from "next-auth/react";
import Link from "next/link"
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import ClientLayout from "~/components/UI/Layouts/ClientLayout"
import { formField } from "~/lib/clientFunctions";



const SignIn = () => {

  const [state, setState] = useState("");
  const router = useRouter();
  const email = useRef()
  const password = useRef()
  // const settings = useSelector((state) => state.settings);
  const { data: session } = useSession();


  const errors = {
    Signin: "Try signing with a different account.",
    OAuthSignin: "Try signing with a different account.",
    OAuthCallback: "Try signing with a different account.",
    OAuthCreateAccount: "Try signing with a different account.",
    EmailCreateAccount: "Try signing with a different account.",
    Callback: "Try signing with a different account.",
    OAuthAccountNotLinked: "To confirm your identity, sign in with the same account you used originally.",
    EmailSignin: "Check your email address.",
    CredentialsSignin: "Sign in failed. Check the details you provided are correct.",
    default: "Unable to sign in.",
  };

  async function signinProcess(e) {
    setState("loading");
    try {
      e.preventDefault();
      // console.log(e.target.elements)
      // const { username, password } = formField(e.target.elements);
      // console.log(username, password)


      const res = await signIn("credentials", {
        redirect: false,
        password: password.current.value,
        username: email.current.value,
      });
      if (res.error) {
        console.log(res.error)
        const errorMessage = res.error && (errors[res.error] ?? errors.default);
        toast.error(errorMessage);
      }
      if (res.ok) {
        toast.success("Login successful");
        // if (popup) {
        // hidePopup();
        // }
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
    setState("");
  }

  useEffect(() => {
    // if (session && !popup) {
    if (session) {
      const url = session.user.a ? "/dashboard" : "/";
      router.push(url);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);


  return (
    <ClientLayout>
      <section className="track-area pt-80 pb-40">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-sm-12">
              <div className="tptrack__product mb-40">
                <div className="tptrack__thumb">
                  <img src="/assets/img/banner/login-bg.jpg" alt="" />
                </div>
                <div className="tptrack__content grey-bg-3">
                  <div className="tptrack__item d-flex mb-20">
                    <div className="tptrack__item-icon">
                      <img src="/assets/img/icon/lock.png" alt="" />
                    </div>
                    <div className="tptrack__item-content">
                      <h4 className="tptrack__item-title">Login Here</h4>
                      <p>
                        Your personal data will be used to support your experience throughout this website, to manage access to your
                        account.
                      </p>
                    </div>
                  </div>
                  <form onSubmit={signinProcess}>
                    <div className="tptrack__id mb-10">
                      <input className="form-control" type="email" ref={email} placeholder="Email" />
                    </div>
                    <div className="tptrack__email mb-10">
                      <input className="form-control" type="text" ref={password} placeholder="Password" />

                    </div>
                    <div className="tpsign__remember d-flex align-items-center justify-content-between mb-15">
                      <div className="tpsign__pass">
                        <Link href="/forget-password">Forget Password</Link>
                      </div>
                      <div className="tpsign__pass">
                        <Link href="/sign-up">Register</Link>
                      </div>

                    </div>
                    <div className="tptrack__btn">
                      <button className="tptrack__submition">
                        Login Now
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

export default SignIn