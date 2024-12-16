import { mapRawCocktailData } from "../script/utilities.js";
import { getRandomDrink, getFilter } from "../script/api.js";
import {
  handleReshakeButton,
  handleDrinkOnClick,
  handleSearchButton,
} from "./event.js";
import { generateIndexHTML, generateFilterHTML } from "./dom.js";

loadPage();

const searchButton = document.getElementById("search-button");
searchButton.addEventListener("click", handleSearchButton);
const searchForm = document.getElementById("basic-search-form");
searchForm.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    handleSearchButton();
  }
});

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

  generateFilterHTML(alcoholType, "alcoholic", "strAlcoholic");
  generateFilterHTML(categoryType, "category", "strCategory");
  generateFilterHTML(ingredientType, "ingredients", "strIngredient1");
  generateFilterHTML(glassType, "glass", "strGlass");

  const alcoholFilterContent = document.querySelector(
    ".alcoholic-filter-content"
  );
  const alcoholList = alcoholFilterContent.querySelectorAll("div");

  alcoholList.forEach((type) => {
    type.addEventListener("click", () => {
      console.log(type.innerText);
    });
  });
}
