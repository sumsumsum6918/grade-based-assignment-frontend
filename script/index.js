import { mapRawCocktailData } from "../script/utilities.js";
import { getRandomDrink, getFilter } from "../script/api.js";
import { handleReshakeButton, handleDrinkOnClick } from "./event.js";
import { generateIndexHTML, generateFilterHTML } from "./dom.js";

loadPage();
export async function loadPage() {
  const randomDrink = await getRandomDrink();
  const randomDrinkObject = mapRawCocktailData(randomDrink);
  generateIndexHTML(randomDrinkObject);

  const reshakeButton = document.querySelector(".reshake-button");
  reshakeButton.addEventListener("click", handleReshakeButton);

  const titleButton = document.getElementById("title-button");
  titleButton.addEventListener("click", async () => {
    await handleDrinkOnClick(randomDrinkObject.id);
  });

  const imageButton = document.querySelector(".img-button");
  imageButton.addEventListener("click", async () => {
    await handleDrinkOnClick(randomDrinkObject.id);
  });
}
loadFilterPage();
async function loadFilterPage() {
  const alcoholType = await getFilter("a");
  const categoryType = await getFilter("c");
  const ingredientType = await getFilter("i");
  const glassType = await getFilter("g");

  console.log(alcoholType);
  console.log(categoryType);
  console.log(ingredientType);
  console.log(glassType);

  generateFilterHTML(alcoholType, "alcoholic", "strAlcoholic");
  generateFilterHTML(categoryType, "category", "strCategory");
  generateFilterHTML(ingredientType, "ingredients", "strIngredient1");
}
