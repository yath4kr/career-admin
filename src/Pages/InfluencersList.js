import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const InfluencersList = () => {
  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies(["access_token", "user_id"]);
  const [influencers, setInfluncers] = useState([]);
  const [selected, setSelected] = useState(null);
  const BASE_URL = "http://localhost:5000";

  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [books, setBooks] = useState([]);
  const [courses, setCourses] = useState([]);

  const [newBookName, setNewBookName] = useState("");
  const [newBookUrl, setNewBookUrl] = useState("");
  const [newCourseName, setNewCourseName] = useState("");
  const [newCourseUrl, setNewCourseUrl] = useState("");

  useEffect(() => {
    if (!cookies.access_token || !cookies.user_id) {
      setCookies("access_token", "");
      setCookies("user_id", "");
      navigate("/login");
    }

    const fetchInfluencers = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/admins/fetchInfluencers`, {
          headers: { authorization: cookies.access_token },
        });
        setInfluncers(res?.data?.influencers);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchInfluencers();
  }, [setCookies, cookies, navigate]);

  function editButtonHandler(id) {
    setSelected(influencers[id]);

    setName(influencers[id]?.name);
    setTitle(influencers[id]?.title);
    setDescription(influencers[id]?.description);
    setImageUrl(influencers[id]?.imageUrl);
    setBooks(influencers[id]?.books);
    setCourses(influencers[id]?.courses);
  }

  function unSelectHandle() {
    setSelected(null);
    setName("");
    setTitle("");
    setDescription("");
    setImageUrl("");
    setBooks(null);
    setCourses(null);
  }

  const deleteHandle = async (id) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/admins/deleteInfluencer`,
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

  const submitHandle = async () => {
    const data = {
      _id: selected._id,
      name,
      title,
      description,
      books,
      courses,
      imageUrl,
    };

    try {
      const res = await axios.post(
        `${BASE_URL}/admins/updateInfluencer`,
        data,
        {
          headers: { authorization: cookies.access_token },
        }
      );
      window.alert("Influencer updated successfully");
      setSelected(null);
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  function removeBookHandle(bookIndex) {
    const updatedBooks = selected.books.filter(
      (_, index) => index !== bookIndex
    );
    setSelected({ ...selected, books: updatedBooks });
    setBooks(updatedBooks);
  }

  function removeCourseHandle(courseIndex) {
    const updatedCourses = selected.books.filter(
      (_, index) => index !== courseIndex
    );
    setSelected({ ...selected, courses: updatedCourses });
    setBooks(updatedCourses);
  }

  function addCourseHandle() {
    const newCourse = { name: newCourseName, url: newCourseUrl };
    const updatedCourses = [...courses, newCourse];
    setSelected({ ...selected, courses: updatedCourses });
    setCourses(updatedCourses);
  }

  function addBookHandle() {
    const newBook = { name: newBookName, url: newBookUrl };
    const updatedBooks = [...books, newBook];
    setSelected({ ...selected, books: updatedBooks });
    setBooks(updatedBooks);
  }

  return (
    <>
      <div>
        <span
          onClick={() => {
            navigate("/influencers");
          }}
          className="ilnav"
        >
          Add New Influencer
        </span>
      </div>
      <h1>This is where you can manage the influencers which already exist.</h1>
      <div className="ilPageContainer">
        <div className="ilPageLeft">
          <h4>The List : </h4>
          {influencers.map((influencer, index) => {
            return (
              <div className="ilPageItem" key={index}>
                <img
                  src={`${influencer.imageUrl}`}
                  alt={`${influencer.name}`}
                  height={"150px"}
                  width={"150px"}
                />
                <br />
                Name : {influencer.name}
                <br />
                Title : {influencer.title}
                <br />
                Image URL : {influencer.imageUrl}
                <br />
                Description : {influencer.description}
                <br />
                Books :
                <br />
                {influencer.books?.map((book, id) => {
                  return (
                    <div key={id}>
                      {id + 1} : {book.name} - {book.url}{" "}
                    </div>
                  );
                })}
                <br />
                Courses :
                <br />
                {influencer.courses?.map((course, id) => {
                  return (
                    <div key={id}>
                      {id + 1} : {course.name} - {course.url}
                    </div>
                  );
                })}
                <br />
                <button
                  onClick={() => {
                    editButtonHandler(index);
                  }}
                >
                  Edit
                </button>
                <br />
              </div>
            );
          })}
        </div>
        <div className="ilPageRight">
          {!selected ? (
            <></>
          ) : (
            <div>
              <div className="ilPageRightItems">
                Name :{" "}
                <input
                  value={selected.name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
                <br />
              </div>
              <div className="ilPageRightItems">
                Title :{" "}
                <input
                  value={selected.title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
                <br />
              </div>
              <div className="ilPageRightItems">
                Image URl :{" "}
                <input
                  value={selected.imageUrl}
                  onChange={(e) => {
                    setImageUrl(e.target.value);
                  }}
                />
                <br />
              </div>
              <div className="ilPageRightItems">
                Description :
                <br />
                <textarea
                  value={selected.description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
                <br />
              </div>
              <div className="ilPageRightItems">
                Books :
                <br />
                {selected.books.map((book, ind) => {
                  return (
                    <div key={ind}>
                      {ind + 1}. {book.name} - {book.url}{" "}
                      <button
                        onClick={() => {
                          removeBookHandle(ind);
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  );
                })}
                <br />
                New Book Name :{" "}
                <input
                  onChange={(e) => {
                    setNewBookName(e.target.value);
                  }}
                />
                <br />
                New Book Url :{" "}
                <input
                  onChange={(e) => {
                    setNewBookUrl(e.target.value);
                  }}
                />
                <br />
                <button onClick={addBookHandle}>Add Book</button>
              </div>
              <br />
              <div className="ilPageRightItems">
                Courses :
                <br />
                {selected.courses.map((course, ind) => {
                  return (
                    <div key={ind}>
                      {ind + 1}. {course.name} - {course.url}{" "}
                      <button
                        onClick={() => {
                          removeCourseHandle(ind);
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  );
                })}
                <br />
                New Course Name :{" "}
                <input
                  onChange={(e) => {
                    setNewCourseName(e.target.value);
                  }}
                />
                <br />
                New Course Url :{" "}
                <input
                  onChange={(e) => {
                    setNewCourseUrl(e.target.value);
                  }}
                />
                <br />
                <button onClick={addCourseHandle}>Add Course</button>
              </div>
              <div className="ilPageRightItems">
                <div className="ilPageRightButtons">
                  <button
                    onClick={() => {
                      deleteHandle(selected._id);
                    }}
                  >
                    Delete
                  </button>
                  <br />
                  <button onClick={unSelectHandle}>Unselect</button>
                  <br />
                  <button onClick={submitHandle}>Submit</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default InfluencersList;
