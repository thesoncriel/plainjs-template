export function createFocusOverlay(chart) {
  const {
    svg,
    margin,
    size,
  } = chart;

  const focusOverlay = svg.append('rect')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)
    .attr('class', 'overlay')
    .attr('width', size.width)
    .attr('height', size.height)
    // .on('mouseover', () => showTooltip(true))
    // .on('mouseout', () => showTooltip(false))
    // .on('mousemove', mousemove)
  ;

  return {
    ...chart,
    focusOverlay,
  };
}

export const applyFocusEvents = (fnShowTooltip) => (chart) => {
  const showTooltip = fnShowTooltip(chart);

  chart.focusOverlay
    .on('mouseover', () => showTooltip(true))
    .on('mouseout', () => showTooltip(false))
  ;

  return chart;
}

// function createFocusOverlay_(
//   svg, size,
//   mouseOverCallback,
//   mouseOutCallback,
//   mouseMoveCallback
// ) {
//   const {
//     width, height, margin,
//   } = size;
//   return svg.append('rect')
//     .attr('transform', `translate(${margin.left}, ${margin.top})`)
//     .attr('class', 'overlay')
//     .attr('width', width)
//     .attr('height', height)
//     .on('mouseover', mouseOverCallback)
//     .on('mouseout', mouseOutCallback)
//     .on('mousemove', mouseMoveCallback)
//   ;
// }

// createFocusOverlay(
//   svg, size,
//   fnMouseCallback(true),
//   fnMouseCallback(false),

// );