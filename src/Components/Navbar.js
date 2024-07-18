import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  function clickHandler(path) {
    navigate(path);
  }

  return (
    <>
      <div className="navbar">
        <div className="nav-element" onClick={(e) => clickHandler("/users")}>
          Users
        </div>
        <div
          className="nav-element"
          onClick={(e) => clickHandler("/influencers")}
        >
          Influencers
        </div>
        <div
          className="nav-element"
          onClick={(e) => clickHandler("/categories")}
        >
          Categories
        </div>
      </div>
    </>
  );
};

export default Navbar;
