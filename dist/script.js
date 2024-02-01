import { getListRecipes } from "../../dist/functionsCallApi.js";
if (localStorage.getItem("adminLogin")) {
    console.log("connecté");
}
else {
    location.href = "./connexion.html";
}
//resquest api to lists recipes
let listRecipes = getListRecipes();

document.addEventListener("DOMContentLoaded", () => {
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
    tagBtnAddRecipe.addEventListener("click", () => {
        console.log(location.href);
        location.href = "./addRecipe.html";
    });
});
