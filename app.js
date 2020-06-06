const userInfo = document.querySelector('.user-info');
const list = document.querySelector('ul');
const form = document.querySelector('form');



function onSignIn(googleUser) {
     
  var profile = googleUser.getBasicProfile();
  
  const profileBox = `
  <p>${profile.getName()}</p>
  <img src="${profile.getImageUrl()}">
  <p>${profile.getEmail()}</p>
  <button type="button" class="btn-primary view-data-btn">View data</button>
  `;
  userInfo.innerHTML = profileBox;


}

userInfo.addEventListener('click', e =>{
    e.preventDefault();

    if(e.target.classList.contains('view-data-btn')){
      location = "data.html";
    }


});


function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
  });
  auth2.disconnect();
}



const addRecipe = (recipe, id) => {
 
    let html = `
    <li data-id=${id}>
    <div class="createdAt">${recipe.created_at}</div>
    <button class="btn-danger">Delete</button>
    <div class="noteText">${recipe.title}</div>
    
    </li>
    `;

    list.innerHTML += html;
};



const deleteRecipe = (id) => {

    const recipes = document.querySelectorAll('li');

    recipes.forEach(recipe => {
        if(recipe.getAttribute('data-id') === id){
            recipe.remove();
        }
    });

};


db.collection('recipes').onSnapshot(snapshot =>{
        
        snapshot.docChanges().forEach(change =>{
                const doc = change.doc;
                if(change.type === 'added'){
                    addRecipe(doc.data(), doc.id);
                } else if (change.type === 'removed'){
                    deleteRecipe(doc.id);
                } 
            });
});


form.addEventListener('submit', e =>{
    e.preventDefault();
    
    const date = new Date();

    d = date.getDate();
    year = date.getFullYear();
    monthList = ['STY', 'LUT', 'MAR', 'KWI', 'MAJ', 'CZE', 'LIP', 'SIE', 'WRZ', 'PAŹ', 'LIS', 'GRU'];
    month = monthList[date.getMonth()];

   const result =  d+"/"+month+"/"+year;
  
    const recipe = {
        title: form.recipe.value,
        created_at: result
    };

    db.collection('recipes').add(recipe).then(() =>{
      form.recipe.value = '';
    }).catch(err =>{
        console.log(err);
    })


});


list.addEventListener('click', e =>{
    
    if(e.target.tagName === 'BUTTON'){
        const id = e.target.parentElement.getAttribute('data-id');
        db.collection('recipes').doc(id).delete().then(() =>{
            
        }).catch(err => {
            console.log(err);
        });
    }
});





















   // const path = location.pathname;
    // if(location.pathname === path){
    //   // e.target.classList.contains('view-data-btn').add('test');
    //   console.log(e.target.classList);
    // }

   

// window.addEventListener('DOMContentLoaded', event => {
  
//   const path = location.pathname;
//   if(location.pathname === path){
//    const btn = document.querySelector('.btn-primary');
  
//     console.log(btn.classList);
//   }

// });
