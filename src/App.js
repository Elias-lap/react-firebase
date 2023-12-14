import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Profile from "./Pages/Profile/Profile.jsx";
import ErrorPage from "./Pages/ErrorPage/ErrorPage.jsx";
import { Helmet } from "react-helmet-async";
import Signin from "./Pages/Signin/Signin.jsx";
import Signup from "./Pages/Signup/Signup.jsx";
import Layout from "./Pages/Layout/Layout.jsx";

import About from "./Pages/About/About.jsx";
import Home from "./Pages/Home/Home.jsx";
import EditTask from "./components/EditTask/EditTask.jsx";

const router = createBrowserRouter([
  {
    path : '/',
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/profile",
        element: <Profile />,
        errorElement: <ErrorPage/>,
      },
      
      {
        path: "/about",
        element: <About />,
        errorElement: <ErrorPage/>,
      },
      {
        path: "/EditTask/:userId",
        element: <EditTask/>,
        errorElement: <ErrorPage/>,
      },
    ],
    errorElement: <ErrorPage/>,
  },
  {
    path: "/signin",
    element: <Signin />,
    errorElement: <ErrorPage/>,
  },
  {
    path: "/signup",
    element: <Signup />,
    errorElement: <ErrorPage/>,
  },
]);
function App() {
  return (
    <>
      <Helmet>
        <title>React App</title>
      </Helmet>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
