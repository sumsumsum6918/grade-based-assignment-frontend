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
  generateFavPageHTML,
} from "./dom.js";
import { addDrinkToFav, removeDrinkFromFav } from "./favCart.js";
import { toggleFilter, clearFilters } from "./filters.js";

loadPage();

const searchButton = document.getElementById("search-button");
searchButton.addEventListener("click", () => {
  clearFilters();
  handleSearchButton();
});

const searchForm = document.getElementById("basic-search-form");
searchForm.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    clearFilters();
    handleSearchButton();
  }
});

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
  const alcoholicType = await getFilter("a");

  generateFilterHTML(categoryType, "category", "strCategory");
  generateFilterHTML(ingredientType, "ingredients", "strIngredient1");
  generateFilterHTML(glassType, "glass", "strGlass");
  generateFilterHTML(alcoholicType, "alcoholic", "strAlcoholic");

  const filterElements = document.querySelectorAll(".filter-element");
  filterElements.forEach((filterElement) => {
    filterElement.addEventListener("click", () => {
      filterElement.classList.toggle("active");
      const { filterString } = filterElement.dataset;
      toggleFilter(filterString);
      handleSearchButton();
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
