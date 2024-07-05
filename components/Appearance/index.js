// import { useSelector } from "react-redux";
import { hexToRgb } from "~/lib/clientFunctions";

export default function Appearance(params) {
  // const { settingsData: d } = useSelector((state) => state.settings);

  return (
    <style global jsx>
      {`
        :root {
          --primary: ${"#ffc107"};
          --primary_contrast: ${"#ffffff"};
          --primary_light: ${"#ffd763"};
          --primary_light_contrast: ${"#000000"};
          --secondary: ${"#EF4A23"};
          --secondary_contrast: ${"#ffffff"};
          --blue_white: #f9fbfd;
          --primary_opacity: ${hexToRgb("#ffd763")};
          --black: #393939;
          --deep_black: #000000;
          --light_black: #848484;
          --grey: ${"#d9e0e5"};
          --grey_contrast: ${"#000000"};
          --light_gray: #fafafa;
          --deep_gray: #dbdbdb;
          --white: #ffffff;
          --danger: #cf4436;
          --success: #198754;
          --success_hover: #157347;
          --border_color: #dfdfdf;
        }
      `}
    </style>
  );
}
