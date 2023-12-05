import { useContext } from "react";
import ContextDarkModd from "../context/ConetxtDarkModd";

function Footer() {
  const {Mood}=useContext(ContextDarkModd)
  return (
    <>
      <footer className={Mood===null?"light" :localStorage.getItem('MyMood')}>
        Designed and developed by devElias
        <span>🧡</span>
      </footer>
    </>
  );
}

export default Footer;
