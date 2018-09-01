require('./polyfills');
const { api } = require('./services/api');

const main = () => {
  api.getList().then(list => list.map(item => console.log(item)));

  const elem = document.getElementById('app');

  elem.innerHTML = `<div>
    <h1>룰루랄라 ^^)/!!</h1>
    <img src="static/pome_melting.jpg" alt="">
  </div>`;

  const mData = {
    name: 'theson',
    age: 24,
  };

  const mClone = Object.assign({}, mData);

  console.log(mClone === mData);
}

main();