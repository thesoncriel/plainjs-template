const { ApiBaseService } = require('./api.base');
const config = require('./config');
const { normalHeaderFactory } = require('../factory/header.factory');
const sampleData1 = require('./sample-data1.json');
const sampleData2 = require('./sample-data2.json');
const sampleData3 = require('./sample-data3.json');
const sampleData4 = require('./sample-data4.json');
const sampleData_2_1 = require('./sample-data-2-1.json');
const sampleData_2_2 = require('./sample-data-2-2.json');


const apiBase = new ApiBaseService(normalHeaderFactory, config.API_DOMAIN);
/**
 * Backend API를 수행하고 그 결과값을 비동기로 반환하는 서비스.
 */
module.exports = {
  /**
   * 목록을 가져온다.
   */
  getList() {
    // return apiBase.get('/api/list');
    return Promise.resolve(testData);
  },

  getSample() {
    return Promise.resolve({
      // all: {
      //   data: sampleData1,
      //   title: '전체',
      //   color: '0',
      // },
      // careroom1: {
      //   data: sampleData2,
      //   title: '진료실1',
      //   color: '1',
      // },
      careroom2: {
        data: sampleData3,
        title: '진료실2',
        color: '2',
      },
      careroom3: {
        data: sampleData4,
        title: '진료실3',
        color: '3',
      },
      categories: [
        // 'all',
        'careroom1',
        'careroom2',
        'careroom3',
      ],
    });
  },

  getSample2() {
    return Promise.resolve({
      all: {
        data: sampleData1,
        title: '전체 진료실',
        color: '0',
      },
      careroom1: {
        data: sampleData2,
        title: '성남시 분당구 내과 평균 환자수',
        color: '1',
      },
      categories: [
        'all',
        'careroom1',
      ],
    });
  },

  getSample_2() {
    return Promise.resolve({
      all: {
        data: sampleData_2_1,
        title: '우리병원 전체',
        color: '0'
      },
      careroom1: {
        data: sampleData_2_2,
        title: '김똑닥 원장님',
        color: '1'
      },
      categories: [
        'all',
        'careroom1'
      ],
    });
  }
};