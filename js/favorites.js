import { AlertError } from "./alertError.js";
import { GithubUser } from "./githubUser.js";
import { Modal } from "./modal.js";


//classe que vai conter a lógica dos dados
//como os dados serão estruturados
class Favorites{
  constructor(root){
    this.root=document.querySelector(root)
    this.load()
  }
  

  load(){
    this.entries =JSON.parse(localStorage.getItem('@github-favorites:')) || []
  }

  save(){
    localStorage.setItem('@github-favorites:',JSON.stringify(this.entries))
  }
  async add(username){
    
    try{
      const user = await GithubUser.search(username)
      const userExist=this.entries.find(entry=>entry.id===user.id)
      
      if(userExist){
        throw new Error('Úsuario já cadastrado') 
      }

      if(user.login===undefined){
        throw new Error('Úsuario não encontrado!')
      }
      this.entries=[user,...this.entries]
      console.log(this.entries)
      this.update()
      this.save()

    } catch(error){
      AlertError.openError(error.message)
    }
    
  }

  delete(user){
    const filteredEntries = this.entries.filter(entry => entry.login!==user.login)
    this.entries=filteredEntries
    this.update()
    Modal.closeModal()
    this.save()
  }
}

//classe que vai criar a visualização e eventos do html
export class FavoritesView extends Favorites{
  constructor(root){
    super(root)
    
    this.tbody=this.root.querySelector('table tbody')
    this.update()
    this.onAdd()
  }
  onAdd(){
    const buttonAddGit=this.root.querySelector('.addGit')
    this.root.querySelector('.wrapper-search input').addEventListener("keydown",(event)=>{
      if(event.key=='Enter'){
        const{value}=this.root.querySelector('.wrapper-search input')
        this.add(value)

      }
    })
    buttonAddGit.onclick=()=>{
      const{value}=this.root.querySelector('.wrapper-search input')
      this.add(value)
      
    }
  }
  closeError(){
    const input=this.root.querySelector(".wrapper-search input")
    input.onclick=()=>{
      AlertError.closeError()
    }
    window.onclick=()=>{
      AlertError.closeError()
    }
    window.addEventListener("keydown",(event)=>{
      AlertError.closeError()
    })
    
  }

  update(){
    this.removeAll() 
    this.closeError()
    this.entries.forEach(user=>{
      const row=this.createRow()
      row.querySelector('.user img').src=`https://github.com/${user.login}.png`
      row.querySelector('.user a ').href= `https://github.com/${user.login}`
      row.querySelector('.user p').textContent=user.name
      row.querySelector('.user span').textContent=user.login
      row.querySelector('.repositories').textContent=user.public_repos
      row.querySelector('.followers').textContent=user.followers
      row.querySelector('.remove').onclick=()=> {
        Modal.openModal()
        Modal.delete.onclick=()=>{
          this.delete(user)
        }
      }    

      this.tbody.append(row)
    })

    if(Array.isArray(this.entries) && !this.entries.length) {
      // true - as cars array is empty
      console.log("estou vazio")
      const rowNull = this.createNullRow()
      this.tbody.append(rowNull)
     }

    /*if(this.entries==[]){
      console.log("estou vazio")
      const rowNull = this.createNullRow()
      this.tbody.append(rowNull)
    }*/

   

  
  }

  createNullRow(){
    const tr= document.createElement('tr')
    tr.className='null'
    tr.innerHTML=`
      <td>
        <div class="vazio">
          <img src="./img/Estrela.svg" alt="estrela">
          <p>Nenhum perfil favoritado</p>
        </div>
      </td> 
      <td></td> 
      <td></td>
      <td></td>
    `
    return tr
  }

  createRow(){
    const tr=document.createElement('tr')
    tr.innerHTML=`
      <td class="user">
        <div class="consert">
          <img src="https://github.com/xandguima.png" alt="photo user">
          <a href="" target="_blank">
            <p>Name</p>
            <span>NIckname</span>
          </a>
        </div>
      </td>
      <td class="repositories">xx</td>
      <td class="followers">xx</td>
      <td>
        <button class="remove">Remover</button>
      </td>
    `
    return tr
  }
  removeAll(){
    this.tbody.querySelectorAll('tr').forEach((tr) => {
    tr.remove()
   })
  }

}