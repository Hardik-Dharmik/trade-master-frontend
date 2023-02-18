import { useState } from "react";
import { useNavigate } from "react-router-dom";

function TransactionRow({ row }) {
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

  const Modal = (
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
              {modalData.title}
            </h3>
            <form class="space-y-6" action="#">
              <div>
                <label
                  for="exampleNumber0"
                  class="form-label inline-block mb-2 text-gray-700"
                >
                  {modalData.quantity}
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
                  {modalData.at}
                </label>
                <input
                  type="number"
                  class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="exampleNumber1"
                  value={row.currentPrice}
                  disabled
                />
              </div>

              <div>
                <label
                  for="exampleNumber2"
                  class="form-label inline-block mb-2 text-gray-700"
                >
                  Cost
                </label>
                <input
                  type="number"
                  class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="exampleNumber2"
                  value={row.currentPrice * stockNum}
                  disabled
                />
              </div>

              <button
                class={`w-full text-white ${modalData.btnbgColor} hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
              >
                {modalData.btnContent}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <tr class="bg-white dark:bg-gray-800 hover:bg-gray-50 cursor-pointer">
      <td class="px-4 py-4" onClick={() => handleClick(row.symbol)}>
        {row.symbol}
      </td>
      <td class="px-4 py-4  onClick={() => handleClick(row.symbol)}truncate whitespace-normal">
        {row.stockName}
      </td>

      <td class="px-4 py-4" onClick={() => handleClick(row.symbol)}>
        {row.quantity}
      </td>
      <td class="px-4 py-4" onClick={() => handleClick(row.symbol)}>
        ₹{row.boughtAt}
      </td>
      <td class="px-4 py-4" onClick={() => handleClick(row.symbol)}>
        ₹100
      </td>
      <td class="px-4 py-4" onClick={() => handleClick(row.symbol)}>
        1.27%
      </td>
      <td class="px-4 py-4" onClick={() => handleClick(row.symbol)}>
        ₹19883
      </td>
    </tr>
  );
}

export default TransactionRow;
