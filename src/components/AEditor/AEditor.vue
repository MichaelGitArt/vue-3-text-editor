<template>
  <div class="a-editor">
    <div class="a-editor-header">
      <h1 class="a-editor-header__title">Editor</h1>
    </div>

    <AEditorToolbar
      :nodeStyle="currentNodeStyle"
      @setStyle="onSetStyle"
      @export="onExport"
    />

    <AEditorContent
      ref="content"
      :modelValue="modelValue"
      :current-node-id="currentNodeId"
      :current-node-style="currentNodeStyle"
      @setNode="onSetNode"
      @resetNode="onResetNode"
      @update:modelValue="onUpdateModelValue"
    />
  </div>
</template>

<script>
import AEditorToolbar from './AEditorToolbar/AEditorToolbar';
import AEditorContent from './AEditorContent';

export default {
  name: 'AEditor',
  emits: ['update:modelValue'],

  components: {
    AEditorToolbar,
    AEditorContent,
  },

  data: () => ({
    currentNodeId: null,
    currentNodeStyle: null,
  }),

  props: {
    modelValue: {
      type: String,
      default: '',
    },
  },

  methods: {
    onUpdateModelValue(value) {
      this.$emit('update:modelValue', value);
    },

    onSetNode({ nodeId = null, style = null }) {
      this.currentNodeId = nodeId || this.currentNodeId;
      this.currentNodeStyle = style || this.currentNodeStyle;
    },

    onResetNode() {
      this.currentNodeId = null;
      this.currentNodeStyle = null;
    },

    onSetStyle(value) {
      this.$refs.content.onSetStyle(value);
    },

    onExport() {
      const data = this.$refs.content.export();
      console.log('JSON: ', JSON.stringify(data, 2, 2));
      alert('JSON in console');
    },
  },
};
</script>

<style lang="scss">
.a-editor {
  width: 100%;
  border-radius: 4px;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.185);
}

.a-editor-header {
  font-size: 32px;
  text-align: center;
  padding: 20px 20px 30px;

  &__title {
    font-size: 50px;
    margin: 0;
  }
}
</style>
