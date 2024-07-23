import { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [cookies, setCookies] = useCookies(["access_token", "user_id"]);
  const navigate = useNavigate();
  const BASE_URL = "http://localhost:5000";

  useEffect(() => {
    if (cookies.access_token && cookies.user_id) {
      navigate("/");
    }
  }, [cookies, navigate]);

  const submitHandler = async () => {
    console.log("The function is called");
    try {
      const res = await axios.post(`${BASE_URL}/admins/login`, {
        email,
        password,
      });
      if (res) console.log(res);
      setCookies("access_token", res?.data?.token);
      setCookies("user_id", res?.data?.userId);
      navigate("/");
    } catch (err) {
      setErrorMessage(err?.message);
    }
  };

  return (
    <div className="login-page">
      <div className="login-page-container">
        <div className="form-element">Login!</div>
        <div className="form-element">
          <label>Email</label>
          <br />
          <input
            id="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="form-element">
          <label>Password</label>
          <br />
          <input
            id="password"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <span className="error-message">{errorMessage}</span>
        <br />
        <button className="login-submit-button" onClick={submitHandler}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default Login;
