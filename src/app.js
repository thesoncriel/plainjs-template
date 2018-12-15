const api = require('./services/api');
import { createLineChart } from './chart/line-chart';
import { createAreaChart } from './chart/area-chart';

function parseSample(rawData) {
  rawData.categories.forEach(key => {
    const dataInfo = rawData[key];

    if (!dataInfo) {
      return;
    }

    const data = dataInfo.data;

    rawData[key].data = data.map(item => {
      return {
        date: new Date(item.date),
        value: item.value,
      };
    });
  });
  
  return rawData;
}

function parseSampleForTime(rawData) {
  rawData.categories.forEach(key => {
    const dataInfo = rawData[key];

    if (!dataInfo) {
      return;
    }

    const data = dataInfo.data;

    rawData[key].data = data.map(item => {
      return {
        date: new Date('2000-01-01 ' + item.time),
        value: item.value,
      };
    });
  });
  
  return rawData;
}

import('d3').then(d3 => {
  main(d3);
});

function setSampleData(chart, num) {
  let res;

  if (num === 1) {
    res = api.getSample().then(parseSample)
  } else if (num === 2) {
    res = api.getSample2().then(parseSample);
  } else if (num === 21) {
    res = api.getSample_2().then(parseSampleForTime);
  }

  res
    .then(rawData => chart.setData(rawData));
}

const main = (d3) => {
  const chart = createLineChart(d3, '#chart_line');
  const chart2 = createAreaChart(d3, '#chart_line2');

  d3.select('#btn_1').on('click', () => setSampleData(chart, 1));
  d3.select('#btn_2').on('click', () => setSampleData(chart, 2));

  setSampleData(chart, 1);
  setSampleData(chart2, 21);
}
