import React, { useState, useRef, useEffect } from "react";
import PortfolioRow from "./PortfolioRow";
import DashboardCard from "../Dashboard/DashboardCard";
import { useRecoilState, useRecoilValue } from "recoil";
import { tokenState } from "../../atoms/userAtom";
import protobuf from "protobufjs";
import useHoldings from "../../hooks/useHoldings";
var Buffer = require("buffer/").Buffer;

let stockIds = [];

const format = (value) => {
  return parseFloat(value).toFixed(2);
};

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
];

function PortfolioTable({ holdings, symbolData1, stockIds1, balanceInfo }) {
  stockIds = stockIds1;

  const [stockData, setstockData] = useState(null);
  const [openModal, setopenModal] = useState(false);
  const [stockNum, setStockNum] = useState(0);
  const [liveData, setLiveData] = useState(null);
  const [profitLossInfo, setProfitLossInfo] = useState({
    profitLoss: 0,
    currentValue: 0,
    investedvalue: 0,
    profitLossPercentage: 0,
  });
  const token = useRecoilValue(tokenState);
  console.log(symbolData1);
  // const [holdings, stockIds] = useHoldings(token);

  const ws = useRef(null);

  const [symbolData, setSymbolData] = useState(symbolData1);

  useEffect(() => {
    for (let i = 0; i < stockIds.length; i++) {
      symbolData[stockIds[i]] = null;
    }

    console.log("Sym data->", symbolData, holdings, stockIds);

    let currentTime = new Date(),
      t = false;

    let hours = currentTime.getHours();
    if ((hours < 9 || hours >= 15) && !t) {
      setLiveData({
        change: parseFloat(stockData?.regularMarketChange.raw).toFixed(2),
        changePercent: parseFloat(
          stockData?.regularMarketChangePercent.raw
        ).toFixed(2),
        price: parseFloat(stockData?.regularMarketPrice.raw).toFixed(2),
        time: new Date().toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        }),
      });
    } else {
      console.log("Live data on!!");
      ws.current = new WebSocket("wss://streamer.finance.yahoo.com");

      protobuf.load("/YPricingData.proto", (err, root) => {
        if (err) {
          return console.log(err);
        }
        const Yaticker = root.lookupType("yaticker");
        const symbols = stockIds;

        ws.current.onopen = function open() {
          console.log("connected");
          ws.current.send(
            JSON.stringify({
              subscribe: symbols,
            })
          );
        };

        ws.current.onclose = function close() {
          console.log("disconnected");
        };

        ws.current.onmessage = function incoming(data) {
          console.log("comming message");
          const response = Yaticker.decode(new Buffer(data.data, "base64"));

          setSymbolData((prevState) => ({
            ...prevState,
            [response.id]: response,
          }));
        };
      });
    }
  }, []);

  useEffect(() => {
    let profitLoss = 0;

    for (let i = 0; i < holdings.length; i++) {
      let holding = holdings[i];
      console.log("Data ->", symbolData[holding.stockId]);
      profitLoss +=
        (symbolData[holding.stockId]?.price - holding.boughtAt.$numberDecimal) *
        holding.volume;
    }

    console.log(profitLoss);

    let currentValue =
      parseFloat(format(balanceInfo.totalAmountInvested)) +
      parseFloat(profitLoss);
    console.log(currentValue);
    let investedvalue = format(balanceInfo.totalAmountInvested);

    let profitLossPercentage = format(
      ((currentValue - investedvalue) / investedvalue) * 100
    );

    setProfitLossInfo({
      profitLoss,
      currentValue,
      investedvalue,
      profitLossPercentage,
    });
  }, [symbolData, liveData]);

  const tableHeadings = [
    "Symbol",
    "Qty",
    "Bought at",
    "Cur. price",
    "Cur. val",
    "P&L",
    "Net chg.",
    "Buy/Sell",
  ];

  if (!stockIds1 || !balanceInfo) return null;
  console.log(symbolData);

  return (
    <div className="relative overflow-x-auto">
      <div className="p-2 flex flex-row min-w-fit justify-evenly items-center mb-3">
        <DashboardCard
          heading="Total amount invested"
          value={format(balanceInfo.totalAmountInvested)}
          symbol="₹"
          isNormal
        />
        <DashboardCard
          heading="Current value"
          value={format(profitLossInfo?.currentValue)}
          symbol="₹"
        />
        <DashboardCard
          heading="Profit/Loss"
          value={format(profitLossInfo?.profitLoss)}
          symbol="₹"
        />
        <DashboardCard
          heading="Profit/Loss %"
          value={format(profitLossInfo.profitLossPercentage)}
          symbol="%"
        />
        <DashboardCard
          heading="Wallet amount"
          value={format(balanceInfo.remainingBal)}
          symbol="₹"
          isNormal
        />
      </div>
      <table className="w-4/5 text-sm text-left text-gray-500 dark:text-gray-400 mx-auto">
        <thead className="text-xs text-gray-700  bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {tableHeadings.map((heading) => (
              <th scope="col" className="px-4 py-3">
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {holdings.map((holding) => (
            <PortfolioRow
              row={symbolData[holding.stockId]}
              holding={holding}
              stockID={holding.stockId}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PortfolioTable;
