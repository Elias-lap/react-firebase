import { Helmet } from "react-helmet-async";
import "./EditTask.css";
import { auth, db } from "../../firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, useParams } from "react-router-dom";
import {
  arrayRemove,
  arrayUnion,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import ReactLoading from "react-loading";
import { useState } from "react";
import TitleEdit from "./TitleEdit";
import SubTasksSection from "./SubTasksSection";
import Btnssection from "./Btnssection ";
function EditTask() {
  const [user, loading, , error] = useAuthState(auth);
  let { userId } = useParams();
  const [isOpeninputAddTask, setisOpeninputAddTask] = useState(false);
  const Navigate = useNavigate();
  const [complited, setComplited] = useState(false);
  const [showData, setshowData] = useState(false);
  const [newTask, setNewTask] = useState("");
  // functions
  const updateData = async (e) =>
    await updateDoc(doc(db, user.uid, userId), {
      title: e.target.value,
    });
  const updateCheckedBox = async (eo) => {
    if (eo.target.checked) {
      await updateDoc(
        doc(db, user.uid, userId),
        {
          complited: true,
        },
        setComplited(true)
      );
    } else {
      await updateDoc(
        doc(db, user.uid, userId),
        {
          complited: false,
        },
        setComplited(false)
      );
    }
  };
  const AddToArray = async (VARIABLE) => {
    setNewTask("");
    await updateDoc(doc(db, user.uid, userId), {
      details: arrayUnion(VARIABLE),
    });
  };
  const DeleteArray = async (ITEM) => {
    await updateDoc(doc(db, user.uid, userId), {
      details: arrayRemove(ITEM),
    });
  };
  const DeleteItem = async () => {
    setshowData(true);
    await deleteDoc(doc(db, user.uid, userId));
    Navigate("/", { replace: true });
  };
  // /////////////////////
  if (error) {
    return (
      <main>
        <h2>{error.message}</h2>
      </main>
    );
  }

  if (loading) {
    return (
      <div>
        <ReactLoading type="spokes" color="black" height={500} width={250} />
      </div>
    );
  }

  if (user) {
    return (
      <>
        <Helmet>
          <title>Edit Page</title>
          <meta
            name="description"
            content="Web site created using create-react-app Css Page "
          />
        </Helmet>
        {showData ? (
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
        ) : (
          <>
            <main>
              <TitleEdit
                complited={complited}
                user={user}
                userId={userId}
                updateData={updateData}
              />
              <SubTasksSection
              setNewTask={setNewTask}
              newTask={newTask}
                setisOpeninputAddTask={setisOpeninputAddTask}
                isOpeninputAddTask={isOpeninputAddTask}
                AddToArray={AddToArray}
                DeleteArray={DeleteArray}
                updateCheckedBox={updateCheckedBox}
                user={user}
                userId={userId}
              />

              <button
                onClick={() => setisOpeninputAddTask(true)}
                className="AddButton"
              >
                Add More
              </button>
         <Btnssection  user={user} DeleteItem={DeleteItem}/>
            
            </main>
          </>
        )}
      </>
    );
  }
}

export default EditTask;
