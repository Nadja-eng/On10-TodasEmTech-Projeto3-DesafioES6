const urlBase = 'https://api.github.com/users/';
const button = document.querySelector('.btn');
const input = document.querySelector('#nomeUsuario');

const cardUserFound = document.querySelector('.off'); //Ajustar
const avatarUrl = document.querySelector('#avatar_url');
const nameUsuario = document.querySelector('.name');
const loginUsuario = document.querySelector('.login');
const bioUsuario = document.querySelector('.bio');
const seguidores = document.querySelector('#people');
const followersUsuario = document.querySelector('#followers');
const publicRepos = document.querySelector('#public_repos');
const repositorios = document.querySelector('#class');

const titleNotFound = document.querySelector('.title_not_found');
const subtitleNotFound = document.querySelector('.subtitle_not_found');
const imgNotFound = document.querySelector('.img_not_found');
const articleRepositorios = document.querySelector('#array_repositorios');


button.addEventListener('click', (event) => {
    event.preventDefault();
    const name = input.value.trim();
    if (name) {
        CleanCard();
        getUserName(name);

    } else {
        alert('Digite o username do usuário!!')
    }
})

const getUserName = (nome) => {
    let nameModificado = nome.toLowerCase();

    fetch(urlBase + nameModificado)
        .then(response => response.json())
        .then(object => {
            const array = object;
            if (array.message) {
                throw new Error();

            } else {
                console.log(array)
                const { name, login, avatar_url, bio, public_repos, followers } = array
                cardFound(name, login, avatar_url, bio, public_repos, followers);
                repos(login, name);

            }
        })
        .catch(() => {
            console.log('usuario não existe')
            userNotFound();

        })
}

const cardFound = (name, login, avatar_url, bio, public_repos, followers) => {

    cardUserFound.classList.replace("off", "card")
    avatarUrl.src = avatar_url;
    nameUsuario.innerHTML = name;
    loginUsuario.innerHTML = login;
    bioUsuario.innerHTML = bio;
    followersUsuario.innerHTML = followers;
    publicRepos.innerHTML = public_repos;
    seguidores.src = './img/people_outline.png';
    repositorios.src = './img/Vector.png';

}

const repos = (login, nameUser) => {
    fetch(`https://api.github.com/users/${login}/repos`)
        .then(response => response.json())
        .then(repositorios => {
            const arrayRepositorios = repositorios;
            if (arrayRepositorios.length > 0) {
                console.log(arrayRepositorios)
                const array = arrayRepositorios.map((repositorio) => {

                    const { name, deion, language, stargazers_count } = repositorio;
                    let parseDeion = !deion ? "-" : deion;
                    let parseLanguage = !language ? "-" : language;
                    return `
                <div class="card-repositorios">
                    <div>
                        <h5 class="title_repositorio">${name}</h5>
                        <p class="descricao_repositorio">${parseDeion}</p>
                    </div>
                    <div class="card_rodape">
                        <div class="linguagem">
                            <span class="material-icons ${parseLanguage} circle">fiber_manual_record</span>
                            <p class="tipo_linguagem">${parseLanguage}</p>
                        </div>
                        <div class="estrelas">
                            <span class="material-icons star">star_border</span>
                            <p class="qtd_estrelas">${stargazers_count}</p>
                        </div>
                    </div>
                </div>
                
                `
                }).join("");
                articleRepositorios.innerHTML = array;
            } else {
                anyRepositorios(login, nameUser);

            }
        })
}

const anyRepositorios = (login, nameUser) => {
    if (!nameUser) {
        articleRepositorios.innerHTML = `<p class="message_not_repositorio">${login} não tem repositórios públicos ainda!</p>`;

    } else {
        articleRepositorios.innerHTML = `<p class="message_not_repositorio">${nameUser} não tem repositórios públicos ainda!</p>`;
    }

}


const CleanCard = () => {
    avatarUrl.src = "";
    nameUsuario.innerHTML = "";
    loginUsuario.innerHTML = "";
    bioUsuario.innerHTML = "";
    followersUsuario.innerHTML = "";
    publicRepos.innerHTML = "";
    seguidores.src = "";
    repositorios.src = "";
    titleNotFound.innerHTML = "";
    subtitleNotFound.innerHTML = "";
    imgNotFound.src = ""
    articleRepositorios.innerHTML = "";

}

const userNotFound = () => {
    cardUserFound.classList.replace("card", "off")
    titleNotFound.innerHTML = "Usuário não encontrado :(";
    subtitleNotFound.innerHTML = "Pesquisar novamente";
    imgNotFound.src = "./img/not-found.svg"
}
------------------- JS QUE FIZEMOS EM SALA--------------------------------------------------

const urlBase = "https://api.github.com/users/"
const input = document.querySelector('#nomeUsuario');
const button = document.querySelector('.btn');

const imgUsuario = document.querySelector('#avatar_url');
const tagNameUsuario = document.querySelector('.name');
const tagLoginUsuario = document.querySelector('.login');
const tagBioUsuario = document.querySelector('.bio');
const tagImgSeguidores = document.querySelector('#people');
const tagNumeroSeguidores = document.querySelector('#followers');
const tagImgRepositorios = document.querySelector('#class');
const tagNumeroRepositorios = document.querySelector('#public_repos');

const tituloUserNotFound = document.querySelector('.title_not_found');
const subtituloUserNotFound = document.querySelector('.subtitle_not_found');
const imgUserNotFound = document.querySelector('.img_not_found');

const cardUsuarioEncontrado = document.querySelector('.off');

button.addEventListener('click', (event) => {
    event.preventDefault()
    const loginUser = input.value.trim();
    if (loginUser) {
        console.log(loginUser);
        cleanCard();
        fetchUser(loginUser)

    } else {
        alert('Digite o nome do usuário')
    }

})

const fetchUser = (loginUser) => {
    const parseLogin = loginUser.toLowerCase();
    fetch(urlBase + parseLogin)
        .then(response => response.json())
        .then(objeto => {
            const objetoUsuario = objeto;
            if (objetoUsuario.message) {
                throw new Error();

            } else {
                console.log(objetoUsuario)
                const { bio, name, login, avatar_url, followers, public_repos } = objetoUsuario;
                cardUsuario(bio, name, login, avatar_url, followers, public_repos);

            }

        })
        .catch(error => {
            console.log(error)
            userNotFound();

        })

}



const cardUsuario = (bio, name, login, avatar_url, followers, public_repos) => {
    cardUsuarioEncontrado.classList.replace('off', 'card');
    imgUsuario.src = avatar_url;
    tagNameUsuario.innerHTML = name;
    tagLoginUsuario.innerHTML = login;
    tagBioUsuario.innerHTML = bio;
    tagImgSeguidores.src = "./img/people_outline.png";
    tagNumeroSeguidores.innerHTML = followers;
    tagImgRepositorios.src = "./img/Vector.png";
    tagNumeroRepositorios.innerHTML = public_repos;

}

const cleanCard = () => {
    imgUsuario.src = "";
    tagNameUsuario.innerHTML = "";
    tagLoginUsuario.innerHTML = "";
    tagBioUsuario.innerHTML = "";
    tagImgSeguidores.src = "";
    tagNumeroSeguidores.innerHTML = "";
    tagImgRepositorios.src = "";
    tagNumeroRepositorios.innerHTML = "";
    tituloUserNotFound.innerHTML = "";
    subtituloUserNotFound.innerHTML = ""
    imgUserNotFound.src = "";

}

const userNotFound = () => {
    cardUsuarioEncontrado.classList.replace('card', 'off');
    tituloUserNotFound.innerHTML = 'Usuário não encontrado :('
    subtituloUserNotFound.innerHTML = "Pesquisar novamente!"
    imgUserNotFound.src = "./img/not-found.svg";
}

