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
function Home() {
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
    setArr([])
    setTitle('')
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
      if(!arr.includes(task)){
        setArr([...arr, task]);
      }
    
    }
    setTask("");
  };
   const sendDatatofirestore= async (eo)=>{
    const IdData = new Date().getTime();
              eo.preventDefault();
              setLoading(true);
              await setDoc(doc(db, `${user.uid}`, `${IdData}`), {
                title,
                details: arr,
                id: IdData,
                complited : false
              });
              setLoading(false);
              setTitle("");
              setTask("");
              setArr([]);
              toast.success('The data has been successfully sent.')
              closeModalAfterSendingData()
   }
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
          {/* <h2 className="classForSmallScreen"> welcome {user.displayName} <span>🧡</span></h2>  */}

          <div className="home-buttons">
            <button className="home-button">Newest first</button>
            <button className="home-button">Oldest first</button>

            <select className="select">
              <option className="option-1">All task</option>
              <option className="option-2">Completed</option>
              <option className="option-3">Not Completed</option>
            </select>
          </div>
          <div className="container-tasks">
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
              // <Modal closeMadal={handelChangeState}>
              //   <ul className="box-modal-addNewTask">
              //     <li>
              //       <input
              //         className="input-small-screen-Add-task"
              //         onChange={(eo) => {
              //           eo.preventDefault();
              //           setTitle(eo.target.value);
              //         }}
              //         required
              //         placeholder="Add title :"
              //         type="text"
              //         value={title}
              //       />
              //     </li>
              //     <li>
              //       <div>
              //         <input
              //           className="input-small-screen-Add-task"
              //           onChange={(eo) => {
              //             eo.preventDefault();
              //             setTask(eo.target.value);
              //           }}
              //           required
              //           value={task}
              //           placeholder="details"
              //           type="text"
              //         />
              //         <button
              //           onClick={(eo) => {
              //             AddTaskToArr();
              //             eo.preventDefault();
              //           }}
              //           className="Add-new-task-button"
              //         >
              //           Add
              //         </button>
              //       </div>
              //     </li>
              //     {arr.map((map, index) => (
              //       <li className="task" key={index}>
              //         {map}
              //       </li>
              //     ))}

              //     <li>
              //       <button
              //         onClick={async (eo) => {
              //           const IdData = new Date().getTime();
              //           eo.preventDefault();
              //           setLoading(true);
              //           await setDoc(doc(db, `${user.uid}`, `${IdData}`), {
              //             title,
              //             details: arr,
              //             id: IdData,
              //           });
              //           setLoading(false);
              //           setTitle("");
              //           setTask("");
              //           setArr([]);
              //           toast.success('The data has been successfully sent.')
              //           closeModalAfterSendingData()

              //         }}
              //         className="Add-new-task-button-submity"
              //       >
              //         {Loading ? (
              //           <ReactLoading
              //             type="spokes"
              //             color="black"
              //             height={20}
              //             width={20}
              //           />
              //         ) : (
              //           "submit"
              //         )}
              //       </button>
              //     </li>
              //   </ul>
              // </Modal>
            )}
        <FetchingData user={user}/>
          </div>

          <button
            onClick={() => setCloseModal(true)}
            className="home-button button-Add "
          >
            Add New Task <i className="fa-solid fa-plus"></i>
          </button>
        </main>
      )}
    </>
  );
}

export default Home;
