const indexPage = document.querySelector(".random-drink-page");

export function generateIndexHTML(drinkObject) {
  console.log(drinkObject);
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
