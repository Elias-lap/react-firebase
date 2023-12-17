import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase/config";
import { sendEmailVerification } from "firebase/auth";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import ReactLoading from "react-loading";
import ErrorPage from "../ErrorPage/ErrorPage";
import toast from "react-hot-toast";
function Signup() {
  const [user, loading] = useAuthState(auth);
  const [email, setemail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setpassword] = useState("");
  const [hasError] = useState(false);
  const [errorfirebase, setError] = useState("");
  const [loadingSighnup , setloadingSighnup] =useState(false)
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      if (user.emailVerified) {
        return navigate("/");
      }
    }
  });
  async function SignUp(e) {
    
    e.preventDefault();
    setloadingSighnup(true)
  await    createUserWithEmailAndPassword(auth, email, password)
    
      .then((userCredential) => {
        
        
        // Signed up
        // const user = userCredential.user;
        sendEmailVerification(auth.currentUser).then(() => {
          toast.success("Email verification sent!");
        });
        updateProfile(auth.currentUser, {
          displayName: userName,
        })
          .then(() => {
            // Profile updated!
            toast.success("You have acount Now Please verify your email");
            navigate("/");
          
          })
          .catch((error) => {
            toast.error(error.code);
          
            <ErrorPage />;
          });
      })
      .catch((error) => {
        toast.error(error.code);
        const errorCode = error.code;
        if (errorCode === "auth/invalid-credential") {
          setError("Wrong Email or password");
        } else if (errorCode === "auth/invalid-email") {
          setError("Wrong Email");
        } else {
          setError(errorCode);
        }
      });

      setloadingSighnup(false)
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
            <button onClick={(e) => SignUp(e)}>
              {loadingSighnup ? (
                <ReactLoading
                  type="spokes"
                  color="black"
                  height={25}
                  width={25}
                />
              ) : (
                "Sign up"
              )}
            </button>
            <h6>
              Already Have Account
              <Link className="link" to="/signin">
                Signin
              </Link>
            </h6>
            {hasError &&  toast.success({errorfirebase})}
          </form>
        </main>
      </>
    );
  }
}

export default Signup;
