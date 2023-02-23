import { useState } from "react";
import { Alert, Button } from "@material-tailwind/react";

export default function Colors({ msg, color }) {
  const [show, setShow] = useState(true);

  return (
    <>
      <Alert
        show={show}
        color={color}
        dismissible={{
          onClose: () => setShow(false),
        }}
      >
        {msg}
      </Alert>
    </>
  );
}
