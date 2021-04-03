<template>
  <div
    ref="editor"
    class="a-editor-content"
    contenteditable
    id="editor"
    @input="onEmitContent"
  ></div>
</template>

<script>
import helper from '../../helper/index';
import selectionHelper from '../../helper/selection.helper';
import styleHelper from '../../helper/style.helper';
import parseHelper from '../../helper/parse.helper';

export default {
  name: 'AEditorContent',
  data: () => ({
    rage: null,
  }),
  emits: ['update:modelValue', 'setNode', 'resetNode'],

  props: {
    modelValue: {
      type: String,
      default: '',
    },
    currentNodeId: {
      type: String,
      default: null,
    },
    currentNodeStyle: {
      type: Object,
      default: null,
    },
  },

  mounted() {
    this.$refs.editor.innerHTML = this.modelValue;

    this.handleSelection = helper.debounce(this.handleSelection, 200);
    document.addEventListener('selectionchange', this.handleSelection);
  },
  unmounted() {
    document.removeEventListener('selectionchange', this.handleSelection);
  },

  methods: {
    onEmitContent() {
      this.$emit('update:modelValue', this.$refs.editor.innerHTML);
    },

    onSetStyle({ type, value }) {
      // No selection
      if (!this.rage) return;

      if (this.currentNodeId === 'editor') {
        // Cancel apply style for collapsed selection
        if (this.rage.collapsed) return;

        this.makeStyledNode({
          styleType: type,
          styleValue: value,
        });

        return;
      }

      this.applyStyleToCurrentNode({
        styleType: type,
        styleValue: value,
      });
    },

    applyStyleToCurrentNode({ styleType, styleValue }) {
      const currentNode = document.getElementById(this.currentNodeId);
      this.applyStyleToNode(currentNode, { styleType, styleValue });
    },

    applyStyleToNode(node, { styleType, styleValue }) {
      styleHelper.toggleStyle(node, {
        type: styleType,
        value: styleValue,
      });

      this.$emit('setNode', {
        style: styleHelper.parseStyle(this.currentNodeId),
      });

      this.onEmitContent();
    },

    makeStyledNode({ styleType, styleValue }) {
      const span = selectionHelper.makeSpanAtSelection(this.rage);

      this.$emit('setNode', {
        nodeId: span.getAttribute('id'),
      });

      this.$nextTick(() => {
        this.applyStyleToNode(span, { styleType, styleValue });
      });
    },

    handleSelection() {
      // Reset previous state
      this.rage = null;
      this.$emit('resetNode');

      const selection = document.getSelection();
      const rage = selection.getRangeAt(0);
      const selectionNode = rage.commonAncestorContainer;
      const parentNode = selectionNode.parentElement;

      // selection outside the editor
      if (!parentNode.closest('#editor')) return;

      const parentId = parentNode.getAttribute('id');

      let style = null;
      if (parentNode.tagName === 'SPAN') {
        style = styleHelper.parseStyle(parentId);
      }

      this.$emit('setNode', {
        nodeId: parentId,
        style,
      });

      this.rage = rage;
    },

    export() {
      let exportData = parseHelper.parseContent(this.$refs.editor);

      // flat styles
      exportData = exportData.map((childData) => {
        if (childData.style) {
          return {
            text: childData.text,
            ...childData.style,
          };
        }

        return childData;
      });

      return exportData;
    },
  },
};
</script>

<style lang="scss" scoped>
.a-editor-content {
  height: 200px;
  padding: 8px 12px;
  outline: none;
  border-radius: 0 0 4px 4px;

  ::v-deep(span) {
    border-radius: 4px;
  }
}
</style>
