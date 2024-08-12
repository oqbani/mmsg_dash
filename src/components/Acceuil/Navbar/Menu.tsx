import React from "react";
import logo from "/mmsg-logo.png";
import img from "/profile-dash.jpg";
import { Link, useNavigate } from "react-router-dom";
import { AiFillMessage } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";

const Menu: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("mmsg_token");

    navigate("/login");
  };
  // const {logout} = useAuth()
  // useEffect(() => {
  //   logout()
  //   document.location.reload()
  // }, [logout])
  
  return (
    <div className="menu">
      <nav className="navbar d-flex justify-content-between navbar-expand-lg fixed-top">
        <div className="container-fluid d-flex align-items-center">
          <Link
            to="/"
            className="navbar-brand d-flex justify-content-center gap-2 align-items-center"
          >
            <img src={logo} style={{ width: "2.5rem" }} />
            <h5 className="fw-bolder mt-2" style={{ color: "#fff" }}>
              MMSG
            </h5>
          </Link>
          <div className="d-flex gap-3">
            <li className="nav-item">
              <button onClick={handleLogout} className="logout-button">
                <BiLogOut />
              </button>
            </li>
            <li className="nav-item">
              <Link to={"/messages"}>
                <AiFillMessage className="fs-5" />
                <span>1</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/users/update-user/1"} className="nav-link" aria-current="page">
                <img
                  src={img}
                  className="rounded-circle"
                  style={{ width: "2rem" }}
                />
              </Link>
            </li>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Menu;
