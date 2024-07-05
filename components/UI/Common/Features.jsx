"use client";
import Link from "next/link";



export default function FeatureProduct() {
  return (
    <div className="d-none d-md-block features mt-100">
      <div class="scotch-container">
        <div class="main-container">
          <div class="text-sphere-container d-flex flex-column gap-4 ">
            <div className="d-flex flex-column gap-4 px-2" style={{ maxWidth: "400px", textAlign: "center" }}>
              <h1>Product Now</h1>
              <p>
                In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual
              </p>
              <button className=" tpsecondary-btn">
                Subscribe Now
                <i className="fal fa-long-arrow-right" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
