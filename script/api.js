const baseURL = "https://www.thecocktaildb.com/api/json/v1/1/";

export async function getRandomDrink() {
  const response = await fetch(baseURL + "random.php");
  const drinksObject = await response.json();
  const drinksArray = drinksObject.drinks[0];

  return drinksArray;
}

export async function getDrink(drinkId) {
  const response = await fetch(baseURL + `lookup.php?i=${drinkId}`);
  const drinkObject = await response.json();
  const drinksArray = drinkObject.drinks[0];

  return drinksArray;
}

export async function getFilter(type) {
  const response = await fetch(baseURL + `list.php?${type}=list`);
  const typeObject = await response.json();
  const typeArray = typeObject.drinks;
  return typeArray;
}

export async function searchByName(cocktailName) {
  const response = await fetch(baseURL + `search.php?s=${cocktailName}`);
  const resultsObject = await response.json();
  const resultArray = resultsObject.drinks;

  return resultArray;
}
