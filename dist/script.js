import { getListRecipes } from "../../dist/functionsCallApi.js";

if (localStorage.getItem("adminLogin")) {
    console.log("connecté");
}
else {
    location.href = "./connexion.html";
}

let updateDom=(listRecipes)=>{
    listRecipes.forEach(recipe => {        
        let tagStrong=document.createElement("strong");
        tagStrong.classList.add("strong-recipe");
        tagStrong.textContent=recipe.recipe.label;

        let tagImg=document.createElement("img");
        tagImg.classList.add("img-recipe");
        tagImg.src=recipe.recipe.image;
        tagImg.alt="image de la recette";
        tagImg.style.display="block";

        let tagP=document.createElement("p");
        tagP.classList.add("p-time-recipe");
        tagP.style.display="inline-block";
        tagP.textContent=`Durée ${recipe.recipe.totalTime}`;

        let tagA=document.createElement("a");
        tagA.classList.add("a-recipe");
        tagA.href="./detail.html";

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
            //supprimer la recette
        })

        tagA.append(tagStrong,tagImg,tagP);

        let tagLi=document.createElement("li");
        tagLi.classList.add("li-recipe");
        tagLi.append(tagA,tagBtnEdit,tagBtnRemove);

        let tagul=document.getElementById("recipes-list");
        tagul.appendChild(tagLi);
    });
}

document.addEventListener("DOMContentLoaded", async() => {
    //resquest api to lists recipes
    let listRecipes = await getListRecipes(); console.log(listRecipes);
    updateDom(listRecipes);

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

    let tagBtnAddRecipe = document.getElementById("btn-addRecipe");
    tagBtnAddRecipe.addEventListener("click", () => location.href = "./addRecipe.html");
});
