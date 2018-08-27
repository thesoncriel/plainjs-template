module.exports = {
  getList() {
    return Promise.resolve([
      {
        id: 1234,
        name: 'sonic',
        age: 24,
      },
      {
        id: 3344,
        name: 'tails',
        age: 22,
      }
    ]);
  }
};