import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {DarkMood} from './context/ConetxtDarkModd'
import { HelmetProvider } from "react-helmet-async";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import  { Toaster } from 'react-hot-toast';
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <DarkMood>
        <Toaster  position="top-right"/>
      <App />
      </DarkMood>
    </HelmetProvider>
  </React.StrictMode>
);
serviceWorkerRegistration.register();
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
