import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useRecoilState } from "recoil";
import { tokenState } from "../../atoms/userAtom";
import { watchlistState } from "../../atoms/watchlistAtom";

function WatchlistRow({ row, stockID }) {
  console.log("Row -> ", row, "StockID -> ", stockID);
  let navigate = useNavigate();
  // const [stockData, setstockData] = useState(row);
  const token = useRecoilValue(tokenState);

  const [watchlist, setWatchlist] = useRecoilState(watchlistState);
  console.log("watchlist", watchlist);
  const handleClick = (symbol) => {
    navigate(`/stock/${symbol}`);
  };

  // let stockData = row;
  const [stockData, setstockData] = useState(null);

  useEffect(() => {
    if (!stockData) {
      const URL = `${process.env.REACT_APP_BACKEND_API_URL}/stock/${stockID}`;

      fetch(URL)
        .then((response) => response.json())
        .then((resp) => {
          // console.log("resp->", response);
          console.log(resp.response.result[0]);
          let response = resp.response.result[0];
          // stockData = {
          //   id: response.symbol,
          //   change: parseFloat(response.regularMarketChange.raw).toFixed(2),
          //   changePercent: parseFloat(
          //     response.regularMarketChangePercent.raw
          //   ).toFixed(2),
          //   price: parseFloat(response.regularMarketPrice.raw).toFixed(2),
          // };

          setstockData({
            id: response.symbol,
            change: parseFloat(response.regularMarketChange.raw).toFixed(2),
            changePercent: parseFloat(
              response.regularMarketChangePercent.raw
            ).toFixed(2),
            price: parseFloat(response.regularMarketPrice.raw).toFixed(2),
          });

          console.log(stockData);
        });
    }
  }, []);

  useEffect(() => {
    setstockData(row);
  }, [row]);

  const remove = async (stockID) => {
    return;
  };

  if (!stockData) return;

  return (
    <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 cursor-pointer">
      <td onClick={() => handleClick(stockData.id)} className="px-4 py-4">
        {stockData.id}
      </td>

      <td onClick={() => handleClick(stockData.id)} className="px-4 py-4">
        {parseFloat(stockData.price).toFixed(2)}
      </td>
      <td
        onClick={() => handleClick(stockData.id)}
        className={`px-4 py-4 ${
          stockData.changePercent > 0 ? "text-green-500" : "text-red-700"
        }`}
      >
        {parseFloat(stockData.change).toFixed(2)}
      </td>
      <td
        onClick={() => handleClick(stockData.id)}
        className={`px-4 py-4 ${
          stockData.changePercent > 0 ? "text-green-500" : "text-red-700"
        }`}
      >
        {parseFloat(stockData.changePercent).toFixed(3)}%
      </td>
    </tr>
  );
}

export default WatchlistRow;
