import PortfolioTable from "../components/Portfolio/PortfolioTable";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState, tokenState } from "../atoms/userAtom";
import Login from "./Login";

function Portfolio() {
  const token = useRecoilValue(userState);

  if (!token) return <Login msg="Please login to continue !!" />;

  return (
    <div className="flex flex-col min-h-screen px-5 bg-gray-100 py-2">
      <p className="text-xl font-semibold my-4 ml-5">Portfolio</p>

      <PortfolioTable />
    </div>
  );
}

export default Portfolio;
