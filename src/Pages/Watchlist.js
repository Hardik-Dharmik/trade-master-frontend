import WatchlistTable from "../components/Watchlist/WatchlistTable";
import { useRecoilValue } from "recoil";
import { userState, tokenState } from "../atoms/userAtom";
import Login from "./Login";
import useWatchlist from "../hooks/useWatchlist";
import WatchlistLoader from "../components/Watchlist/WatchlistLoader";

function Watchlist() {
  const token = useRecoilValue(userState);
  const token1 = useRecoilValue(tokenState);

  if (!token) return <Login msg="Please login to continue !!" />;
  console.log("Inside wl ->", token1);
  return (
    <div className="flex flex-col min-h-screen px-5 bg-gray-100 py-2">
      <p className="text-xl font-semibold my-4 ml-5">Watchlist</p>

      {/* <WatchlistTable /> */}
      <WatchlistLoader token={token1} />
    </div>
  );
}

export default Watchlist;
