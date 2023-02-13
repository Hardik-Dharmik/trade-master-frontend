import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import logo from "../../Assets/Images/logo.png";
import ExStock from "./ExStock";
import { stockData } from "../../Services/Constants/stockNames";
import { useNavigate } from "react-router-dom";

const topStocks = [
  "Reliance",
  "TCS",
  "HDFC Bank",
  "Infosys",
  "HUL",
  "ICIC Bank",
  "SBI",
  "Tata Motors",
  "HCL Tech",
  "Asian Paints",
  "Wipro",
  "Bharti Airtel",
];

function Home() {
  const [input, setInput] = useState("");
  let navigate = useNavigate();

  let stocks = stockData;

  const onSearch = (searchTerm, stockCode) => {
    setInput(searchTerm);
    if (stockCode === "NSE") navigate(`/stock/:${stockCode + ".NE"}`);
    else navigate(`/stock/${stockCode + ".BO"}`);
  };

  return (
    <div className="flex flex-col items-center min-h-screen px-2 bg-gray-100 py-2">
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
          <ExStock key={stock} stockName={stock} />
        ))}
      </div>
    </div>
  );
}

export default Home;
