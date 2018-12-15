export const FILTER_ID = 'f_svgDotShadow';

export function createFilter(chart) {
  const {
    svg, seq
  } = chart;

  const id = FILTER_ID + seq;
  const filter = svg.append('defs')
    .append('filter');

  filter.attr('id', id)
    .attr('x', '-60%')
    .attr('y', '-60%')
    .attr('width', '250%')
    .attr('height', '250%')
  ;

  filter.append('feOffset')
    .attr('in', 'SourceGraphic')
    .attr('dx', 0)
    .attr('dy', 0)
    .attr('result', 'offsetOut')
  ;

  
  filter.append('feGaussianBlur')
    .attr('in', 'offsetOut')
    .attr('stdDeviation', 3.5)
    .attr('result', 'blurOut')
  ;
  
  filter.append('feBlend')
    .attr('in', 'SourceGraphic')
    .attr('in2', 'blurOut')
    .attr('mode', 'normal')
    .attr('result', 'blend')
  ;

  const feMerge = filter.append('feMerge');

  feMerge.append('feMergeNode')
    .attr('in', 'blend');

  return {
    ...chart,
    filter,
    filterId: id,
  };
}