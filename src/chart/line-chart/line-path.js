export function createLine(chart) {
  const {
    d3,
    scaleX: x,
    scaleY: y,
  } = chart;

  const line = d3.line()
    .x(d => x(d.date))
    .y(d => y(d.value));

  return {
    ...chart,
    line,
  };
}

export const clearLinePath = (rawData, chart) => {
  chart.body.selectAll('.line').remove();
  return rawData;
}

export const setDataToLinePath = (rawData, chart) => {
  const {
    d3,
    body: g,
    line,
  } = chart;

  const categories = rawData.categories;
  const linePaths = categories.map(category => {
    const dataInfo = rawData[category];

    if (!dataInfo) {
      return g.append('path');
    }

    return g.append('path')
      .datum(dataInfo.data)
      .attr('class', `line line-color${ dataInfo.color }`)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
      .attr('stroke-width', 1.5)
      .attr('d', line)
    ;
  });

  chart.linePaths = linePaths;

  return rawData;
}

export function removeLinePath(chart) {
  const {
    body: g,
  } = chart;

  g.select('.line').remove();

  return chart;
}
