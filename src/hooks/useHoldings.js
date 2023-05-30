import { useEffect, useState } from "react";

function useHoldings(token) {
  console.log(token);
  const [holdings, setHoldings] = useState([]);
  const [stockIds, setStockIds] = useState([]);

  useEffect(() => {
    if (!token) return;
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
      });
  }, []);

  return [holdings, stockIds];
}

export default useHoldings;
