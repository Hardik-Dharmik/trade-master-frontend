import { useNavigate } from "react-router-dom";

function WatchlistRow({ row }) {
  let navigate = useNavigate();

  const handleClick = (symbol) => {
    navigate(`/stock/${symbol}`);
  };
  return (
    <tr
      onClick={() => handleClick(row.symbol)}
      className="bg-white dark:bg-gray-800 hover:bg-gray-50 cursor-pointer"
    >
      <td onClick={() => handleClick(row.symbol)} className="px-4 py-4">
        {row.symbol}
      </td>
      <td
        onClick={() => handleClick(row.symbol)}
        className="px-4 py-4  truncate whitespace-normal"
      >
        {row.stockName}
      </td>

      <td onClick={() => handleClick(row.symbol)} className="px-4 py-4">
        ₹100
      </td>
      <td onClick={() => handleClick(row.symbol)} className="px-4 py-4">
        ₹19883
      </td>
      <td onClick={() => handleClick(row.symbol)} className="px-4 py-4">
        1.27%
      </td>
    </tr>
  );
}

export default WatchlistRow;
