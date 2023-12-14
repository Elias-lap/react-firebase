import {  Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Helmet } from "react-helmet-async";
import { useContext } from "react";
import ContextDarkModd from "../../context/ConetxtDarkModd";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/config";
function Layout() {
  const { Mood } = useContext(ContextDarkModd);
  const [user ] = useAuthState(auth);
  console.log(user);
  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta
          name="description"
          content="Web site created using create-react-app  "
        />
      </Helmet>
      <Header />
        <main className={Mood}>
          <Outlet />
        </main>
      <Footer />
    </>
  );
}

export default Layout;
