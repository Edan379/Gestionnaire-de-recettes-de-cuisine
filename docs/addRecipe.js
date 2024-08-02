if (localStorage.getItem("adminLogin")) {
  console.log("connecté");

  let btnAddIngredient = document.getElementById("btn-add-ingredient");
  btnAddIngredient.addEventListener("click", () => {
    //create a input ingredient
    let tagInputIngredient = document.createElement("input");
    tagInputIngredient.id = "ingredient";
    tagInputIngredient.type = "text";
    tagInputIngredient.name = "ingredient";
    tagInputIngredient.placeholder = "Nom de l'ingrédient";
    tagInputIngredient.required = true;

    //create a input qty
    let tagInputQty = document.createElement("input");
    tagInputQty.id = "qty";
    tagInputQty.type = "text";
    tagInputQty.name = "quantity";
    tagInputQty.placeholder = "Quantité";
    tagInputQty.required = true;

    //create a button to remove a ingredient
    let btnRemoveIngredient = document.createElement("button");
    btnRemoveIngredient.classList.add("btn-remove-ingredient");
    btnRemoveIngredient.type = "button";
    btnRemoveIngredient.textContent = "Supprimer";
    btnRemoveIngredient.addEventListener("click", (e) => {
      let parentLi = btnRemoveIngredient.parentNode;
      parentLi.parentNode.removeChild(parentLi);
    });

    let tagInputLi = document.createElement("li");
    tagInputLi.append(tagInputIngredient, tagInputQty, btnRemoveIngredient);

    let ulIngredientsList = document.getElementById("ingredients-list");
    ulIngredientsList.appendChild(tagInputLi);
  });

  let formAddRecipe = document.getElementById("register-to-add-recipe");
  formAddRecipe.addEventListener("submit", (e) => {
    e.preventDefault(); console.log("formulaire soumis");
    //remove alert tagSpanErrorUrl
    if (document.getElementById("span-error-url")) document.getElementById("span-error-url").remove();

    let formTagsList = formAddRecipe.firstElementChild.elements;

    //convert formTagsList to array
    formTagsList = Array.from(formTagsList);

    let recipeNewList = [];
    let newRecipe = { ingredientsList: null };

    //get values of tags in formTagsList
    console.log(formTagsList)
    formTagsList.forEach(tag => {
      if (tag.id === "title-recipe") {
        newRecipe["titleRecipe"] = tag.value;
      }
      else if (tag.id === "cookingTime") {
        newRecipe["cookingTime"] = tag.value;
      }
      else if (tag.id === "recipe-img-url") {
        //check if url du formulaire commence par https:// ou http://
        if (/https?:\/\/.+/.test(tag.value)) {
          newRecipe["imgUrl"] = tag.value;
        } else {//show alert
          let tagSpanErrorUrl = document.createElement("span");
          tagSpanErrorUrl.id = "span-error-url"
          tagSpanErrorUrl.textContent = "L'url n'est pas valide !";

          let tagImgUrl = document.getElementById("recipe-img-url");
          tagImgUrl.insertAdjacentElement("afterend", tagSpanErrorUrl);
        }
      }
      else if (tag.id === "ingredient") {
        if (newRecipe["ingredientsList"] === null) {// if empty
          newRecipe["ingredientsList"] = tag.value;
        } else {
          newRecipe["ingredientsList"] = tag.value + "otherIngredient" + newRecipe["ingredientsList"];
        }
      }
      else if (tag.id === "qty") {
        console.log(tag.id, newRecipe["ingredientsList"]);
        newRecipe["ingredientsList"] = "endd" + tag.value + " " + newRecipe["ingredientsList"];
      }
      else if (tag.localName === "textarea") {
        newRecipe["preparationSteps"] = tag.value;
      }
      else if (tag.id === "select-category") {
        console.log(tag.value);
        newRecipe["category"] = tag.value;
      }
    });

    //convert ingredientList property value to array
    newRecipe["ingredientsList"] = newRecipe["ingredientsList"].split("otherIngredientendd");

    //replace a substring in ingredientList property[0]
    newRecipe["ingredientsList"][0] = newRecipe["ingredientsList"][0].replace("endd", "");

    //inverse value in newRecipe["ingredientsList"]
    newRecipe["ingredientsList"].reverse();

    //add newRecipe in listRecipes of localstorage
    let listRecipes = JSON.parse(localStorage.getItem("listRecipes"));
    listRecipes.push(newRecipe);

    localStorage.setItem("listRecipes", JSON.stringify(listRecipes));

    //redirection to main page
    location.href = "./recettes-cuisines.html"
  });

}
else {//redirection to connexion.html
  location.href = "./connexion.html";
}