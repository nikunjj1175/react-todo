import { NavLink, Link } from "react-router-dom";
import "./Styles/header.css";
import { useAuth } from "./AuthContext";

const Header = () => {
    const { isLoggedIn, setIsLoggedIn } = useAuth();

    const handleLogout = () => {
        setIsLoggedIn(false);
    };
    return (
        <>
            <div className="navHeader">
                <div className="navHeaderContainer container">
                    <div className="brand">
                        <Link className="headLine" to="/">
                            Social Diary
                        </Link>
                        <p className="subHeader mb-0">Share your story with others</p>
                    </div>
                    <div className="navLinks">
                        <span>
                            {isLoggedIn ? (
                                <>
                                    <NavLink className="navLink" to="/dashboard">
                                        Timeline
                                    </NavLink>
                                    <NavLink className="navLink" to="/create">
                                        Add Story
                                    </NavLink>
                                    <NavLink className="navLink" to="/myStory">
                                        My Story
                                    </NavLink>
                                    <button className="navLink" onClick={handleLogout}>
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <NavLink className="navLink" to="/login">
                                    Login
                                </NavLink>
                            )}
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;
