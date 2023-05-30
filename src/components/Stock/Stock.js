import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { tokenState } from "../../atoms/userAtom";

import { buyStock } from "../../Services/Utils/TransactionHandler";
import Colors from "../Alerts/Message";

import Graph from "../Graph/Graph";
import Statistics from "../Statistics/Statistics";
import Summary from "../Summary/Summary";
import protobuf from "protobufjs";
var Buffer = require("buffer/").Buffer;

function Stock() {
  const { stockID } = useParams();
  const [stockData, setstockData] = useState(null);
  const [openModal, setopenModal] = useState(false);
  const [stockNum, setStockNum] = useState(0);
  const [liveData, setLiveData] = useState(null);
  const [watchListBtn, setwatchListBtn] = useState("Add to watchlist");
  const token = useRecoilValue(tokenState);
  // console.log(token);
  let symbolData = {};
  const ws = useRef(null);

  useEffect(() => {
    const URL = `${process.env.REACT_APP_BACKEND_API_URL}/stock/${stockID}`;
    console.log(URL);
    fetch(URL, { mode: "cors" })
      .then((response) => response.json())
      .then((response) => {
        console.log("resp->", response);
        setstockData(response.response.result[0]);
      });
  }, []);

  useEffect(() => {
    let currentTime = new Date(),
      t = true;

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
      let wsCurrent = null;
      protobuf.load("/YPricingData.proto", (err, root) => {
        if (err) {
          return console.log(err);
        }
        const Yaticker = root.lookupType("yaticker");
        const symbols = [stockID];

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

        wsCurrent = ws.current;

        ws.current.onmessage = function incoming(data) {
          console.log("comming message");
          const response = Yaticker.decode(new Buffer(data.data, "base64"));
          setLiveData({
            change: parseFloat(response.change).toFixed(2),
            changePercent: parseFloat(response.changePercent).toFixed(2),
            price: parseFloat(response.price).toFixed(2),
            time: new Date().toLocaleString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            }),
          });
        };
      });
    }
  }, [stockData]);

  const addToWatchlist = (stockSymbol) => {
    // console.log("clicked");
    if (token) {
      const URL = `${process.env.REACT_APP_BACKEND_API_URL}/api/watchlist/addToWatchlist/`;
      // const URL = "http://localhost:4000/api/watchlist/addToWatchlist/";
      // console.log(token);
      fetch(URL, {
        method: "POST",

        body: JSON.stringify({
          stockId: stockSymbol,
        }),

        headers: {
          "Content-type": "application/json",
          AUTH_TOKEN: token,
        },
      })
        .then((response) => response.json())
        .then((response) => console.log(response));
      setwatchListBtn("Added to watchlist.");
      console.log(stockSymbol + " added to watchlist");
    }
  };

  const buy = (stockId) => {
    const price = stockData.regularMarketPrice.raw,
      quantity = stockNum;

    const purchaseInfo = { stockId, stockNum, price };

    buyStock(purchaseInfo, token);
  };

  const Modal = stockData && (
    <div
      tabindex="-1"
      aria-hidden="true"
      class="fixed top-0 left-0 right-0 z-50  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full mx-auto bg-gray-900 bg-opacity-50 dark:bg-opacity-80  inset-0 "
    >
      <div class="relative w-full h-full max-w-md md:h-auto mx-auto">
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button
            type="button"
            class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
            data-modal-hide="authentication-modal"
            onClick={() => setopenModal(false)}
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
          <div class="px-6 py-6 lg:px-8">
            <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
              Purchase Confirmation
            </h3>
            <form class="space-y-6">
              <div>
                <label
                  for="exampleNumber0"
                  class="form-label inline-block mb-2 text-gray-700"
                >
                  Stocks quantity to buy
                </label>
                <input
                  type="number"
                  class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="exampleNumber0"
                  placeholder="Ex. 1, 10, 100, 500 etc"
                  value={stockNum}
                  onChange={(e) => setStockNum(e.target.value)}
                />
              </div>

              <div>
                <label
                  for="exampleNumber1"
                  class="form-label inline-block mb-2 text-gray-700"
                >
                  Buy at
                </label>
                <input
                  type="number"
                  class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="exampleNumber1"
                  value={stockData.regularMarketPrice.raw}
                  disabled
                />
              </div>

              <div>
                <label
                  for="exampleNumber2"
                  class="form-label inline-block mb-2 text-gray-700"
                >
                  Order Cost
                </label>
                <input
                  type="number"
                  class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="exampleNumber2"
                  value={stockData.regularMarketPrice.raw * stockNum}
                  disabled
                />
              </div>

              <button
                class="w-full text-white bg-green-400 hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() => {
                  buy(stockID);
                }}
              >
                BUY
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    stockData && (
      <div className="flex flex-col md:flex-row px-5 min-h-screen bg-gray-100 min-w-fit ">
        <div className="p-2 flex flex-col">
          <div className="flex flex-col md:flex-row md:items-end items-start justify-between">
            <div className="flex flex-col py-2">
              <div className="flex items-baseline">
                <p className="text-lg font-semibold">{stockData.longName}</p>
                <p className="text-md font-semibold ml-2">
                  ({stockData.symbol})
                </p>
              </div>
              <p className="text-sm my-1">{stockData.exchange}</p>
              <div className="flex items-baseline">
                <p className="text-3xl text-gray-800 font-semibold">
                  {liveData && parseFloat(liveData.price).toFixed(2)} ₹
                </p>
                <p
                  className={`mx-3 text-xl font-semibold ${
                    liveData && liveData.change > 0
                      ? "text-green-500"
                      : "text-red-700"
                  }`}
                >
                  {liveData && liveData.change > 0 && "+"}
                  {liveData && parseFloat(liveData.change).toFixed(2)}
                </p>
                <p
                  className={`text-xl font-semibold ${
                    liveData?.changePercent > 0
                      ? "text-green-500"
                      : "text-red-700"
                  }`}
                >
                  ({liveData?.changePercent > 0 && "+"}
                  {liveData && parseFloat(liveData.changePercent).toFixed(2)}%)
                </p>
              </div>
              <p className="my-1 text-xs">Price at {liveData?.time}</p>
            </div>

            <button
              className="bg-blue-400 text-white rounded-lg hover:bg-blue-500 mr-10  h-fit w-fit mb-10 px-5 py-2"
              onClick={() => addToWatchlist(stockData.symbol)}
            >
              {watchListBtn}
            </button>

            <button
              className="bg-green-400 text-white rounded-lg hover:bg-green-500 mr-5  h-fit w-fit mb-10 px-5 py-2"
              onClick={() => setopenModal(true)}
            >
              BUY
            </button>

            {openModal && Modal}
          </div>
          <div>
            <Graph symbol={stockData.symbol} />
          </div>
        </div>

        <div className="flex flex-col mt-5 px-2 flex-grow py-2  ">
          <Summary stockData={stockData} />
          <Statistics stockData={stockData} />
        </div>
      </div>
    )
  );
}

export default Stock;
