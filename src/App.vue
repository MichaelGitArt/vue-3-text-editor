<template>
  <div class="container">
    <AEditor v-model="content" />

    <div class="result">
      <div v-html="content"></div>

      <hr />

      {{ content }}
    </div>
  </div>
</template>

<script>
import AEditor from './components/AEditor/AEditor.vue';
const value = `
  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
  <span
    id="id-34343"
    style="
      font-size: 18px;
      background-color: rgb(121, 85, 72);
      color: rgb(255, 255, 255);
    "
  >
    Praesentium porro amet
  </span>
  , eveniet omnis necessitatibus adipisci.
`;

export default {
  name: 'App',
  components: {
    AEditor,
  },

  data: () => ({
    content: value,
  }),
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 40px 15px;

  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.result {
  padding: 20px 15px;
  margin-top: 20px;

  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.185);
}
</style>
