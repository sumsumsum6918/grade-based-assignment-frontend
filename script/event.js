import { loadPage } from "../script/index.js";
import { getDrink, searchByName } from "./api.js";
import { mapRawCocktailData } from "./utilities.js";
import {
  generateDetailsPageHTML,
  searchInput,
  generateSearchResult,
  goToPage,
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

export async function handleSearch() {
  const searchResult = await searchByName(searchInput.value);
  const filteredSearchResult = searchResult.filter((drink) =>
    getFilters().every((fil) => Object.values(drink).includes(fil))
  );

  const drinkDetails = filteredSearchResult.map((drink) =>
    mapRawCocktailData(drink)
  );
  generateSearchResult(drinkDetails);
}

export async function handleDrinkCardPress(button) {
  const { drinkId } = button.dataset;
  await handleDrinkOnClick(drinkId);
  goToPage("details");
}

export function handleHeartButtonClick(button, drinkObject) {
  if (button.classList.contains("heart")) {
    button.classList.add("heart-filled");
    button.classList.remove("heart");
    addDrinkToFav(drinkObject);
  } else if (button.classList.contains("heart-filled")) {
    button.classList.remove("heart-filled");
    button.classList.add("heart");

    removeDrinkFromFav(drinkObject.id);
  }
}
