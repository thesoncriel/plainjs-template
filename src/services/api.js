const { ApiBaseService } = require('./api.base');
const config = require('./config');
const { normalHeaderFactory } = require('../factory/header.factory');

const apiBase = new ApiBaseService(normalHeaderFactory, config.API_DOMAIN);
/**
 * Backend API를 수행하고 그 결과값을 비동기로 반환하는 서비스.
 */
module.exports = {
  /**
   * 목록을 가져온다.
   */
  getList() {
    return apiBase.get('/api/list');
  }
};