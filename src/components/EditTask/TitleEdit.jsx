import { doc } from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";
import { db } from "../../firebase/config";
import toast from "react-hot-toast";
import { useRef } from "react";
import ReactLoading from "react-loading";
function TitleEdit({complited ,user ,userId ,updateData}) {
  const [value , loading, error] = useDocument(doc(db, user?.uid, userId)); 
  const inputElement = useRef(null);

if(error){
  return(
    <main><h2>{error.message}</h2></main>
  )
}
if (loading) {
  return (
    <div>
      <ReactLoading type="spokes" color="black" height={500} width={250} />
    </div>
  );
}
if(value){
return (
  <div className="home-title">
    <input
      className={`${complited ? "line-throw" : ""}    `}
      ref={inputElement}
      defaultValue={value.data().title}
      id="Mobile"
      type="text"
      placeholder="Edit tasks"
      onChange={(e) => {
        
        updateData(e);
        toast.success("title updated");
      }}
    />
    <label htmlFor="Mobile">
      <i
        onClick={() => inputElement.current.focus()}
        className="fa-solid fa-pen-to-square"
      ></i>
    </label>
  </div>
  )
}
}

export default TitleEdit
