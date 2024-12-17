import { mapRawCocktailData } from "../script/utilities.js";
import { getRandomDrink, getFilter } from "../script/api.js";
import {
  handleReshakeButton,
  handleDrinkOnClick,
  handleSearchButton,
  handleDrinkCardPress,
} from "./event.js";
import {
  generateIndexHTML,
  generateFilterHTML,
  generateSearchResult,
  generateFavPageHTML,
} from "./dom.js";
import { addDrinkToFav, removeDrinkFromFav } from "./favCart.js";

export let searchResultArray = [];

loadPage();

const searchButton = document.getElementById("search-button");
searchButton.addEventListener("click", handleSearchButton);

const searchForm = document.getElementById("basic-search-form");
searchForm.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    handleSearchButton();
  }
});

// const filterButton = document.querySelector(".filter-button");
// filterButton.addEventListener("click", () => {
//searchResultArray.length = 0;
// loadFilterPage()});

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

  const favButton = document.querySelector(".random-heart-button");
  favButton.addEventListener("click", () => {
    if (favButton.classList.contains("heart")) {
      favButton.classList.add("heart-filled");
      favButton.classList.remove("heart");
      addDrinkToFav(randomDrinkObject);
    } else if (favButton.classList.contains("heart-filled")) {
      favButton.classList.remove("heart-filled");
      favButton.classList.add("heart");

      removeDrinkFromFav(randomDrinkObject.id);
    }
  });
}

loadFilterPage();
async function loadFilterPage() {
  const categoryType = await getFilter("c");
  const ingredientType = await getFilter("i");
  const glassType = await getFilter("g");

  generateFilterHTML(categoryType, "category", "strCategory");
  generateFilterHTML(ingredientType, "ingredients", "strIngredient1");
  generateFilterHTML(glassType, "glass", "strGlass");

  const alcoholFilterContent = document.querySelector(
    ".alcoholic-filter-content"
  );
  const alcoholList = alcoholFilterContent.querySelectorAll("div");

  alcoholList.forEach((type) => {
    type.addEventListener("click", () => {
      const isAlcoholic = type.dataset.alcoholic === "true";

      if (searchResultArray.length > 0) {
        const filteredResult = searchResultArray.filter(
          (drink) => drink.alcoholic == isAlcoholic
        );
        generateSearchResult(filteredResult);
      }
    });
  });
}

loadFavPage();
function loadFavPage() {
  generateFavPageHTML();

  const favTitleButton = document.querySelectorAll(".fav-title-button");
  favTitleButton.forEach((button) => {
    button.addEventListener("click", async () => {
      handleDrinkCardPress(button);
    });
  });

  const favImgButton = document.querySelectorAll(".fav-img-button");
  favImgButton.forEach((button) => {
    button.addEventListener("click", async () => {
      handleDrinkCardPress(button);
    });
  });

  const favbuttons = document.querySelectorAll(".faved-heart-button");
  favbuttons.forEach((button) => {
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

      loadFavPage();
    });
  });
}
