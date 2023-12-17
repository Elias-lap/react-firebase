import { doc } from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";
import Moment from "react-moment";
import { db } from "../../firebase/config";


function SubTasksSection({
  setNewTask,
  newTask,
  updateCheckedBox,
  user,
  userId,
  DeleteArray,
  isOpeninputAddTask,
  AddToArray,
  setisOpeninputAddTask,
}) {
  const [value,  error] = useDocument(doc(db, user?.uid, userId));

  if (error) {
    return (
      <main>
        <h2>{error.message}</h2>
      </main>
    );
  }


  if (value) {
    return (
      <>
        <div className="body-title">
          <h4>
            Created :
            <Moment className="Moment" fromNow date={value.data().id}></Moment>
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
                    value={item}
                    className="Box-input-tasks-input"
                    type="text"
                    readOnly
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
          {isOpeninputAddTask && (
            <form className="Box-input-tasks-add">
              <input
                value={newTask}
                onChange={(eo) => setNewTask(eo.target.value)}
                type="text"
                className="ADDTask"
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  AddToArray(newTask);
                }}
                className="button-Add-task"
              >
                Add{" "}
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setisOpeninputAddTask(false);
                }}
                className="button-Add-task"
              >
                Cancel
              </button>
            </form>
          )}
        </section>
      </>
    );
  }
}

export default SubTasksSection;
