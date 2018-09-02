/**
 * Backend API를 수행하고 그 결과값을 비동기로 반환하는 서비스.
 */
export const api = {
  /**
   * 목록을 가져온다.
   */
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