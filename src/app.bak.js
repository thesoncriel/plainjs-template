const api = require('./services/api');

function parseSample(data) {
  return data.map(item => {
    return {
      date: new Date(item.date),
      value: item.value,
    };
  })
}

Promise.all([
  import('d3'),
  api.getSample().then(parseSample)
  // api.getList().then(parseData)
])
  .then(res => {
    main(res[0], res[1]);
  });

// import('d3').then(d3 => {
//   main(d3);
// });

const main = (d3, data) => {
  drawLineChart(d3, data);
  // d3.selectAll('#chart_line').style('color', '#f80');
}

function drawLineChart(d3, data) {
  const svgWidth = 1000;
  const svgHeight = 400;
  const margin = {
    top: 20,
    right: 20,
    bottom: 42,
    left: 50,
  };
  const width = svgWidth - margin.left - margin.right;
  const height = svgHeight - margin.top - margin.bottom;

  const component = d3.select('#chart_line');

  component.style('position', 'relative');

  const svg = component.append('svg')
    .attr('class', 'line-chart')
    .attr("preserveAspectRatio", "none")
    .attr('viewBox', `0 0 ${ svgWidth } ${ svgHeight }`)
    // .attr("viewBox", "300 0 100% " + svgHeight)
    .attr('width', '100%')
    .attr('height', svgHeight)
  ;

  const filter = svg.append('defs')
    .append('filter');

  filter.attr('id', 'f_svgDotShadow')
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
  // filter.append('feOffset')
  //   .attr('result', 'offOutBlur')
  //   .attr('in', 'blurOut')
  //   .attr('dx', -3)
  //   .attr('dy', -3)
  // ;
  // filter.append('feBlend')
  //   .attr('in', 'SourceGraphic')
  //   .attr('in2', 'blurOut')
  //   .attr('mode', 'normal')
  // ;
  const feMerge = filter.append('feMerge');

  // feMerge.append('feMergeNode')
  //   .attr('in', 'offOutBlur');
  feMerge.append('feMergeNode')
    .attr('in', 'blend');

  // filter.append('feGaussianBlur')
  //   .attr('result', 'blurOut')
  //   .attr('in', 'SourceAlpha')
  //   .attr('stdDeviation', 5)
  // ;
  // filter.append('feOffset')
  //   .attr('result', 'offsetblur')
  //   // .attr('in', 'SourceGraphic')
  //   .attr('dx', 0)
  //   .attr('dy', 0)
  // ;
  // filter.append('feComponentTransfer')
  //   .append('feFuncA')
  //   .attr('type', 'linear')
  //   .attr('slope', '0.2')
  // ;
  // const feMerge = filter.append('feMerge');

  // feMerge.append('feMergeNode')
  //   // .attr('in', 'offOut')
  // ;
  // feMerge.append('feMergeNode')
  //   .attr('in', 'SourceGraphic');

  const g = svg.append('g')
    // .attr('class', 'grid')
    .attr('transform',
      'translate(' + margin.left + ',' + margin.top + ')'
    )
  ;

  const axisYPadding = 30;

  const x = d3.scaleUtc()
    .rangeRound([axisYPadding, width - axisYPadding])
    // .rangeRound([0, width])
  ;
  const y = d3.scaleLinear().rangeRound([height, 0]);
  const line = d3.line()
    .x(d => x(d.date))
    .y(d => y(d.value));

  const xExtent = d3.extent(data, d => d.date);
  // const xRange = xExtent[1] - xExtent[0];
  
  // console.log(xExtent);

  x.domain(xExtent);
  y.domain([0, 200]);
  // y.domain(d3.extent(data, d => d.value));

  const fmtMonthDay = d3.timeFormat('%-m월 %-d일');
  const fmtDay = d3.timeFormat('%-d일');

  g.append('g')
    .attr('transform', `translate(0,${ height })`)
    .attr('class', 'domain-x')
    .call(
      d3.axisBottom(x.nice(1))
        // .tickFormat(d3.timeFormat('%-m월 %-d일'))
        .tickFormat((date, i) => {
          if (date.getDate() === 1 || i === 0) {
            return fmtMonthDay(date);
          }

          return fmtDay(date);
        })
        // .tickSize()
        // .orient('left')
        // .ticks(5)
        // .tickValues((d) => {
        //   return d;
        // })
        // .ticks(d3.timeDay.every(2))
        .tickSize(-height)
        .tickPadding(12)
        // .scale(0)
        // .tickSize(-svgWidth)
    )
    ;
    // .select('.domain')
    // .remove();

  g.append('g')
    .attr('class', 'grid')
    // .attr('width', '100%')
    // .attr("transform", `translate(${ width },0)`)
    .call(
      d3.axisLeft(y)
        .ticks(5)
        // .outerTickSize(0)
        .tickSize(-width)
        .tickPadding(17)
    )
    // .append('text')
    // .attr('fill', '#74797f')
    // .attr('transform', `rotate(-90)`)
    // .attr('y', 6)
    // .attr('dy', '0.71em')
    // .attr('text-anchor', 'end')
    // .text('Price ($)')
  ;

  g.append('path')
    .datum(data)
    .attr('class', 'line')
    .attr('fill', 'none')
    .attr('stroke', 'steelblue')
    .attr('stroke-linejoin', 'round')
    .attr('stroke-linecap', 'round')
    .attr('stroke-width', 1.5)
    .attr('d', line)
  ;

  

  const focus = g.append('g')
    .attr('class', 'focus')
    .style('display', 'none')
  ;

  focus.append('line')
    .attr('class', 'focus-line focus-line-top')
    .attr('height', height)
    .attr('y1', 0)
    .attr('y2', height)
  ;
  // focus.append('line')
  //   .attr('class', 'focus-line focus-line-bottom')
  //   .attr('y1', width)
  //   .attr('x2', width)
  // ;


  focus.append('circle')
    .attr('class', 'dot-selected')
    .attr('r', 5)
    // .attr('fill', 'orange')
    .attr('filter', 'url(#f_svgDotShadow)')
  ;
  svg.append('rect')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)
    .attr('class', 'overlay')
    .attr('width', width)
    .attr('height', height)
    .on('mouseover', () => showTooltip(true))
    .on('mouseout', () => showTooltip(false))
    .on('mousemove', mousemove)
  ;

  function showTooltip(isShow) {
    const value = isShow ? null : 'none';

    focus.style('display', value);
    // tooltip.style('display', value);
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

  // 툴팁 생성
  const tooltip = component.append('div')
    .attr('class', 'line-chart-tooltip')
    // .style('display', 'none')
    .style('opacity', 0)
    .style('position', 'absolute')
  ;
  const formatDate = d3.timeFormat('%Y년 %-m월 %-d일');

  const bisectDate = d3.bisector((d) => {
    if (!d || !d.date) {
      return -1;
    }

    return d.date.getTime();
  }).left;

  // function transparentTooltip(show) {
  //   tooltip.transition()
  //     .duration(200)
  //     .style('opacity', show ? 1 : 0.5)
  //   ;
  // }

  function fixupTooltipPosX() {
    const mRect = tooltip.node().getBoundingClientRect();
    let posX = d3.event.pageX + 10;
    const hasRightEdge = ((mRect.width + posX - 10) > width);

    posX = hasRightEdge
      ? d3.event.pageX - mRect.width - 20
      : posX;

    return posX;
  }

  function mousemove() {
    const x0 = x.invert(d3.mouse(this)[0]);
    const i = bisectDate(data, x0, 1);

    const item1 = data[i - 1];
    const item2 = data[i];

    if (!item1 && !item2) {
      return;
    }

    // console.log('x0', x0 instanceof Date);
    let item = item1;

    if (item2) {
      const time0 = x0.getTime();
      const time1 = item1.date.getTime();
      const time2 = item2.date.getTime();

      item = (time0 - time1) > (time2 - time0) ? item2 : item1;
    }

    // const d0 = data[i - 1];
    
    // const d1 = data[i];
    // console.log('i', i, item);
    // const d = x0.getTime() - d0.getTime() > d1.getTime() - x0.getTime() ? d1.getTime() : d0.getTime();
    focus.attr('transform', `translate(${ x(item.date) }, ${ y(item.value) })`);
    // focus.attr("transform", "translate(" + x(item.date) + "," + y(item.value) + ")");
    // focus.attr('transform', `translate(${ x(item.date) }, 0)`);
    focus.select("text").text(function() { return item.value; });
    // focus.select(".focus-line").attr("y1", 200 - y(item.value));
    // focus.select('.focus-line').attr('y')
    // focus.select('.focus-line').attr('y2', -1 * y(item.value));
    // focus.select('.focus-line').attr('y2', height);
    focus.select('.focus-line').attr('transform', `translate(0, ${ -1 * y(item.value) })`);
    // focus.select(".focus-line").attr("y2", -1 * y(item.value) + margin.bottom);
    // focus.select(".y-hover-line").attr("x2", width + width);

    // const mRect = tooltip.node().getBoundingClientRect();
    // let posX = d3.event.pageX + 10;
    // const hasRightEdge = ((mRect.width + posX - 10) > width);

    // posX = hasRightEdge
    //   ? d3.event.pageX - mRect.width - 20
    //   : posX;

    tooltip.html(`
        <h6>${ formatDate(item.date) }</h6>
        <table>
          <tr>
            <th>우리병원</th>
            <td>${ item.value }건</td>
          </tr>
        </table>
      `)
      .style('left', fixupTooltipPosX() + 'px')
      .style('top', (d3.event.pageY - 10) + 'px')
      // .on('mouseover', () => tooltip.style('display', 'none'))
      .on('mouseover', () => tooltip.style('left', fixupTooltipPosX() + 'px'))
      // .on('mouseout', () => transparentTooltip(true))
    ;
  }
}