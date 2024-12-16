import { loadPage } from "../script/index.js";
import { getDrink, searchByName } from "./api.js";
import { mapRawCocktailData } from "./utilities.js";
import {
  generateDetailsPageHTML,
  searchInput,
  generateSearchResult,
} from "./dom.js";

export async function handleReshakeButton() {
  await loadPage();
}

export async function handleDrinkOnClick(drinkId) {
  const drink = await getDrink(drinkId);
  const drinkObject = mapRawCocktailData(drink);
  generateDetailsPageHTML(drinkObject);
}

export async function handleSearchButton(params) {
  if (searchInput.value) {
    const searchResultArray = [];

    const searchResult = await searchByName(searchInput.value);

    searchResult.forEach((drink) => {
      const drinkDetail = mapRawCocktailData(drink);
      searchResultArray.push(drinkDetail);
    });

    generateSearchResult(searchResultArray);

    const resultsTitleButtons = document.querySelectorAll(
      ".result-title-button"
    );

    resultsTitleButtons.forEach((button) => {
      button.addEventListener("click", async () => {
        const { drinkId } = button.dataset;
        console.log(drinkId);
        await handleDrinkOnClick(drinkId);
      });
    });

    const resultsImageButtons = document.querySelectorAll(".result-img-button");

    resultsImageButtons.forEach((button) => {
      button.addEventListener("click", async () => {
        const { drinkId } = button.dataset;
        console.log(drinkId);
        await handleDrinkOnClick(drinkId);
      });
    });
  }
}
