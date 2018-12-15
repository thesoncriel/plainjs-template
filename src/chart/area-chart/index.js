import { LINE_CHART_MARGIN as MARGIN } from '../common/const';
import { pipe } from '../common/util';
import { createSvg, createBody } from '../common/svg-body';
import { createFilter } from '../common/filter';
import {
  createScaleX,
  createScaleY,
  createAxisX,
  createAxisY,
  applyTickFormatX,
  setDataToAxis,
} from '../common/axis-scale';
import {
  createGX,
  createGY,
  applyAxisToElemXY,
  setAxisToElemXY,
} from '../common/axis-elem';
import {
  createLine,
  clearLinePath,
  setDataToLinePath,
} from '../line-chart/line-path';
import {
  createFocus,
  createBisectDate
} from '../common/focus';
import {
  createFocusOverlay,
} from '../common/focus-overlay';
import {
  setDataToFocusDotMulti,
} from '../common/focus-dot';
import {
  clearFocusArea,
  applyFocusArea,
  setDataToFocusAreaEvents,
} from './focus-area';
import {
  createTooltip,
} from '../common/tooltip';
import {
  createTickFormatX,
} from '../common/format';

let componentSeq = 0;

export function createAreaChart(d3, selector, options = {}) {
  const seq = componentSeq++;
  const margin = options.margin || MARGIN;
  const tooltipTitleFormatType = options.tooltipTitleFormat || 'h';
  const context = d3.select(selector);
  const svgWidth = options.width || 1000;
  const svgHeight = options.height || 400;
  const svgSize = {
    width: svgWidth,
    height: svgHeight,
  };
  const width = svgWidth - margin.left - margin.right;
  const height = svgHeight - margin.top - margin.bottom;
  const size = {
    width, height
  };

  const createChartBase = pipe(
    createSvg,
    createFilter,
    createBody,
    createScaleX,
    createScaleY,
    createAxisX,
    createAxisY,
    createGX,
    createGY,
    createTickFormatX('hour'),
    applyTickFormatX,
    applyAxisToElemXY,
    createLine,
    createFocus,
    createTooltip(tooltipTitleFormatType),
    createFocusOverlay,
    createBisectDate,
  );

  const chart = createChartBase({
    d3,
    seq,
    margin,
    context,
    size,
    svgSize
  });

  const setData = pipe(
    setDataToAxis,
    setAxisToElemXY,
    clearLinePath,
    setDataToLinePath,
    setDataToFocusDotMulti,
    clearFocusArea,
    applyFocusArea,
    setDataToFocusAreaEvents,
  );

  return {
    setData(rawData) {
      setData(rawData, chart);
    }
  };
}

