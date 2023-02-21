import React from "react";

function FormButton({ text }) {
  return (
    <button
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      type="button"
    >
      {text}
    </button>
  );
}

export default FormButton;
