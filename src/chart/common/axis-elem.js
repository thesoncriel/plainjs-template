export function createGX(chart) {
  const {
    body: g,
    size
  } = chart;
  const className = 'domain-x';

  const gx = g.append('g')
    .attr('transform', `translate(0,${ size.height })`)
    .attr('class', className)
  ;

  return {
    ...chart,
    gx,
  };
}

export function createGY(chart) {
  const {
    body: g,
  } = chart;

  const gy = g.append('g')
    .attr('class', 'grid')
    // .call(y)
  ;

  return {
    ...chart,
    gy,
  };
}

function applyAxisToElemX(chart) {
  chart.gx.call(chart.axisX);

  return chart;
}

function applyAxisToElemY(chart) {
  chart.gy.call(chart.axisY);

  return chart;
}

export function applyAxisToElemXY(chart) {
  applyAxisToElemX(chart);
  applyAxisToElemY(chart);

  return chart;
}

export function setAxisToElemXY(rawData, chart) {
  applyAxisToElemX(chart);
  applyAxisToElemY(chart);

  return rawData;
}