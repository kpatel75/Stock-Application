const API_KEY = "GRHDVZO2UHXQQEEL";
const ENDPOINT = "https://www.alphavantage.co/query?";
// const INTERVAL = ["1min", "5min", "15min", "30min", "60min"];
const apFUNCTION = "TIME_SERIES_DAILY";

// https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&apikey=demo

// Convert prices into specified currency
Handlebars.registerHelper('currency', function (value) {
  return Number(value).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  });
});

// To setup date
Handlebars.registerHelper('dateFormatted', function (date) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    date = new Date(date);
    let month = date.getUTCMonth();
    let monthDate = date.getUTCDate();
    let day = date.getUTCDay();
    let year = date.getUTCFullYear();
    return `${days[day]} ${months[month]} ${monthDate}, ${year}`;
});

const displayStockInfo = (data, outputContainer, numOfDays) => {
    // Create an object for the handlebars template
    let stockData = new Object();

    // Destructure the fetched data object
    let {
        'Meta Data': metaData,
        'Time Series (Daily)': daily
    } = data;
    // Get array entries from objects of dates 'Time Series (Daily)'
    let stockAllDays = Object.entries(daily);

    // Checks the number of days indicated to display
    if(numOfDays == 'all') {
        numOfDays = stockAllDays.length;
    } else if (numOfDays == 'current') {
        numOfDays = 1;
    } else {
        numOfDays = Number(numOfDays);
    }

    // Initialize an empty array for customized day objects
    let fiveDays = new Array(numOfDays);
    

    for(let i = 0; i < numOfDays ; i++) {
        // Destructure each day arrays
        let [date, stockInfo] = stockAllDays[i];
        // Destructure each day's stock information
        let {
            '1. open': open,
            '2. high' : high,
            '3. low': low,
            '4. close': close,
            '5. volume': volume
        } = stockInfo;

        volume = Number(volume).toLocaleString();

        // If index is 0
        if(i === 0) {
            // Assigns the 1st element to be the current day in the 'stockData' object
            stockData.currentDay = {date, open, high, low, close, volume};
        } else {
            // Appends an object to the fiveDay array
            fiveDays.push({date, open, high, low, close, volume});
        }
    }
    // Destructure metadata object
    let {
        '1. Information': information,
        '2. Symbol' : symbol,
        '3. Last Refreshed': lastRefreshed
    } = metaData;
    // Add all data to the stockData object for the handlebars template
    stockData.metaData = {information, symbol, lastRefreshed, numOfDays};
    stockData.currentFiveDays = fiveDays;
    // Insert the template to the DOM
    outputContainer.innerHTML = Handlebars.templates['project'](stockData);
}

document.querySelector('.frm.stock').addEventListener('submit', (evt)=>{
    let symbol = (evt.target.querySelector('input[name="symbol"]').value).toUpperCase();
    let numOfDays = evt.target.querySelector('select[name="numOfDays"]').value;
    fetch(`${ENDPOINT}function=${apFUNCTION}&symbol=${symbol}&apikey=${API_KEY}`).then(data => {
        return data.json();
    }).then(json => {
        displayStockInfo(json, document.querySelector('.details'), numOfDays);
    });

    evt.preventDefault();
});
    