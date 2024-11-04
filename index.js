const { Restaurants, Cuisines } = require("./utils/data");
const express = require("express");
const path = require("path");
const {
  generateRandomMenuItem,
  generateMenu,
  selectRandomCuisine,
} = require("./utils/restaurantUtils");

const app = express();
const restaurantData = {};

// Generate menus for each restaurant
Restaurants.forEach((restaurant) => {
  const cuisine = selectRandomCuisine();
  const menu = generateMenu(cuisine);
  restaurantData[restaurant.id] = {
    name: restaurant.name,
    cuisineType: cuisine,
    menu: menu.items,
  };
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));

/**
 * GET /
 * Renders the homepage that lists cities and restaurant names.
 */
app.get("/", (request, response) => {
  const restaurantIds = Object.keys(restaurantData);
  const randomRestaurantId =
    restaurantIds[Math.floor(Math.random() * restaurantIds.length)];
  const restaurant = restaurantData[randomRestaurantId];
  const randomItem =
    restaurant.menu[Math.floor(Math.random() * restaurant.menu.length)];

  response.render("index", {
    restaurants: Restaurants,
    randomMenuItem: {
      restaurantName: restaurant.name,
      item: randomItem,
    },
  });
});

/**
 * GET /restaurant/:name
 * Displays a specific restaurant's random menu.
 * The cuisine is randomly selected and a menu is generated based on it.
 */
app.get("/restaurant", (request, response) => {
  const restaurantId = request.query.restaurantId;
  const restaurant = restaurantData[restaurantId];
  console.log(`restaurantId: ${restaurantId}`);
  if (restaurant) {
    response.render("restaurant", {
      restaurantName: restaurant.name,
      cuisineType: restaurant.cuisineType,
      menuItems: restaurant.menu,
    });
  } else {
    response.status(404).send("Restaurant not found");
  }
});

// Checks if there are any daily specials.
app.get("/menu-alerts", (request, response) => {
  const alerts = Restaurants.map((restaurant) => {
    const data = restaurantData[restaurant.id];
    const specials = data.menu.filter((item) => item.isSpecial);
    return {
      name: data.name,
      specials: specials.length > 0 ? specials : null,
    };
  });

  response.render("menu-alerts", { alerts });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
