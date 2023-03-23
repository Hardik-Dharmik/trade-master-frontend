import React, { useState, useRef, useEffect } from "react";
import PortfolioRow from "./PortfolioRow";
import protobuf from "protobufjs";
var Buffer = require("buffer/").Buffer;

const stockIds = ["RR.L", "GLEN.L", "TATASTEEL.BO", "EDV.L"];

const helper = () => {
  let symbolData = {};

  for (let i = 0; i < stockIds.length; i++) {
    symbolData[stockIds[i]] = null;
  }

  return symbolData;
};

const portfolioData = [
  {
    symbol: "TATASTEEL.BO",
    stockName: "Tata Steel Pvt. Ltd",
    change: "1.2",
    changePercent: "0.1%",
    quantity: "100",
    boughtAt: "101.3",
    currentValue: "110.23",
  },
  {
    symbol: "ADANIPOWER.BO",
    stockName: "Tata Steel Pvt. Ltd",
    change: "1.2",
    changePercent: "0.1%",
    quantity: "100",
    boughtAt: "101.3",
    currentValue: "110.23",
  },
];

function PortfolioTable() {
  const [stockData, setstockData] = useState(null);
  const [openModal, setopenModal] = useState(false);
  const [stockNum, setStockNum] = useState(0);
  const [liveData, setLiveData] = useState(null);
  const ws = useRef(null);

  const [symbolData, setSymbolData] = useState(helper);

  useEffect(() => {
    for (let i = 0; i < stockIds.length; i++) {
      symbolData[stockIds[i]] = null;
    }

    let currentTime = new Date(),
      t = false;

    let hours = currentTime.getHours();
    if ((hours < 9 || hours >= 15) && t) {
      setLiveData({
        change: parseFloat(stockData?.regularMarketChange.raw).toFixed(2),
        changePercent: parseFloat(
          stockData?.regularMarketChangePercent.raw
        ).toFixed(2),
        price: parseFloat(stockData?.regularMarketPrice.raw).toFixed(2),
        time: new Date().toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        }),
      });
    } else {
      console.log("Live data on!!");
      ws.current = new WebSocket("wss://streamer.finance.yahoo.com");

      protobuf.load("/YPricingData.proto", (err, root) => {
        if (err) {
          return console.log(err);
        }
        const Yaticker = root.lookupType("yaticker");
        const symbols = stockIds;

        ws.current.onopen = function open() {
          console.log("connected");
          ws.current.send(
            JSON.stringify({
              subscribe: symbols,
            })
          );
        };

        ws.current.onclose = function close() {
          console.log("disconnected");
        };

        ws.current.onmessage = function incoming(data) {
          console.log("comming message");
          const response = Yaticker.decode(new Buffer(data.data, "base64"));

          setSymbolData((prevState) => ({
            ...prevState,
            [response.id]: response,
          }));
        };
      });
    }
  }, []);

  const tableHeadings = [
    "Symbol",
    "Qty",
    "Bought at",
    "Cur. price",
    "Cur. val",
    "P&L",
    "Net chg.",
    "Buy/Sell",
  ];

  return (
    <div className="relative overflow-x-auto">
      <table className="w-4/5 text-sm text-left text-gray-500 dark:text-gray-400 mx-auto">
        <thead className="text-xs text-gray-700  bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {tableHeadings.map((heading) => (
              <th scope="col" className="px-4 py-3">
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.keys(symbolData).map((row, i) => (
            <PortfolioRow row={symbolData[row]} stockID={row} key={i} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PortfolioTable;
