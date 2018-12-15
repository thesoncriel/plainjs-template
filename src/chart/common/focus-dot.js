
export function setDataToFocusDot(rawData, chart) {
  const {
    body,
    filterId,
  } = chart;

  body.selectAll('.dot-selected').remove();

  const dots = rawData.categories.map(category => {
    const dataInfo = rawData[category];

    if (!dataInfo) {
      return body.append('circle');
    }

    const dot = body.append('circle')
      .attr('class', `dot-selected chart-dot-color${ dataInfo.color }`)
      .attr('r', 5)
      // .attr('fill', 'orange')
      .attr('filter', `url(#${ filterId })`)
      .style('display', 'none')
    ;

    return dot;
  });

  chart.dots = dots;

  return rawData;
}

export function applyPositionToDots(rawData, chart) {
  const {
    dots,
    scaleX: x,
    scaleY: y,
  } = chart;

  rawData.categories.forEach((category, index) => {
    const dataInfo = rawData[category];
    const focusIndex = rawData.focusIndex;

    if (!dataInfo) {
      return;
    }

    const item = dataInfo.data[focusIndex];

    dots[index].attr('transform', `translate(${ x(item.date) }, ${ y(item.value) })`)
  });

  return rawData;
}


const createDot = (body, filterId) => (dataInfo) => {
  return body.append('circle')
    .attr('class', `dot-selected chart-dot-color${ dataInfo.color }`)
    .attr('r', 5)
    // .attr('fill', 'orange')
    .attr('filter', `url(#${ filterId })`)
    .style('display', 'none')
  ;
}


export function setDataToFocusDotMulti(rawData, chart) {
  const {
    body,
    filterId,
  } = chart;

  body.selectAll('.dot-selected').remove();

  const fnCreateDot = createDot(body, filterId);

  const dotMulti = rawData.categories.map(category => {
    const dataInfo = rawData[category];

    if (!dataInfo) {
      return [
        body.append('circle'),
        body.append('circle')
      ];
    }

    return [
      fnCreateDot(dataInfo),
      fnCreateDot(dataInfo),
    ];
  });

  chart.dotMulti = dotMulti;

  return rawData;
}


export function applyPositionToDotMulti(rawData, chart) {
  const {
    dotMulti,
    scaleX: x,
    scaleY: y,
  } = chart;

  rawData.categories.forEach((category, index) => {
    const dataInfo = rawData[category];
    const focusIndices = rawData.focusIndices;
    const index0 = focusIndices[0];
    const index1 = focusIndices[1];

    if (!dataInfo) {
      return;
    }

    // console.log('dataInfo', dataInfo);

    const data = dataInfo.data;
    const item0 = data[index0];
    const item1 = data[index1];
    const dots = dotMulti[index];
    const dot0 = dots[0];
    const dot1 = dots[1];

    console.log(index0, index1, item0, item1);

    dot0.attr('transform', `translate(${ x(item0.date) }, ${ y(item0.value) })`);
    dot1.attr('transform', `translate(${ x(item1.date) }, ${ y(item1.value) })`);
  });

  return rawData;
}