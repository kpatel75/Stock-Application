"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var API_KEY = "GRHDVZO2UHXQQEEL";
var ENDPOINT = "https://www.alphavantage.co/query?"; // const INTERVAL = ["1min", "5min", "15min", "30min", "60min"];

var apFUNCTION = "TIME_SERIES_DAILY"; // https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&apikey=demo
// Convert prices into specified currency

Handlebars.registerHelper('currency', function (value) {
  return Number(value).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  });
}); // To setup date

Handlebars.registerHelper('dateFormatted', function (date) {
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  date = new Date(date);
  var month = date.getUTCMonth();
  var monthDate = date.getUTCDate();
  var day = date.getUTCDay();
  var year = date.getUTCFullYear();
  return "".concat(days[day], " ").concat(months[month], " ").concat(monthDate, ", ").concat(year);
});

var displayStockInfo = function displayStockInfo(data, outputContainer, numOfDays) {
  // Create an object for the handlebars template
  var stockData = new Object(); // Destructure the fetched data object

  var metaData = data['Meta Data'],
      daily = data['Time Series (Daily)']; // Get array entries from objects of dates 'Time Series (Daily)'

  var stockAllDays = Object.entries(daily); // Checks the number of days indicated to display

  if (numOfDays == 'all') {
    numOfDays = stockAllDays.length;
  } else if (numOfDays == 'current') {
    numOfDays = 1;
  } else {
    numOfDays = Number(numOfDays);
  } // Initialize an empty array for customized day objects


  var fiveDays = new Array(numOfDays);

  for (var i = 0; i < numOfDays; i++) {
    // Destructure each day arrays
    var _stockAllDays$i = _slicedToArray(stockAllDays[i], 2),
        date = _stockAllDays$i[0],
        stockInfo = _stockAllDays$i[1]; // Destructure each day's stock information


    var open = stockInfo['1. open'],
        high = stockInfo['2. high'],
        low = stockInfo['3. low'],
        close = stockInfo['4. close'],
        volume = stockInfo['5. volume'];
    volume = Number(volume).toLocaleString(); // If index is 0

    if (i === 0) {
      // Assigns the 1st element to be the current day in the 'stockData' object
      stockData.currentDay = {
        date: date,
        open: open,
        high: high,
        low: low,
        close: close,
        volume: volume
      };
    } else {
      // Appends an object to the fiveDay array
      fiveDays.push({
        date: date,
        open: open,
        high: high,
        low: low,
        close: close,
        volume: volume
      });
    }
  } // Destructure metadata object


  var information = metaData['1. Information'],
      symbol = metaData['2. Symbol'],
      lastRefreshed = metaData['3. Last Refreshed']; // Add all data to the stockData object for the handlebars template

  stockData.metaData = {
    information: information,
    symbol: symbol,
    lastRefreshed: lastRefreshed,
    numOfDays: numOfDays
  };
  stockData.currentFiveDays = fiveDays; // Insert the template to the DOM

  outputContainer.innerHTML = Handlebars.templates['project'](stockData);
};

document.querySelector('.frm.stock').addEventListener('submit', function (evt) {
  var symbol = evt.target.querySelector('input[name="symbol"]').value.toUpperCase();
  var numOfDays = evt.target.querySelector('select[name="numOfDays"]').value;
  fetch("".concat(ENDPOINT, "function=").concat(apFUNCTION, "&symbol=").concat(symbol, "&apikey=").concat(API_KEY)).then(function (data) {
    return data.json();
  }).then(function (json) {
    displayStockInfo(json, document.querySelector('.details'), numOfDays);
  });
  evt.preventDefault();
});
