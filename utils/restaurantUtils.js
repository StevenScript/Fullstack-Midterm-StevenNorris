const { Dishes, Cuisines, Restaurants } = require("./data");

/**
 * Generates a random menu item based on a given cuisine.
 * @param {string} cuisine - The desired cuisine for the menu item.
 * @returns {*} A random menu item with a name, description, price, and special status.
 */
function generateRandomMenuItem(cuisine) {
  const dishes = Dishes[cuisine];
  const randomIndex = Math.floor(Math.random() * dishes.length);
  const dish = dishes[randomIndex];

  return {
    name: dish.name,
    description: dish.description,
    price: (Math.random() * 20 + 5).toFixed(2), // Random price between $5 and $25
    isSpecial: Math.random() < 0.2, // 20% chance of being a daily special
  };
}

/**
 * Selects a random cuisine type for a restaurant.
 * @returns {*} A random cuisine type.
 */
function selectRandomCuisine() {
  const randomIndex = Math.floor(Math.random() * Cuisines.length);
  return Cuisines[randomIndex];
}

/**
 * Generates a menu for a restaurant, including a random cuisine type and a list of menu items.
 * @returns {*} An object representing the restaurant's menu, including the cuisine type and items.
 */
function generateMenu(cuisine) {
  const numberOfItems = Math.floor(Math.random() * 6) + 5; // Between 5 and 10
  const menuItems = [];

  for (let i = 0; i < numberOfItems; i++) {
    menuItems.push(generateRandomMenuItem(cuisine));
  }

  return {
    cuisineType: cuisine,
    items: menuItems,
  };
}

/**
 * Additional utility functions can be defined here if needed.
 */

module.exports = { generateRandomMenuItem, selectRandomCuisine, generateMenu };
