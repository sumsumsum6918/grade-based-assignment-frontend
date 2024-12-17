import { loadPage } from "../script/index.js";
import { getDrink, searchByName } from "./api.js";
import { mapRawCocktailData } from "./utilities.js";
import {
  generateDetailsPageHTML,
  searchInput,
  generateSearchResult,
} from "./dom.js";
import { addDrinkToFav, removeDrinkFromFav } from "./favCart.js";
import { clearFilters, getFilters } from "./filters.js";

export async function handleReshakeButton() {
  await loadPage();
}

export async function handleDrinkOnClick(drinkId) {
  const drink = await getDrink(drinkId);
  const drinkObject = mapRawCocktailData(drink);
  generateDetailsPageHTML(drinkObject);
}

export async function handleSearchButton() {
  if (searchInput.value) {
    const searchResult = await searchByName(searchInput.value);
    const filteredSearchResult = searchResult.filter((drink) =>
      getFilters().every((fil) => Object.values(drink).includes(fil))
    );

    const drinkDetails = filteredSearchResult.map((drink) =>
      mapRawCocktailData(drink)
    );
    generateSearchResult(drinkDetails);

    const resultsTitleButtons = document.querySelectorAll(
      ".result-title-button"
    );

    resultsTitleButtons.forEach((button) => {
      button.addEventListener("click", async () => {
        handleDrinkCardPress(button);
      });
    });

    const resultsImageButtons = document.querySelectorAll(".result-img-button");

    resultsImageButtons.forEach((button) => {
      button.addEventListener("click", async () => {
        handleDrinkCardPress(button);
      });
    });
  }

  const favButtons = document.querySelectorAll(".search-heart-button");
  favButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      if (button.classList.contains("heart")) {
        button.classList.add("heart-filled");
        button.classList.remove("heart");

        const { drinkId } = button.dataset;
        const drinksArray = await getDrink(drinkId);
        const drinkObject = mapRawCocktailData(drinksArray);
        addDrinkToFav(drinkObject);
      } else if (button.classList.contains("heart-filled")) {
        button.classList.remove("heart-filled");
        button.classList.add("heart");

        const { drinkId } = button.dataset;
        removeDrinkFromFav(drinkId);
      }
    });
  });
}

export async function handleDrinkCardPress(button) {
  const { drinkId } = button.dataset;
  await handleDrinkOnClick(drinkId);
}
