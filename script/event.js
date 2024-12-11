import { loadPage } from "../script/index.js";
import { getDrink } from "./api.js";
import { mapRawCocktailData } from "./utilities.js";
import { generateDetailsPageHTML } from "./dom.js";

export async function handleReshakeButton() {
  await loadPage();
}

export async function handleDrinkOnClick(drinkId) {
  const drink = await getDrink(drinkId);
  const drinkObject = mapRawCocktailData(drink);
  generateDetailsPageHTML(drinkObject);
}
