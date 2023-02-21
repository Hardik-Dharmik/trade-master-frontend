import { Link } from "react-router-dom";

function FormFooter({ text, linkText, link }) {
  return (
    <div class="flex items-center justify-center mt-4">
      <p className=" text-gray-700 text-sm font-bold ">{text}</p>
      <Link
        to={link}
        class="ml-1 font-bold text-sm text-blue-500 hover:text-blue-800"
        href="#"
      >
        {linkText}
      </Link>
    </div>
  );
}

export default FormFooter;
