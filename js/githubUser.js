export class GithubUser{
  static search(username){
    const endpoint=`https://api.github.com/users/${username}`
    console.log(endpoint)
    return fetch(endpoint)
    .then(data=>data.json())
    .then(data=>({
      id:data.id,
      login:data.login,
      name:data.name,
      public_repos:data.public_repos,
      followers:data.followers
    }))
  }
}