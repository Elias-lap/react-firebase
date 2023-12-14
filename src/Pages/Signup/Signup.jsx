import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase/config";
import { sendEmailVerification } from "firebase/auth";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import ReactLoading from "react-loading";
import ErrorPage from "../ErrorPage/ErrorPage";
function Signup() {
  const [user, loading] = useAuthState(auth);
  const [email, setemail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setpassword] = useState("");
  const [hasError] = useState(false);
  const [errorfirebase, setError] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      if (user.emailVerified) {
        return navigate("/");
      }
    }
  });
  function SignUp(e) {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        // const user = userCredential.user;
        sendEmailVerification(auth.currentUser).then(() => {
          console.log("Email verification sent!");
          // ...
        });
        updateProfile(auth.currentUser, {
          displayName: userName,
        })
          .then(() => {
            // Profile updated!
            navigate("/");
          })
          .catch((error) => {
            console.log(error.code);
            <ErrorPage/>
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === "auth/invalid-credential") {
          setError("Wrong Email or password");
        } else if (errorCode === "auth/invalid-email") {
          setError("Wrong Email");
        } else {
          setError(errorCode);
        }
      });
  }
  if (loading) {
    return (
      <>
        <Helmet>
          <title>Sign Up </title>
        </Helmet>
        <main>
          <div>
            <ReactLoading
              type="spokes"
              color="black"
              height={500}
              width={250}
            />
          </div>
        </main>
      </>
    );
  }
  if (user) {
    if (!user.emailVerified) {
      return (
        <>
          <main>
            <div className="container-verified">
              <p className="user-emailVerified">
                {" "}
                We send you an Email to ferify your Account
              </p>
              <button className="button-verified">Send Again </button>
            </div>
          </main>
        </>
      );
    }
  }

  if (!user) {
    return (
      <>
        <Helmet>
          <title>Sign Up </title>
        </Helmet>
        <main>
          <form>
            <h4>
              Create a new Account<span>🧡</span>
            </h4>
            <input
              className="input-small-screen"
              onChange={(e) => setUserName(e.target.value)}
              required
              placeholder="UserName"
              type="text"
            />
            <input
              className="input-small-screen"
              onChange={(e) => setemail(e.target.value)}
              required
              placeholder="Email"
              type="email"
            />
            <input
              className="input-small-screen"
              onChange={(e) => setpassword(e.target.value)}
              required
              placeholder="Password"
              type="password"
            />
            <button onClick={(e) => SignUp(e)}>Sign up </button>
            <h6>
              Already Have Account
              <Link className="link" to="/signin">
              
                Signin
              </Link>
            </h6>
            {hasError && <h6>'{errorfirebase}'</h6>}
          </form>
        </main>
      </>
    );
  }
}

export default Signup;
