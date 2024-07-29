import { Button, Divider, Drawer } from "antd"
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { checkPercentage, decimalBalance, postData } from "~/lib/clientFunctions";
import ImageLoader from "../UI/Common/ImageLoader";
import FileUpload from "../UI/Fileupload/fileupload";


const RefundForm = (
  {
    data: productData,
    orderData,
    update,
    refundDrawer,
    setrefundDrawer,
    close
  }
) => {

  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState("");
  const settings = useSelector((state) => state.settings);
  const currencySymbol = settings.settingsData.currency.symbol;
  const reason = useRef(null);
  // const { t } = useTranslation();
  const vat = checkPercentage(
    productData.product.price * productData.product.qty,
    productData.product.vat || 0
  );

  const tax = checkPercentage(
    productData.product.price * productData.product.qty,
    productData.product.tax || 0
  );
  const subtotal = +(
    productData.product.price * productData.product.qty +
    vat +
    tax
  ).toFixed(2);
  const discount = +checkPercentage(
    productData.product.price,
    orderData.coupon?.discount || 0
  ).toFixed(2);
  const refundAmount = +(subtotal - discount).toFixed(2);

  async function requestRefundHandle(e) {
    try {
      e.preventDefault();
      setLoading("loading");
      const _data = {
        product: {
          id: productData.product._id,
          name: productData.product.name,
          color: productData.product?.color?.name || null,
          attribute: productData.product?.attribute?.name || null,
          price: productData.product.price,
          qty: productData.product.qty,
          vat: productData.product.vat,
          tax: productData.product.tax,
        },
        refundReason: reason.current.value.trim(),
        status: "Pending",
        attachments: files,
        refundAmount,
        orderId: productData.oid,
      };
      const resp = await postData("/api/refund", _data);
      resp.success
        ? (toast.success(
          "Refund Request Successful please wait for the response"
        ),
          update(),
          setrefundDrawer(false),
          // hide(),
          close())
        : toast.error("Something Went Wrong 500");
    } catch (err) {
      console.log(err);
      toast.error(`Something Went Wrong - ${err.message}`);
    }
    setLoading("");
  }


  return (
    <Drawer width={600} open={refundDrawer} onClose={() => setrefundDrawer(false)}>
      <div className="row">
        <div className="col-6">
          <div className="d-flex flex-column gap-0 justify-content-center">
            {/* <span>{productData.product?.image[0]?.url}</span> */}
            {/* <ImageLoader src={productData.product?.image[0]?.url} /> */}
            <div className="mt-2 d-flex flex-column gap-0 justify-content-center">
              <b>{productData.product.name}</b>
              <span>Variant:</span>
              {productData.product?.color?.name && (
                <span>{productData.product?.color?.name}</span>
              )}
              {productData.product?.attribute?.name && (
                <span>{productData.product?.attribute?.name}</span>
              )}
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="d-flex flex-column justify-content-center gap-2">
            <span>QTY : {productData.product.qty}</span>
            <span>
              Price :{currencySymbol}
              {productData.product.price}
            </span>
            <span>
              Tax :{currencySymbol}
              {decimalBalance(productData.product.tax)}
            </span>
            <span>
              Vat :{currencySymbol}
              {decimalBalance(productData.product.vat)}
            </span>
          </div>
        </div>
      </div>

      <Divider />

      <div className="row mt-4">
        <div className="col-6">
          <b>Subtotal</b> :{currencySymbol}
          {subtotal}
        </div>
        <div className="col-6">
          <b>Total refund amount </b>:{currencySymbol}
          {refundAmount}
        </div>
      </div>

      <Divider />

      <div className="my-3">
        <label className="form-label">Refund reason</label>
        <textarea className="form-control" required ref={reason} placeholder="Refund reason..."></textarea>
      </div>

      <div className="my-5">
        <FileUpload
          label={'Attachments'}
          multiple
          updateFilesCb={setFiles}
          maxFileSizeInBytes={2e6}
          accept={".jpg,.png,.jpeg"}
        />
      </div>

      <Button onClick={requestRefundHandle} style={{ width: "100%" }} loading={loading} className="myBtn-black">Submit</Button>

    </Drawer>
  )
}

export default RefundForm