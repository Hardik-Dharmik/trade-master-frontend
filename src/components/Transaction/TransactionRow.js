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

  return (
    <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 cursor-pointer">
      <td className="px-4 py-4" onClick={() => handleClick(row.symbol)}>
        {row.symbol}
      </td>
      <td className="px-4 py-4" onClick={() => handleClick(row.symbol)}>
        {row.type}
      </td>

      <td className="px-4 py-4" onClick={() => handleClick(row.symbol)}>
        {row.volume}
      </td>
      <td className="px-4 py-4" onClick={() => handleClick(row.symbol)}>
        ₹{row.boughtAt}
      </td>
      <td className="px-4 py-4" onClick={() => handleClick(row.symbol)}>
        ₹{row.soldAt}
      </td>

      <td className="px-4 py-4" onClick={() => handleClick(row.symbol)}>
        <span className={`${row.type === 'SELL' ? "text-green-500" : "text-red-700"
          }`}>
          ₹{Math.abs(row.debitCredit)}</span>
        {row.type === 'SELL' ? " credited." : " debited."}
      </td>

    </tr>
  );
}

export default TransactionRow;
