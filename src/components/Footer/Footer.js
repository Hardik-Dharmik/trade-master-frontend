import logo from "../../Assets/Images/logo.png";
import { HeartIcon } from "@heroicons/react/24/solid";

function Footer() {
  return (
    <div className="flex md:flex-row flex-col px-5 py-2  items-center">
      <div className="flex items-center">
        <img src={logo} alt="" className="h-16 w-16" />
        <p>Trade Master</p>
      </div>
      <p className="text-sm text-gray-800 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0  flex">
        Made with <HeartIcon className="h-5 w-5 mx-1 text-red-600" /> in India
      </p>
    </div>
  );
}

export default Footer;
