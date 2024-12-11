import { mapRawCocktailData } from "../script/utilities.js";
import { getRandomDrink, getDrink } from "../script/api.js";
import { generateIndexHTML, generateDetailsPageHTML } from "./dom.js";

getRandomDrink()
  .then((res) => {
    const randomDrinkObject = mapRawCocktailData(res);
    generateIndexHTML(randomDrinkObject);
    return randomDrinkObject;
  })
  .then((randomDrinkObject) => {
    getDrink(randomDrinkObject.id).then((res) => {
      const drinkObject = mapRawCocktailData(res);
      generateDetailsPageHTML(drinkObject);
    });
  });
