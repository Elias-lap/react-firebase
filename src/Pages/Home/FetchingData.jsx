import { useCollection } from "react-firebase-hooks/firestore";
import { Link } from "react-router-dom";
import { collection, orderBy, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";
import ReactLoading from "react-loading";
import toast from "react-hot-toast";
import Moment from "react-moment";
import { useState } from "react";
import { useTranslation } from "react-i18next";
function FetchingData({ user }) {
  const {  i18n } = useTranslation();
  const AllData = query(collection(db, user.uid), orderBy("id", "asc"));
  const completed = query(
    collection(db, user.uid),
    where("complited", "==", true)
  );
  const notCompleted = query(
    collection(db, user.uid),
    where("complited", "==", false)
  );
  const [inisialData, setinisialData] = useState(AllData);
  const [value, loadingfetchingData, error] = useCollection(inisialData);
  const [active, setactive] = useState(true);
  const [valueSelect, setvalueSelect] = useState("all-task");
  const [displaynone, setdisplaynone] = useState(false);

  if (loadingfetchingData) {
    return (
      <div>
        <ReactLoading type="spokes" color="black" height={500} width={250} />
      </div>
    );
  }
  if (error) {
    toast.error(error.message);
  }
  if (value) {
    return (
      <>
        <div className={`home-buttons  `}>
          <button
            onClick={() => {
              setactive(false);

              setinisialData(
                query(collection(db, user.uid), orderBy("id", "desc"))
              );
            }}
            className={` home-button ${
              active ? "home-button-2" : "home-button-3"
            } ${displaynone ? "dispalyNone" : ""}`}
          >
            
            {i18n.language === "en" && "Newest first" }
            {i18n.language === "ar" && "الأحدث أولا" }
            {i18n.language === "pl" && "Najnowsze najpierw" }
          </button>
          <button
            onClick={() => {
              setactive(true);

              setinisialData(
                query(collection(db, user.uid), orderBy("id", "asc"))
              );
            }}
            className={` home-button ${
              active ? "home-button-3" : "home-button-2"
            }   ${displaynone ? "dispalyNone" : ""}`}
          >
      
            {i18n.language === "en" && "Oldest first" }
            {i18n.language === "ar" && "الأقدم أولا" }
            {i18n.language === "pl" && "Najstarsze najpierw" }
          </button>

          <select
            value={valueSelect}
            onChange={(e) => {
              if (e.target.value === "all-task") {
                setactive(true);
                setdisplaynone(false);
                setvalueSelect("all-task");
                setinisialData(AllData);
              } else if (e.target.value === "completed") {
                setdisplaynone(true);
                setvalueSelect("completed");
                setinisialData(completed);
              } else if (e.target.value === "not-completed") {
                setdisplaynone(true);
                setvalueSelect("not-completed");
                setinisialData(notCompleted);
              }
            }}
            className="select"
          >
            <option value={"all-task"} className="option-1">
            {i18n.language === "en" && "All task" }
            {i18n.language === "ar" && "كل المهام" }
            {i18n.language === "pl" && "Wszystkie zadania" }
            </option>
            <option value={"completed"} className="option-2">
            {i18n.language === "en" && "Completed" }
            {i18n.language === "ar" && "المكتملة" }
            {i18n.language === "pl" && "kończone" }
            
            </option>
            <option value={"not-completed"} className="option-3">
            {i18n.language === "en" && "Not Completed" }
            {i18n.language === "ar" && "غير مكتملة" }
            {i18n.language === "pl" && "Nieukończone" }
              
            </option>
          </select>
        </div>
        <div className="container-tasks">
          {value.docs.map((item) => {
            return (
              <>
                <article key={item.data().id} dir="auto" className="budy-task">
                  <Link
                    className="Link-EditTask"
                    to={`/EditTask/${item.data().id}`}
                  >
                    <h2>{item.data().title}</h2>
                    <ul>
                      {item
                        .data()
                        .details.slice(0, 2)
                        .map((detail) => {
                          return <li key={detail}> {detail}</li>;
                        })}
                    </ul>
                    <p>
                      {" "}
                      <Moment
                        className="Moment"
                        fromNow
                        date={item.data().id}
                      ></Moment>{" "}
                    </p>
                  </Link>
                </article>
              </>
            );
          })}
        </div>
      </>
    );
  }
  if (value.docs.length === 0) {
    return <h2>congratulations to you the task is done💪💪</h2>;
  }
}

export default FetchingData;
