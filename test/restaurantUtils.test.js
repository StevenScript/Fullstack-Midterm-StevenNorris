// test/restaurantUtils.test.js

const { expect } = require("chai");
const { Cuisines, Dishes } = require("../utils/data");
const {
  generateRandomMenuItem,
  generateMenu,
  selectRandomCuisine,
} = require("../utils/restaurantUtils");

describe("Restaurant Functions", () => {
  describe("generateRandomMenuItem", () => {
    it("should generate a menu item with valid properties", () => {
      const cuisine = "italian";
      const menuItem = generateRandomMenuItem(cuisine);

      expect(menuItem).to.be.an("object");
      expect(menuItem).to.have.property("name").that.is.a("string");
      expect(menuItem).to.have.property("description").that.is.a("string");
      expect(menuItem)
        .to.have.property("price")
        .that.matches(/^\d+\.\d{2}$/);
      expect(menuItem).to.have.property("isSpecial").that.is.a("boolean");
    });

    it("should generate a menu item from the specified cuisine", () => {
      const cuisine = "mexican";
      const menuItem = generateRandomMenuItem(cuisine);
      const dishNames = Dishes[cuisine].map((dish) => dish.name);

      expect(dishNames).to.include(menuItem.name);
    });

    it("should generate a price within the expected range", () => {
      const cuisine = "chinese";
      const menuItem = generateRandomMenuItem(cuisine);
      const price = parseFloat(menuItem.price);

      expect(price).to.be.at.least(5);
      expect(price).to.be.at.most(25);
    });
  });

  describe("generateMenu", () => {
    it("should generate a menu with 5 to 10 items", () => {
      const cuisine = "vegan";
      const menu = generateMenu(cuisine);

      expect(menu).to.be.an("object");
      expect(menu).to.have.property("cuisineType").that.equals(cuisine);
      expect(menu).to.have.property("items").that.is.an("array");
      expect(menu.items.length).to.be.within(5, 10);
    });

    it("should generate a menu where all items are from the same cuisine", () => {
      const cuisine = "indian";
      const menu = generateMenu(cuisine);
      const dishNames = Dishes[cuisine].map((dish) => dish.name);

      menu.items.forEach((item) => {
        expect(dishNames).to.include(item.name);
      });
    });

    it("should include correct properties in menu items", () => {
      const cuisine = "mexican";
      const menu = generateMenu(cuisine);

      menu.items.forEach((item) => {
        expect(item).to.have.property("name").that.is.a("string");
        expect(item).to.have.property("description").that.is.a("string");
        expect(item)
          .to.have.property("price")
          .that.matches(/^\d+\.\d{2}$/);
        expect(item).to.have.property("isSpecial").that.is.a("boolean");
      });
    });
  });

  describe("selectRandomCuisine", () => {
    it("should select a valid cuisine type", () => {
      const cuisine = selectRandomCuisine();

      expect(Cuisines).to.include(cuisine);
    });

    it("should return a string value", () => {
      const cuisine = selectRandomCuisine();

      expect(cuisine).to.be.a("string");
    });

    it("should randomly select different cuisines over multiple calls", () => {
      const cuisinesSelected = new Set();

      for (let i = 0; i < 10; i++) {
        cuisinesSelected.add(selectRandomCuisine());
      }

      expect(cuisinesSelected.size).to.be.greaterThan(1);
    });
  });
});
