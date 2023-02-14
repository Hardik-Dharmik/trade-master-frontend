import { useEffect, useState } from "react";
import { rangeToInterval } from "../Services/Constants/rangeToInterval";

function usePeriodicData(timePeriod, stockID) {
  const interval = rangeToInterval(timePeriod);
  const [data, setData] = useState(null);
  console.log(timePeriod, stockID);
  useEffect(() => {
    fetch(`http://localhost:4000/history/${stockID}/${interval}/${timePeriod}`)
      .then((response) => response.json())
      .then((response) => {
        setData(response.response);
      });
  }, [timePeriod, stockID]);

  return [data];
}

export default usePeriodicData;
