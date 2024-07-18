import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../Components/Navbar";

const Users = () => {
  const [cookies, setCookies] = useCookies(["access_token", "user_id"]);
  const navigate = useNavigate();
  const BASE_URL = "http://localhost:5000";
  const [clients, setClients] = useState([]);

  useEffect(() => {
    if (!cookies.access_token || !cookies.user_id) {
      setCookies("access_token", "");
      setCookies("user_id", "");
      navigate("/login");
    }
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/admins/fetchUsers`, {
          headers: { authorization: cookies.access_token },
        });
        setClients(res.data.users);
        console.log(res.data.users);
      } catch (err) {
        console.error(err.res?.data?.message);
      }
    };
    fetchUsers();
  }, [cookies, navigate, setCookies]);
  return (
    <>
      <Navbar />
      <h2>This is where we will handle users</h2>
      <h2>Lists of Clients are :- </h2>
      <div>
        {clients?.map((client, index) => {
          return (
            <div className="clientBox" key={index}>
              <div className="clientBoxElement">Name : {client.name}</div>
              <div className="clientBoxElement">
                Username : {client.username}
              </div>
              <div className="clientBoxElement">
                Password : {client.password}
              </div>
              <div className="clientBoxElement">Email : {client.email}</div>
              <div className="clientBoxElement">Mobile : {client.mobile}</div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Users;
