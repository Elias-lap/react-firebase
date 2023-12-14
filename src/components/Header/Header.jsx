import { Link, NavLink, useNavigate } from "react-router-dom";
import ContextDarkModd from "../../context/ConetxtDarkModd";
import { useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/config";
import { signOut } from "firebase/auth";

function Header() {
  const [user] = useAuthState(auth);
  const {  toggleMood } = useContext(ContextDarkModd);
  const navigate = useNavigate()
  return (
    <>
      <header
        className={`hide-when-mobile ${
          localStorage.getItem("MyMood") === null ? "light" : localStorage.getItem("MyMood")
        }`}
      >
        <h1>
          <Link to={"/"}>Home </Link>{" "}
        </h1>

        <button
          className="DarkMood"
          onClick={() =>
            toggleMood(
              localStorage.getItem("MyMood") === "light" ? "dark" : "light"
            )
          }
        >
          {localStorage.getItem("MyMood") === "light" ? (
            <i className="fa-solid fa-moon"></i>
          ) : (
            <i className="fa-solid fa-sun"></i>
          )}{" "}
        </button>
        <ul className="flex">
          {!user &&  (
            <>
              <li className="main-list">
                <NavLink className="main-link" to="/signin">
                  {" "}
                  Sign In
                </NavLink>
              </li>
              <li className="main-list">
                <NavLink className="main-link" to="/signup">
                  {" "}
                  Sign Up
                </NavLink>
              </li>
            </>
          )}
          {user && (
            <li
              onClick={() =>
                signOut(auth)
                  .then(() => {
                    // Sign-out successful.
                    console.log("Sign-out successful.");
                    navigate('/signin')
                  })
                  .catch((error) => {
                    // An error happened.
                  })
              }
              className="main-list"
            >
              <NavLink className="main-link">Sign out</NavLink>
            </li>
          )}

          {user &&  (
            <>
              <li className="main-list">
                <NavLink className="main-link" to="/profile">
                  Profile
                </NavLink>
              </li>
              <li className="main-list">
                <NavLink className="main-link" to="/about">
                  {" "}
                  About{" "}
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </header>
 
    </>
  );
}

export default Header;
