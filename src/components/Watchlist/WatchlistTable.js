import React from "react";
import WatchlistRow from "./WatchlistRow";

const portfolioData = [
  {
    symbol: "TATASTEEL.BO",
    stockName: "Tata Steel Pvt. Ltd",
    change: "1.2",
    changePercent: "0.1%",
    quantity: "100",
    boughtAt: "101.3",
    currentValue: "110.23",
  },
  {
    symbol: "ADANIPOWER.BO",
    stockName: "Tata Steel Pvt. Ltd",
    change: "1.2",
    changePercent: "0.1%",
    quantity: "100",
    boughtAt: "101.3",
    currentValue: "110.23",
  },
  {
    symbol: "TATASTEEL",
    stockName: "Tata Steel Pvt. Ltd",
    change: "1.2",
    changePercent: "0.1%",
    quantity: "100",
    boughtAt: "101.3",
    currentValue: "110.23",
  },
  {
    symbol: "TATASTEEL",
    stockName: "Tata Steel Pvt. Ltd",
    change: "1.2",
    changePercent: "0.1%",
    quantity: "100",
    boughtAt: "101.3",
    currentValue: "110.23",
  },
  {
    symbol: "TATASTEEL",
    stockName: "Tata Steel Pvt. Ltd",
    change: "1.2",
    changePercent: "0.1%",
    quantity: "100",
    boughtAt: "101.3",
    currentValue: "110.23",
  },
  {
    symbol: "TATASTEEL",
    stockName: "Tata Steel Pvt. Ltd",
    change: "1.2",
    changePercent: "0.1%",
    quantity: "100",
    boughtAt: "101.3",
    currentValue: "110.23",
  },
  {
    symbol: "TATASTEEL",
    stockName: "Tata Steel Pvt. Ltd",
    change: "1.2",
    changePercent: "0.1%",
    quantity: "100",
    boughtAt: "101.3",
    currentValue: "110.23",
  },
  {
    symbol: "TATASTEEL",
    stockName: "Tata Steel Pvt. Ltd",
    change: "1.2",
    changePercent: "0.1%",
    quantity: "100",
    boughtAt: "101.3",
    currentValue: "110.23",
  },
  {
    symbol: "TATASTEEL",
    stockName: "Tata Steel Pvt. Ltd",
    change: "1.2",
    changePercent: "0.1%",
    quantity: "100",
    boughtAt: "101.3",
    currentValue: "110.23",
  },
  {
    symbol: "TATASTEEL",
    stockName: "Tata Steel Pvt. Ltd",
    change: "1.2",
    changePercent: "0.1%",
    quantity: "100",
    boughtAt: "101.3",
    currentValue: "110.23",
  },
  {
    symbol: "TATASTEEL",
    stockName: "Tata Steel Pvt. Ltd",
    change: "1.2",
    changePercent: "0.1%",
    quantity: "100",
    boughtAt: "101.3",
    currentValue: "110.23",
  },
  {
    symbol: "TATASTEEL",
    stockName: "Tata Steel Pvt. Ltd",
    change: "1.2",
    changePercent: "0.1%",
    quantity: "100",
    boughtAt: "101.3",
    currentValue: "110.23",
  },
  {
    symbol: "TATASTEEL",
    stockName: "Tata Steel Pvt. Ltd",
    change: "1.2",
    changePercent: "0.1%",
    quantity: "100",
    boughtAt: "101.3",
    currentValue: "110.23",
  },
  {
    symbol: "TATASTEEL",
    stockName: "Tata Steel Pvt. Ltd",
    change: "1.2",
    changePercent: "0.1%",
    quantity: "100",
    boughtAt: "101.3",
    currentValue: "110.23",
  },
  {
    symbol: "TATASTEEL",
    stockName: "Tata Steel Pvt. Ltd",
    change: "1.2",
    changePercent: "0.1%",
    quantity: "100",
    boughtAt: "101.3",
    currentValue: "110.23",
  },
  {
    symbol: "TATASTEEL",
    stockName: "Tata Steel Pvt. Ltd",
    change: "1.2",
    changePercent: "0.1%",
    quantity: "100",
    boughtAt: "101.3",
    currentValue: "110.23",
  },
  {
    symbol: "TATASTEEL",
    stockName: "Tata Steel Pvt. Ltd",
    change: "1.2",
    changePercent: "0.1%",
    quantity: "100",
    boughtAt: "101.3",
    currentValue: "110.23",
  },
  {
    symbol: "TATASTEEL",
    stockName: "Tata Steel Pvt. Ltd",
    change: "1.2",
    changePercent: "0.1%",
    quantity: "100",
    boughtAt: "101.3",
    currentValue: "110.23",
  },
  {
    symbol: "TATASTEEL",
    stockName: "Tata Steel Pvt. Ltd",
    change: "1.2",
    changePercent: "0.1%",
    quantity: "100",
    boughtAt: "101.3",
    currentValue: "110.23",
  },
];

function WatchlistTable() {
  return (
    <div class="relative overflow-x-auto">
      <table class="w-4/5 text-sm text-left text-gray-500 dark:text-gray-400 mx-auto">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-4 py-3">
              Symbol
            </th>
            <th scope="col" class="px-4 py-3">
              Stock name
            </th>

            <th scope="col" class="px-4 py-3">
              Current price
            </th>
            <th scope="col" class="px-4 py-3">
              Change
            </th>
            <th scope="col" class="px-4 py-3">
              Change %
            </th>
          </tr>
        </thead>
        <tbody>
          {portfolioData.map((row) => (
            <WatchlistRow row={row} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default WatchlistTable;
