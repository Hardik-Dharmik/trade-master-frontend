import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { tokenState } from "../../atoms/userAtom";
import { transactionAtom } from "../../atoms/transactionAtom";

import { buyStock, sellStock } from "../../Services/Utils/TransactionHandler";

const format = (value) => {
  return parseFloat(value).toFixed(2);
};

function PortfolioRow({ row, stockID, holding, holdingID }) {
  const token = useRecoilValue(tokenState);
  const [openBuyModal, setopenBuyModal] = useState(false);
  const [openSellModal, setopenSellModal] = useState(false);
  const [isBuyModal, setIsBuyModal] = useState(false);

  const [transactionMsg, setTransactionMsg] = useRecoilState(transactionAtom);

  const [stockNum, setStockNum] = useState(1);
  const [modalData, setModalData] = useState({
    title: "Purchase Confirmation",
    quantity: "Stocks quantity to buy",
    at: "Buy at",
    btnContent: "BUY",
    btnbgColor: "bg-green-400",
  });

  const [stockData, setstockData] = useState(null);
  const [profitLoss, setprofitLoss] = useState(null);
  const [warning, setWarning] = useState(false);

  let navigate = useNavigate();

  const handleClick = (symbol) => {
    navigate(`/stock/${symbol}`);
  };

  const buy = (stockId) => {
    const price = profitLoss.currentPrice,
      quantity = stockNum;

    const purchaseInfo = { stockId, stockNum, price };

    buyStock(purchaseInfo, token);

    setopenBuyModal(false);

    setTransactionMsg({
      isMsgAvailable: true,
      msg: "Purchase successful !! \n" + (price * quantity) + " ₹ has been debited."
    })

    navigate(`/portfolio/`);
  };

  const sell = (holdingId) => {
    const price = profitLoss.currentPrice,
      quantity = stockNum;

    const purchaseInfo = { holdingId, stockNum, price };

    sellStock(purchaseInfo, token);

    setopenSellModal(false);

    setTransactionMsg({
      isMsgAvailable: true,
      msg: "Sell successful !! \n " + (price * quantity) + " ₹ has been credited."
    })

    navigate(`/portfolio/`);
  }

  useEffect(() => {
    if (!stockData) {
      const URL = `${process.env.REACT_APP_BACKEND_API_URL}/stock/${stockID}`;

      fetch(URL)
        .then((response) => response.json())
        .then((resp) => {
          let response = resp.response.result[0];

          setstockData({
            id: response.symbol,
            change: parseFloat(response.regularMarketChange.raw).toFixed(2),
            changePercent: parseFloat(
              response.regularMarketChangePercent.raw
            ).toFixed(2),
            price: parseFloat(response.regularMarketPrice.raw).toFixed(2),
          });

          let boughtAtPrice = holding.boughtAt.$numberDecimal;
          let quantity = holding.volume;
          let currentPrice = parseFloat(
            response.regularMarketPrice.raw
          ).toFixed(2);
          let changePercent = format(response.regularMarketPrice.raw);

          let totalInvestedAmount = boughtAtPrice * quantity;
          let currentValueOfInvestedAmount = currentPrice * quantity;

          let currentProfitLoss =
            (currentValueOfInvestedAmount - totalInvestedAmount);

          let changeInValue = (currentProfitLoss * 100) / totalInvestedAmount;

          // console.log("Change in value 2.0 -> ", changeInValue, currentProfitLoss)


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
        });
    }
  }, []);

  useEffect(() => {
    setstockData(row);

    if (!row) return;

    let boughtAtPrice = holding.boughtAt.$numberDecimal;
    let quantity = holding.volume;
    let currentPrice = parseFloat(row.price).toFixed(2);
    let changePercent = row.changePercent;
    let totalInvestedAmount = boughtAtPrice * quantity;
    let currentValueOfInvestedAmount = currentPrice * quantity;

    let currentProfitLoss = currentValueOfInvestedAmount - totalInvestedAmount;

    let changeInValue = (currentProfitLoss * 100) / totalInvestedAmount;
    // console.log("Change in value -> ", changeInValue, currentProfitLoss)
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

  useEffect(() => {
    if (profitLoss && stockNum > profitLoss.quantity) {
      setWarning(true);
    } else {
      setWarning(false);
    }

  }, [stockNum])


  if (!stockData || !holding || !stockID) return;

  const buyModal = stockData && (
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
            onClick={() => setopenBuyModal(false)}
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
              Purchase Confirmation
            </h3>
            <div className="space-y-6">
              <div>
                <label
                  for="exampleNumber0"
                  className="form-label inline-block mb-2 text-gray-700"
                >
                  Stocks quantity to buy
                </label>
                <input
                  type="number"
                  min={1}
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
                  Buy at
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
                  Order Cost
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
                class="w-full text-white bg-green-400 hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() => {
                  buy(stockID);
                }}
              >
                BUY
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const sellModal = stockData && (
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
            onClick={() => setopenSellModal(false)}
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
              Sell Confirmation
            </h3>
            <div className="space-y-6">
              <div>
                <label
                  for="exampleNumber0"
                  className="form-label inline-block mb-2 text-gray-700"
                >
                  Stocks quantity to sell
                </label>
                <input
                  type="number"
                  max={profitLoss.quantity}
                  min={0}
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="exampleNumber0"
                  placeholder="Ex. 1, 10, 100, 500 etc"
                  value={stockNum}
                  onChange={(e) => setStockNum(e.target.value)}
                />
                {warning && <p className="mt-2 text-red-600">Volume exceeds holding !!</p>}
              </div>

              <div>
                <label
                  for="exampleNumber1"
                  className="form-label inline-block mb-2 text-gray-700"
                >
                  Sell at
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
                disabled={warning}
                className={`w-full text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${!warning ? 'bg-red-600 hover:bg-green-500' : 'bg-red-200'}`}
                onClick={() => {
                  const price = profitLoss.currentPrice,
                    quantity = stockNum;

                  const purchaseInfo = { holdingId: holdingID, stockNum, price };
                  // console.log(purchaseInfo)
                  sellStock(purchaseInfo, token);

                  setopenSellModal(false);

                  setTransactionMsg({
                    isMsgAvailable: true,
                    msg: "Sell successful !! \n" + (price * quantity) + " ₹ has been credited."
                  })

                  navigate(`/portfolio/`);
                  // sell(holdingID)
                }}
              >
                SELL
              </button>
            </div>
          </div>
        </div>
      </div>
    </div >
  );

  return (
    <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 cursor-pointer">
      <td className="px-4 py-4" onClick={() => handleClick(stockData.id)}>
        {stockData.id}
      </td>

      <td className="px-4 py-4" onClick={() => handleClick(stockData.id)}>
        {profitLoss.quantity}
      </td>

      <td className="px-4 py-4" onClick={() => handleClick(stockData.id)}>
        {format(profitLoss.boughtAtPrice)}₹
      </td>

      <td className="px-4 py-4" onClick={() => handleClick(stockData.id)}>
        {format(profitLoss.currentPrice)}₹
      </td>

      <td
        className={`px-4 py-4 ${profitLoss.changeInValue > 0 ? "text-green-500" : "text-red-700"
          }`}
        onClick={() => handleClick(stockData.id)}
      >
        {format(profitLoss.currentValueOfInvestedAmount)}₹
      </td>

      <td
        className={`px-4 py-4 ${profitLoss.changeInValue > 0 ? "text-green-500" : "text-red-700"
          }`}
        onClick={() => handleClick(stockData.id)}
      >
        {profitLoss.changeInValue > 0 && "+"}
        {format(profitLoss.currentProfitLoss)}₹
      </td>

      <td
        className={`px-4 py-4 ${profitLoss.changeInValue > 0 ? "text-green-500" : "text-red-700"
          }`}
        onClick={() => handleClick(stockData.id)}
      >
        {profitLoss.changeInValue > 0 && "+"}
        {format(profitLoss.changeInValue)}%
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
              setopenBuyModal(true);
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
              setopenSellModal(true);
            }}
          >
            Sell
          </button>
          {openBuyModal && buyModal}
          {openSellModal && sellModal}
        </div>
      </td>
    </tr>
  );
}

export default PortfolioRow;
