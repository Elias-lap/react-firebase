import { auth, db } from "../../firebase/config";
import { Helmet } from "react-helmet-async";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { sendEmailVerification } from "firebase/auth";
import { useState } from "react";
import "./Home.css";
import ReactLoading from "react-loading";
import ModalTask from "./ModalTask";
import toast from "react-hot-toast";
import { doc, setDoc } from "firebase/firestore";
import FetchingData from "./FetchingData";
import { useTranslation } from "react-i18next";
function Home() {
  const {  i18n } = useTranslation();
  const [user, loading] = useAuthState(auth);
  const [showEmailverifi, setshowEmailverifi] = useState(false);
  const [modal, setCloseModal] = useState(false);
  const [arr, setArr] = useState([]);
  const [task, setTask] = useState("");
  const [title, setTitle] = useState("");
  const [Loading, setLoading] = useState(false);
  const sendEmailVerify = () => {
    sendEmailVerification(auth.currentUser).then(() => {
      setshowEmailverifi(true);
    });
  };

  // functions of Maodal //
  const handelChangeState = (value) => {
    setCloseModal(value);
    setArr([]);
    setTitle("");
  };
  const Addtitle = (eo) => {
    eo.preventDefault();
    setTitle(eo.target.value);
  };
  const AddTask = (eo) => {
    eo.preventDefault();
    setTask(eo.target.value);
  };
  const AddTaskToArr = (eo) => {
    eo.preventDefault();
    if (task !== "") {
      if (!arr.includes(task)) {
        setArr([...arr, task]);
      }
    }
    setTask("");
  };
  const sendDatatofirestore = async (eo) => {
    const IdData = new Date().getTime();
    eo.preventDefault();
    setLoading(true);
    await setDoc(doc(db, user.uid, `${IdData}`), {
      title,
      details: arr,
      id: IdData,
      complited: false,
    });
    setLoading(false);
    setTitle("");
    setTask("");
    setArr([]);
    toast.success("The data has been successfully sent.");
    closeModalAfterSendingData();
  };
  const closeModalAfterSendingData = () => {
    setTimeout(setCloseModal(false), 2000);
  };
  // fetching data frome firestore

  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta
          name="description"
          content="Web site created using create-react-app Css Page "
        />
      </Helmet>
      {loading && (
        <div>
          <ReactLoading type="spokes" color="black" height={500} width={250} />
        </div>
      )}
      {user && !user.emailVerified && (
        <main>
          <div className="container-verified">
            <h2>
              {" "}
              welcome {user.displayName} <span>🧡</span>
            </h2>
            <p className="user-emailVerified">
              {" "}
              We send you an Email to ferify your Account ✋
            </p>
            <button
              onClick={() => sendEmailVerify()}
              className="button-verified"
            >
              Send Again{" "}
            </button>
            {showEmailverifi && <h4>Email verification sent!</h4>}
          </div>
        </main>
      )}
      {!user && !loading && (
        <main>
          <h1 className="link-to-signIn">
            Please <Link to="/signin">Sign In </Link> to continue ...
            <span>🧡</span>
          </h1>
        </main>
      )}

      {user && user.emailVerified && (
        <main>
          <div >
            {modal && (
              <ModalTask
                handelChangeState={handelChangeState}
                Addtitle={Addtitle}
                title={title}
                AddTask={AddTask}
                task={task}
                AddTaskToArr={AddTaskToArr}
                arr={arr}
                closeModalAfterSendingData={closeModalAfterSendingData}
                Loading={Loading}
                sendDatatofirestore={sendDatatofirestore}
              />
            )}

<FetchingData user={user}   />
          </div>
        
          <button
          dir="auto"
            onClick={() => setCloseModal(true)}
            className="home-button button-Add "
          >
            {i18n.language === "en" && "Add New Task" }
            {i18n.language === "ar" && "اضافة مهام جديد" }
            {i18n.language === "pl" && "Dodaj nowe zadanie" }
            
            <i className="fa-solid fa-plus"></i>
          </button>
        </main>
      )}
    </>
  );
}

export default Home;
