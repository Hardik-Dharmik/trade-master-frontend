import { useEffect, useState } from "react";

function useWatchlist(token) {
  console.log("Token : ", token);
  const [data, setData] = useState(null);
  let symbolData = {};

  // const URL = `${process.env.REACT_APP_BACKEND_API_URL}/api/watchlist/addToWatchlist/`;
  const URL = "http://localhost:4000/api/watchlist/getWatchlist/";

  useEffect(() => {
    if (!token) return;
    fetch(URL, {
      method: "POST",

      headers: {
        "Content-type": "application/json",
        AUTH_TOKEN: token,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setData(response.watchlist.stockIds);
      });
  }, []);

  // for (let i = 0; data && i < data.length; i++) {
  //   if (data[i] != null) symbolData[data[i]] = null;
  // }

  // console.log("useff", symbolData);

  // return [data, symbolData];

  return [data];
}

export default useWatchlist;
