import { mapRawCocktailData } from "../script/utilities.js";
import { getRandomDrink } from "../script/api.js";

getRandomDrink().then((res) => {
  const randomDrinkObject = mapRawCocktailData(res);
  console.log(randomDrinkObject);
});
