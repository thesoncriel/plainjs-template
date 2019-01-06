import { api } from './services/api';

const main = () => {
  const elem = document.getElementById('app');

  api.getList().then(res =>
    res.items.map(item =>
      elem.insertAdjacentHTML('afterend',
        `<div>${item.name} | ${item.age}</div>`)));

  elem.innerHTML = `<div>
    <h1>룰루랄라 -_-)b</h1>
    <img src="static/pome_melting.jpg" alt="포메는 사랑입니다 +_+" width="300">
  </div>`;
};

main();