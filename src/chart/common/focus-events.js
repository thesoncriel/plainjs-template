import {
  pipe,
  getFirstCategoryData
} from './util';
import {
  applyPositionToDots,
} from './focus-dot';
import {
  showTooltip,
  applyPositionToTooltip,
  setItemsToTooltip,
} from './tooltip';
import {
  parseLineChartDataForTooltip
} from './tooltip-parse';

export const findPosXDataByMouse = (chart) => {
  const {
    d3,
    scaleX: x,
    focusOverlay,
  } = chart;

  return x.invert(d3.mouse(focusOverlay.node())[0]);
}

const compareCategoryItems = (time0, item1, item2) => {
  if (!item1 && !item2) {
    return;
  }

  let item = item1;

  if (item2) {
    const time1 = item1.date.getTime();
    const time2 = item2.date.getTime();

    item = (time0 - time1) > (time2 - time0) ? item2 : item1;
  }

  return item;
}

const findIndexByMouse = (rawData, chart) => {
  const data = getFirstCategoryData(rawData);

  if (!data || data.length === 0) {
    return 0;
  }

  const date0 = findPosXDataByMouse(chart);
  const i = chart.bisectDate(data, date0, 1);

  const time0 = date0.getTime();
  const item1 = data[i - 1];
  const item2 = data[i];

  const resultItem = compareCategoryItems(time0, item1, item2);
  const focusIndex = (resultItem === item1) ? i - 1 : i;
  const focusLinePosX = chart.scaleX(resultItem.date);

  return {
    ...rawData,
    focusIndex,
    focusLinePosX,
  };
}

function setFocusLinePosition(rawData, chart) {
  chart.focus.attr('transform', `translate(${ rawData.focusLinePosX }, 0)`);

  return rawData;
}

const setTooltipDataPipe = pipe(
  findIndexByMouse,
  setFocusLinePosition,
  applyPositionToDots,
  parseLineChartDataForTooltip,
  setItemsToTooltip,
  applyPositionToTooltip,
);

export function setDataToFocusEvents(rawData, chart) {
  const {
    focusOverlay,
  } = chart;

  const titleCache = {
    title: '',
  };

  focusOverlay
  .on('mouseover', () => showFocus(chart, true))
  .on('mouseout', () => showFocus(chart, false))
  .on('mousemove', () => setTooltipDataPipe(rawData, chart, titleCache));

  return rawData;
}

export function showFocus(chart, isShow) {
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
