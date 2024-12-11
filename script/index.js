import { mapRawCocktailData } from "../script/utilities.js";
import { getRandomDrink } from "../script/api.js";
import { generateIndexHTML } from "./dom.js";

getRandomDrink().then((res) => {
  const randomDrinkObject = mapRawCocktailData(res);
  generateIndexHTML(randomDrinkObject);
});
