import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const BASE_URL = "http://localhost:5000";

  const submitHandler = async () => {
    console.log("The function is called");
    try {
      const res = await axios.post(`${BASE_URL}/admins/login`, {
        email,
        password,
      });
      console.log(res);
    } catch (err) {
      setErrorMessage(err.response.data.message);
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
