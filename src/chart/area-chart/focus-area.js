import {
  pipe,
  getFirstCategoryData
} from '../common/util';
import {
  setDataToFocusDotMulti,
  applyPositionToDotMulti,
} from '../common/focus-dot';
import {
  findPosXDataByMouse,
} from '../common/focus-events';
import {
  showTooltip,
  applyPositionToTooltip,
  setItemsToTooltip,
} from '../common/tooltip';
import {
  parseAreaChartDataForTooltip
} from '../common/tooltip-parse';

const findIndexByMouse = (rawData, chart) => {
  const data = getFirstCategoryData(rawData);

  if (!data || data.length === 0) {
    return 0;
  }

  const date0 = findPosXDataByMouse(chart);
  const i = chart.bisectDate(data, date0, 1);

  // if ((i + 1) >= data.length) {
  //   i = i - 1;
  // }

  // const time0 = date0.getTime();
  const item1 = data[i - 1];
  const item2 = data[i];

  const focusIndices = [i - 1, i];
  const focusLinePosXs = [
    chart.scaleX(item1.date),
    chart.scaleX(item2.date)
  ];

  // const resultItem = compareCategoryItems(time0, item1, item2);
  // const focusIndex = (resultItem === item1) ? i - 1 : i;
  // const focusLinePosX = chart.scaleX(resultItem.date);

  return {
    ...rawData,
    focusIndices,
    focusLinePosXs,
  };
}

export function clearFocusArea(rawData, chart) {
  if (chart.focusArea) {
    chart.focusArea.forEach(area => {
      area.remove();
    });
  }

  return rawData;
}

export function applyFocusArea(rawData, chart) {
  const {
    body: g,
    size,
  } = chart;

  const focusArea = rawData.categories.map(category => {
    return g.append('polygon')
      .attr('class', 'focus-area')
    ;
  });

  chart.focusArea = focusArea;

  return rawData;
}

function setFocusAreaPosition(rawData, chart) {
  return rawData;
}

const setTooltipDataPipe = pipe(
  findIndexByMouse,
  clearFocusArea,
  applyFocusArea,
  setFocusAreaPosition,
  setDataToFocusDotMulti,
  applyPositionToDotMulti,
  parseAreaChartDataForTooltip,
  setItemsToTooltip,
  applyPositionToTooltip,
);

export function setDataToFocusAreaEvents(rawData, chart) {
  const {
    focusOverlay,
  } = chart;

  const titleCache = {
    title: '',
  };

  focusOverlay
  .on('mouseover', () => showFocusArea(chart, true))
  .on('mouseout', () => showFocusArea(chart, false))
  .on('mousemove', () => setTooltipDataPipe(rawData, chart, titleCache));

  return rawData;
}


export function showFocusArea(chart, isShow) {
  let displayValue = isShow ? null : 'none';
  if (chart.dots) {
    chart.dots.forEach(dot => {
      dot.style('display', displayValue);
    });
  }

  if (chart.focus) {
    chart.focus.style('display', displayValue);
  }

  if (chart.tooltip) {
    showTooltip(chart, isShow);
  }
  
  return chart;
}