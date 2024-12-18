import { mapRawCocktailData } from "../script/utilities.js";
import { getRandomDrink, getFilter, getDrink } from "../script/api.js";
import {
  handleReshakeButton,
  handleDrinkOnClick,
  handleSearch,
  handleDrinkCardPress,
  handleHeartButtonClick,
} from "./event.js";
import {
  generateIndexHTML,
  generateFilterHTML,
  generateFavPageHTML,
  goToPage,
} from "./dom.js";
import { toggleFilter, clearFilters } from "./filters.js";

loadPage();

const searchForm = document.getElementById("basic-search-form");
searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  clearFilters();
  handleSearch();
  goToPage("filter");
  loadFilterPage();
});

const favePageButton = document.querySelector(".fav-page-button");
favePageButton.addEventListener("click", () => {
  goToPage("favorite");
  loadFavPage();
});

const advancedSearch = document.getElementById("filter-form");

const filterButton = document.querySelector(".filter-button");
filterButton.addEventListener("click", () => {
  advancedSearch.classList.toggle("hide");
});

const mainPageButton = document.querySelector(".main-page-button");
mainPageButton.addEventListener("click", () => {
  goToPage("index");
  loadPage();
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
    goToPage("details");
  });

  const imageButton = document.querySelector(".img-button");
  imageButton.addEventListener("click", async () => {
    await handleDrinkOnClick(randomDrinkObject.id);
    goToPage("details");
  });

  const favButton = document.querySelector(".random-heart-button");
  favButton.addEventListener("click", () => {
    handleHeartButtonClick(favButton, randomDrinkObject);
  });
}

async function loadFilterPage(searchResults) {
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
      handleSearch();
    });
  });
}

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
      const { drinkId } = button.dataset;
      const drinksArray = await getDrink(drinkId);
      const drinkObject = mapRawCocktailData(drinksArray);
      handleHeartButtonClick(button, drinkObject);

      loadFavPage();
    });
  });
}
