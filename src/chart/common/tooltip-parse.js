export function parseLineChartDataForTooltip(
  rawData, chart
) {
  const {
    tooltipTitleFormat
  } = chart;
  const {
    focusIndex
  } = rawData;

  let title = '';
  const items = [];

  rawData.categories.forEach(category => {
    const dataInfo = rawData[category];

    if (!dataInfo) {
      return;
    }

    const item = dataInfo.data[focusIndex];

    if (!title) {
      title = tooltipTitleFormat(item.date);
    }

    items.push({
      text: dataInfo.title,
      value: item.value + '명',
      color: dataInfo.color,
    });
  });

  return {
    ...rawData,
    tooltipData: {
      title,
      items,
    }
  };
}


export function parseAreaChartDataForTooltip(
  rawData, chart
) {
  const {
    tooltipTitleFormat
  } = chart;
  const {
    focusIndices
  } = rawData;

  let title = '';
  const items = [];

  rawData.categories.forEach(category => {
    const dataInfo = rawData[category];

    if (!dataInfo) {
      return;
    }
    const index0 = focusIndices[0];
    const index1 = focusIndices[1];

    const item0 = dataInfo.data[index0];
    const item1 = dataInfo.data[index1];

    if (!title) {
      title =
        tooltipTitleFormat(item0.date) +
        ' ~ ' +
        tooltipTitleFormat(item1.date)
        ;
    }

    items.push({
      text: dataInfo.title,
      value: (item1.value - item0.value) + '명',
      color: dataInfo.color,
    });
  });

  return {
    ...rawData,
    tooltipData: {
      title,
      items,
    }
  };
}