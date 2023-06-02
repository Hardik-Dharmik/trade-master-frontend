import { useState, useEffect } from "react";
import usePeriodicData from "../../hooks/usePeriodicData";
import { extractHighLowOpenClose } from "../../Services/Utils/ExtractHighLowOpenClose";
import { timestampToDate } from "../../Services/Utils/TimestampToDate";
import Candlestick from "./Candlestick";
import Chart from "./Chart";

import { Bars } from 'react-loader-spinner'

function Graph({ symbol }) {
  const [timePeriod, setTimePeriod] = useState("1y");
  const [chartType, setChartType] = useState("line");

  const [data] = usePeriodicData(timePeriod, symbol);

  const [isLoading, setisLoading] = useState(true);


  useEffect(() => {
    const timer = setTimeout(() => setisLoading(false), 2000);
    return () => clearTimeout(timer);

  }, [])


  if (!data) return null;

  const { convertedTimestamps, Xaxisvalues } = timestampToDate(
    data.timestamp,
    timePeriod
  );

  const dataPoints = extractHighLowOpenClose(data);

  const handleTimePeriod = (e) => {
    setTimePeriod(e.target.value);
  };

  const handleChartType = (e) => {
    setChartType(e.target.value);
  };

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
        </div> : <div className="rounded-lg bg-white p-1">
          <div className="flex">
            <div className="flex  border border-gray-200 max-w-fit text-sm mx-3 mt-2">
              <button
                className={`px-3 py-2 hover:bg-blue-100  hover:text-blue-500 cursor-pointer outline-none max-w-fit ${timePeriod === "1d" && "text-blue-500 bg-blue-100"
                  }`}
                value="1d"
                onClick={handleTimePeriod}
                readOnly
              >
                1d
              </button>
              <button
                className={`px-3 py-2 hover:bg-blue-100  hover:text-blue-500 cursor-pointer outline-none max-w-fit ${timePeriod === "5d" && "text-blue-500 bg-blue-100"
                  }`}
                value="5d"
                onClick={handleTimePeriod}
                readOnly
              >
                5d
              </button>
              <button
                className={`px-3 py-2 hover:bg-blue-100  hover:text-blue-500 cursor-pointer outline-none max-w-fit ${timePeriod === "1mo" && "text-blue-500 bg-blue-100"
                  }`}
                value="1mo"
                onClick={handleTimePeriod}
                readOnly
              >
                1mo
              </button>
              <button
                className={`px-3 py-2 hover:bg-blue-100  hover:text-blue-500 cursor-pointer outline-none max-w-fit ${timePeriod === "6mo" && "text-blue-500 bg-blue-100"
                  }`}
                value="6mo"
                onClick={handleTimePeriod}
                readOnly
              >
                6mo
              </button>
              <button
                className={`px-3 py-2 hover:bg-blue-100  hover:text-blue-500 cursor-pointer outline-none max-w-fit ${timePeriod === "1y" && "text-blue-500 bg-blue-100"
                  }`}
                value="1y"
                onClick={handleTimePeriod}
                readOnly
              >
                1y
              </button>
              <button
                className={`px-3 py-2 hover:bg-blue-100  hover:text-blue-500 cursor-pointer outline-none max-w-fit ${timePeriod === "5y" && "text-blue-500 bg-blue-100"
                  }`}
                value="5y"
                onClick={handleTimePeriod}
                readOnly
              >
                5y
              </button>
              <button
                className={`px-3 py-2 hover:bg-blue-100  hover:text-blue-500 cursor-pointer outline-none max-w-fit ${timePeriod === "max" && "text-blue-500 bg-blue-100"
                  }`}
                value="max"
                onClick={handleTimePeriod}
                readOnly
              >
                max
              </button>
            </div>

            <div className="flex border border-gray-200 max-w-fit ml-20 mt-2">
              <button
                className={`px-3 py-2 hover:bg-blue-100  hover:text-blue-500 cursor-pointer outline-none max-w-fit ${chartType === "line" && "text-blue-500 bg-blue-100"
                  }`}
                value="line"
                onClick={handleChartType}
                readOnly
              >
                Line
              </button>
              <button
                className={`px-3 py-2 hover:bg-blue-100  hover:text-blue-500 cursor-pointer outline-none max-w-fit ${chartType === "candle" && "text-blue-500 bg-blue-100"
                  }`}
                value="candle"
                onClick={handleChartType}
                readOnly
              >
                Candlestick
              </button>
            </div>
          </div>
          {chartType === "line" ? (
            <Chart
              x={Xaxisvalues}
              timestamps={convertedTimestamps}
              y={dataPoints}
            />
          ) : (
            <Candlestick
              x={Xaxisvalues}
              timestamps={convertedTimestamps}
              y={dataPoints}
            />
          )}
        </div>
      }
    </div>
  );
}

export default Graph;
