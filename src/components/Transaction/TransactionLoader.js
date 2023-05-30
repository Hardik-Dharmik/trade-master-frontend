import { useRecoilState, useRecoilValue } from "recoil";
import { tokenState } from "../../atoms/userAtom";
import TransactionTable from "./TransactionTable";

function TransactionLoader() {
  const token = useRecoilValue(tokenState);

  return (
    <div>
      TransactionLoader
      <TransactionTable />
    </div>
  );
}

export default TransactionLoader;
