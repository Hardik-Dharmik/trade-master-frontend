import { useState, useEffect } from "react";
import Plot from "react-plotly.js";

function Graph({ symbol }) {
  const [timePeriod, setTimePeriod] = useState("24h");
  const handleTimePeriod = (e) => {
    setTimePeriod(e.target.value);
  };
  return (
    <div className="rounded-lg bg-white p-1">
      <div className="flex  border border-gray-200 max-w-fit text-sm mx-3 mt-2">
        <button
          className={`px-3 py-2 hover:bg-blue-100  hover:text-blue-500 cursor-pointer outline-none max-w-fit ${
            timePeriod === "3h" && "text-blue-500 bg-blue-100"
          }`}
          value="3h"
          onClick={handleTimePeriod}
          readOnly
        >
          3h
        </button>
        <button
          className={`px-3 py-2 hover:bg-blue-100  hover:text-blue-500 cursor-pointer outline-none max-w-fit ${
            timePeriod === "24h" && "text-blue-500 bg-blue-100"
          }`}
          value="24h"
          onClick={handleTimePeriod}
          readOnly
        >
          24h
        </button>
        <button
          className={`px-3 py-2 hover:bg-blue-100  hover:text-blue-500 cursor-pointer outline-none max-w-fit ${
            timePeriod === "7d" && "text-blue-500 bg-blue-100"
          }`}
          value="7d"
          onClick={handleTimePeriod}
          readOnly
        >
          7d
        </button>
        <button
          className={`px-3 py-2 hover:bg-blue-100  hover:text-blue-500 cursor-pointer outline-none max-w-fit ${
            timePeriod === "30d" && "text-blue-500 bg-blue-100"
          }`}
          value="30d"
          onClick={handleTimePeriod}
          readOnly
        >
          30d
        </button>
        <button
          className={`px-3 py-2 hover:bg-blue-100  hover:text-blue-500 cursor-pointer outline-none max-w-fit ${
            timePeriod === "3m" && "text-blue-500 bg-blue-100"
          }`}
          value="3m"
          onClick={handleTimePeriod}
          readOnly
        >
          3m
        </button>
        <button
          className={`px-3 py-2 hover:bg-blue-100  hover:text-blue-500 cursor-pointer outline-none max-w-fit ${
            timePeriod === "1y" && "text-blue-500 bg-blue-100"
          }`}
          value="1y"
          onClick={handleTimePeriod}
          readOnly
        >
          1y
        </button>
        <button
          className={`px-3 py-2 hover:bg-blue-100  hover:text-blue-500 cursor-pointer outline-none max-w-fit ${
            timePeriod === "3y" && "text-blue-500 bg-blue-100"
          }`}
          value="3y"
          onClick={handleTimePeriod}
          readOnly
        >
          3y
        </button>
        <button
          className={`px-3 py-2 hover:bg-blue-100  hover:text-blue-500 cursor-pointer outline-none max-w-fit ${
            timePeriod === "5y" && "text-blue-500 bg-blue-100"
          }`}
          value="5y"
          onClick={handleTimePeriod}
          readOnly
        >
          5y
        </button>
      </div>
      <Plot
        data={[
          {
            x: [1, 2, 3],
            y: [2, 6, 3],
            type: "scatter",
            mode: "lines",
            marker: { color: "red" },
            fill: "tozeroy",
          },
        ]}
        layout={{
          width: 700,
          height: 400,
          margin: {
            l: 50,
            r: 50,
            b: 50,
            t: 40,
            pad: 4,
          },
          xaxis: {
            // showline: true,
            showgrid: false,
          },
          yaxis: {
            showgrid: false,
            // showline: true,
          },
        }}
        config={{ responsive: true }}
      />
    </div>
  );
}

export default Graph;
