import { Button } from "antd";
import { useSelector } from "react-redux";

const ProductQ_A = ({ product, question, postQuestion }) => {
  const { session } = useSelector((state) => state.localSession);



  return (
    <>
      {session && (
        <form className="border border-2 rounded p-3 mb-3" onSubmit={postQuestion}>
          <div className="mb-3">
            <textarea
              className="form-control"
              maxLength={300}
              placeholder="Enter your Question, Maximum 300 words"
              ref={question}
              required
            ></textarea>
          </div>
          <div className="text-start" style={{ maxWidth: "300px" }}>
            <Button onClick={postQuestion} className="myBtn-black">
              Ask Question
            </Button>
          </div>
        </form>
      )}

      <hr />
      {JSON.stringify(product?.question)}
    </>
  )
}
export default ProductQ_A