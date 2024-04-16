import { useContext, useState } from "react";
import "./register.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { RegAuthContext } from "../../context/RegAuth";
import Swal from "sweetalert2";

const Register = () => {
    
    const [inputs, setInputs] = useState({
        username: "",
        email: "",
        password: "",
        phone: ""
    });

    const { loading, error, dispatch } = useContext(RegAuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        dispatch({ type: "SIGNUP_START" });
        try {
            const res = await axios.post("/auth/register", inputs);
            dispatch({ type: "SIGNUP_SUCCESS", payload: res.data.details });
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
                title: "Registered successfully"
              });
            navigate("/login");
        } catch (err) {
            Swal.fire({
                title: " User Not Register!",
                text: "Incorrect User Information!",
                icon: "error"
                });
            dispatch({ type: "SIGNUP_FAILURE", payload: err.response.data });
        }
    };

    return (
        <div className="register">
            <div className="card">
                <div className="left">
                    <h1>Hotelier</h1>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
                        alias totam numquam ipsa exercitationem dignissimos, error nam,
                        consequatur.
                    </p>
                    <span>Do you have an account?</span>
                    <Link to="/login">
                        <button>Login</button>
                    </Link>
                </div>
                <div className="right">
                    <h1>Register</h1>
                    <form>
                        <input type="text" placeholder="Username" name="username" onChange={handleChange} />
                        <input type="email" placeholder="Email" name="email" onChange={handleChange} autoComplete="current-email" />
                        <input type="password" placeholder="Password" name="password" autoComplete="current-password" onChange={handleChange} />
                        <input type="number" placeholder="Phone" name="phone" onChange={handleChange} />
                        <button onClick={handleClick} disabled={loading}>Register</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
