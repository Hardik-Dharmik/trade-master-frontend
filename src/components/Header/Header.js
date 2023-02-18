import logo from "../../Assets/Images/logo.png";
import HeaderLinks from "./HeaderLinks";
import { Link } from "react-router-dom";
import {
  MagnifyingGlassIcon,
  UserCircleIcon,
  UserIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

function Header() {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    console.log("Clicoe", open);
    setOpen(!open);
  };

  return (
    <>
      <header className="hidden md:flex items-center justify-between bg-white px-5 text-sm">
        {/* Left  */}
        <div className="flex items-center">
          {/* Logo  */}
          <img src={logo} alt="Logo" className="h-16 w-16" />

          {/* Links  */}
          <div className="flex items-center space-x-5 ml-2 text-gray-800">
            {/* Home */}
            <Link to="/">
              <HeaderLinks link="/" linkName="Home" />
            </Link>

            {/* Dashboard  */}
            <Link to="/dashboard">
              <HeaderLinks link="/dashboard" linkName="Dashboard" />
            </Link>

            {/* Portfolio  */}
            <Link to="/portfolio">
              <HeaderLinks link="/portfolio" linkName="Portfolio" />
            </Link>

            {/* Transactions  */}
            <Link to="/transaction">
              <HeaderLinks link="/transaction" linkName="Transaction" />
            </Link>

            {/* Watchlist  */}
            <Link to="/watchlist">
              <HeaderLinks link="/watchlist" linkName="Watchlist" />
            </Link>
          </div>
        </div>

        {/* Right  */}
        <div className="flex items-center space-x-5 flex-grow justify-end">
          {/* Search  */}
          <div className="flex items-center bg-gray-100 px-5 py-1 w-2/5  rounded-3xl space-x-2 justify-between">
            <input
              type="text"
              className="bg-gray-100 focus:outline-none text-sm flex-grow"
              placeholder="Search stocks"
            />
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-600" />
          </div>

          {/* Login Signup   */}
          <div className="flex space-x-5">
            <button className="flex items-center px-2 py-1 rounded-2xl border border-blue-400 hover:bg-blue-400 hover:text-white group">
              <UserIcon className="h-4 w-4 mx-1 text-gray-500 group-hover:text-white" />
              <p className="mx-1  group-hover:text-white">Login</p>
            </button>
            <button className="px-4 py-1  rounded-2xl hover:bg-blue-400 hover:text-white">
              Signup
            </button>
          </div>

          {/* Profile Logout */}
          {/* <div className="flex space-x-5">
          <UserCircleIcon className="h-9 w-9 text-gray-500 cursor-pointer" />
          <button className="px-4 py-1  rounded-3xl border border-blue-400 hover:bg-blue-400 hover:text-white">
            Logout
          </button>
        </div> */}
        </div>
      </header>

      <header className="flex flex-col md:hidden">
        <div className="flex flex-grow justify-between px-2 items-center cursor-pointer">
          <img src={logo} alt="Logo" className="h-16 w-16" />

          <div className="mr-5">
            {open ? (
              <XMarkIcon className="h-5 w-5" onClick={toggle} />
            ) : (
              <Bars3Icon className="h-5 w-5" onClick={toggle} />
            )}
          </div>
        </div>
        {open && (
          <div className="flex items-center space-y-3 ml-2 flex-col shadow-b-lg">
            {/* Home */}
            <Link to="/">
              <HeaderLinks link="/" linkName="Home" />
            </Link>

            {/* Dashboard  */}
            <Link to="/dashboard">
              <HeaderLinks link="/dashboard" linkName="Dashboard" />
            </Link>

            {/* Portfolio  */}
            <Link to="/portfolio">
              <HeaderLinks link="/portfolio" linkName="Portfolio" />
            </Link>

            {/* Transactions  */}
            <Link to="/transaction">
              <HeaderLinks link="/transaction" linkName="Transaction" />
            </Link>

            {/* Watchlist  */}
            <Link to="/watchlist">
              <HeaderLinks link="/watchlist" linkName="Watchlist" />
            </Link>

            {/* Login Signup   */}
            {/* <div className="flex flex-col space-y-3">
              <button className="px-4 py-1  rounded-3xl hover:bg-blue-400 hover:text-white">
                Login
              </button>
              <button className="px-4 py-1  rounded-3xl border border-blue-400 hover:bg-blue-400 hover:text-white">
                Signup
              </button>
            </div> */}

            {/* Profile Logout */}
            <div className="flex  space-x-3 items-center">
              <UserCircleIcon className="h-9 w-9 text-gray-500 cursor-pointer" />
              <button className="px-4 py-1  rounded-3xl border border-blue-400 hover:bg-blue-400 hover:text-white">
                Logout
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

export default Header;
