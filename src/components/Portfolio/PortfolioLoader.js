import { useState } from "react";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { tokenState } from "../../atoms/userAtom";
import { transactionAtom } from "../../atoms/transactionAtom";
import useHoldings from "../../hooks/useHoldings";
import DashboardCard from "../Dashboard/DashboardCard";
import PortfolioTable from "./PortfolioTable";

import { Bars } from 'react-loader-spinner'

function PortfolioLoader() {
  const token = useRecoilValue(tokenState);
  const transactionState = useRecoilValue(transactionAtom);
  let temp = transactionState;

  const [holdings, setHoldings] = useState([]);
  const [stockIds, setStockIds] = useState([]);
  const [symbolData, setsymbolData] = useState(null);
  const [balanceInfo, setBalanceInfo] = useState(null);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    if (token) {
      const URL = `${process.env.REACT_APP_BACKEND_API_URL}/api/transaction/getTransactions/`;

      // setisLoading(true);
      fetch(URL, {
        headers: {
          "Content-type": "application/json",
          AUTH_TOKEN: token,
        },
      })
        .then((response) => response.json())
        .then((response) => {
          setHoldings(response.holdings);
          setStockIds(response.stockIds);
          setBalanceInfo(response.balanceInfo);

          let tempSym = {};
          for (let i = 0; i < stockIds.length; i++) {
            let holding = holdings[i];
            tempSym[stockIds[i]] = null;
          }

          setsymbolData(tempSym);

          const timer = setTimeout(() => setisLoading(false), 2000);
          return () => clearTimeout(timer);

          // setisLoading(false)
        });
    }
  }, []);

  useEffect(() => {
    console.log("State changed ->", transactionState)

    if (token) {
      const URL = `${process.env.REACT_APP_BACKEND_API_URL}/api/transaction/getTransactions/`;

      fetch(URL, {
        headers: {
          "Content-type": "application/json",
          AUTH_TOKEN: token,
        },
      })
        .then((response) => response.json())
        .then((response) => {
          setHoldings(response.holdings);
          setStockIds(response.stockIds);
          setBalanceInfo(response.balanceInfo);

          let tempSym = {};
          for (let i = 0; i < stockIds.length; i++) {
            let holding = holdings[i];

            let volume = holding.volume,
              boughtAt = holding.boughtAt;

            tempSym[stockIds[i]] = null;
          }

          setsymbolData(tempSym);
        });
    }
  }, [temp]);

  if (!token) return;

  return (
    token &&
    stockIds &&
    symbolData &&
    balanceInfo && (
      <div className={`${isLoading && 'flex justify-center items-center mt-40'}`}>
        {
          isLoading ? <div className="flex -mt-5">
            <Bars
              height="100"
              width="100"
              color="#4fa94d"
              ariaLabel="bars-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div> : <PortfolioTable
            holdings={holdings}
            symbolData1={symbolData}
            stockIds1={stockIds}
            balanceInfo={balanceInfo}
          />
        }

      </div>
    )
  );
}

export default PortfolioLoader;
