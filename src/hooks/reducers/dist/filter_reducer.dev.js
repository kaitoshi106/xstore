"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _actionsType = require("../actions/actions-type");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var SORT_PRICE_LOWEST = process.env.SORT_PRICE_LOWEST;
var SORT_PRICE_HIGHEST = process.env.SORT_PRICE_HIGHEST;
var SORT_NAME_A = process.env.SORT_NAME_A;
var SORT_NAME_Z = process.env.SORT_NAME_Z;

var filter_reducer = function filter_reducer(state, action) {
  switch (action.type) {
    case _actionsType.LOAD_PRODUCTS:
      var maxPrice = action.payload.map(function (item) {
        return item.price;
      });
      maxPrice = Math.max.apply(Math, _toConsumableArray(maxPrice));
      return _objectSpread({}, state, {
        all_products: _toConsumableArray(action.payload),
        filter_products: _toConsumableArray(action.payload),
        filters: _objectSpread({}, state.filters, {
          max_price: maxPrice,
          price: maxPrice
        })
      });

    case _actionsType.SET_GRIDVIEW:
      return _objectSpread({}, state, {
        grid_view: true
      });

    case _actionsType.SET_LISTVIEW:
      return _objectSpread({}, state, {
        grid_view: false
      });

    case _actionsType.UPDATE_SORT:
      console.log("update sort");
      return _objectSpread({}, state, {
        sort: action.payload
      });

    case _actionsType.SORT_PRODUCTS:
      var sort = state.sort,
          filtered_products = state.filtered_products;

      var tempProducts = _toConsumableArray(filtered_products);

      switch (sort) {
        case SORT_PRICE_LOWEST:
          tempProducts = tempProducts.sort(function (a, b) {
            if (a.price < b.price) {
              return -1;
            }

            if (a.price > b.price) {
              return 1;
            }

            return 0;
          });
          break;

        case SORT_PRICE_HIGHEST:
          tempProducts = tempProducts.sort(function (a, b) {
            return b.price - a.price;
          });
          break;

        case SORT_NAME_A:
          tempProducts = tempProducts.sort(function (a, b) {
            return a.name.localeCompare(b.name);
          });
          break;

        case SORT_NAME_Z:
          tempProducts = tempProducts.sort(function (a, b) {
            return b.name.localeCompare(a.name);
          });
          break;
          throw new Error("No Matching sort value");
      }

      return _objectSpread({}, state, {
        filtered_products: tempProducts
      });

    case _actionsType.UPDATE_FILTERS:
      var _action$payload = action.payload,
          name = _action$payload.name,
          value = _action$payload.value;
      console.log("name", name);
      return _objectSpread({}, state, {
        filters: _objectSpread({}, state.filters, _defineProperty({}, name, value))
      });

    case _actionsType.FILTER_PRODUCTS:
      var all_products = state.all_products;
      console.log("all_products", all_products);
      var _state$filters = state.filters,
          text = _state$filters.text,
          category = _state$filters.category,
          color = _state$filters.color,
          price = _state$filters.price,
          company = _state$filters.company,
          shipping = _state$filters.shipping;

      var newAllProducts = _toConsumableArray(all_products);

      if (text) {
        newAllProducts = newAllProducts.filter(function (product) {
          console.log("product", product);
          return product.name.toLowerCase().startsWith(text);
        });
      }

      if (category !== "all") {
        console.log("newAllProducts", newAllProducts);
        newAllProducts = newAllProducts.filter(function (product) {
          return product.category === category;
        });
      } // colors


      if (color !== "all") {
        newAllProducts = newAllProducts.filter(function (product) {
          return product.colors.find(function (item) {
            return item === color;
          });
        });
      } // company


      if (company !== "all") {
        console.log("minh", newAllProducts);
        newAllProducts = newAllProducts.filter(function (product) {
          console.log("company", product);
          return product.company === company;
        });
      } // price


      newAllProducts = newAllProducts.filter(function (product) {
        return product.price <= price;
      }); // shipping

      if (shipping) {
        newAllProducts = newAllProducts.filter(function (product) {
          return product.shipping === true;
        });
      }

      return _objectSpread({}, state, {
        filtered_products: newAllProducts
      });

    case _actionsType.CLEAR_FILTERS:
      return _objectSpread({}, state, {
        filters: _objectSpread({}, state.filters, {
          text: "",
          company: "all",
          category: "all",
          color: "all",
          price: state.filters.max_price,
          shipping: false
        })
      });
      throw new Error("No Matching action type");
  }
};

var _default = filter_reducer;
exports["default"] = _default;