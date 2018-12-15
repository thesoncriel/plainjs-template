export function getFormatByType(d3, type) {
  let fmt = '';

  switch (type) {
    case 'ymd':
      fmt = '%Y년 %-m월 %-d일';
      break;

    case 'ym':
      fmt = '%Y년 %-m월';
      break;

    case 'md':
      fmt = '%-m월 %-d일';
      break;

    case 'd':
      fmt = '%-d일';
      break;

    case 'h':
      fmt = '%-H시';
      break;

    default:
      return () => type;
  }

  return d3.timeFormat(fmt);
}

export function getTickFormatMD(d3) {
  const fmtMonthDay = getTimeFormatByType(d3, 'md');
  const fmtDay = getTimeFormatByType(d3, 'd');

  return (date, i) => {
    if (date.getDate() === 1 || i === 0) {
      return fmtMonthDay(date);
    }

    return fmtDay(date);
  }
}

export const createTickFormatX = (type) => (chart) => {
  const {
    d3,
  } = chart;
  let fmtFirst = null;
  let fmtNormal = null;

  if (type === 'day') {
    fmtFirst = d3.timeFormat('%-m월 %-d일');
    fmtNormal = d3.timeFormat('%-d일');
  } else if (type === 'hour') {
    fmtFirst = d3.timeFormat('%-H시');
    fmtNormal = fmtFirst;
  }

  return {
    ...chart,
    formatX: [fmtFirst, fmtNormal]
  }
}