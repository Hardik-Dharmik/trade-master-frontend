{
  /*
High 
Low 
Open
preclose
range 
volume 
mar cap
type
*/
}
function Summary({ stockData }) {
  const summary = [
    { pointName: "Day High", value: stockData.regularMarketDayHigh },
    { pointName: "Day Low", value: stockData.regularMarketDayLow },
    { pointName: "Open", value: stockData.regularMarketOpen },
    {
      pointName: "Previous Close",
      value: stockData.regularMarketPreviousClose,
    },
    { pointName: "Day Range", value: stockData.regularMarketDayRange },
    { pointName: "Market Volume", value: stockData.regularMarketVolume },
    { pointName: "Market Cap", value: stockData.marketCap },
    { pointName: "Type", value: { fmt: stockData.quoteType } },
  ];

  return (
    <div className="bg-white p-2 flex flex-col rounded-lg shadow-lg my-3 mt-5">
      <p className="text-md font-semibold">Summary</p>
      <div className="grid grid-cols-2 gap-2 mt-2">
        {summary.map((summaryPoint) => (
          <div className="flex rounded-lg bg-gray-200 justify-between p-2 text-xs hover:bg-gray-300">
            <p className="text-gray-700">{summaryPoint.pointName}</p>
            <p className="font-semibold">{summaryPoint.value?.fmt}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Summary;
