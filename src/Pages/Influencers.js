import Navbar from "../Components/Navbar";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Influencers = () => {
  const [cookies, setCookies] = useCookies(["access_token", "user_id"]);
  const navigate = useNavigate();
  const BASE_URL = "http://localhost:5000";

  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [books, setBooks] = useState([]);
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [bookName, setBookName] = useState("");
  const [courseName, setCourseName] = useState("");
  const [bookUrl, setBookUrl] = useState("");
  const [courseUrl, setCourseUrl] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (!cookies.access_token || !cookies.user_id) {
      setCookies("access_token", "");
      setCookies("user_id", "");
      navigate("/login");
    }
  }, [cookies, navigate, setCookies]);

  const addBookHandler = () => {
    setBooks([...books, { name: bookName, url: bookUrl }]);
    setBookName("");
    setBookUrl("");
  };

  const addCourseHandler = () => {
    setCourses([...courses, { name: courseName, url: courseUrl }]);
    setCourseName("");
    setCourseUrl("");
  };

  const addCategoryHandler = () => {
    setCategories([...categories, category]);
    setCategory("");
  };

  const submitHandler = async () => {
    try {
      const data = {
        name,
        title,
        description,
        books,
        courses,
        categories,
        imageUrl,
      };

      const res = await axios.post(`${BASE_URL}/admins/addInfluencer`, data, {
        headers: { authorization: cookies.access_token },
      });
      window.alert(`${res.data.message}`);
      navigate("/influencersList");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="pseudoNav">
        <Navbar />
        <div
          className="pseudoNavElement"
          onClick={() => {
            navigate("/influencersList");
          }}
        >
          InfluencersList
        </div>
      </div>
      <div className="InflencersForm">
        <div className="infFormElement">
          <label>Name : </label>
          <br />
          <input
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <br />
        </div>
        <div className="infFormElement">
          <label>Title : </label>
          <br />
          <input
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div className="infFormElement">
          <label>Description : </label>
          <br />
          <textarea
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </div>
        <div className="infFormElement">
          <label>Image Url : </label>
          <br />
          <input
            onChange={(e) => {
              setImageUrl(e.target.value);
            }}
          />
        </div>
        <div className="infFormElement infFormElementspecial">
          <label>Books : </label>
          <br />
          <label>Name of the Book : </label>
          <br />
          <input
            onChange={(e) => {
              setBookName(e.target.value);
            }}
            id="bookName"
          />
          <br />
          <label>Url of the Book : </label>
          <br />
          <input
            onChange={(e) => {
              setBookUrl(e.target.value);
            }}
            id="bookUrl"
          />
          <br />
          <span className="addButton" onClick={addBookHandler}>
            Add Book
          </span>
        </div>
        <div className="infFormElement infFormElementspecial">
          <label>Courses : </label>
          <br />
          <label>Name of the Course : </label>
          <br />
          <input
            onChange={(e) => {
              setCourseName(e.target.value);
            }}
            id="courseName"
          />
          <br />
          <label>Url of the Course : </label>
          <br />
          <input
            onChange={(e) => {
              setCourseUrl(e.target.value);
            }}
            id="courseUrl"
          />
          <br />
          <span className="addButton" onClick={addCourseHandler}>
            Add Course
          </span>
        </div>
        <div className="infFormElement infFormElementspecial">
          <label>Categories : </label>
          <br />
          <label>Category : </label>
          <br />
          <input
            onChange={(e) => {
              setCategory(e.target.value);
            }}
            value={category}
          />
          <br />
          <span className="addButton" onClick={addCategoryHandler}>
            Add Category
          </span>
        </div>
        <button
          onClick={(e) => {
            submitHandler();
          }}
        >
          Submit
        </button>
      </div>
      <div>
        <h3>Books:</h3>
        {books?.map((book, index) => (
          <div key={index}>
            {book.name} - {book.url}
          </div>
        ))}
      </div>
      <br />
      <div>
        <h3>Courses:</h3>
        {courses?.map((course, index) => (
          <div key={index}>
            {course.name} - {course.url}
          </div>
        ))}
      </div>
      <br />
      <div>
        <h3>Categories:</h3>
        {categories?.map((category, index) => (
          <div key={index}>{category}</div>
        ))}
      </div>
    </>
  );
};

export default Influencers;
