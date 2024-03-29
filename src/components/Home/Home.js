import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import logo from "../../Assets/Images/logo.png";
import ExStock from "./ExStock";
import { stockData } from "../../Services/Constants/stockNames";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useRecoilState } from "recoil";
import { userState, firstTimeLogin } from "../../atoms/userAtom";
import Colors from "../Alerts/Message";

const topStocks = [
  ["Reliance", "RELIANCE.NS"],
  ["TCS", "TCS.NS"],
  ["HDFC Bank", "HDFCBANK.NS"],
  ["Infosys", "INFY.BO"],
  ["HUL", "HINDUNILVR.NS"],
  ["ICIC Bank", "ICICIBANK.NS"],
  ["SBI", "SBIN.NS"],
  ["Tata Motors", "TATAMOTORS.NS"],
  ["HCL Tech", "HCLTECH.NS"],
  ["Asian Paints", "ASIANPAINT.NS"],
  ["Wipro", "WIPRO.NS"],
  ["Bharti Airtel", "BHARTIARTL.NS"],
];

function Home({ msg }) {
  const [input, setInput] = useState("");
  let navigate = useNavigate();

  console.log(msg);

  const [firsttimeLogin, setfirstTimeLogin] = useRecoilState(firstTimeLogin);
  // console.log(firstimeLogin);
  let stocks = stockData;

  const onSearch = (searchTerm, stockCode, exchange) => {
    setInput(searchTerm);
    console.log(searchTerm);
    console.log(stockCode);
    if (exchange === "NSE") navigate(`/stock/${stockCode + ".NS"}`);
    else navigate(`/stock/${stockCode + ".BO"}`);
  };

  return (
    <div className="relative flex flex-col items-center min-h-screen px-2 bg-gray-100 py-2">
      <div
        className="md:w-1/5 w-3/5 mr-auto"
        onClick={() => setfirstTimeLogin(false)}
      >
        {firsttimeLogin && <Colors color="green" msg="Login successful" />}
      </div>

      <div className="w-1/5 mr-auto">
        {msg && <Colors color="green" msg="Logout successful" />}
      </div>
      <div className="flex items-center mt-24 ">
        <p className="text-4xl md:text-5xl font-serif tracking-wider text-gray-800">
          Trade
        </p>
        <img src={logo} alt="" className="h-20 w-h-20 hidden md:flex" />
        <p className="text-4xl md:text-5xl font-serif tracking-wider text-gray-800">
          Master
        </p>
      </div>

      <p className="text-2xl my-1 text-gray-600">Practice now, Earn tommorow</p>

      <div className="flex mt-4 bg-gray-200 w-fit md:w-2/5  items-center rounded-lg py-2">
        <input
          type="text"
          placeholder="Search Company"
          onChange={(e) => {
            setInput(e.target.value);
            // console.log(input);
          }}
          value={input}
          className="bg-gray-200 flex-grow focus:outline-none mx-4 px-2 text-base"
        />
        <MagnifyingGlassIcon className="h-5 w-5 mx-2 text-gray-600" />
      </div>

      <div className="w-4/6 sm:w-2/5 bg-white mb-5 rounded-lg">
        {stocks
          .filter((item) => {
            const searchTerm = input.toLowerCase();
            const fullName = item.fullName.toLowerCase();

            return (
              searchTerm &&
              fullName.startsWith(searchTerm) &&
              fullName !== searchTerm
            );
          })
          .slice(0, 10)
          .map((item, index) => (
            <div
              className={`${input !== "" ? "p-1" : "p-0"} ${
                index === 0 && "bg-blue-500 text-white"
              }
              ${index > 0 && "hover:bg-gray-300"} cursor-pointer`}
              onClick={() =>
                onSearch(item.fullName, item.symbol, item.exchange)
              }
              key={item.ISINNo + item.symbol + item.fullName + item.exchange}
            >
              {item.fullName} - {item.exchange}
            </div>
          ))}
      </div>

      <div className="flex flex-wrap items-center space-x-3 md:w-2/5 w-3/5 gap-y-3 justify-center">
        {topStocks.map((stock) => (
          <ExStock
            key={stock[0] + stock[1]}
            stockName={stock[0]}
            stockID={stock[1]}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
