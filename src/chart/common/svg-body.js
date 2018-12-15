export function createSvg(chart) {
  const {
    context,
    svgSize
  } = chart;
  const svg = context.append('svg')
    .attr('class', 'line-chart')
    .attr("preserveAspectRatio", "none")
    .attr('viewBox', `0 0 ${ svgSize.width } ${ svgSize.height }`)
    // .attr("viewBox", "300 0 100% " + svgHeight)
    .attr('width', '100%')
    .attr('height', svgSize.height)
  ;

  return {
    ...chart,
    svg,
  };
}

export function createBody(chart) {
  const {
    svg,
    margin
  } = chart;
  const g = svg.append('g')
    // .attr('class', 'grid')
    .attr('transform',
      'translate(' + margin.left + ',' + margin.top + ')'
    )
  ;

  return {
    ...chart,
    body: g,
  };
}