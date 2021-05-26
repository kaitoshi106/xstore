"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _actionsType = require("../actions/actions-type");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var cart_reducer = function cart_reducer(state, action) {
  if (action.type === _actionsType.ADD_TO_CART) {
    var _action$payload = action.payload,
        id = _action$payload.id,
        color = _action$payload.color,
        amount = _action$payload.amount,
        product = _action$payload.product;
    var tempItem = state.cart.find(function (item) {
      return item.id === id + color;
    });

    if (tempItem) {
      var tempCart = state.cart.map(function (cartItem) {
        if (cartItem.id === id + color) {
          console.log(cartItem.id);
          var newAmount = cartItem.amount + amount;

          if (newAmount > cartItem.max) {
            newAmount = cartItem.max;
          }

          return _objectSpread({}, cartItem, {
            amount: newAmount
          });
        } else {
          return cartItem;
        }
      });
      return _objectSpread({}, state, {
        cart: tempCart
      });
    } else {
      var newItem = {
        id: id + color,
        name: product.name,
        color: color,
        amount: amount,
        image: product.images[0].url,
        price: product.price,
        max: product.stock
      };
      return _objectSpread({}, state, {
        cart: [].concat(_toConsumableArray(state.cart), [newItem])
      });
    }
  }

  if (action.type === _actionsType.REMOVE_CART_ITEM) {
    var _tempCart = state.cart.filter(function (item) {
      return item.id !== action.payload;
    });

    return _objectSpread({}, state, {
      cart: _tempCart
    });
  }

  if (action.type === _actionsType.CLEAR_CART) {
    return _objectSpread({}, state, {
      cart: []
    });
  }

  if (action.type === _actionsType.TOGGLE_CART_ITEM_AMOUNT) {
    var _action$payload2 = action.payload,
        _id = _action$payload2.id,
        value = _action$payload2.value;

    var _tempCart2 = state.cart.map(function (item) {
      if (item.id === _id) {
        if (value === "inc") {
          var newAmount = item.amount + 1;

          if (newAmount > item.max) {
            newAmount = item.max;
          }

          return _objectSpread({}, item, {
            amount: newAmount
          });
        }

        if (value === "dec") {
          var _newAmount = item.amount - 1;

          if (_newAmount < 1) {
            _newAmount = 1;
          }

          return _objectSpread({}, item, {
            amount: _newAmount
          });
        }
      }

      return item;
    });

    return _objectSpread({}, state, {
      cart: _tempCart2
    });
  }

  if (action.type === _actionsType.COUNT_CART_TOTALS) {
    var _state$cart$reduce = state.cart.reduce(function (total, cartItem) {
      var amount = cartItem.amount,
          price = cartItem.price;
      total.total_items += amount;
      total.total_amount += price * amount;
      return total;
    }, {
      total_items: 0,
      total_amount: 0
    }),
        total_items = _state$cart$reduce.total_items,
        total_amount = _state$cart$reduce.total_amount;

    return _objectSpread({}, state, {
      total_items: total_items,
      total_amount: total_amount
    });
  }

  throw new Error("No Matching ...");
};

var _default = cart_reducer;
exports["default"] = _default;