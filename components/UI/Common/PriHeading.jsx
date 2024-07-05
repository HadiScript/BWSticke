

const PriHeading = ({ one, two }) => {
  return (
    <div className="col-lg-6 col-md-6">
      <div className="tpsection mb-40">
        <h4 className="tpsection__title">
          {one}{" "}
          <span>
            {two} <img src="/assets/img/icon/title-shape-01.jpg" alt="" />
          </span>
        </h4>
      </div>
    </div>
  )
}

export default PriHeading