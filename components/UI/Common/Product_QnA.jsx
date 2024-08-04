import { Button, Modal } from "antd";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateData } from "~/lib/clientFunctions";

const ProductQ_A = ({ product, question, postQuestion, refreshData }) => {
  const { session } = useSelector((state) => state.localSession);

  const [replyModel, setReplyModel] = useState(false)
  const closeModal = () => setReplyModel(false)
  const [ansId, setAnsId] = useState(null);
  const ans = useRef();

  async function postAns(e) {
    try {
      e.preventDefault();
      const _data = {
        id: ansId,
        pid: product?._id,
        answer: ans.current.value.trim(),
      };
      const _r = await updateData("/api/question", _data);
      _r.success ? (toast.success("Answer Added Successfully"), closeModal(), refreshData()) : toast.error("Something Went Wrong 500");
      ans.current.value = ""
    } catch (er) {
      toast.error(`Something Went Wrong - ${er.message}`);
    }
  }



  return (
    <>
      {/* {session && ( */}
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
      {/* )} */}

      <hr />
      <div className="py-2 px-3 border rounded">
        {product?.question?.map((x, index) =>
          <div key={index + 1}>
            <div className="d-flex align-items-end gap-3 py-3" style={{ fontSize: "16px" }}>
              <div>
                <div className="d-flex gap-2 align-items-center" >
                  <span className="text-primary">{x.userName}</span>
                  <span>-</span>
                  <span>{x.date?.slice(0, 10)}</span>
                </div>
                <div className="d-flex flex-column gap-1" >
                  <div className="d-flex gap-2">
                    <span><b>Question:</b></span>
                    <span>{x.question}</span>
                  </div>
                  <div className="d-flex gap-2">
                    {x.answer && <span><b>Answer:</b></span>}
                    {x.answer && <span>{x.answer}</span>}
                  </div>
                </div>
              </div>
            </div>
            {!x.answer && <Button type="dashed" size="small" onClick={() => {
              setReplyModel(true);
              setAnsId(x._id)
            }}>Reply</Button>}
          </div>
        )}
      </div>

      <Modal centered open={replyModel} onClose={() => setReplyModel(false)} footer={null}>
        <form className="py-5" onSubmit={postAns}>
          <div className="mb-3">
            <textarea
              className="form-control"
              maxLength={300}
              placeholder="Reply, Maximum 300 words"
              ref={ans}
              required
            ></textarea>
          </div>
          <div className="text-start" style={{ maxWidth: "300px" }}>
            <Button onClick={postAns} className="myBtn-black">
              Reply
            </Button>
          </div>
        </form>
      </Modal>

      {/* {JSON.stringify(product?.question)} */}
    </>
  )
}
export default ProductQ_A