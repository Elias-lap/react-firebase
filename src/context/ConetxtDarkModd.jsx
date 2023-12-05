import { useReducer } from "react";
import { createContext } from "react";
const MyMood =localStorage.getItem('MyMood')
const initialData = { Mood: MyMood===null ? MyMood==='light' : MyMood};
const reducer = (firstState, action) => {
  switch (action.type) {
    case "change_DarkMood":
      return { ...firstState, Mood: action.payload };
    default:
      return firstState;
  }}
const ContextDarkModd = createContext();
export function DarkMood({children}){
  const [firstState, dispatch] = useReducer(reducer, initialData);
  const toggleMood = function (newvalue){
    localStorage.setItem( 'MyMood' ,newvalue)
    dispatch({ type : 'change_DarkMood',payload : newvalue})   
  
}

// useEffect(()=>{
//   toggleMood(localStorage.getItem('Mood'))
// },[])


  return <ContextDarkModd.Provider value={{...firstState ,toggleMood} }>
    {children}
  </ContextDarkModd.Provider>
}
export default ContextDarkModd;