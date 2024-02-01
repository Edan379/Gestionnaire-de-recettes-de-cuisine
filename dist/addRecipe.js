let btnAddIngredient=document.getElementById("btn-add-ingredient");
btnAddIngredient.addEventListener("click",()=>{
    let tagInputIngredient=document.createElement("input");
    tagInputIngredient.type="text";
    tagInputIngredient.name="ingredient";
    tagInputIngredient.placeholder="Nom de l'ingrédient";
    tagInputIngredient.required=true;

    let tagInputQty=document.createElement("input");
    tagInputQty.type="text";
    tagInputQty.name="quantity";
    tagInputQty.placeholder="Quantité";
    tagInputQty.required=true;

    let btnRemoveIngredient=document.createElement("button");
    btnRemoveIngredient.classList.add("btn-remove-ingredient");
    btnRemoveIngredient.type="button";
    btnRemoveIngredient.textContent="Supprimer";
    btnRemoveIngredient.addEventListener("click",(e)=>{
        let parentLi=btnRemoveIngredient.parentNode;
        parentLi.parentNode.removeChild(parentLi);
    });

    let tagInputLi=document.createElement("li");
    tagInputLi.append(tagInputIngredient,tagInputQty,btnRemoveIngredient);

    let ulIngredientsList=document.getElementById("ingredients-list");
    ulIngredientsList.appendChild(tagInputLi);
});

let btnAddRecipe=document.getElementById("input-add-recipe");
btnAddRecipe.addEventListener("submit",(e)=>{
    e.preventDefault();
    //add data form to page recette-cuisines.html
});