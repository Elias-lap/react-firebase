import { useContext } from "react";
import ContextDarkModd from "../../context/ConetxtDarkModd";
import './Footer.css'
import { useTranslation } from "react-i18next";

function Footer() {
  const {Mood}=useContext(ContextDarkModd)
  const {  i18n } = useTranslation();

    
    if(i18n.language === "en" ){
  return(
  <footer className={Mood===null?"light" :localStorage.getItem('MyMood')}>
  Designed and developed by devElias
  <span>🧡</span>
</footer> )}
    
if(i18n.language === "ar"){
return(
<footer dir="rtl" className={Mood===null?"light" :localStorage.getItem('MyMood')}>
   تم التصميم والبرمجة بواسطة الياس
<span>🧡</span>
</footer>
) }
   if(i18n.language === "pl" ){
return(
<footer className={Mood===null?"light" :localStorage.getItem('MyMood')}>
   Zaprojektowane  przez devElias
    <span>🧡</span>
  </footer> 

)}
  
    
  
}

export default Footer;
// if(i18n.language === "en" ){
//   return(
//   <footer className={Mood===null?"light" :localStorage.getItem('MyMood')}>
//   Designed and developed by devElias
//   <span>🧡</span>
// </footer> )}


// if(i18n.language === "ar"){
// return(
// <footer className={Mood===null?"light" :localStorage.getItem('MyMood')}>
// تم تصميم وبرمجة بواسطة المبرمج الياس
// <span>🧡</span>
// </footer>
// ) }

// if(i18n.language === "pl" ){
// return(
// <footer className={Mood===null?"light" :localStorage.getItem('MyMood')}>
//    Zaprojektowane  przez devElias
//     <span>🧡</span>
//   </footer> 

// )}