import {
  pipe,
  adjustValueMin,
  adjustValueMax,
  getFirstCategoryData,
} from './util';

const AXIS_Y_PADDING = 30;

export function createScaleX(chart) {
  const {
    d3,
    size
  } = chart;

  const scaleX = d3.scaleUtc()
    .rangeRound([AXIS_Y_PADDING, size.width - AXIS_Y_PADDING])
    // .rangeRound([0, width])
  ;
  // scaleX.domain(d3.extent(data, d => d.date));

  return {
    ...chart,
    scaleX,
  };
}

export function createScaleY(chart) {
  const {
    d3,
    size,
  } = chart;

  const scaleY = d3.scaleLinear().rangeRound([size.height, 0]);

  scaleY.domain([0, 200]);

  return {
    ...chart,
    scaleY,
  };
}

export function createAxisX(chart) {
  const {
    d3,
    size,
    scaleX,
  } = chart;

  const axisX = d3.axisBottom(scaleX.nice(1))
    .tickSize(-size.height)
    .tickPadding(12)
  ;

  return {
    ...chart,
    axisX,
  };
}

export function createAxisY(chart) {
  const {
    d3,
    size,
    scaleY,
  } = chart;

  const axisY = d3.axisLeft(scaleY)
    .ticks(5)
    // .outerTickSize(0)
    .tickSize(-size.width)
    .tickPadding(17)
  ;

  return {
    ...chart,
    axisY,
  };
}

export const applyTickFormatX = (chart) => {
  const {
    axisX,
    formatX,
  } = chart;
  const fmtFirst = formatX[0];
  const fmtNormal = formatX[1];

  axisX.tickFormat((date, i) => {
    if (date.getDate() === 1 || i === 0) {
      return fmtFirst(date);
    }

    return fmtNormal(date);
  });

  return chart;
}

const reduceExtents = (d3, rawData, amount = 50) => (prevExtent, category) => {
  const dataInfo = rawData[category];

  if (!dataInfo) {
    return prevExtent;
  }

  const listData = dataInfo.data;
  const extent = d3.extent(listData, d => d.value);

  return prevExtent.concat([
    adjustValueMin(extent[0], amount),
    adjustValueMax(extent[1], amount)
  ]);
};



export const setDataToAxis = (rawData, chart) => {
  const {
    d3,
    scaleX,
    scaleY,
    axisY,
  } = chart;
  const amount = 50;
  const data = getFirstCategoryData(rawData);

  let extentY = rawData.categories.reduce(
    reduceExtents(d3, rawData, amount), []);

  extentY = d3.extent(extentY, d => d);

  let tickCount = Math.floor(extentY[1] / amount) - Math.floor(extentY[0] / amount) + 1;

  if (tickCount < 2) {
    tickCount = 2;
  }

  // console.log(tickCount, extentY);

  axisY.ticks(tickCount);

  // scaleX.domain(d3.extent(data, d => d.date));
  scaleX.domain(d3.extent(data, d => d.date));
  scaleY.domain(extentY);

  return rawData;
}