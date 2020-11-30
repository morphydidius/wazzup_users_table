<template>
  <transition name="fade">
    <div class="dispatch-form">
      <form>
        <input v-model="textSearch" type="text">
        <button type="submit" @click.prevent="search">Найти</button>
        <button type="submit" @click.prevent="reset">Сброс</button>
      </form>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'DispatchForm',
  props: [],
  data() {
    return {
      textSearch: ''
    }
  },
  mounted() {},
  methods: {
    reset() {
      this.textSearch = '';
      this.$emit('send');
    },
    search() {
      this.$emit('send', this.textSearch);
    }
  }
}
</script>

<style lang="scss" scoped>
.dispatch-form {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font: 16px/24px 'Arial';

  input[type="text"] {
    padding: 6px;
    margin-right: 20px;
  }

  button {
    padding: 2px;
    font: 16px/24px 'Arial';
    min-width: 80px;

    &:not(:last-of-type) {
      margin-right: 20px;
    }
  }
}
</style>
