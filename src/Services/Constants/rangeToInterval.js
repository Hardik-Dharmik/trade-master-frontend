export const rangeToInterval = (range) => {
  const intervals = {
    "1d": "2m",
    "5d": "60m",
    "1mo": "30m",
    "6mo": "1d",
    "1y": "1d",
    "5y": "1d",
    max: "1d",
  };

  return intervals[range];
};
