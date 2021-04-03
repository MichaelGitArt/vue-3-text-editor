import helper from './index';

const splitRangeText = (rage) => {
  const text = rage.commonAncestorContainer.textContent;
  return helper.splitTextContent(text, rage.startOffset, rage.endOffset);
};

export default {
  splitRangeText,
};
