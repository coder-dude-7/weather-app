import axios from "axios";
import React, { useEffect } from "react";
import Image from "next/image";

type sectionProps = {
    request: any;
};
function Location({ request }: sectionProps) {
    const [apiData, setApiData] = React.useState(request);

    let localtime = apiData["location"]["localtime"]; // get string containing date and time
    function getDateString(inputDate: string) {
        /**
         * @param inputDate - string containing date in format YYYY-MM-DD HH:MM:SS
         * @returns string containing date in format Month DD YYYY
         * @example getDateString("2021-09-11 12:00:00") returns "September 11, 2021"
         */
            // get date in proper format
        let day,
            month,
            year = "";
        let months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];
        year = inputDate.substring(0, inputDate.indexOf("-"));
        inputDate = inputDate.substring(inputDate.indexOf("-") + 1);
        month = inputDate.substring(0, inputDate.indexOf("-"));
        inputDate = inputDate.substring(inputDate.indexOf("-") + 1);
        day = inputDate.substring(0, inputDate.indexOf(" "));
        return months[parseInt(month) - 1] + " " + day + ", " + year;
    }
    let dateStr = getDateString(localtime); // get date in proper format
    let timeStr = localtime.substring(localtime.indexOf(" ")); // extract time string from date string

    useEffect(() => {
        setApiData(request);
    }, [request]);

    if (!apiData) return null;
    return (
        <>
            <div className={"locationHolder"}>
                <div className={"location"}>{request["location"]["name"]}</div>
                <div className={"region"}>{request["location"]["region"]}</div>
                <div className={"dateTimeHolder"}>
                    <div className={"dateTime"}>{timeStr}</div>
                    <div className={"dateTime"}>|</div>
                    <div className={"dateTime"}>{dateStr}</div>
                </div>
            </div>
        </>
    );
}

export default Location;
