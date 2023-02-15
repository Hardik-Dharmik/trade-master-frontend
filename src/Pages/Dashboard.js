import { useState } from "react";
import DashboardCard from "../components/Dashboard/DashboardCard";
import Graph from "../components/Graph/Graph";

function Dashboard() {
  const [index, setIndex] = useState("sensex");

  return (
    <div className="min-h-screen px-2 bg-gray-100 py-2">
      <p className="mx-14">Your wallet</p>

      <div className="p-2 flex flex-col md:flex-row min-w-fit justify-evenly items-center">
        <DashboardCard heading="Total amount invested" value={10000} />
        <DashboardCard heading="Profit/Loss" value={10000} />
        <DashboardCard heading="Profit/Loss %" value={10000} />
        <DashboardCard heading="Wallet amount" value={10000} />
      </div>

      <div className="flex flex-col md:flex-row ml-14">
        <div className="flex flex-col">
          <div className="flex my-4 items-center">
            <p
              className={` mx-2 px-3 py-2 hover:bg-blue-100  hover:text-blue-500 cursor-pointer outline-none max-w-fit ${
                index === "sensex" && "text-blue-500 bg-blue-100"
              }`}
              onClick={() => setIndex("sensex")}
            >
              Sensex
            </p>

            <p
              className={` mx-2 px-3 py-2 hover:bg-blue-100  hover:text-blue-500 cursor-pointer outline-none max-w-fit ${
                index === "nifty" && "text-blue-500 bg-blue-100"
              }`}
              onClick={() => setIndex("nifty")}
            >
              Nifty
            </p>
          </div>

          <div className="flex"></div>

          {index === "sensex" ? (
            <Graph symbol="%5EBSESN" />
          ) : (
            <Graph symbol="%5ENSEI" />
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
