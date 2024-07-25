import Navbar from "../Components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const BASE_URL = "http://localhost:5000";
  const [cookies, setCookies] = useCookies(["access_token", "user_id"]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!cookies.access_token || !cookies.user_id) {
      setCookies("access_token", "");
      setCookies("user_id", "");
      navigate("/login");
    }

    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/clients/fetchCategories`);
        setCategories(res?.data?.categories);
        console.log(res?.data?.categories);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchCategories();
  }, []);

  const submitHandler = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/admins/addCategory`,
        { name, description },
        {
          headers: { authorization: cookies.access_token },
        }
      );
      window.alert(res?.data?.message);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteHandler = async (id) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/admins/deleteCategory`,
        { id },
        {
          headers: { authorization: cookies.access_token },
        }
      );
      window.alert(`${res?.data?.message}`);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="catPage">
        <div className="catLeft">
          <h3>Add categories</h3>
          <label>Name : </label>
          <br />
          <input
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <br />
          <label>Description : </label>
          <br />
          <textarea
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <br />
          <button onClick={submitHandler}>Submit</button>
        </div>
        <div className="catRight">
          <h3>The List : </h3>
          {categories.map((cat, index) => {
            return (
              <div key={index}>
                Name : {cat.name}
                <br />
                Description : <br />
                {cat.description}
                <br />
                <button
                  onClick={() => {
                    deleteHandler(cat._id);
                  }}
                >
                  Delete This
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Categories;
