import { mapRawCocktailData } from "../script/utilities.js";
import { getRandomDrink, getDrink } from "../script/api.js";
import { handleReshakeButton, handleDrinkOnClick } from "./event.js";
import { generateIndexHTML, generateDetailsPageHTML } from "./dom.js";

loadPage();
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
