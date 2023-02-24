import { useEffect, useState } from "react";
import { rangeToInterval } from "../Services/Constants/rangeToInterval";

function usePeriodicData(timePeriod, stockID) {
  const interval = rangeToInterval(timePeriod);
  const [data, setData] = useState(null);

  const URL = `${process.env.REACT_APP_BACKEND_API_URL}/history/${stockID}/${interval}/${timePeriod}`;

  useEffect(() => {
    fetch(URL)
      .then((response) => response.json())
      .then((response) => {
        setData(response.response);
      });
  }, [timePeriod, stockID]);

  return [data];
}

export default usePeriodicData;
