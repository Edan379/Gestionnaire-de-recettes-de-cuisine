if (localStorage.getItem("adminLogin")) {
  console.log("connecté");

  let updateDom = (recipeFound) => {
    let tagH1Recipe = document.getElementById("h1");
    tagH1Recipe.textContent = recipeFound.titleRecipe;

    let tagPMealType = document.getElementById("mealType");
    tagPMealType.textContent = recipeFound.mealType;

    let tagImgRecipe = document.getElementById("imgRecipe");
    tagImgRecipe.src = recipeFound.imgUrl;

    let ingredientLines = recipeFound.ingredientsList;
    //browse each ingredient of ingredientLines
    ingredientLines.forEach(ingredient => {
      let tagLiRecipe = document.createElement("li");
      tagLiRecipe.textContent = ingredient;

      let tagUlRecipe = document.getElementById("ul-ingredientList");
      tagUlRecipe.appendChild(tagLiRecipe);
    });

    let tagPCookingTime = document.getElementById("cooking-time");
    tagPCookingTime.textContent = `Temps de cuisson : ${recipeFound.cookingTime} minutes`;

    //check if recipeFound.preparationSteps is an url 
    const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    if (urlRegex.test(recipeFound.preparationSteps)) {
      let btnInstruction = document.createElement("button");
      btnInstruction.textContent = "Instructions";
      btnInstruction.addEventListener("click", () => location.href = recipeFound.preparationSteps);

      let tagArt = document.getElementById("art-recipe");
      tagArt.appendChild(btnInstruction);
    } else {
      //create tag h2
      let tagH2 = document.createElement("h2");
      tagH2.textContent = "Instructions";

      //create a tag p to add instructions steps
      let tagPInstructions = document.createElement("p");
      tagPInstructions.textContent = recipeFound.preparationSteps;
      let tagArt = document.getElementById("art-recipe");
      tagArt.append(tagH2, tagPInstructions);
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    //get title recipe via url to search recipe on localstorage
    const urlParams = new URLSearchParams(window.location.search);
    let paramValue = urlParams.get("recette");

    let listRecipes = JSON.parse(localStorage.getItem("listRecipes"));
    let recipeFound = listRecipes.filter(recipe => recipe.titleRecipe === paramValue);
    updateDom(recipeFound[0]);
  })

}
else {//redirection to connexion.html
  location.href = "./connexion.html";
}

