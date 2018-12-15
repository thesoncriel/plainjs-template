export function pipe(...fns) {
  return (param, a = null, b = null) => fns.reduce((prev, fn) => fn(prev, a, b), param);
}

export function adjustValueMin(value, amount = 50) {
  return value - (value % amount);
}

export function adjustValueMax(value, amount = 50) {
  const defValue = Math.floor(value / amount) * amount;

  return (value % amount > 0)
    ? defValue + amount
    : defValue;
}

export function getFirstCategoryData(rawData, index = 0) {
  try {
    if (index > 50) {
      return [];
    }
    return rawData[rawData.categories[index]].data;  
  } catch (error) {
    return getFirstCategoryData(rawData, index + 1);
  }
}