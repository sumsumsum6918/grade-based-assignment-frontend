import { mapRawCocktailData } from "../script/utilities.js";
import { getRandomDrink, getDrink } from "../script/api.js";
import { handleReshakeButton } from "./event.js";
import { generateIndexHTML, generateDetailsPageHTML } from "./dom.js";

loadPage();
export async function loadPage() {
  await getRandomDrink()
    .then((res) => {
      const randomDrinkObject = mapRawCocktailData(res);
      generateIndexHTML(randomDrinkObject);

      return randomDrinkObject;
    })
    .then((randomDrinkObject) => {
      const reshakeButton = document.querySelector(".reshake-button");
      reshakeButton.addEventListener("click", handleReshakeButton);

      getDrink(randomDrinkObject.id).then((res) => {
        const drinkObject = mapRawCocktailData(res);
        generateDetailsPageHTML(drinkObject);
      });
    });
}
