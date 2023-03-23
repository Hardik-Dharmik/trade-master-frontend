import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const format = (value) => {
  return parseFloat(value).toFixed(2);
};

function PortfolioRow({ row, stockID }) {
  console.log("Row -> ", row, "StockID -> ", stockID);

  const [openModal, setopenModal] = useState(false);
  const [stockNum, setStockNum] = useState(0);
  const [modalData, setModalData] = useState({
    title: "Purchase Confirmation",
    quantity: "Stocks quantity to buy",
    at: "Buy at",
    btnContent: "BUY",
    btnbgColor: "bg-green-400",
  });

  let navigate = useNavigate();

  const handleClick = (symbol) => {
    navigate(`/stock/${symbol}`);
  };

  const [stockData, setstockData] = useState(null);
  const [profitLoss, setprofitLoss] = useState(null);

  useEffect(() => {
    if (!stockData) {
      const URL = `${process.env.REACT_APP_BACKEND_API_URL}/stock/${stockID}`;

      fetch(URL)
        .then((response) => response.json())
        .then((resp) => {
          // console.log("resp->", response);
          console.log(resp.response.result[0]);
          let response = resp.response.result[0];

          setstockData({
            id: response.symbol,
            change: parseFloat(response.regularMarketChange.raw).toFixed(2),
            changePercent: parseFloat(
              response.regularMarketChangePercent.raw
            ).toFixed(2),
            price: parseFloat(response.regularMarketPrice.raw).toFixed(2),
          });

          let boughtAtPrice = 100;
          let quantity = 10;
          let currentPrice = parseFloat(
            response.regularMarketPrice.raw
          ).toFixed(2);
          let changePercent = format(response.regularMarketPrice.raw);

          let totalInvestedAmount = boughtAtPrice * quantity;
          let currentValueOfInvestedAmount = currentPrice * quantity;

          let currentProfitLoss =
            (currentValueOfInvestedAmount - totalInvestedAmount) * quantity;

          let changeInValue = (currentProfitLoss * 100) / totalInvestedAmount;

          setprofitLoss({
            boughtAtPrice,
            changePercent,
            quantity,
            currentPrice,
            totalInvestedAmount,
            currentValueOfInvestedAmount,
            currentProfitLoss,
            changeInValue,
          });

          console.log(stockData);
        });
    }
  }, []);

  useEffect(() => {
    setstockData(row);

    if (!row) return;

    let boughtAtPrice = 100;
    let quantity = 10;
    let currentPrice = parseFloat(row.price).toFixed(2);
    let changePercent = row.changePercent;
    let totalInvestedAmount = boughtAtPrice * quantity;
    let currentValueOfInvestedAmount = currentPrice * quantity;

    let currentProfitLoss = currentValueOfInvestedAmount - totalInvestedAmount;

    let changeInValue = (currentProfitLoss * 100) / totalInvestedAmount;

    setprofitLoss({
      changePercent,
      boughtAtPrice,
      quantity,
      currentPrice,
      totalInvestedAmount,
      currentValueOfInvestedAmount,
      currentProfitLoss,
      changeInValue,
    });
  }, [row]);

  if (!stockData) return;

  const Modal = (
    <div
      tabindex="-1"
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-50  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full mx-auto bg-gray-900 bg-opacity-50 dark:bg-opacity-80  inset-0 "
    >
      <div className="relative w-full h-full max-w-md md:h-auto mx-auto">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
            data-modal-hide="authentication-modal"
            onClick={() => setopenModal(false)}
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
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
            <span className="sr-only">Close modal</span>
          </button>
          <div className="px-6 py-6 lg:px-8">
            <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
              {modalData.title}
            </h3>
            <form className="space-y-6" action="#">
              <div>
                <label
                  for="exampleNumber0"
                  className="form-label inline-block mb-2 text-gray-700"
                >
                  {modalData.quantity}
                </label>
                <input
                  type="number"
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="exampleNumber0"
                  placeholder="Ex. 1, 10, 100, 500 etc"
                  value={stockNum}
                  onChange={(e) => setStockNum(e.target.value)}
                />
              </div>

              <div>
                <label
                  for="exampleNumber1"
                  className="form-label inline-block mb-2 text-gray-700"
                >
                  {modalData.at}
                </label>
                <input
                  type="number"
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="exampleNumber1"
                  value={stockData.price}
                  disabled
                />
              </div>

              <div>
                <label
                  for="exampleNumber2"
                  className="form-label inline-block mb-2 text-gray-700"
                >
                  Cost
                </label>
                <input
                  type="number"
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="exampleNumber2"
                  value={stockData.price * stockNum}
                  disabled
                />
              </div>

              <button
                className={`w-full text-white ${modalData.btnbgColor} hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
              >
                {modalData.btnContent}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

  console.log(profitLoss);

  return (
    <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 cursor-pointer">
      <td className="px-4 py-4" onClick={() => handleClick(stockData.id)}>
        {stockData.id}
      </td>

      <td className="px-4 py-4" onClick={() => handleClick(stockData.id)}>
        {profitLoss.quantity}
      </td>

      <td className="px-4 py-4" onClick={() => handleClick(stockData.id)}>
        {format(profitLoss.boughtAtPrice)}
      </td>

      <td className="px-4 py-4" onClick={() => handleClick(stockData.id)}>
        {format(profitLoss.currentPrice)}
      </td>

      <td
        className={`px-4 py-4 ${
          stockData.changePercent > 0 ? "text-green-500" : "text-red-700"
        }`}
        onClick={() => handleClick(stockData.id)}
      >
        ₹{format(profitLoss.currentValueOfInvestedAmount)}
      </td>

      <td
        className={`px-4 py-4 ${
          stockData.changePercent > 0 ? "text-green-500" : "text-red-700"
        }`}
        onClick={() => handleClick(stockData.id)}
      >
        ₹{format(profitLoss.changeInValue)}
      </td>

      <td
        className={`px-4 py-4 ${
          stockData.changePercent > 0 ? "text-green-500" : "text-red-700"
        }`}
        onClick={() => handleClick(stockData.id)}
      >
        {format(stockData.changePercent)}%
      </td>

      <td className="px-4 py-4">
        <div className="flex text-white">
          <button
            className="bg-green-600 py-1 px-4 mr-3 rounded-sm"
            onClick={() => {
              setModalData({
                title: "Purchase Confirmation",
                quantity: "Stocks quantity to buy",
                at: "Buy at",
                btnContent: "BUY",
                btnbgColor: "bg-green-400",
              });
              setopenModal(true);
            }}
          >
            Buy
          </button>
          <button
            className="bg-red-600 py-1 px-4 ml-3 rounded-sm"
            onClick={() => {
              setModalData({
                title: "Sell Confirmation",
                quantity: "Stocks quantity to sell",
                at: "Sell at",
                btnContent: "SELL",
                btnbgColor: "bg-red-600",
              });
              setopenModal(true);
            }}
          >
            Sell
          </button>
          {openModal && Modal}
        </div>
      </td>
    </tr>
    // <p>{JSON.stringify(stockData)}</p>
  );
}

export default PortfolioRow;
