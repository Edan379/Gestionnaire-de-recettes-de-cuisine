import {useApi} from "./useApi.js";

const api=useApi();

let getListRecipes=async()=>{
    try{
        let {data:{hits:recipeList}}= await api.get("?type=public&q=poulet&app_id=c1673f10&app_key=1f13882d40bd168e4770bde11bcea0a7");
        //console.log(recipeList)
        let recipes=[];
        recipeList.forEach(recipe => {
            let recipeCooking={};
            recipeCooking["kcal"]=recipe.recipe.calories;
            recipeCooking["cookingType"]=recipe.recipe.cuisineType[0];
            recipeCooking["imgUrl"]=recipe.recipe.image;
            recipeCooking["ingredientsList"]=recipe.recipe.ingredientLines;
            recipeCooking["titleRecipe"]=recipe.recipe.label;
            recipeCooking["mealType"]=recipe.recipe.mealType[0];
            recipeCooking["cookingTime"]=recipe.recipe.totalTime;
            recipeCooking["preparationSteps"]=recipe.recipe.shareAs;
            recipes.push(recipeCooking); 
        });
        return recipes;
    }
    catch(error){
        console.log("il y a une erreur ", error);
    }
}

export {getListRecipes};