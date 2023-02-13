import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Graph from "../Graph/Graph";

function Stock() {
  const { stockID } = useParams();
  const [stockData, setstockData] = useState(null);

  useEffect(() => {
    fetch(`https://trade-master-backend.vercel.app/stock/${stockID}`)
      .then((response) => response.json())
      .then((response) => {
        setstockData(response.response.result[0]);
      });
  }, []);

  if (!stockData) return null;

  console.log(stockData);
  return (
    <div className="flex px-5 min-h-screen bg-gray-100 min-w-screen">
      <div className="p-2 flex flex-col">
        <div className="flex flex-col py-2">
          <div className="flex items-baseline">
            <p className="text-lg font-semibold">{stockData.longName}</p>
            <p className="text-md font-semibold ml-2">({stockData.symbol})</p>
          </div>
          <p className="text-sm my-1">{stockData.exchange}</p>
          <div className="flex items-baseline">
            <p className="text-3xl text-gray-800 font-semibold">
              {stockData.regularMarketPrice.fmt}
            </p>
            <p
              className={`mx-3 text-xl font-semibold ${
                stockData.regularMarketChange.raw > 0
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {stockData.regularMarketChange.raw > 0 && "+"}
              {stockData.regularMarketChange.fmt}
            </p>
            <p
              className={`text-xl font-semibold ${
                stockData.regularMarketChange.raw > 0
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              ({stockData.regularMarketChange.raw > 0 && "+"}
              {stockData.regularMarketChangePercent.fmt})
            </p>
          </div>
          <p className="my-1 text-xs">
            Price at {stockData.regularMarketTime.fmt}
          </p>
        </div>
        <div>
          <Graph symbol={stockData.symbol} />
        </div>
      </div>
    </div>
  );
}

export default Stock;
