const axios = require('axios');
const coins = [
  {name: 'NEO',   invest: 44.275,   value: 0.999},
  {name: 'CAKE',  invest: 20,       value: 1.998},
  {name: 'ADA',   invest: 33.975,   value: 31.4},
  {name: 'NPXS',  invest: 100,      value: 17425},
  {name: 'LINK',  invest: 30.43,    value: 0.999},
  {name: 'RVN',   invest: 11.089,   value: 49.95},
  {name: 'BNB',   invest: 55,       value: 0.16},
  {name: 'XRP',   invest: 18,       value: 36.963},
  {name: 'LIT',   invest: 30,       value: 2.88},
  {name: 'DOT',   invest: 76,       value: 2},
  {name: 'ALGO',  invest: 104,      value: 68.41},
];

function startRequest () {
  let qs = `?start=1&limit=5000&convert=USD`;
  axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest' + qs, {
      headers: { 'X-CMC_PRO_API_KEY': 'f6aec3fa-5933-45f3-a8f9-f4a888122466' }
  })
  .then(res => {
    let startResult = 0;
    let endResult = 0;
    res.data.data.forEach(item => {
      coins.forEach(coin => {
        if(item.symbol == coin.name && item.name !== 'Lition') {
          console.log('-----------------------------------');
          console.log(coin.name, '(' + item.name + ')');
          
          console.log('Затрачено: ' + coin.invest);

          console.log('Количество: ' + coin.value);

          console.log('Капитализация: ' + item.quote.USD.price * coin.value);

          console.log('Профит: ' + (item.quote.USD.price * coin.value - coin.invest));
          console.log('');

          endResult += item.quote.USD.price * coin.value;
          startResult += coin.invest;
        }
      });
    })
    console.log('');

    console.log('-----------------------------------');
    console.log('Начальные вложения: ' + startResult);
    console.log('Итоговый балланс: ' + endResult);
    console.log('-----------------------------------');
  })
  .catch(err => console.log(err))
}

startRequest ();