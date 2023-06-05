import PortfolioTable from "../components/Portfolio/PortfolioTable";
import { useLocation } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from "recoil";
import { userState, tokenState } from "../atoms/userAtom";
import { transactionAtom } from "../atoms/transactionAtom";
import Login from "./Login";
import PortfolioLoader from "../components/Portfolio/PortfolioLoader";
import Colors from "../components/Alerts/Message";

function Portfolio() {
  const token = useRecoilValue(userState);
  const [transactionMsg, setTransactionMsg] = useRecoilState(transactionAtom);

  if (!token) return <Login msg="Please login to continue !!" />;

  return (
    <div className="flex flex-col min-h-screen px-5 bg-gray-100 py-2">
      <div
        className="md:w-1/5 w-3/5 mr-auto"
        onClick={() => setTransactionMsg({
          isMsgAvailable: false,
          msg: ""
        })}
      >
        {transactionMsg.isMsgAvailable && <Colors color="blue" msg={transactionMsg.msg} />}
      </div>
      <p className="text-xl font-semibold my-4 ml-5">Portfolio</p>

      {/* <PortfolioTable /> */}
      <PortfolioLoader />
    </div>
  );
}

export default Portfolio;
