import { useNavigate } from "react-router-dom";

function ExStock({ stockName, stockID }) {
  let navigate = useNavigate();

  return (
    <p
      className="border border-gray-400 p-2 rounded-lg text-gray-500 hover:text-blue-400 hover:bg-white cursor-pointer"
      onClick={() => {
        navigate(`/stock/${stockID}`);
      }}
    >
      {stockName}
    </p>
  );
}

export default ExStock;
