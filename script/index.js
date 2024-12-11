import { mapRawCocktailData } from "../script/utilities.js";
import { getRandomDrink, getDrink } from "../script/api.js";
import { generateIndexHTML, generateDetailsPageHTML } from "./dom.js";

getRandomDrink().then((res) => {
  const randomDrinkObject = mapRawCocktailData(res);
  generateIndexHTML(randomDrinkObject);
});

getDrink("11000").then((res) => {
  const drinkObject = mapRawCocktailData(res);
  generateDetailsPageHTML(drinkObject);
});
