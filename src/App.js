import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Users from "./Pages/Users";
import Influencers from "./Pages/Influencers";
import InfluencersList from "./Pages/InfluencersList";
import Categories from "./Pages/Categories";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="users" element={<Users />} />
          <Route path="/influencers" element={<Influencers />} />
          <Route path="/influencersList" element={<InfluencersList />} />
          <Route path="/categories" element={<Categories />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
