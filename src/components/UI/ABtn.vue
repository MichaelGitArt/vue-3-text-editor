<template>
  <button v-bind="$attrs" :class="classes">
    <slot />
  </button>
</template>

<script>
export default {
  name: 'ABtn',
  props: {
    active: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classes() {
      return [
        'a-btn',
        {
          'a-btn--active': this.active,
        },
      ];
    },
  },
};
</script>

<style lang="scss" scoped>
.a-btn {
  border-radius: 4px;
  outline: none;
  border: 1px solid #1867c0;
  background-color: #1867c0;
  color: #fff;
  transition: all 0.2s;
  padding: 6px 8px;
  cursor: pointer;

  &:hover {
    background-color: lighten(#1867c0, 5%);
  }
  &:focus {
    background-color: darken(#1867c0, 3%);
  }
  &--active {
    background-color: darken(#1867c0, 15%) !important;
  }
}
</style>
