import './Modal.css'

function Modal({children,closeMadal }) {
  return (
    <div className="home-form-modal">
    <form className= 'modal'>
  <div className="closed">
  <i onClick={()=>closeMadal()} className="fa-solid fa-xmark"></i>
  </div>
  {children}
  </form>
  
   </div>
  )
}

export default Modal
