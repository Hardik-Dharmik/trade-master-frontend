import { useRef, useState, useEffect } from "react";
import WatchlistRow from "./WatchlistRow";
import protobuf from "protobufjs";
var Buffer = require("buffer/").Buffer;

let stockIds = [];

const helper = () => {
  let symbolData = {};

  for (let i = 0; i < stockIds.length; i++) {
    symbolData[stockIds[i]] = null;
  }

  return symbolData;
};

function WatchlistTable({ stockIds1, symbolData1 }) {
  console.log("dkjncjn", stockIds1);
  console.log("klknop", symbolData1);
  stockIds = stockIds1;
  const [stockData, setstockData] = useState(null);
  const [openModal, setopenModal] = useState(false);
  const [stockNum, setStockNum] = useState(0);
  const [liveData, setLiveData] = useState(null);
  const ws = useRef(null);

  const [symbolData, setSymbolData] = useState(symbolData1);

  useEffect(() => {
    for (let i = 0; i < stockIds.length; i++) {
      symbolData[stockIds[i]] = null;
    }

    let currentTime = new Date(),
      t = false;

    let hours = currentTime.getHours();
    if ((hours < 9 || hours >= 15) && !t) {
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

  if (!stockIds1) return null;
  console.log(symbolData);
  return (
    <div className="relative overflow-x-auto">
      <table className="w-4/5 text-sm text-left text-gray-500 dark:text-gray-400 mx-auto">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-4 py-3">
              Symbol
            </th>

            <th scope="col" className="px-4 py-3">
              Current price (₹)
            </th>

            <th scope="col" className="px-4 py-3">
              Change (₹)
            </th>

            <th scope="col" className="px-4 py-3">
              Change %
            </th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(symbolData).map((row, i) => (
            <WatchlistRow row={symbolData[row]} stockID={row} key={i} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default WatchlistTable;
