import { Link, NavLink, useNavigate } from "react-router-dom";
import ContextDarkModd from "../../context/ConetxtDarkModd";
import { useContext} from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/config";
import { signOut } from "firebase/auth";
import "./Header.css";
import { useTranslation } from 'react-i18next';
import toast from "react-hot-toast";
function Header() {
  const { t, i18n } = useTranslation();
  const [user] = useAuthState(auth);
  const { toggleMood } = useContext(ContextDarkModd);
  const navigate = useNavigate();

  return (
    <>
      <header
        className={`hide-when-mobile ${
          localStorage.getItem("MyMood") === null
            ? "light"
            : localStorage.getItem("MyMood")
        }`}
      >
        <h1>
          <Link to={"/"}>{t("home")} </Link>{" "}
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
          {!user && (
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
            <>
              <li className="  main-link languages">
              {t("lang")}
                <ul className="list-languages">
                  <li onClick={()=>{
                      i18n.changeLanguage("ar")
                  }} dir="rtl">
                    <p>العربية</p>

                    {i18n.language === "ar" && <i className="fa-solid fa-check"></i>}
                  </li>
                  <li  onClick={()=>{
                      i18n.changeLanguage("en")
                  }}>
                    <p>English</p>

                    {i18n.language === "en"  && <i className="fa-solid fa-check"></i>}
                  </li>
                  <li onClick={()=>{
                      i18n.changeLanguage("pl")
                  }}>
                    <p>Polski</p>

                    {i18n.language === "pl"  && <i className="fa-solid fa-check"></i>}
                  </li>
                </ul>
              </li>
              <li
                onClick={() =>
                  signOut(auth)
                    .then(() => {
                      // Sign-out successful.
                      toast.success("Sign-out successful.");
                      
                      navigate("/signin");
                    })
                    .catch((error) => {
                      // An error happened.
                    })
                }
                className="main-list"
              >
                <NavLink className="main-link">{t('Signout')}</NavLink>
              </li>
            </>
          )}

          {user && (
            <>
              <li className="main-list">
                <NavLink className="main-link" to="/profile">
                {t("acount")}
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
