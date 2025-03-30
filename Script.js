const APIURL = 'https://api.github.com/users/'

const form = document.getElementById('form')
const main = document.getElementById('main')
const searchValue = document.getElementById("search")





form.addEventListener('submit', (e)=>{
    e.preventDefault();
     
    const user = searchValue.value;
    // const user = "Alam-Thanwal"


    if(user){
        getUser(user);
        searchValue.value = ''
    }

})

async function getUser(username) {

    try{
        const { data }  = await axios(APIURL + username);
        createUserCard(data)
        getRepos(username)
        console.log(data)
    } catch (err){
        console.log("Error");
        if(err.response.status == 404){
            createErrorCard('No profile with this username')
        }
        
    }
    
}

async function getRepos(username) {
    try {
        const { data } = await axios(APIURL + username + '/repos?sort=created')

        addReposToCard(data)
    } catch(err) {
        createErrorCard('Problem fetching repos')
    }
}
//kbgvifhgiegbnieohbdhubt

const createUserCard = (user) =>{
    console.log(user)

    const UserName = user.name || user.login
    const UserBio = user.bio ? `<p>${user.bio}</p>` : ''
    const cardHTML = `
    <div class="card">
            <div>
              <img src="${user.avatar_url}" alt="${user.name}" class="avatar">
            </div>
            <div class="user-info">
              <h2>${user.name}</h2>
              ${user.bio}
              <ul>
                <li>${user.followers}<strong>Followers</strong></li>
                <li>${user.following}<strong>Following</strong></li>
                <li>${user.public_repos}<strong>Repos</strong></li>
              </ul>
        
              <div id="repos"></div>
            </div>
          </div>`
          main.innerHTML = cardHTML

    // console.log(UserName)
    // console.log(UserBio)

}

const createErrorCard = (msg) =>{
    const cardHTML = `<div class="card">
            <h1>${msg}</h1>
        </div>`
        main.innerHTML = cardHTML

}

function addReposToCard(repos) {
    const reposEl = document.getElementById('repos')

    repos
        .slice(0, 10)
        .forEach(repo => {
            const repoEl = document.createElement('a')
            repoEl.classList.add('repo')
            repoEl.href = repo.html_url
            repoEl.target = '_blank'
            repoEl.innerText = repo.name

            reposEl.appendChild(repoEl)
        })
}