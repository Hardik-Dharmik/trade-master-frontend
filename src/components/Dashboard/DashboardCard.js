import React from "react";

function DashboardCard({ heading, value, symbol, isNormal }) {
  return (
    <div className="bg-white rounded-lg p-2 w-44 my-4 shadow-lg cursor-pointer hover:shadow-xl">
      <p className="text-sm text-gray-600 text-center">{heading}</p>
      <p
        className={`mx-auto text-2xl text-center my-3 ${
          !isNormal
            ? value > 0
              ? "text-green-500"
              : "text-red-500"
            : "text-gray-600"
        }`}
      >
        {!isNormal ? (value > 0 ? "+" : "") : ""}
        {value}
        {symbol}
      </p>
    </div>
  );
}

export default DashboardCard;
