import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./login.scss";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate()

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", credentials);
      if (res.data.isAdmin) {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
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
          title: "logged in successfully"
        });
        navigate("/")
      } 
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
      Swal.fire({
        title: "You Not Admin!",
        text: "Incorrect id and password!",
        icon: "error"
        });
    }
  };


  return (
    <div className="login">
    <div className="card">
      <div className="left">
        <h1>Welcome Admin</h1>
      </div>
      <div className="right">
        <h1> Admin Login</h1>
        <form>
          <input type="text" placeholder="Username" id="username" onChange={handleChange} />
          <input type="password" placeholder="Password" id="password" onChange={handleChange} />
          <button onClick={handleClick}>Login</button>
        </form>
      </div>
    </div>
  </div>
  );
};

export default Login;