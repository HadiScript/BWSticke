import { useRef } from "react";
import { toast } from "react-toastify";
import { postData } from "~/lib/clientFunctions";


const FooterNewsLetter = () => {


  const email = useRef("");
  async function handleSubmit(e) {
    try {
      e.preventDefault();
      const response = await postData("/api/subscribers/new", {
        email: email.current.value.trim(),
      });
      response.success ? toast.success("You Have Subscribed Successfully") : toast.error("Something Went Wrong");
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  }

  return (
    <div className="footer-widget footer-col-5 mb-40">
      <h4 className="footer-widget__title mb-30">Get Newsletter</h4>
      <p>Get on the list and get 10% off your first order!</p>
      <div className="footer-widget__newsletter">
        <form onSubmit={handleSubmit}>
          <input ref={email} type="email" placeholder="Enter email address" />
          <button type="submit" className="footer-widget__fw-news-btn tpsecondary-btn">
            Subscribe Now
            <i className="fal fa-long-arrow-right" />
          </button>
        </form>
      </div>
    </div>
  )
}

export default FooterNewsLetter