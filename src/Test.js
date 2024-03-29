import React, { useEffect, useState } from "react";
import protobuf from "protobufjs";
var Buffer = require("buffer/").Buffer;

function Test() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const ws = new WebSocket("wss://streamer.finance.yahoo.com");
    protobuf.load("./YPricingData.proto", (err, root) => {
      if (err) {
        return console.log(err);
      }
      const Yaticker = root.lookupType("yaticker");
      ws.onopen = function open() {
        console.log("connected");
        ws.send(
          JSON.stringify({
            subscribe: ["TATASTEEL.NS"],
          })
        );
      };

      ws.onclose = function close() {
        console.log("disconnected");
      };

      ws.onmessage = function incoming(data) {
        console.log("comming message");
        const response = Yaticker.decode(new Buffer(data.data, "base64"));
        console.log(response);
        setData(response);
      };
    });
  }, []);

  if (!data) return;

  return (
    <div className="text-3xl">
      <p>{data.price}</p>
      <p className={`${data.change >= 0 ? "text-green-500" : "text-red-500"}`}>
        {data.change}
      </p>
      <p className={`${data.change >= 0 ? "text-green-500" : "text-red-500"}`}>
        {data.changePercent}
      </p>
    </div>
  );
}

export default Test;
