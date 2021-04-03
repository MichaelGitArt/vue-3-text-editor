<template>
  <div class="toolbar-button-group" v-for="group in groups" :key="group.type">
    <ABtn
      v-for="button in group.buttons"
      :key="button.value"
      class="toolbar-button-group__item"
      :active="isButtonActive(group.type, button.value)"
      @click="onSetStyle(group.type, button.value)"
    >
      {{ button.label }}
    </ABtn>
  </div>
</template>

<script>
import ABtn from '../../UI/ABtn';

export default {
  name: 'ToolbarGroup',
  emits: ['setStyle'],

  props: {
    groups: {
      type: Array,
      required: true,
    },
    nodeStyle: {
      type: Object,
      default: null,
    },
  },

  components: {
    ABtn,
  },

  computed: {
    isButtonActive() {
      return (type, value) => {
        return this.nodeStyle && this.nodeStyle[type] === value;
      };
    },
  },

  methods: {
    onSetStyle(type, value) {
      this.$emit('setStyle', {
        type,
        value,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.toolbar-button-group {
  margin-right: 10px;

  &__item {
    border-radius: 0px;

    &:first-child {
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }
    &:last-child {
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
    }
  }
}
</style>
