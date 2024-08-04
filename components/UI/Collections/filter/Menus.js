import { CaretDownFill } from "@styled-icons/bootstrap";
import { useState } from "react";

export default function Menus({ update }) {
  const [show, setShow] = useState(false);
  const data = [
    { name: "Default", id: "db" },
    { name: "Newest", id: "db" },
    { name: "Oldest", id: "da" },
    { name: "Price: low to high", id: "pa" },
    { name: "Price: high to low", id: "pb" },
    { name: "Name: A-Z", id: "na" },
    { name: "Name: Z-A", id: "nb" },
  ];
  const [selected, setSelected] = useState(data[0]);

  function changeItem(id) {
    setShow(false);
    setSelected(id);
    console.log(id);
    update(id);
  }

  return (
    <>
      {/* <div
        className="d-flex align-items-center justify-content-between border rounded-3 px-3 py-2 chosen-single  "
        role="button"
        onClick={() => setShow(!show)}
      >
        <div>{selected.name}</div>
        <CaretDownFill width={10} height={10} />
      </div>
      <div className="chosen-single px-3 py-2">
        {show && (
          <ul>
            {data.map((item, idx) => (
              <li role="button " key={idx} onClick={() => changeItem(item)}>
                {item.name}
              </li>
            ))}
          </ul>
        )}
      </div> */}

      <select value={selected} className="chosen-single form-select" onChange={(e) => changeItem(e.target.value)}>
       
        {data.map((item, idx) => (
          <option key={idx} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
    </>
  );
}
