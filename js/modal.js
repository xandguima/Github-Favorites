export const Modal={
  delete:document.querySelector('.delete'),
  recuse:document.querySelector('.recuse'),
  wrapper:document.querySelector('.modal-wrapper'),

  openModal(){
    console.log("entrei no open")
    Modal.wrapper.classList.add("open")
  },
  closeModal(){
    console.log("entrei no close")
    document.querySelector('.modal-wrapper').classList.remove("open")
  },


}

Modal.recuse.addEventListener("click",()=>{
  Modal.closeModal()
})
