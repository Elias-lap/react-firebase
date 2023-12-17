import { collection } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../firebase/config";
import toast from "react-hot-toast";

function Btnssection ({DeleteItem,user}) {
  const [value,  error] = useCollection(collection(db, user.uid));

  if(error){
    return(
      <main><h2>{error.message}</h2></main>
    )
  }


if(value){
  return (
    <button
      onClick={() => {
        DeleteItem();
        toast.success("task is deleted");
      }}
      className="DeleteButton"
    >
      {" "}
      Delete Task
    </button>
)



}
  
}

export default Btnssection 
