
import Modal from "../../components/Modal/Modal";
import ReactLoading from "react-loading";
function ModalTask({handelChangeState, sendDatatofirestore,Loading,  Addtitle ,title , task , AddTask ,AddTaskToArr ,arr ,closeModalAfterSendingData} ) {
  
  
  return (
    <Modal closeMadal={handelChangeState}>
    <ul className="box-modal-addNewTask">
      <li>
        <input
          className="input-small-screen-Add-task"
          onChange={(eo) => {
            Addtitle(eo);
          }}
          required
          placeholder="Add title :"
          type="text"
          value={title}
        />
      </li>
      <li>
        <div className="container-details">
          <input
            className="input-small-screen-Add-task"
            onChange={(eo) => {
              AddTask(eo);
            }}
            required
            value={task}
            placeholder="details"
            type="text"
          />
          <button
            onClick={(eo) => {
              AddTaskToArr(eo);
            }}
            className="Add-new-task-button"
          >
            Add
          </button>
        </div>
      </li>
      {arr.map((map, index) => (
        <li className="task" key={index}>
          {map}
        </li>
      ))}

      <li>
        <button
          onClick={ (eo) => {
            sendDatatofirestore(eo)
          }}
          className="Add-new-task-button-submity"
        >
          {Loading ? (
            <ReactLoading
              type="spokes"
              color="black"
              height={20}
              width={20}
            />
          ) : (
            "submit"
          )}
        </button>
      </li>
    </ul>
  </Modal>
  )
}

export default ModalTask
