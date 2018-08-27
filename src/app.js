const api = require('./services/api');

const main = () => {
  api.getList().then(list => list.map(item => console.log(item)));
}

main();