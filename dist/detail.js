let updateDom=(recipeFound)=>{console.log(recipeFound)
    let tagH1Recipe=document.getElementById("h1");
    tagH1Recipe.textContent=recipeFound.titleRecipe;

    let tagImgRecipe=document.getElementById("imgRecipe");
    tagImgRecipe.src=recipeFound.imgUrl;

    let ingredientLines=recipeFound.ingredientsList;
    ingredientLines.forEach(ingredient => {
        let tagLiRecipe=document.createElement("li");
        tagLiRecipe.textContent=ingredient;
        
        let tagUlRecipe=document.getElementById("ul-ingredientList");
        tagUlRecipe.appendChild(tagLiRecipe);
    });

    let tagPCookingTime=document.getElementById("cooking-time");
    tagPCookingTime.textContent=`Temps de cuisson : ${recipeFound.cookingTime} minutes`;
}

document.addEventListener("DOMContentLoaded",()=>{
    //get title recipe via url to search recipe on localstorage
    const urlParams=new URLSearchParams(window.location.search);
    let paramValue=urlParams.get("recette");

    let listRecipes=JSON.parse(localStorage.getItem("listRecipes"));
    let recipeFound=listRecipes.filter(recipe =>recipe.titleRecipe===paramValue);
    updateDom(recipeFound[0]);
})