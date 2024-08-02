const url = new URL(window.location.href);
const params = new URLSearchParams(url.search);
const titleRecipe = params.get("titleRecipe");
const listRecipes = JSON.parse(localStorage.getItem("listRecipes"));

//console.log(listRecipes);
const recipeFind = listRecipes.find((recipe) => recipe.titleRecipe === titleRecipe);
//console.log(recipeFind);

let form = document.getElementById("registerToEditRecipe");
let labelTitle = document.createElement("label");

labelTitle.textContent = "Titre";

let inputTitle = document.createElement("input");

inputTitle.value = recipeFind.titleRecipe;
inputTitle.style.marginBottom = "20px";
inputTitle.readOnly = true;

let labelIngredients = document.createElement("label");

labelIngredients.textContent = "Ingrédients";
labelIngredients.style.display = "block";

form.firstElementChild.append(labelTitle, inputTitle, labelIngredients);

recipeFind.ingredientsList.forEach((ingredient) => {
  let inputIngredient = document.createElement("input");
  inputIngredient.value = ingredient;
  inputIngredient.style.display = "block";
  inputIngredient.style.marginBottom = "20px";
  inputIngredient.readOnly = true;
  inputIngredient.addEventListener("click", () => {
    inputIngredient.readOnly = false;
    inputIngredient.select();
  });
  form.firstElementChild.append(inputIngredient);
});

let buttonValidate = document.createElement("button");

buttonValidate.textContent = "Valider les modifications";

//add event listener on buttonValidate
buttonValidate.addEventListener("submit", () => {
});

let buttonCancel = document.createElement("button");
buttonCancel.textContent = "Annuler";

//add event listener on buttonCancel
buttonCancel.addEventListener("submit", () => {
});

form.firstElementChild.append(buttonCancel, buttonValidate);
