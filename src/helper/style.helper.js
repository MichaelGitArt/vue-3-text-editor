import { TEXT_STYLE_TYPES } from '../constants/index.js';

const toggleStyle = (el, { type, value }) => {
  if (el.style[type] === value) {
    el.style[type] = null;
  } else {
    el.style[type] = value;
  }
};

function parseStyle(id) {
  const el = document.getElementById(id);
  if (!el) return null;

  let style = {};

  Object.values(TEXT_STYLE_TYPES).forEach((styleType) => {
    if (el.style[styleType]) {
      style[styleType] = el.style[styleType];
    }
  });

  if (Object.keys(style).length > 0) {
    return style;
  } else {
    return null;
  }
}

export default {
  parseStyle,
  toggleStyle,
};
