export let favCart = JSON.parse(localStorage.getItem("fav-cart")) || [
  {
    id: "15300",
    name: "3-Mile Long Island Iced Tea",
    tags: [],
    category: "Ordinary Drink",
    alcoholic: true,
    glass: "Collins Glass",
    instructions: [
      "Fill 14oz glass with ice and alcohol.",
      "Fill 2/3 glass with cola and remainder with sweet & sour.",
      "Top with dash of bitters and lemon wedge.",
    ],
    thumbnail:
      "https://www.thecocktaildb.com/images/media/drink/rrtssw1472668972.jpg",
    ingredients: [
      {
        ingredient: "Gin",
        measure: "1/2 oz",
      },
      {
        ingredient: "Light rum",
        measure: "1/2 oz",
      },
      {
        ingredient: "Tequila",
        measure: "1/2 oz",
      },
      {
        ingredient: "Triple sec",
        measure: "1/2 oz",
      },
      {
        ingredient: "Vodka",
        measure: "1/2 oz",
      },
      {
        ingredient: "Coca-Cola",
        measure: "1/2 oz",
      },
      {
        ingredient: "Sweet and sour",
        measure: "1-2 dash ",
      },
      {
        ingredient: "Bitters",
        measure: "1 wedge ",
      },
      {
        ingredient: "Lemon",
        measure: "Garnish with",
      },
    ],
  },
];

export function addDrinkToFav(drinkObject) {
  favCart.push(drinkObject);
  saveFavToStorage();
}

export function removeDrinkFromFav(drinkId) {
  const newCart = favCart.filter((drink) => drink.id !== drinkId);
  favCart = newCart;
  saveFavToStorage();
}

function saveFavToStorage() {
  localStorage.setItem("fav-cart", JSON.stringify(favCart));
}
