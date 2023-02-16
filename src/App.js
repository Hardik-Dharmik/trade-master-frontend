import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Footer from "./components/Footer/Footer";
import Stock from "./components/Stock/Stock";
import Dashboard from "./Pages/Dashboard";
import Portfolio from "./Pages/Portfolio";
import Transaction from "./Pages/Transaction";

function App() {
  return (
    <div className="mx-auto ">
      <Router>
        <Header />

        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/about" element={<p>About</p>} />
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route exact path="/portfolio" element={<Portfolio />} />
            <Route exact path="/transaction" element={<Transaction />} />
            <Route path="/stock/:stockID" element={<Stock />} />
          </Routes>
        </div>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
