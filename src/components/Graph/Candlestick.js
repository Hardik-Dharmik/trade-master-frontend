import Plot from "react-plotly.js";

function Candlestick({ x, y, timestamps }) {
  let dx = [],
    dy = [];

  for (let i = 0; i < y.close.length; i++) {
    if (y.close[i] === null) continue;

    // dx.push(x[i]);
    dy.push(y.close[i]);
  }
  return (
    <Plot
      data={[
        {
          x: x,
          high: y.high,
          low: y.low,
          close: y.close,
          open: y.open,
          type: "candlestick",
          increasing: { line: { color: "green" } },
          line: { color: "rgba(31,119,180,1)" },
          decreasing: { line: { color: "red" } },
          text: timestamps,
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
          showgrid: false,
        },
        yaxis: {
          type: "linear",
          showgrid: false,
          //   autoshift: true,
        },
      }}
      config={{ responsive: true, displayModeBar: false }}
    />
  );
}

export default Candlestick;
