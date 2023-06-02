import React from "react";
import TransactionRow from "./TransactionRow";
import { useState } from "react";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { tokenState } from "../../atoms/userAtom";
import { Bars } from 'react-loader-spinner'

const format = (value) => {
  return parseFloat(value).toFixed(2);
};

function TransactionTable() {
  const token = useRecoilValue(tokenState);
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setisLoading] = useState(true);


  useEffect(() => {
    if (token) {
      const URL = `${process.env.REACT_APP_BACKEND_API_URL}/api/transaction/getAllTransactions/`;
      fetch(URL, {
        headers: {
          "Content-type": "application/json",
          AUTH_TOKEN: token,
        },
      })
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          let resp = response.transactions, tempTransactions = [];

          for (let i = 0; i < resp.length; i++) {
            let data = resp[i], debitCredit = 0;

            if (data.type === 'SELL')
              debitCredit = format(data.soldAt.$numberDecimal) * data.volume;
            else
              debitCredit = format(data.boughtAt.$numberDecimal) * data.volume;

            tempTransactions.push({
              symbol: data.stockId,
              volume: data.volume,
              type: data.soldAt.$numberDecimal === '0' ? "BUY" : "SELL",
              soldAt: data.soldAt.$numberDecimal,
              boughtAt: data.boughtAt.$numberDecimal,
              debitCredit,
            })
          }

          setTransactions(tempTransactions);
          const timer = setTimeout(() => setisLoading(false), 2000);
          return () => clearTimeout(timer);

        });
    }
  }, []);

  if (!transactions) return;

  console.log(transactions)

  return (
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
        </div> : <div className="relative overflow-x-auto">
          <table className="w-4/5 text-sm text-left text-gray-500 dark:text-gray-400 mx-auto">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-4 py-3">
                  Symbol
                </th>
                <th scope="col" className="px-4 py-3">
                  Type
                </th>
                <th scope="col" className="px-4 py-3">
                  Quantity
                </th>
                <th scope="col" className="px-4 py-3">
                  Bought at
                </th>
                <th scope="col" className="px-4 py-3">
                  Sold At
                </th>
                <th scope="col" className="px-4 py-3">
                  Debit/Credit
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((row) => (
                <TransactionRow row={row} />
              ))}
            </tbody>
          </table>
        </div>
      }
    </div >
  );
}

export default TransactionTable;
