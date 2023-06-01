import { useState } from "react";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { tokenState } from "../../atoms/userAtom";
import { watchlistState } from "../../atoms/watchlistAtom";
import WatchlistTable from "./WatchlistTable";

function WatchlistLoader({ token }) {
  // const [token, setToken] = useRecoilState(tokenState);
  const [watchlist, setWatchlist] = useRecoilState(watchlistState);

  const [stockIds, setstockIds] = useState([]);
  const [symbolData, setsymbolData] = useState(null);

  useEffect(() => {
    if (token) {
      const URL = `${process.env.REACT_APP_BACKEND_API_URL}/api/watchlist/getWatchlist/`;
      fetch(URL, {
        method: "POST",

        headers: {
          "Content-type": "application/json",
          AUTH_TOKEN: token,
        },
      })
        .then((response) => response.json())
        .then((response) => {
          setstockIds(response.watchlist.stockIds);
          setWatchlist(stockIds);
          let tempSym = {};
          for (let i = 0; stockIds.length; i++) {
            tempSym[stockIds[i]] = null;
          }

          setsymbolData(tempSym);
        });
    }
  }, []);

  if (!token) return;

  return (
    token &&
    stockIds &&
    symbolData && (
      <WatchlistTable stockIds1={stockIds} symbolData1={symbolData} />
    )
  );
}

export default WatchlistLoader;
