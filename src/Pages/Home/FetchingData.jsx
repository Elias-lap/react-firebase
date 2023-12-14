import { useCollection } from 'react-firebase-hooks/firestore';
import { Link } from 'react-router-dom';
import {  collection } from 'firebase/firestore';
import {  db } from '../../firebase/config';
import ReactLoading from "react-loading";
import toast from 'react-hot-toast';
import Moment from 'react-moment';

function FetchingData({user}) {
  
  const [value,loadingfetchingData, error] = useCollection(collection(db , user.uid));


   if(loadingfetchingData){
    return(
      <div>
      <ReactLoading type="spokes" color="black" height={500} width={250} />
    </div>
    )
   }

 if(error){
  toast.error(error.message)
 }


  if(value){
    return (
     <>
    {value.docs.map((item , index)=>{
      return   (
    
        <article key={index} dir="auto" className="budy-task">
      <Link to={`/EditTask/${item.data().id}`}>
        <h2>{item.data().title}</h2>
        <ul>
          {item.data().details.slice(0, 2).map((detail , index)=>{
            return(
              <li key={index}> {detail}</li>
            )
          })}
          
          
          
        </ul>
        <p>  <Moment
                  className="Moment"
                  fromNow
                  date={item.data().id}
                ></Moment> </p>
      </Link>
    </article>
      )
    })}
    </>
    )

  }
  
}

export default FetchingData
