export const AlertError={
  alertBar:document.querySelector('.errorAlert'),
  alertMessege:document.querySelector('.errorAlert p'),
  
  openError(menssage){
    console.log("entrei no open")
    AlertError.alertBar.classList.add("open")
    AlertError.alertMessege.innerHTML=menssage
  },
  closeError(){
    console.log("entrei no close")
    AlertError.alertBar.classList.remove("open")
  },


}