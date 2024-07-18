import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Users from "./Pages/Users";
import Influencers from "./Pages/Influencers";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="users" element={<Users />} />
          <Route path="influencers" element={<Influencers />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
