<template>
  <div class="a-editor-toolbar">
    <ToolbarButtonGroups
      :groups="groups"
      :node-style="nodeStyle"
      @setStyle="onSetStyle"
    />

    <ABtn class="export-btn" @click="onExport"> Export to JSON </ABtn>
  </div>
</template>

<script>
import ABtn from '../../UI/ABtn';
import ToolbarButtonGroups from './ToolbarButtonGroups';
import { TEXT_STYLE_TYPES } from '../../../constants/index';

export default {
  name: 'AEditorToolbar',
  emits: ['setStyle', 'export'],

  props: {
    nodeStyle: {
      type: Object,
      default: null,
    },
  },

  components: {
    ABtn,
    ToolbarButtonGroups,
  },

  data: () => ({
    groups: [
      {
        type: TEXT_STYLE_TYPES.FONT_WEIGHT,
        buttons: [
          {
            label: 'Thin',
            value: '300',
          },
          {
            label: 'Regular',
            value: '400',
          },
          {
            label: 'Bold',
            value: '700',
          },
        ],
      },
      {
        type: TEXT_STYLE_TYPES.FONT_SIZE,
        buttons: [
          {
            label: '16px',
            value: '16px',
          },
          {
            label: '18px',
            value: '18px',
          },
          {
            label: '20px',
            value: '20px',
          },
        ],
      },
      {
        type: TEXT_STYLE_TYPES.FONT_FAMILY,
        buttons: [
          {
            label: 'Open Sans',
            value: 'Open Sans',
          },
          {
            label: 'Arial',
            value: 'Arial',
          },
        ],
      },
      {
        type: TEXT_STYLE_TYPES.BG_COLOR,
        buttons: [
          {
            label: 'Bg Orange',
            value: 'rgb(255, 87, 34)',
          },
          {
            label: 'Bg Brown',
            value: 'rgb(121, 85, 72)',
          },
        ],
      },
      {
        type: TEXT_STYLE_TYPES.COLOR,
        buttons: [
          {
            label: 'White',
            value: 'rgb(255, 255, 255)',
          },
          {
            label: 'Black',
            value: 'rgb(0, 0, 0)',
          },
        ],
      },
    ],
  }),

  methods: {
    onExport() {
      this.$emit('export');
    },

    onSetStyle(value) {
      this.$emit('setStyle', value);
    },
  },
};
</script>

<style lang="scss" scoped>
.a-editor-toolbar {
  border-bottom: none;
  padding: 15px;
  display: flex;
  flex-wrap: wrap;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.185);
}

.export-btn {
  margin-left: auto;
}
</style>
