import { useAuthState } from "react-firebase-hooks/auth";
import { Helmet } from "react-helmet-async";
import { auth } from "../../firebase/config";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import ReactLoading from 'react-loading';
function About() {
  const [user,loading] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user && !loading) {
      navigate("/");
    }
    if(user){
      if(!user.emailVerified){
        return(
          navigate('/')
        )
      }
    }
  });
  if (loading) {
    return (
    <>
      <Helmet>
          <title>About Page </title>
        </Helmet>
        <main>
        <div><ReactLoading type="spokes" color='black' height={500} width={250} /></div>
        </main>
    </>
    );
  }
  return (
    <>
      <Helmet>
        <title>About Page</title>
        <meta
          name="description"
          content="Web site created using create-react-app JavaScript Page"
        />
      </Helmet>
      {user && user.emailVerified && (
        <main>
          <h2 className="classForSmallScreen">About page</h2>
        </main>
      )}
    </>
  );
}

export default About;
