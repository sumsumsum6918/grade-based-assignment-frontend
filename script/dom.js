import { getDrink } from "./api.js";
import { handleDrinkCardPress, handleHeartButtonClick } from "./event.js";
import { favCart } from "./favCart.js";
import { checkIfFaved, mapRawCocktailData } from "./utilities.js";

const indexPage = document.querySelector("#random-drink-page");
const detailsPage = document.querySelector("#details-page");
const filterPage = document.querySelector("#filter-page");
const favoritePage = document.querySelector("#favorite-page");

const pages = {
  index: indexPage,
  details: detailsPage,
  filter: filterPage,
  favorite: favoritePage,
};

export const searchInput = document.getElementById("basic-search");
const searchResults = document.querySelector(".search-results-container");

export function generateIndexHTML(drinkObject) {
  let indexPageHTML = "";
  indexPageHTML = `
    <div class="badge-container">
          <span class="material-symbols-outlined star">
            brightness_empty
            <p class="badge-context">
              Drink <br />
              Of The
              <br />
              Day
            </p>
          </span>
        </div>
        <div class="random-drink-card">
          <h3 id="title-button">${drinkObject.name}</h3>
          <img class="random-drink-img img-button" src="${
            drinkObject.thumbnail
          }" alt="random-drink-image" />
          <div class="actions">
            <span class="material-symbols-outlined  ${
              checkIfFaved(drinkObject.id) ? "heart-filled" : "heart"
            } random-heart-button"> favorite </span>
          </div>
        </div>
        <button class="reshake-button">Not The Vibe, Again</button>
  
  `;

  indexPage.innerHTML = indexPageHTML;
}

export function generateDetailsPageHTML(drinkObject) {
  let detailPageHTML = "";
  detailPageHTML = `
    <div class="left-details">
          <article class="details-tag-container">
          </article>

          <article class="detail-drink-container">
            <div class="detail-drink-card">
              <h3>${drinkObject.name}</h3>
              <img class="detail-drink-img" src="${
                drinkObject.thumbnail
              }" alt="detail-drink-image" />
              <div class="detail-actions">
                <span class="material-symbols-outlined detailed-heart-button
                 ${checkIfFaved(drinkObject.id) ? "heart-filled" : "heart"}
                "> favorite </span>
              </div>
              <div class="detail-drink-glass">Glass Type: ${
                drinkObject.glass
              }</div>
            </div>
          </article>
        </div>

        <div class="right-details">
          <div class="ingredients-grid">
          </div>

          <div class="instructions-container">
            <p>Instructions</p>
            <ol class="instructions-list">
              <li>
                Wash and brush an organic, untreated lemon, then cut a spiral of
                lemon peel, using a citrus peel
              </li>
              <li>If it is too large, cut it with a sharp knife</li>
            </ol>
          </div>
        </div>
  `;
  detailsPage.innerHTML = detailPageHTML;

  generateDrinkTags(drinkObject);
  generateIngredientsCard(drinkObject.ingredients);
  generateInstructions(drinkObject.instructions);

  const favButton = document.querySelector(".detailed-heart-button");
  favButton.addEventListener("click", () => {
    handleHeartButtonClick(favButton, drinkObject);
  });
}

function generateInstructions(instructions) {
  let instructionsHTML = "";

  instructions.forEach((i) => {
    instructionsHTML += `<li>${i}</li>`;
  });

  const instructionListElement = document.querySelector(".instructions-list");
  instructionListElement.innerHTML = instructionsHTML;
}

function generateIngredientsCard(ingredientsArray) {
  let ingredientsHTML = "";

  ingredientsArray.forEach((i) => {
    ingredientsHTML += `
    <div class="ingredient-card">
      <img src="https://www.thecocktaildb.com/images/ingredients/${
        i.ingredient
      }-Small.png" alt="ingredient" />
      <span class="ingredient-amount">${i.measure ? i.measure : ""} 
      ${i.ingredient}</span>
    </div>
`;
  });

  const ingredientGridElement = document.querySelector(".ingredients-grid");
  ingredientGridElement.innerHTML = ingredientsHTML;
}

function generateDrinkTags(drinkObject) {
  const tags = drinkObject.tags;
  const alcoholic = drinkObject.alcoholic;
  let category = drinkObject.category;
  if (category.includes("")) {
    category = category.replace(/\s+/g, "");
  }

  let tagsHTML = "";
  tagsHTML = `<span>#${category}</span>`;

  if (alcoholic) {
    tagsHTML += "<span>#Alcoholic</span>";
  } else tagsHTML += "<span>#Non-alcoholic</span>";

  tags.forEach((tag) => {
    if (tag === "Alcoholic") return;

    tagsHTML += `
           <span>#${tag}</span>
    `;
  });

  const drinkTagElement = document.querySelector(".details-tag-container");
  drinkTagElement.innerHTML = tagsHTML;
}

export function generateFilterHTML(array, type, stringName) {
  const containerElement = document.querySelector(`.${type}-filter-content`);
  const filters = array.map((element) => element[stringName]).sort();

  let filterContentHTML = "";

  filters.forEach((filter) => {
    filterContentHTML += `
      <div class="filter-element" data-filter-string="${filter}">${filter}</div>
    `;
  });

  containerElement.innerHTML = filterContentHTML;
}

export function generateSearchResult(resultArray, page = 0) {
  let searchResultsHTML = "";
  const resultsPerPage = 8;
  const startIndex = page * resultsPerPage;
  const endIndex = startIndex + resultsPerPage;

  resultArray.slice(startIndex, endIndex).forEach((drinkObject) => {
    searchResultsHTML += `
             <article class="result-drink-card">
               <h3 class="result-title-button" data-drink-id="${
                 drinkObject.id
               }">${drinkObject.name}</h3>
               <img class="result-drink-img result-img-button" data-drink-id="${
                 drinkObject.id
               }" src="${drinkObject.thumbnail}" alt="detail-drink-image" />
               <div class="detail-actions">
                 <span data-drink-id="${
                   drinkObject.id
                 }" class="material-symbols-outlined search-heart-button
                  ${checkIfFaved(drinkObject.id) ? "heart-filled" : "heart"}
                 "> favorite </span>
               </div>
             </article>
   `;
  });

  if (!searchResultsHTML) {
    searchResultsHTML = "<p>No Matching Results</p>";
  }

  const paginationContainer = document.querySelector(".pagination-container");
  paginationContainer.innerHTML = "";

  if (resultArray.length > 8) {
    const numPages = Math.ceil(resultArray.length / 8);
    let paginationHTML = `
        ${Array(numPages)
          .fill(null)
          .map(
            (_, i) =>
              `<button class="pagination-button" data-page-number="${i}">${
                i + 1
              }</button>`
          )
          .join("")}
    `;

    paginationContainer.innerHTML = paginationHTML;
  }
  searchResults.innerHTML = searchResultsHTML;

  const paginationButtons = document.querySelectorAll(".pagination-button");
  paginationButtons.forEach((paginationButton) =>
    paginationButton.addEventListener("click", () => {
      const { pageNumber } = paginationButton.dataset;
      generateSearchResult(resultArray, pageNumber);
    })
  );

  const resultsTitleButtons = document.querySelectorAll(".result-title-button");

  resultsTitleButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      handleDrinkCardPress(button);
    });
  });

  const resultsImageButtons = document.querySelectorAll(".result-img-button");

  resultsImageButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      handleDrinkCardPress(button);
    });
  });

  const favButtons = document.querySelectorAll(".search-heart-button");
  favButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const { drinkId } = button.dataset;
      const drinksArray = await getDrink(drinkId);
      const drinkObject = mapRawCocktailData(drinksArray);
      handleHeartButtonClick(button, drinkObject);
    });
  });
}

export function generateFavPageHTML() {
  let favDrinkCardHTML = "";
  favCart.forEach((drink) => {
    favDrinkCardHTML += `
    <article class="fav-drink-card">
              <h3 class="fav-title-button" data-drink-id="${drink.id}">
                ${drink.name}
              </h3>
              <img
                class="fav-drink-img fav-img-button"
                data-drink-id="${drink.id}"
                src="${drink.thumbnail}"
                alt="detail-drink-image"
              />
              <div class="detail-actions">
                <span class="material-symbols-outlined faved-heart-button
                ${
                  checkIfFaved(drink.id) ? "heart-filled" : "heart"
                }" data-drink-id="${drink.id}"> favorite </span>
              </div>
            </article>
   `;
  });

  const favContainer = document.querySelector(".fav-container");
  favContainer.innerHTML = favDrinkCardHTML;
}

export function goToPage(pageId) {
  Object.entries(pages).forEach(([key, page]) => {
    if (key === pageId) page.classList.remove("hide");
    else page.classList.add("hide");
  });
}
