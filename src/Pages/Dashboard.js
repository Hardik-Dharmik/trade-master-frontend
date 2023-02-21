import { useState, useEffect } from "react";
import DashboardCard from "../components/Dashboard/DashboardCard";
import Graph from "../components/Graph/Graph";

function Dashboard() {
  const [index, setIndex] = useState("%5EBSESN");
  const [stockData, setstockData] = useState(null);

  useEffect(() => {
    const URL = `${process.env.REACT_APP_BACKEND_API_URL}/stock/${index}`;

    fetch(URL)
      .then((response) => response.json())
      .then((response) => {
        setstockData(response.response.result[0]);
      });
  }, [index]);

  if (!stockData) return null;

  console.log(stockData);

  const summary1 = [
    {
      pointName: "Previous Close",
      value: stockData.regularMarketPreviousClose,
    },
    { pointName: "Day Range", value: stockData.regularMarketDayRange },
    { pointName: "Day High", value: stockData.regularMarketDayHigh },
    { pointName: "Day Low", value: stockData.regularMarketDayLow },
    { pointName: "Open", value: stockData.regularMarketOpen },
  ];

  return (
    <div className="min-h-screen px-2 bg-gray-100 py-2 min-w-fit">
      <p className="mx-14 text-xl font-semibold">Your wallet</p>

      <div className="p-2 flex flex-row min-w-fit justify-evenly items-center">
        <DashboardCard heading="Total amount invested" value={10000} />
        <DashboardCard heading="Profit/Loss" value={10000} />
        <DashboardCard heading="Profit/Loss %" value={10000} />
        <DashboardCard heading="Wallet amount" value={10000} />
      </div>

      <div className="flex flex-col md:flex-row ml-14">
        <div className="flex flex-col">
          <div className="flex my-4 items-center">
            <p
              className={` mx-2 px-3 py-2 hover:bg-blue-100  hover:text-blue-500 cursor-pointer outline-none max-w-fit ${
                index === "%5EBSESN" && "text-blue-500 bg-blue-100"
              }`}
              onClick={() => setIndex("%5EBSESN")}
            >
              Sensex
            </p>

            <p
              className={` mx-2 px-3 py-2 hover:bg-blue-100  hover:text-blue-500 cursor-pointer outline-none max-w-fit ${
                index === "%5ENSEI" && "text-blue-500 bg-blue-100"
              }`}
              onClick={() => setIndex("%5ENSEI")}
            >
              Nifty
            </p>
          </div>

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

          {index === "%5EBSESN" ? (
            <Graph symbol="%5EBSESN" />
          ) : (
            <Graph symbol="%5ENSEI" />
          )}
        </div>

        <div className="flex bg-white rounded-lg shadow-lg p-2 flex-col ml-10 w-fit h-fit md:flex-grow mx-auto flex-grow mr-14 my-5">
          <div className="flex flex-col py-3 px-3">
            <p className="font-semibold text-green-500">{stockData.longName}</p>
            {summary1.map((point) => (
              <div className="flex justify-between flex-grow bg-pink- my-2 sm:text-sm">
                <p>{point.pointName}</p>
                <p className="font-semibold">{point.value.fmt} ₹</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
