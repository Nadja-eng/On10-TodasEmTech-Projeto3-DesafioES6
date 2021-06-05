const form = document.querySelector('form');
const input = document.querySelector('#search');
const profile = document.querySelector('.profile');


form.addEventListener('submit', (event) => {
   event.preventDefault();

   const usuario = input.value.trim();

   if(usuario){
     return getUsuario(usuario)
   } 
    return alert('informe o usuário')
})

const getUsuario = async (usuario) => {

   try {
    const requisicao = await fetch(`https://api.github.com/users/${usuario}`)
    if(requisicao.status === 404){
        throw new Error();
    }
    const usuarioInformacoes = await requisicao.json();
    profile.innerHTML = criarCardUsuario(usuarioInformacoes)
   } catch {
    profile.innerHTML = ''
     console.log('Usuário não encontrado');
   }
   
 
}

const criarCardUsuario = (usuario) => {
   const { login, name, bio, followers, public_repos, avatar_url} = usuario;
    return `
    <picture class="image__user">
        <img class="user__image" src="${avatar_url}" alt="" />
    </picture>
    <div class="user__card">
    <h2 class="user__name spacing">${name}</h2>
    <p class="user__username paragraph spacing">${login}</p>
    <p class="user__bio paragraph spacing">${bio}</p>
    <ul class="badges spacing">
    <li class="badge">
       <span class="material-icons icon__profile">people_outline</span>
       <p>${followers}</p>
    </li>
    <li class="badge">
      <span class="material-icons icon__profile">class</span>
      <p>${public_repos}</p>
    </li>
    </ul>
    </div>
}