import { Helmet } from "react-helmet-async";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/config";
import { Link } from "react-router-dom";
import { sendEmailVerification } from "firebase/auth";
import ReactLoading from 'react-loading';
import { useState } from "react";

function Home() {
  const [user ,loading] = useAuthState(auth);
  const [showEmailverifi , setshowEmailverifi] = useState(false)
  const sendEmailVerify =()=>{
    sendEmailVerification(auth.currentUser)
            .then(() => {
              setshowEmailverifi(true)
            })
  }
  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta
          name="description"
          content="Web site created using create-react-app Css Page "
        />
      </Helmet>
      {loading && <div><ReactLoading type="spokes" color='black' height={500} width={250} /></div>}
      { user && !user.emailVerified&&
      
      
        <main>
        <div className="container-verified">
        <h2> welcome {user.displayName} <span>🧡</span></h2> 
        <p className="user-emailVerified"> We send you an Email to ferify your Account ✋</p>
          <button  onClick={()=>sendEmailVerify()
            
          }  className="button-verified" >Send Again </button>
        </div>
        {showEmailverifi&&  <h4 >Email verification sent!</h4>}
        
        </main>
      
      
    }
  
      {user && user.emailVerified && (
        <main >
          <h2 className="classForSmallScreen"> welcome {user.displayName} <span>🧡</span></h2> 
        </main>
      )}

      {!user && !loading && (
        <main >
          <h1 className="link-to-signIn">
            Please <Link to="/signin">Sign In </Link> to continue ...
            <span>🧡</span>
          </h1>
        </main>
      )}
    </>
  );
}

export default Home;
