import axios from "axios";
import Weather from "@/pages/Components/Weather";
import React from "react";
import Location from "@/pages/Components/Location";

// http://api.weatherapi.com/v1/current.json?key=f4ce20c33eba4bc6b7c94744230104&q=ML110PP&aqi=no
export default function Home() {
  const [request, setRequest] = React.useState(null);
  const [pCode, setPCode] = React.useState("G444QQ");
  const [day, setDay] = React.useState(true);
  /*const [ip, setIp] = React.useState(null);*/
  React.useEffect(() => {
    getWeatherData(); // get weather data on page load
  });
  function getWeatherData() {
    // get weather data from api
    axios
      .get(
        "https://api.weatherapi.com/v1/current.json?key=f4ce20c33eba4bc6b7c94744230104&q=" +
          pCode +
          "&aqi=no"
      )
      .then((res) => {
        if (res.status === 200) {
          // valid postcode
          setRequest(res.data);
          res.data.current.is_day === 1 ? setDay(true) : setDay(false);
        } else if (res.status === 400) {
          // invalid postcode
          alert("Invalid postcode");
        }
      });
  }
  if (!request) return null;
  function handleSubmit(e) {
    /** @param e - event object
     * @returns null
     * @example handleSubmit(e) updates postcode state with user input then updates weather data
     */
    // updates postcode state with user input then updates weather data
    e.preventDefault(); // prevent page refresh
    // validate postcode from user input. If valid, postcode is String, if not valid, postcode is null
    let postcode = validatePostCode(e.target.postCode.value);
    if (!postcode) {
      // validatePostCode returns null
      alert("Invalid postcode");
      return;
    }
    setPCode(postcode); // update postcode state
    getWeatherData(); // update weather data
  }
  function validatePostCode(input) {
    /** @param input - string containing postcode
     * @returns string containing postcode if valid, null if invalid
     * @example validatePostCode("ML11 0PP") returns "ML110PP"
     * @example validatePostCode("ML11 0PPP") returns null
     * @example validatePostCode("ML11 0P") returns null
     */
    // validate postcode
    let postcode = input.replace(/\s/g, ""); // remove spaces
    postcode = postcode.replace(/[^a-zA-Z0-9]/g, ""); // remove special characters
    let regexUK = /^[A-Z]{1,2}[0-9]{1,2}[A-Z]?[0-9][A-Z]{2}$/i; // regex for UK postcodes
    let regexUS = /^\d{5}(-\d{4})?$/; // regex for US postcodes
    let regexCA = /^[A-Z]\d[A-Z] ?\d[A-Z]\d$/i; // regex for Canadian postcodes
    if (
      regexUK.test(postcode) ||
      regexUS.test(postcode) ||
      regexCA.test(postcode)
    ) {
      return postcode;
    } else {
      return null;
    }
  }
  if (day) {
    document.body.classList.remove("night");
    document.body.classList.add("day");
  } else {
    document.body.classList.remove("day");
    document.body.classList.add("night");
  }

  return (
    <body>
      <div id={'background-wrap'}>
        <div className={"x1"}>
          <div className={"cloud"}></div>
        </div>
        <div className={"x2"}>
          <div className={"cloud"}></div>
        </div>
        <div className={"x3"}>
          <div className={"cloud"}></div>
        </div>
      </div>
      <div className={"container"}>
        <div className={"header"}>
          <div className={"title"}>Weather App</div>
          <form onSubmit={handleSubmit}>
            <input name={"postCode"} defaultValue={pCode} />
            <button type={"submit"}>Submit</button>
          </form>
        </div>
        <Location request={request} />
        <Weather request={request} />
      </div>
    </body>
  );
}
