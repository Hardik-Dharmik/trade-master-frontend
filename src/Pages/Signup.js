import { useState } from "react";
import FormButton from "../components/Form/FormButton";
import FormFooter from "../components/Form/FormFooter";
import { UserIcon, EyeIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { ColorRing } from 'react-loader-spinner';
import { useRecoilState } from "recoil";
import { transactionAtom } from "../atoms/transactionAtom";

function Signup() {
  let navigate = useNavigate();
  const [type, setType] = useState("password");
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    cpassword: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [transactionMsg, setTransactionMsg] = useRecoilState(transactionAtom);


  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignin = () => {
    let errorString = "";
    if (formData.email === "" || formData.name === "" || formData.password === "" || formData.cpassword === "") {
      errorString += "Required fields :  ";
    }

    if (formData.email === "") {
      errorString += "Email, ";
    }

    if (formData.name === "") {
      errorString += "Name, ";
    }

    if (formData.password === "") {
      errorString += "Password, ";
    }

    if (errorString != "")
      errorString = errorString.substring(0, errorString.length - 2);

    console.log(errorString);

    setError(errorString)

    if (errorString !== "")
      return;


    setIsLoading(true);
    fetch(`${process.env.REACT_APP_BACKEND_API_URL}/api/auth/register`, {
      method: "POST",

      body: JSON.stringify(formData),

      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setTransactionMsg({
          isMsgAvailable: true,
          msg: "Signup successfull !!"
        })
        setIsLoading(false);
        navigate("/login");
      });
  };

  return (
    <div className="flex flex-col min-h-screen px-5 bg-gray-100 py-2 ">
      <div class="w-full max-w-xs mx-auto mt-9">
        <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="username"
            >
              Username
            </label>
            <div className={`flex items-center shadow appearance-none  rounded w-full py-2 px-3 text-gray-700 leading-tight  justify-between `}>
              <input
                class="focus:outline-none focus:shadow-outline flex-grow"
                id="username"
                type="text"
                placeholder="Username"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              <UserIcon className="h-5 w-5 ml-2 text-gray-500" />
            </div>
            {formData.name === "" && <p className="text-red-300 text-sm my-1">Required</p>}
          </div>

          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="email"
            >
              Email
            </label>
            <div className={`flex items-center shadow appearance-none  rounded w-full py-2 px-3 text-gray-700 leading-tight  justify-between `}>
              <input
                class="focus:outline-none focus:shadow-outline flex-grow"
                id="email"
                name="email"
                type="email"
                placeholder="abc@gmail.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <EnvelopeIcon className="h-5 w-5 ml-2 text-gray-500" />
            </div>
            {formData.email === "" && <p className="text-red-300 text-sm my-1">Required</p>}
          </div>

          <div class="mb-6">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="password"
            >
              Password
            </label>
            <div className={`flex items-center shadow appearance-none  rounded w-full py-2 px-3 text-gray-700 leading-tight  justify-between `}>
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
            {formData.password === "" && <p className="text-red-300 text-sm my-1">Required</p>}
          </div>

          <div class="mb-6">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="cpassword"
            >
              Confirm Password
            </label>
            <div className="flex items-center shadow appearance-none  rounded w-full py-2 px-3 text-gray-700 leading-tight  justify-between">
              <input
                class="focus:outline-none focus:shadow-outline flex-grow"
                id="cpassword"
                name="cpassword"
                type={type}
                placeholder="*********"
                value={formData.cpassword}
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
              class="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleSignin}
              disabled={error !== ""}
            >
              {isLoading && <ColorRing
                visible={true}
                height="30"
                width="30"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
              />}
              Signup
            </button>
            <div class="flex items-center my-3">
              <input
                id="checked-checkbox"
                type="checkbox"
                value=""
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                onClick={() => {
                  if (type === "password") setType("text");
                  else setType("password");
                }}
              />
              <label
                for="checked-checkbox"
                class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Show Password
              </label>
            </div>
          </div>

          <FormFooter
            text="Already have an account ?"
            linkText="Login here"
            link="/login"
          />
        </form>
      </div>
    </div>
  );
}

export default Signup;
