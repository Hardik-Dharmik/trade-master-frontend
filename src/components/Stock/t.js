if (hours < 15 && hours >= 9) {
  console.log("Live data on!!");
  ws.current = new WebSocket("wss://streamer.finance.yahoo.com");
  let wsCurrent = null;
  protobuf.load("/YPricingData.proto", (err, root) => {
    if (err) {
      return console.log(err);
    }
    const Yaticker = root.lookupType("yaticker");
    ws.current.onopen = function open() {
      console.log("connected");
      ws.current.send(
        JSON.stringify({
          subscribe: [stockID],
        })
      );
    };

    ws.current.onclose = function close() {
      console.log("disconnected");
    };

    wsCurrent = ws.current;

    ws.current.onmessage = function incoming(data) {
      console.log("comming message");
      const response = Yaticker.decode(new Buffer(data.data, "base64"));
      // console.log(response);
      setLiveData({
        change: parseFloat(response.change).toFixed(2),
        changePercent: parseFloat(response.changePercent).toFixed(2),
        price: parseFloat(response.price).toFixed(2),
        time: new Date().toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        }),
      });
    };
  });
}
