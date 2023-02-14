function Statistics({ stockData }) {
  const statistics = [
    { pointName: "52 week High", value: stockData.fiftyTwoWeekHigh },
    { pointName: "52 week Low", value: stockData.fiftyTwoWeekLow },
    {
      pointName: "52 week High Change",
      value: stockData.fiftyTwoWeekHighChange,
    },
    {
      pointName: "52 week Low Change",
      value: stockData.fiftyTwoWeekLowChange,
    },
    {
      pointName: "52 week High Change %",
      value: stockData.fiftyTwoWeekHighChangePercent,
    },
    {
      pointName: "52 week Low Change %",
      value: stockData.fiftyTwoWeekLowChangePercent,
    },
    {
      pointName: "52 week Range",
      value: stockData.fiftyTwoWeekRange,
    },
    ,
  ];

  return (
    <div className="bg-white p-2 flex flex-col rounded-lg shadow-lg my-3 mt-5 ">
      <p className="text-md font-semibold">Statistics</p>
      <div className="grid grid-cols-2 gap-2 mt-2">
        {statistics.map((statisticsPoint) => (
          <div className="flex rounded-lg bg-gray-200 justify-between p-2 text-xs hover:bg-gray-300">
            <p className="text-gray-700">{statisticsPoint.pointName}</p>
            <p className="font-semibold">{statisticsPoint.value?.fmt}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Statistics;
