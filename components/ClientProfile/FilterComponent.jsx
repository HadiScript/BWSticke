
import { useEffect, useState } from "react";

const FilterComponent = ({ filterText, onFilter, onClear, placeholder }) => {
  const [data, setData] = useState("");

  function search() {
    onFilter(data);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      onFilter(data);
    }
  }

  useEffect(() => {
    if (data.length === 0) {
      onClear();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  return (
    <div className="d-flex">
      <input
        id="search"
        
        placeholder={`Filter By ${placeholder ? placeholder : "Name"}`}
        aria-label="Search Input"
        className={"form-control"}
        value={data}
        onChange={(e) => setData(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      {filterText && filterText.length > 0 ? (
        <button
          type="button"
          className={"mx-3"}
          onClick={() => {
            setData("");
            onClear();
          }}
        >
          X
        </button>
      ) : (
        <button
          type="button"
          className={""}
          onClick={search}
        >
         <div className="fa fas-search"></div>
          {/* <Search width={15} height={15} /> */}
        </button>
      )}
    </div>
  );
};
export default FilterComponent;
