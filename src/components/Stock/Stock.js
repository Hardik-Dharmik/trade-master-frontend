import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Graph from "../Graph/Graph";
import Statistics from "../Statistics/Statistics";
import Summary from "../Summary/Summary";

function Stock() {
  const { stockID } = useParams();
  const [stockData, setstockData] = useState(null);
  const [openModal, setopenModal] = useState(false);
  const [stockNum, setStockNum] = useState(0);

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
            <form class="space-y-6" action="#">
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
                  for="exampleNumber0"
                  class="form-label inline-block mb-2 text-gray-700"
                >
                  Buy at
                </label>
                <input
                  type="number"
                  class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="exampleNumber0"
                  // placeholder="Ex. 1, 10, 100, 500 etc"
                  value={stockData.regularMarketPrice.raw}
                  disabled
                />
              </div>
              <button class="w-full text-white bg-green-400 hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                BUY
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

  useEffect(() => {
    const URL = `${process.env.REACT_APP_BACKEND_API_URL}/stock/${stockID}`;

    fetch(URL)
      .then((response) => response.json())
      .then((response) => {
        setstockData(response.response.result[0]);
      });
  }, []);

  if (!stockData) return null;

  console.log(stockData);

  return (
    <div className="flex flex-col md:flex-row px-5 min-h-screen bg-gray-100 min-w-fit ">
      <div className="p-2 flex flex-col">
        <div className="flex flex-col md:flex-row md:items-end items-start justify-between">
          <div className="flex flex-col py-2">
            <div className="flex items-baseline">
              <p className="text-lg font-semibold">{stockData.longName}</p>
              <p className="text-md font-semibold ml-2">({stockData.symbol})</p>
            </div>
            <p className="text-sm my-1">{stockData.exchange}</p>
            <div className="flex items-baseline">
              <p className="text-3xl text-gray-800 font-semibold">
                {stockData.regularMarketPrice.fmt} ₹
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

          <button
            className="bg-green-400 text-white rounded-lg hover:bg-green-500 mr-28  h-fit w-fit mb-10 px-5 py-2"
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

      <div className="flex flex-col mt-5 px-2 w-3/5 lg:flex-grow py-2  ">
        <Summary stockData={stockData} />
        <Statistics stockData={stockData} />
      </div>
    </div>
  );
}

export default Stock;
