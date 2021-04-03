import styleHelper from './style.helper';

const parseContent = (el) => {
  const parsedData = [];

  el.childNodes.forEach((child) => {
    const prevChildData = parsedData[parsedData.length - 1] || null;
    const currentText = child.textContent;
    let currentStyle = null;

    // get node style
    if (child.nodeType !== Node.TEXT_NODE) {
      currentStyle = styleHelper.parseStyle(child.getAttribute('id'));
    }

    // merge text with previous node
    // if sibling nodes is text or current is single whitespace
    if (
      prevChildData &&
      (currentText === ' ' || (!currentStyle && !prevChildData.style))
    ) {
      prevChildData.text += currentText;
      return;
    }

    // styled node
    if (currentStyle) {
      // compare prev style with current
      if (prevChildData.style) {
        const prevStyleStr = Object.entries(prevChildData.style)
          .flat(2)
          .join('');
        const currentStyleStr = Object.entries(currentStyle).flat(2).join('');

        // merge nodes with same style
        if (currentStyleStr === prevStyleStr) {
          prevChildData.text += currentText;
          return;
        }
      }

      parsedData.push({
        text: currentText,
        style: currentStyle,
      });
      return;
    }

    // text node
    parsedData.push({
      text: currentText,
    });
  });

  return parsedData;
};

export default {
  parseContent,
};
