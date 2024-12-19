export let favCart = JSON.parse(localStorage.getItem("fav-cart")) || [];

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
