import Plot from "react-plotly.js";

function Chart({ x, y, timestamps }) {
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
          y: dy,
          type: "scatter",
          mode: "lines",
          line: { color: "blue" },
          text: timestamps,
          hovertemplate: "<i>Price</i>: ₹%{y:.2f}<br>" + "<b>%{text}</b>",
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

export default Chart;
