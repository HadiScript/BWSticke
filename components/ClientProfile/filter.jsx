

const FilterComponent = ({ filterText, onFilter, onClear, placeholder }) => (
  <>
    <input
      id="search"
      type="text"
      placeholder={`Filter By ${placeholder ? placeholder : "Name"}`}
      // aria-label="Search Input"
      className={"form-control mb-4"}
      value={filterText}
      onChange={onFilter}
      style={{ maxWidth: "300px" }}
    />
    {/* <button
      type="button"
      className={"classes.search_bar_button"}
      onClick={onClear}
    >
      X
    </button> */}
  </>
);

export default FilterComponent;
