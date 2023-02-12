import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="mx-auto ">
      <Router>
        <Header />

        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/about" element={<p>About</p>} />
          </Routes>
        </div>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
