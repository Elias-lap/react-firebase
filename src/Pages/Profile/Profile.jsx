import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Helmet } from "react-helmet-async";
import { auth } from "../../firebase/config";
import { useNavigate } from "react-router-dom";
import Moment from "react-moment";
import { deleteUser } from "firebase/auth";
import ReactLoading from "react-loading";
import './Profile.css'
function Profile() {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  useEffect(() => {
    if (!user && !loading) {
      navigate("/");
    }
    if (user) {
      if (!user.emailVerified) {
        return navigate("/");
      }
    }
  });
  const DeleteAcount= ()=>{
    deleteUser(user)
    .then(() => {
      console.log("user deleted");
    })
    .catch((error) => {
    })
  }
  if (loading) {
    return (
      <>
        <Helmet>
          <title>Profile Page </title>
        </Helmet>
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
      </>
    );
  }

  if (user) {
    return (
      <>
        <Helmet>
          <title>Profile Page</title>
          <meta
            name="description"
            content="Web site created using create-react-app Html Page "
          />
        </Helmet>
        <div className="Profile-page">
          <ul className="unorder-list-Profile-Page">
            <li>
              <h5>User Name : {user.displayName}</h5>
            </li>
            <li>
              <h5>Email : {user.email}</h5>
            </li>
            <li>
              <h5>
                created At :
                <Moment
                  className="Moment"
                  fromNow
                  date={user.metadata.creationTime}
                ></Moment>
              </h5>
            </li>
            <li>
              <h5>
                Last Sign in :
                <Moment
                  className="Moment"
                  fromNow
                  date={user.metadata.lastSignInTime}
                ></Moment>
              </h5>
            </li>
            <li>
              <button
                onClick={() =>
                  DeleteAcount()
                }
                className="button-delete"
              >
                Delete Acount
              </button>
            </li>
          </ul>
        </div>
      </>
    );
  }
}

export default Profile;
