export function createFocus(chart) {
  const {
    body: g,
    size,
  } = chart;

  const focus = g.append('line')
    .attr('class', 'focus focus-line focus-line-top')
    .attr('height', size.height)
    .attr('y1', 0)
    .attr('y2', size.height)
    .style('display', 'none')
  ;

  return {
    ...chart,
    focus,
  };
}

export function createBisectDate(chart) {
  const bisectDate = chart.d3.bisector((d) => {
    if (!d || !d.date) {
      return -1;
    }

    return d.date.getTime();
  }).left;

  return {
    ...chart,
    bisectDate,
  };
}
