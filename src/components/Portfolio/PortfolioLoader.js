import { useState } from "react";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { tokenState } from "../../atoms/userAtom";
import useHoldings from "../../hooks/useHoldings";
import DashboardCard from "../Dashboard/DashboardCard";
import PortfolioTable from "./PortfolioTable";

function PortfolioLoader() {
  const token = useRecoilValue(tokenState);
  const [holdings, setHoldings] = useState([]);
  const [stockIds, setStockIds] = useState([]);
  const [symbolData, setsymbolData] = useState(null);
  const [balanceInfo, setBalanceInfo] = useState(null);

  useEffect(() => {
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
          console.log(response);
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
          console.log("tempSym", tempSym);
        });
    }
  }, []);

  if (!token) return;

  return (
    token &&
    stockIds &&
    symbolData &&
    balanceInfo && (
      <div>
        <PortfolioTable
          holdings={holdings}
          symbolData1={symbolData}
          stockIds1={stockIds}
          balanceInfo={balanceInfo}
        />
      </div>
    )
  );
}

export default PortfolioLoader;
