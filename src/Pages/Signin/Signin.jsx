import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import ReactLoading from "react-loading";
import { auth } from "../../firebase/config";
import "./Signin.css";
import { useAuthState } from "react-firebase-hooks/auth";
import Modal from "../../components/Modal/Modal";
import toast from "react-hot-toast";

function Signin() {
  const [email, setemail] = useState("");
  const [resetemail, setResetemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  const [hasError, sethasError] = useState(false);
  const [error, setError] = useState("");
  const [modal, setCloseModal] = useState(false);
  const [ckeckEmail, setckeckEmail] = useState(false);
  const [loading] = useAuthState(auth);
  const [loadingSighnin , setloadingSighnin] =useState(false)
  const handelChangeState = (value) => {
    setCloseModal(value);
  };
  const SignIn = async (e) => {
    setloadingSighnin(true)
    e.preventDefault();
   await  signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        toast.success("suucesfully signed in ");
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        toast.error(errorCode)
        sethasError(error);
        if (errorCode === "auth/invalid-credential") {
          setError("Wrong Email or password");
        } else {
          setError(errorCode);
        }
      })
      setloadingSighnin(false)
  };
  const forgotPassword = (e) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, resetemail)
      .then(() => {
        toast.success('you recived now email')
        setckeckEmail(true);
      })
      .catch((error) => {
        const errorCode = error.code;
        toast.error({errorCode})
        
      });
  };
  return (
    <>
      <Helmet>
        <title>Sign In </title>
      </Helmet>{" "}
      <main>
        {loading && (
          <ReactLoading type="spokes" color="red" height={500} width={250} />
        )}
        {modal && (
          <Modal closeMadal={handelChangeState}>
              <input
                className="input-small-screen"
                onChange={(e) => setResetemail(e.target.value)}
                required
                placeholder="Email :"
                type="text"
              />
              <button
                onClick={(e) => {
                  forgotPassword(e);
                }}
                className="Rseet"
              >
                Reset Email
              </button>
              {ckeckEmail && (
                <h6 className="check-email">
                  Please check your email to reset your Password
                </h6>
              )}
          
          </Modal>
        )}

        <form>
          <h2>Sign In</h2>
          <input
            className="input-small-screen"
            onChange={(e) => setemail(e.target.value)}
            required
            placeholder="Email"
            type="text"
          />
          <input
            className="input-small-screen"
            onChange={(e) => setpassword(e.target.value)}
            required
            placeholder="Password"
            type="password"
          />
          <button onClick={(e) => SignIn(e)}>
          {loadingSighnin ? (
                <ReactLoading
                  type="spokes"
                  color="black"
                  height={25}
                  width={25}
                />
              ) : (
                "  Sign In "
              )}
            
          
            
            
            </button>
          <h6>
            Dont Have Account Please{" "}
            <Link className="link" to="/signup">
              {" "}
              Sign Up
            </Link>
          </h6>
          {hasError && <h6>'{error}'</h6>}
          {!modal && (
            <>
              <h6>Forgot Password ? </h6>
              <button
                className="Rseet"
                onClick={(e) => {
                  e.preventDefault();
                  setCloseModal(true);
                }}
              >
                {" "}
                Click Here 👇
              </button>
            </>
          )}
        </form>
      </main>
    </>
  );
}

export default Signin;
