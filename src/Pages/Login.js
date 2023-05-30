import { useState } from "react";
import { Link } from "react-router-dom";
import { UserIcon, EyeIcon } from "@heroicons/react/24/outline";
import { useRecoilState } from "recoil";
import { userState, tokenState, firstTimeLogin } from "../atoms/userAtom";
import { useNavigate } from "react-router-dom";
import Colors from "../components/Alerts/Message";

function Login({ msg }) {
  let navigate = useNavigate();
  const [type, setType] = useState("password");
  const [error, seterror] = useState(null);
  const [user, setUser] = useRecoilState(userState);
  const [token, setToken] = useRecoilState(tokenState);
  const [firsttimeLogin, setfirstTimeLogin] = useRecoilState(firstTimeLogin);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = () => {
    fetch(`${process.env.REACT_APP_BACKEND_API_URL}/api/auth/login`, {
      method: "POST",

      body: JSON.stringify(formData),

      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.success) {
          window.localStorage.setItem("user", json.username);
          window.localStorage.setItem("token", json.authtoken);
          window.localStorage.setItem("firstTimeLogin", true);

          setUser(json.username);
          setToken(json.authtoken);
          setfirstTimeLogin(true);

          navigate("/");
        } else {
          seterror("Invalid credentials");
        }
      });
  };

  return (
    <div className="flex flex-col min-h-screen px-5 bg-gray-100 py-2 ">
      {/* {msg && (
        <p className="w-fit mx-auto bg-red-400 p-2 text-white rounded-lg mt-3">
          {msg}
        </p>
      )} */}
      <div class="w-full max-w-xs mx-auto mt-9">
        {msg && <Colors msg={msg} color="red" />}
        {error && <Colors msg={error} color="red" />}
        <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-4">
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="email"
            >
              Email
            </label>
            <div className="flex items-center shadow appearance-none  rounded w-full py-2 px-3 text-gray-700 leading-tight  justify-between">
              <input
                class="focus:outline-none focus:shadow-outline flex-grow"
                id="email"
                type="text"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <UserIcon className="h-5 w-5 ml-2 text-gray-500" />
            </div>
          </div>
          <div class="mb-6">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="password"
            >
              Password
            </label>
            <div className="flex items-center shadow appearance-none  rounded w-full py-2 px-3 text-gray-700 leading-tight  justify-between">
              <input
                class="focus:outline-none focus:shadow-outline flex-grow"
                id="password"
                name="password"
                type={type}
                placeholder="*********"
                value={formData.password}
                onChange={handleChange}
              />
              <EyeIcon
                className="h-5 w-5 ml-2 text-gray-500 hover:text-blue-500 cursor-pointer"
                onClick={() => {
                  if (type === "password") setType("text");
                  else setType("password");
                }}
              />
            </div>
          </div>
          <div class="flex items-center justify-between">
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleLogin}
            >
              Login
            </button>
            <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
              Forgot Password?
            </a>
          </div>

          <div class="flex items-center justify-center mt-4">
            <p className=" text-gray-700 text-sm font-bold ">
              Didn't have account?
            </p>
            <Link
              to="/signup"
              class="ml-1 font-bold text-sm text-blue-500 hover:text-blue-800"
            >
              Signup here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
