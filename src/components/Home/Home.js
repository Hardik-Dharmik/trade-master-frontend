import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import logo from "../../Assets/Images/logo.png";

function Home() {
  return (
    <div className="flex flex-col items-center   h-screen px-2 bg-gray-100">
      <div className="flex items-center mt-28 ">
        <p className="text-4xl md:text-5xl font-serif tracking-wider text-gray-800">
          Trade
        </p>
        <img src={logo} alt="" className="h-20 w-h-20 hidden md:flex" />
        <p className="text-4xl md:text-5xl font-serif tracking-wider text-gray-800">
          Master
        </p>
      </div>

      <p className="text-2xl my-1 text-gray-600">Practice now, Earn tommorow</p>

      <div className="flex my-4 bg-gray-200 w-3/5 md:w-2/5  items-center rounded-lg py-2">
        <input
          type="text"
          placeholder="Search Company"
          className="bg-gray-200 flex-grow focus:outline-none mx-4 px-2 text-base"
        />
        <MagnifyingGlassIcon className="h-5 w-5 mx-2 text-gray-600" />
      </div>

      <div className="flex space-x-3">
        <p className="border border-gray-400 p-2 rounded-lg text-gray-500 hover:bg-gray-200 cursor-pointer">
          Tata Steel
        </p>
        <p className="border border-gray-400 p-2 rounded-lg text-gray-500 hover:bg-gray-200 cursor-pointer">
          Adnai Ports
        </p>
        <p className="border border-gray-400 p-2 rounded-lg text-gray-500 hover:bg-gray-200 cursor-pointer">
          Infosys
        </p>
        <p className="border border-gray-400 p-2 rounded-lg text-gray-500 hover:bg-gray-200 cursor-pointer">
          Wipro
        </p>
        <p className="border border-gray-400 p-2 rounded-lg text-gray-500 hover:bg-gray-200 cursor-pointer">
          Tata Motors
        </p>
      </div>
    </div>
  );
}

export default Home;
