import { Helmet } from "react-helmet-async";
import "./EditTask.css";
import { auth, db } from "../../firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { useParams } from "react-router-dom";
import { useDocument } from "react-firebase-hooks/firestore";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import Moment from "react-moment";
import ReactLoading from "react-loading";
import toast from "react-hot-toast";
import { useState } from "react";
function EditTask() {
  const [user] = useAuthState(auth);
  const [title, setTitle] = useState("");

  let { userId } = useParams();
  const [value, loading, error] = useDocument(doc(db, user?.uid, userId));

  // functions
  const updateData = async () =>
    await updateDoc(doc(db, user.uid, userId), {
      title,
    });

  const updateCheckedBox = async (eo) => {
    if (eo.target.checked) {
      await updateDoc(doc(db, user.uid, userId), {
        complited: true,
      });
    } else {
      await updateDoc(doc(db, user.uid, userId), {
        complited: false,
      });
    }
  };

  const DeleteArray = async (ITEM) => {
    await updateDoc(doc(db, user.uid, userId), {
      details: arrayRemove(ITEM),
    });
  };

  // const AddToArray = async (VARIABLE)=>{
  //   await updateDoc(doc(db, user.uid, userId), {
  //     details: arrayUnion(VARIABLE),
  //   });
  // }
  // /////////////////////
  if (error) {
    return toast.error(error.message);
  }

  if (loading) {
    return (
      <div>
        <ReactLoading type="spokes" color="black" height={500} width={250} />
      </div>
    );
  }
  if (user) {
    if (value) {
      return (
        <>
          <Helmet>
            <title>Edit Page</title>
            <meta
              name="description"
              content="Web site created using create-react-app Css Page "
            />
          </Helmet>
          <main>
            <div className="home-title">
              <input
                onChange={(e) => {
                  return setTitle(e.target.value);
                }}
                defaultValue={value.data().title}
                id="Mobile"
                type="text"
                placeholder="Edit tasks"
              />
              <label htmlFor="Mobile">
                <i
                  onClick={() => {
                    updateData();
                    toast.success("title updated");
                  }}
                  className="fa-solid fa-pen-to-square"
                ></i>
              </label>
            </div>
            <div className="body-title">
              <h4>
                Created :
                <Moment
                  className="Moment"
                  fromNow
                  date={value.data().id}
                ></Moment>
              </h4>
              <div className="check-box">
                <input
                  onChange={async (eo) => {
                    updateCheckedBox(eo);
                  }}
                  defaultChecked={value.data().complited}
                  className="Completed"
                  type="checkbox"
                  id="vehicle1"
                  name="vehicle1"
                />
                <label className="Completed-label" htmlFor="vehicle1">
                  {" "}
                  Completed
                </label>
              </div>
            </div>
            <section className="container-input-tasks">
              <ul className="unorder-list-Box-input-task">
                {value.data().details.map((item) => {
                  return (
                    <li key={item} className="Box-input-tasks">
                      <input
                        defaultValue={item}
                        className="Box-input-tasks-input"
                        type="text"
                      />
                      <i
                        onClick={() => {
                          DeleteArray(item);
                        }}
                        className="fa-solid fa-trash"
                      ></i>
                    </li>
                  );
                })}
              </ul>
              <div className="Box-input-tasks-add">
                <input type="text" className="ADDTask" />
                <button className="AddButton  background-color">Add </button>
                <button className="AddButton background-color">Cancel</button>
                
              </div>
            </section>
            <button className="AddButton">Add More</button>
            <button className="DeleteButton"> Delete Task</button>
          </main>
        </>
      );
    }
  }
}

export default EditTask;
