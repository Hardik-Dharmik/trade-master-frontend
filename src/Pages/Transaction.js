import TransactionTable from "../components/Transaction/TransactionTable";
function Transaction() {
  return (
    <div className="flex flex-col min-h-screen px-5 bg-gray-100 py-2">
      <p className="text-xl font-semibold my-4 ml-5">Transactions</p>

      <TransactionTable />
    </div>
  );
}

export default Transaction;
