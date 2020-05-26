let allUsers = [];

let nameUsers = [];

let filterUsers = [];

let filterUsersInformation = document.querySelector('#informations');

let divUsers = document.querySelector('#users');

const inputUser = document.querySelector('#inputUser');

const searchBtn = document.querySelector('#searchBtn');

let qtyUsersFound = document.querySelector('#qtyUsersFound');

window.addEventListener('load', ()=>{

    searchApiFromRandomUser();
    render();

});

async function searchApiFromRandomUser(){
    const res = await fetch('https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo');
    const json = await res.json();
    
   allUsers = json.results.map(user =>{

    const {gender, name, lastname, dob, picture} = user;

       return {
           name: user.name.first,
           lastname: user.name.last,
           gender: user.gender,
           age: user.dob.age,
           picture: user.picture.thumbnail
       }
   });
   console.log(allUsers);
}

function render(){
    renderSearchUsers();
}

searchBtn.addEventListener('click',renderSearchUsers);

function renderSearchUsers(){

    getInputValue();

    let searchUsersHTML = '<div>';

    filterUsers.forEach(user =>{
        const usersFilteredHTML = `
        <div class="users">
            <div class="img-class">
                <img src="${user.picture}">
            </div>
            <div>
                <p>${user.name} ${user.lastname}</p>
                <p><em>${user.age} anos</em></p>
            </div>
        </div>
        <div class="linha">
        </div>
        `;

        searchUsersHTML += usersFilteredHTML;
    });

    searchUsersHTML += '</div>';

    divUsers.innerHTML = searchUsersHTML;

    const estatisticUsersFound = filterUsers.length;
    qtyUsersFound.innerHTML = estatisticUsersFound;

    const estatisticUsersAge = filterUsers.reduce((total, current)=>{
            return total + current.age;
        }, 0);
    let estatisticUsersAgeAVG = estatisticUsersAge/estatisticUsersFound;
    estatisticUsersAgeAVG = Math.round(estatisticUsersAgeAVG);

    let estatisticUsersFemale = filterUsers.filter(user =>{
        return user.gender == "female";
    });
    let estatisticUsersMale = filterUsers.filter(user =>{
        return user.gender == "male";
    });

    estatisticUsersFemale = estatisticUsersFemale.length;
    estatisticUsersMale = estatisticUsersMale.length;

    filterUsersInformation.innerHTML = `
        <li>Usuários encontrados: <b>${estatisticUsersFound}</b></li>
        <li>Mulheres: <b>${estatisticUsersFemale}</b></li>
        <li>Homens: <b>${estatisticUsersMale}</b></li>
        <li>Soma das idades: <b>${estatisticUsersAge}</b> anos</li>
        <li>Média das idades: <b>${estatisticUsersAgeAVG}</b></li>
    `
}

// * Pegar valores do input após o clique no botão

function getInputValue(){
    let inputUserValueUpper = inputUser.value.toUpperCase();
    let inputUserValueLower = inputUser.value.toLowerCase();
    let inputUserValue = inputUser.value;

    filterUsers = allUsers.filter(user =>{
        return user.name.includes(inputUserValueUpper) || user.lastname.includes(inputUserValueUpper) || user.name.includes(inputUserValueLower) || user.lastname.includes(inputUserValueLower) || user.name.includes(inputUserValue) || user.lastname.includes(inputUserValue);
    });
    console.log(filterUsers);

}