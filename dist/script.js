import { getListRecipes } from "../../dist/functionsCallApi.js";

let updateDom=(listRecipes)=>{
    listRecipes.forEach(recipe => {        
        let tagStrong=document.createElement("strong");
        tagStrong.classList.add("strong-recipe");
        tagStrong.textContent=recipe.titleRecipe;

        let tagImg=document.createElement("img");
        tagImg.classList.add("img-recipe");
        tagImg.src=recipe.imgUrl;
        tagImg.alt="image de la recette";
        tagImg.style.display="block";

        let tagP=document.createElement("p");
        tagP.classList.add("p-time-recipe");
        tagP.style.display="inline-block";
        tagP.textContent=`Durée ${recipe.cookingTime}`;

        let tagA=document.createElement("a");
        tagA.classList.add("a-recipe");
        tagA.href=`./detail.html?recette=${recipe.titleRecipe}`;

        //create button edit and remove
        let tagBtnEdit=document.createElement("button");
        tagBtnEdit.classList.add("btn-edit");
        tagBtnEdit.type="button";
        tagBtnEdit.textContent="Modifier";
        tagBtnEdit.addEventListener("click",()=>{
            window.location.href="./edit.html";
        })

        let tagBtnRemove=document.createElement("button");
        tagBtnRemove.classList.add("btn-remove");
        tagBtnRemove.type="button";
        tagBtnRemove.textContent="Supprimer";
        tagBtnRemove.addEventListener("click",()=>{
            //remove recipe on list recipe 
            let parentLi=tagBtnRemove.parentNode
            parentLi.parentNode.removeChild(parentLi);

            //remove recipe on localstorage
            let listRecipes=JSON.parse(localStorage.getItem("listRecipes"));
            let recipeIndex=listRecipes.findIndex(recipe=>recipe.titleRecipe===parentLi.firstElementChild.firstElementChild.textContent);
            if(recipeIndex!==-1){
                listRecipes.splice(recipeIndex,1);
            }
            localStorage.setItem("listRecipes",JSON.stringify(listRecipes));
        })

        tagA.append(tagStrong,tagImg,tagP);

        let tagLi=document.createElement("li");
        tagLi.classList.add("li-recipe");
        tagLi.append(tagA,tagBtnEdit,tagBtnRemove);

        let tagul=document.getElementById("recipes-list");
        tagul.appendChild(tagLi);
    });
}

if (localStorage.getItem("adminLogin")) {
    console.log("connecté");
    
    if(localStorage.getItem("listRecipes")===null){
        //resquest api to get lists recipes
        let listRecipes = await getListRecipes(); console.log(listRecipes);
        
        // add listRecipes in localstorage
        localStorage.setItem("listRecipes",JSON.stringify(listRecipes));

        updateDom(listRecipes);
    }else{//get list Recipes in localstorage
        let listRecipes=JSON.parse(localStorage.getItem("listRecipes"));

        updateDom(listRecipes);
    }
}
else {//redirection to connexion.html
    location.href = "./connexion.html";
}

//event listener on btn-disconnected
let tagBtnDisconnected = document.getElementById("btn-disconnected");
tagBtnDisconnected.addEventListener("click", () => {
    let adminLogin = JSON.parse(localStorage.getItem("adminLogin"));
    let admins = JSON.parse(localStorage.getItem("admins"));
    console.log(adminLogin, admins);
    let adminIndex = admins.findIndex((admin) => {
        return admin.email === adminLogin.email &&
            admin.password === adminLogin.password;
    });
    if (adminIndex !== -1) {
        admins[adminIndex].islogin = false;
    }
    console.log(admins);
    localStorage.setItem("admins", JSON.stringify(admins));
    localStorage.removeItem("adminLogin");
    location.href = "./connexion.html";
});

//event listener on btn-addRecipe
let tagBtnAddRecipe = document.getElementById("btn-addRecipe");
tagBtnAddRecipe.addEventListener("click", () => location.href = "./addRecipe.html");

//event listener on register-search
let tagFormSearchRecipe=document.getElementById("register-search");
tagFormSearchRecipe.addEventListener("submit",(e)=>{
    e.preventDefault();
    let recipeTitleToSearch=tagFormSearchRecipe.firstElementChild.value;

    //get listRecipes to localstorage
    let listRecipes=JSON.parse(localStorage.getItem("listRecipes"));

    //browse listRecipes
    let recipesListFound=listRecipes.filter(recipe=>{
        return recipe.titleRecipe.toLowerCase().indexOf(recipeTitleToSearch.toLowerCase())>=0
    })
    console.log(recipesListFound)
    if(recipesListFound){
        console.log("ici")
        let tagUlRecipesList=document.getElementById("recipes-list");
        console.dir(tagUlRecipesList.children);
        let recipesList=tagUlRecipesList.children;
        recipesList=Array.from(recipesList);
        recipesList.forEach(recipe => recipe.remove());
        updateDom(recipesListFound);
    }
})

//event listener on registerSearchByCategory
let tagFormSearchByCategory=document.getElementById("registerSearchByCategory");
tagFormSearchByCategory.addEventListener("submit",(e)=>{
    e.preventDefault();
    //let dish=document.getElementById("select-category").value;
    //console.log(dish);
    console.dir(document.getElementById("select-category"));
    let tagSelect=document.getElementById("select-category");
    console.log(tagSelect);
    let valueChoice=tagSelect.options[tagSelect.selectedIndex].value;
    console.log(valueChoice);
    //get listRecipes to localstorage
    let listRecipes=JSON.parse(localStorage.getItem("listRecipes"));
    console.log(listRecipes);

    //browse listRecipes
    let recipesListFound=listRecipes.filter(recipe=>{
        return recipe.category === valueChoice
    })
    //console.log(recipesListFound);
    if(recipesListFound){
        let tagUlRecipesList=document.getElementById("recipes-list");
        console.dir(tagUlRecipesList.children);
        let recipesList=tagUlRecipesList.children;
        recipesList=Array.from(recipesList);
        recipesList.forEach(recipe => recipe.remove());
        updateDom(recipesListFound);
    }
})