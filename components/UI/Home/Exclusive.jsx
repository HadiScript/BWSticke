import { Grid } from "antd";
import Image from "next/image";
import Link from "next/link";

export default function Exclusive() {
  const points = Grid.useBreakpoint()

  return (
    <>
      <section className="exclusive-area pb-65">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-8">
              <div className="exclusiveitem banner-animation p-relative mb-30">
                <div className="exclusiveitem__thumb">
                  {/* <Image src={`${process.env.NEXT_PUBLIC_URL}/assets/img/h/2cats/big1.webp`} alt="big-2" height={points.md ? 500 : 300} width={980} /> */}
                  <img src={`${process.env.NEXT_PUBLIC_URL}/assets/img/h/2cats/big1.webp`} alt="big-2" />
                </div>
                <div className="tpexclusive__content">
                  <h4 className="tpexclusive__subtitle">Collection</h4>
                  <h3 className="tpexclusive__title mb-30">
                    Gloves <br /> Exclusive In
                  </h3>
                  <div className="tpexclusive__btn">
                    <Link href="/collections" className="tp-btn banner-animation">
                      Shop Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-4">
              <div className="exclusivearea banner-animation p-relative mb-30">
                {/* <div className="exclusivearea__thumb">
                  <Image className="rounded" src={`${process.env.NEXT_PUBLIC_URL}/assets/img/h/2cats/big2.webp`} alt="big-2" height={points.md ? 500 : 250} width={980} />
                </div> */}
                <div className="exclusivearea__thumb">
                  <img className="rounded" src={`${process.env.NEXT_PUBLIC_URL}/assets/img/h/2cats/big2.webp`} alt="big-2" />
                </div>
                <div className="tpexclusive__contentarea text-center">
                  <h4 className="tpexclusive__subtitle subcolor">Discount</h4>
                  <h3 className="tpexclusive__title mb-10">50% Offer</h3>
                  <p>
                    New Modern Stylist Gloves <br /> Man Wear holder
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
