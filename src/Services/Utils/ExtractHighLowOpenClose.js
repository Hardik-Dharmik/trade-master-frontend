export const extractHighLowOpenClose = (dataPoints) => {
  const data = dataPoints.indicators.quote[0];

  return { high: data.high, low: data.low, open: data.open, close: data.close };
};
