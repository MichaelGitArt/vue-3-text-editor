const debounce = (fn, ms) => {
  let timerId;
  return function () {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      fn();
    }, ms);
  };
};

const splitTextContent = (str, start, end) => {
  const strArray = [];
  if (typeof str === 'string') {
    const before = str.slice(0, start);
    const after = str.slice(end);

    strArray.push(before || null);
    strArray.push(str.slice(start, end));
    strArray.push(after || null);
  }
  return strArray;
};

export default {
  debounce,
  splitTextContent,
};
