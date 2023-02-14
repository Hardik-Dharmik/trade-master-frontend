export const timestampToDate = (timestamps, range) => {
  let convertedTimestamps = [];
  let Xaxisvalues = [];

  for (let i = 0; i < timestamps.length; i++) {
    let dateFormat = new Date(timestamps[i] * 1000);
    convertedTimestamps.push(
      dateFormat.getDate() +
        "/" +
        (dateFormat.getMonth() + 1) +
        "/" +
        dateFormat.getFullYear() +
        " " +
        dateFormat.getHours() +
        ":" +
        dateFormat.getMinutes() +
        ":" +
        dateFormat.getSeconds()
    );
    Xaxisvalues.push(i + 1);
  }

  return { convertedTimestamps, Xaxisvalues };
};
