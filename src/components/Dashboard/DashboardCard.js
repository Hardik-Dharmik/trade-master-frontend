import React from "react";

function DashboardCard({ heading, value }) {
  return (
    <div className="bg-white rounded-lg p-2 w-44 my-4 shadow-lg">
      <p className="text-sm text-gray-600 text-center">{heading}</p>
      <p className="mx-auto text-3xl text-center my-3 text-red-500">{value}₹</p>
    </div>
  );
}

export default DashboardCard;
