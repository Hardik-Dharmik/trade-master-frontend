import { useNavigate } from "react-router-dom";

function PortfolioRow({ row }) {
  let navigate = useNavigate();

  const handleClick = (symbol) => {
    navigate(`/stock/${symbol}`);
  };
  return (
    <tr
      class="bg-white dark:bg-gray-800 hover:bg-gray-50 cursor-pointer"
      onClick={() => handleClick(row.symbol)}
    >
      <td class="px-4 py-4">{row.symbol}</td>
      <td class="px-4 py-4 truncate whitespace-normal">{row.stockName}</td>
      <td class="px-4 py-4">{row.change}</td>
      <td class="px-4 py-4">{row.changePercent}</td>
      <td class="px-4 py-4">{row.quantity}</td>
      <td class="px-4 py-4">{row.boughtAt}</td>
      <td class="px-4 py-4">₹{row.currentValue}</td>
      <td class="px-4 py-4">
        <div className="flex text-white">
          <button className="bg-green-600 py-1 px-4 mr-3 rounded-sm">
            Buy
          </button>
          <button className="bg-red-600 py-1 px-4 ml-3 rounded-sm">Sell</button>
        </div>
      </td>
    </tr>
  );
}

export default PortfolioRow;
