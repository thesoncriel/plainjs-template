import { getFormatByType } from './format';

export const createTooltip = (formatType) => (chart) => {
  const {
    d3,
    size,
    context,
  } = chart;

  const tooltip = context.append('div')
    .attr('class', 'line-chart-tooltip')
    .style('opacity', 0)
    .style('position', 'absolute')
    .on('mouseover',
      () => tooltip.style('left', fixupTooltipPosX(d3, tooltip, size) + 'px')
    )
  ;

  const tooltipTitleFormat = getFormatByType(d3, formatType);

  return {
    ...chart,
    tooltip,
    tooltipTitleFormat,
  };
}

export const showTooltip = (chart, isShow) => {
  const {
    focus,
    tooltip,
  } = chart;
  const value = isShow ? null : 'none';

  focus.style('display', value);
  tooltip
  .style('display', null)
    .transition()
    .duration(200)
    .style('opacity', isShow ? 1 : 0)
    .on('end', () => {
      tooltip.style('display', value);
    })
  ;
}

function fixupTooltipPosX(d3, tooltip, size) {
  const width = size.width;
  const mRect = tooltip.node().getBoundingClientRect();
  let posX = d3.event.pageX + 10;
  const hasRightEdge = ((mRect.width + posX - 10) > width);

  posX = hasRightEdge
    ? d3.event.pageX - mRect.width - 20
    : posX;

  return posX;
}


function getListTags(item) {
  return `
    <tr>
      <th>
        <i class="chart-tooltip-circle chart-bg-color${ item.color }"></i>
        <span>${ item.text }</span>
      </th>
      <td class="chart-text-color${ item.color }">${ item.value }</td>
    </tr>`;
}

/**
 * 툴팁에 자료를 적용 한다.
 * 자료 구조 =
  ```
  {
    title: string;
    items: { text: string; value: number; }[]
  }
  ```
 * @param {*} chart 
 * @param {*} data
 */
export const setItemsToTooltip = (rawData, chart, titleCache) => {
  const {
    tooltip,
  } = chart;
  const {
    tooltipData,
  } = rawData;

  try {
    // 제목이 같다는 건, x축이 같다고 가정하기에 내용을 다시 갱신하지 않는다.
    if (titleCache.title === tooltipData.title) {
      return rawData;
    }
  } catch (error) {}

  const {
    title,
    items,
  } = tooltipData;

  if (!items || items.length === 0) {
    return rawData;
  }

  titleCache.title = title;

  tooltip.html(`
      <h6>${ title }</h6>
      <table>${ items.map(getListTags).join('') }</table>
    `)
  ;

  return rawData;
};

export const applyPositionToTooltip = (data, chart) => {
  const {
    d3,
    tooltip,
    size,
  } = chart;

  const posX = fixupTooltipPosX(d3, tooltip, size);
  const posY = (d3.event.pageY - 10);

  tooltip
    .style('left', posX + 'px')
    .style('top', posY + 'px')
  ;

  return data;
};
