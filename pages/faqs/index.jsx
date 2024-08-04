import { Collapse } from 'antd'
import React from 'react'
import ClientLayout from '~/components/UI/Layouts/ClientLayout'

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const Faqs = () => {
  return (
    <ClientLayout>
      <section className="track-area pt-40 pb-80">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-7">
              <div className="tpcontact__info mb-35">
                <h4 className="tpcontact__title">Make Custom Request</h4>
                <p>Must-have pieces selected every month want style Ideas and Treats?</p>
              </div>


              <Collapse
                size="large"
                items={[{ key: '1', label: 'This is large size panel header', children: <p style={{ fontSize: "16px", color: "#777777" }} > {text}</p> }]}
              />
            </div>
          </div>
        </div>
      </section>
    </ClientLayout >
  )
}

export default Faqs