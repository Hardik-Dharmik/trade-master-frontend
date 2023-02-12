import React from "react";

function ExStock({ stockName }) {
  return (
    <p className="border border-gray-400 p-2 rounded-lg text-gray-500 hover:text-blue-400 hover:bg-white cursor-pointer">
      {stockName}
    </p>
  );
}

export default ExStock;
