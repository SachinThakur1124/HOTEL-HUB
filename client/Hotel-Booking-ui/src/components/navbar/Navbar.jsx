import { Link } from "react-router-dom";
import "./navbar.css";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function Navbar() {

  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: "success",
      title: "Logged out"
    });
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
    navigate("/login");

  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ textDecoration: "none" }}><span className="logo">HOTELHUB</span></Link>
        {user ? <span className="userName">{user.username}</span> : (<div className="navItems">
          <Link to="/register">
            <button className="navButton">Register</button>
          </Link>
          <Link to="/login">
            <button className="navButton">Login</button>
          </Link>
        </div>)}
        {!user ? "" : (<button className="navButton" onClick={handleLogout}>Logout</button>)}
      </div>
    </div>
  )
}
