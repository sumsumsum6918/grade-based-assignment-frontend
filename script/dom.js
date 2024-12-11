const indexPage = document.querySelector(".random-drink-page");
const detailsPage = document.querySelector(".details-page");

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
          <h3>${drinkObject.name}</h3>
          <img class="drink-img" src="${drinkObject.thumbnail}" alt="random-drink-image" />
          <div class="actions">
            <span class="material-symbols-outlined heart"> favorite </span>
            <span class="material-symbols-outlined share"> ios_share </span>
          </div>
        </div>
        <button class="reshake-button">Not The Vibe, Again</button>
  
  `;

  indexPage.innerHTML = indexPageHTML;
}

export function generateDetailsPageHTML(drinkObject) {
  console.log(drinkObject);
  let detailPageHTML = "";
  detailPageHTML = `
    <div class="left-details">
          <article class="details-tag-container">
          </article>

          <article class="detail-drink-container">
            <div class="detail-drink-card">
              <h3>${drinkObject.name}</h3>
              <img class="detail-drink-img" src="${drinkObject.thumbnail}" alt="detail-drink-image" />
              <div class="detail-actions">
                <span class="material-symbols-outlined heart"> favorite </span>
                <span class="material-symbols-outlined share"> ios_share </span>
              </div>
              <div class="detail-drink-glass">Glass Type: ${drinkObject.glass}</div>
            </div>
          </article>
        </div>

        <div class="right-details">
          <div class="ingredients-grid">
            <div class="ingredient-card">
              <img src="" alt="ingredient" />
              <span class="ingredient-amount">2-4 Mint</span>
            </div>
            <div class="ingredient-card">
              <img src="" alt="ingredient" />
              <span class="ingredient-amount">2-4 Mint</span>
            </div>
            <div class="ingredient-card">
              <img src="" alt="ingredient" />
              <span class="ingredient-amount">2-4 Mint</span>
            </div>
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
}
function generateIngredientsCard(ingredientsArray) {
  console.log(ingredientsArray);
  let ingredientsHTML = "";

  ingredientsArray.forEach((i) => {
    ingredientsHTML += `
    <div class="ingredient-card">
      <img src="https://www.thecocktaildb.com/images/ingredients/${
        i.ingredient
      }-Small.png" alt="ingredient" />
      <span class="ingredient-amount">${i.measure + " " + i.ingredient}</span>
    </div>
`;
  });

  const ingredientGridElement = document.querySelector(".ingredients-grid");
  ingredientGridElement.innerHTML = ingredientsHTML;
}

function generateDrinkTags(drinkObject) {
  const tags = drinkObject.tags;
  const alcoholic = drinkObject.alcoholic;
  const category = drinkObject.category;

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
