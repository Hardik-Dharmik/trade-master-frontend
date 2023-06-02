import { useState } from "react";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { tokenState } from "../../atoms/userAtom";
import { watchlistState } from "../../atoms/watchlistAtom";
import WatchlistTable from "./WatchlistTable";

import { Bars } from 'react-loader-spinner'


function WatchlistLoader({ token }) {
  // const [token, setToken] = useRecoilState(tokenState);
  const [watchlist, setWatchlist] = useRecoilState(watchlistState);

  const [stockIds, setstockIds] = useState([]);
  const [symbolData, setsymbolData] = useState(null);
  const [isLoading, setisLoading] = useState(true);


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

      const timer = setTimeout(() => setisLoading(false), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!token) return;

  return (
    token &&
    stockIds &&
    symbolData && (
      <div className={`${isLoading && 'flex justify-center items-center mt-40'}`}>
        {
          isLoading ? <div className="flex -mt-5">
            <Bars
              height="100"
              width="100"
              color="#4fa94d"
              ariaLabel="bars-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div> :
            <WatchlistTable stockIds1={stockIds} symbolData1={symbolData} />
        }
      </div>
    )
  );
}

export default WatchlistLoader;
