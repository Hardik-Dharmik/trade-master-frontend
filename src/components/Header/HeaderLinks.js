import React from "react";

function HeaderLinks({ linkName, link }) {
  return (
    <p className="hover:text-blue-500 text-sm font-semibold tracking-wide">
      {linkName}
    </p>
  );
}

export default HeaderLinks;
