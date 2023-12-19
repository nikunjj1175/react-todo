import React, { useRef } from "react";
import Header from "./Header1";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

function Login() {
    const navigate = useNavigate();
    const { setIsLoggedIn } = useAuth();
    const email = useRef();
    const password = useRef();
    const getEmail = localStorage.getItem("emailData");
    const getPassword = localStorage.getItem("passwordData");

    const handleLogin = (e) => {
        if (email.current.value === getEmail && password.current.value === getPassword)
            {
            // localStorage.setItem("emailData", "abc@gmail.com");
            // localStorage.setItem("passwordData", "123");
            setIsLoggedIn(true);
            navigate("/dashboard");
        }
        e.preventDefault();
    };
    return (
        <>
            <Header />
            <div>
                <div className="container box">
                    <div className="login_box">
                        <div className="login_header">
                            <h2 className="heading">Login</h2>
                            <p style={{ color: "#666", margin: "0px" }}>
                                Just a signal click!
                            </p>
                        </div>
                        <div className="login_body">
                            <form>
                                <div>
                                    <input
                                        type="text"
                                        style={{ border: "1px solid gray", fontSize: "15px" }}
                                        ref={email}
                                        placeholder="Enter Email"
                                    />
                                </div>
                                <br />
                                <div>
                                    <input
                                        type="password"
                                        style={{ border: "1px solid gray", fontSize: "15px" }}
                                        ref={password}
                                        placeholder="Enter Password"
                                    />
                                </div>
                                <br />
                                <button
                                    className="login_btn"
                                    type="submit"
                                    onClick={handleLogin}
                                >
                                    LogIn
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
