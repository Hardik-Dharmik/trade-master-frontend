import PortfolioTable from "../components/Portfolio/PortfolioTable";

{
  /*
symbol
fullname
change
change%
qty
boughtat
currentprice
*/
}

function Portfolio() {
  return (
    <div className="flex flex-col min-h-screen px-5 bg-gray-100 py-2">
      <p>Portfolio</p>

      <PortfolioTable />
    </div>
  );
}

export default Portfolio;
