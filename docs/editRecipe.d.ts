declare const url: URL;
declare const params: URLSearchParams;
declare const titleRecipe: string;
interface Recipe {
    category: string;
    cookingTime: string;
    imgUrl: string;
    ingredientsList: string[];
    preparationSteps: string;
    titleRecipe: string;
}
declare const listRecipes: Recipe[];
declare const recipeFind: Recipe;
declare let form: HTMLFormElement | null;
declare let labelTitle: HTMLLabelElement;
declare let inputTitle: HTMLInputElement;
declare let labelIngredients: HTMLLabelElement;
declare let buttonValidate: HTMLButtonElement;
declare let buttonCancel: HTMLButtonElement;
