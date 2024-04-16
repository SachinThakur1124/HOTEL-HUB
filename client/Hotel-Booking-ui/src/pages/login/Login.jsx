import { useContext, useState } from "react";
import "./login.scss";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const Login = () => {

  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  
  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", credentials);
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
      navigate("/");
    } catch (err) {
       Swal.fire({
        title: " User Not Found!",
        text: "Incorrect id and password!",
        icon: "error"
        });
      
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Welcome User</h1>
          <p>
          Welcome to our Hotel Booking Site! We're thrilled to have you join our community of travelers and explorers
          </p>
          <span>Don't you have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
            <input type="text" placeholder="Username" id="username" onChange={handleChange} />
            <input type="password" placeholder="Password" id="password" onChange={handleChange} />
            <button onClick={handleClick}>Login</button>
            {/* {error && <span>{error.message}</span>} */}
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login