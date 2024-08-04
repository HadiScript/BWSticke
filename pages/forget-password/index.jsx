import ClientLayout from "~/components/UI/Layouts/ClientLayout"

const ForgetPassword = () => {
  return (
    <ClientLayout>
      <section className="track-area pt-80 pb-80">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-sm-12">
              <div className="tptrack__product">
                <div className="tptrack__content grey-bg-3">
                  <div className="tptrack__item d-flex mb-20">
                    {/* <div className="tptrack__item-icon">
                      <img src="/assets/img/icon/track-1.png" alt="" />
                    </div> */}
                    <div className="tptrack__item-content">
                      <h4 className="tptrack__item-title">Forget Password</h4>
                      <p>To track your order please enter your Order ID in the box below and press the Track button. This was  given to you on your receipt and in the confirmation email you should have received.</p>
                    </div>
                  </div>
                  <div className="tptrack__id mb-10">
                    <form action="#">
                      {/* <span><i className="fal fa-" /></span> */}
                      <input type="text" placeholder="Enter your email" />
                    </form>
                  </div>

                  <div className="tptrack__btn">
                    <button className="tptrack__submition">Send Email</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </ClientLayout>
  )
}

export default ForgetPassword