import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";

function App() {
  return (
    <div className="mx-auto ">
      <Router>
        {/* <Link to="/">Home</Link>
        <Link to="/about">About</Link> */}
        <Header />

        <div>
          <Routes>
            <Route exact path="/" element={<p>Home</p>} />
            <Route path="/about" element={<p>About</p>} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
