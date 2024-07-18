import { useCookies } from "react-cookie";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";

const Home = () => {
  const [cookies, setCookies] = useCookies(["access_token", "user_id"]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!cookies.access_token || !cookies.user_id) {
      setCookies("access_token", "");
      setCookies("user_id", "");
      navigate("/login");
    }
  }, [cookies, navigate, setCookies]);
  function logoutHandler() {
    setCookies("access_token", "");
    setCookies("user_id", "");
    navigate("/login");
  }
  return (
    <>
      <Navbar />
      <h1>This is where Admins work!</h1>
      <button onClick={logoutHandler}>Logout</button>
    </>
  );
};

export default Home;
