
const Invoice = ({ data }) => {
  return (
    <div className="checkbox-form mt-20">
      <span className="mb-4">
        <b>We have received your order</b>
      </span>
      <h6>
        Order no# {data.orderId}
      </h6>

    </div>
  )
}

export default Invoice