import React, { useEffect } from "react";
import weatherCodes from "../weather_codes.json";

type sectionProps = {
  request: any;
};
function Weather({ request }: sectionProps) {
  const [weatherData, setWeatherData] = React.useState(request);
  const [ip, setIp] = React.useState(null);

  useEffect(() => {
    setWeatherData(request);
  }, [request]);

  if (!weatherData) return null;
  function getWeatherIcon(code = 1000, isDay = 1): [string, string] | undefined {
    let icon = "";
    let description = "";
    for (let key in weatherCodes) {
      if (weatherCodes[key]["code"] == code) {
        if (isDay == 1) {
          description = weatherCodes[key]["day"];
          icon =
            "./images/Weather_API_Icons_Day/" +
            weatherCodes[key]["icon"].toString() +
            ".svg";
        } else {
          description = weatherCodes[key]["night"];
          icon =
            "./images/Weather_API_Icons_Night/" +
            weatherCodes[key]["icon"].toString() +
            ".svg";
        }
        return [icon, description];
      }
    }
  }
  let iconCode = weatherData["current"]["condition"]["code"];
  let isDay = weatherData["current"]["is_day"];
  let iconInfo = getWeatherIcon(iconCode, isDay) as [string, string];
  return (
    <>
      <div className={"weatherHolder"}>
        <div className={"weather_icon_holder"}>
          <img className={"weather_icon"} src={iconInfo[0]}  alt={'weather icon'}/>
        </div>
        <div className={"weather_description"}>{iconInfo[1]}</div>
        <div className={"weather_temp"}>
          <div className={"temp_data"}>
            {weatherData["current"]["temp_c"]}&#176;c (feels like{" "}
            {weatherData["current"]["feelslike_c"]}&#176;c)
          </div>
        </div>
        <h1>{ip}</h1>
      </div>
    </>
  );
}

export default Weather;
