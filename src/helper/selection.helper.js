import rangeHelper from './range.helper';

const setSelectionToElement = (el) => {
  const range = document.createRange();
  const node = el.childNodes[0];

  range.setStart(node, 0);
  range.setEnd(node, node.length);

  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);
};

const makeSpanAtSelection = (rage) => {
  const currentEl = rage.commonAncestorContainer;
  const parentEl = currentEl.parentElement;

  const [beforeText, selectedText, afterText] = rangeHelper.splitRangeText(
    rage
  );

  const selected = document.createElement('span');
  selected.textContent = selectedText;
  selected.setAttribute('id', 'editor-span-' + Date.now());

  const fragment = document.createDocumentFragment();
  fragment.appendChild(selected);
  if (beforeText) {
    fragment.prepend(beforeText);
  }
  if (afterText) {
    fragment.append(afterText);
  }

  parentEl.replaceChild(fragment, rage.commonAncestorContainer);
  // Return selection after node replace
  setSelectionToElement(selected);

  return selected;
};

export default {
  setSelectionToElement,
  makeSpanAtSelection,
};
