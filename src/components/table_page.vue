<template>
  <div class="page">
    <tr v-for="(line, index) in content" :key="index">
      <td v-for="(item, i) in line" :key="i">{{item}}</td>
    </tr>
  </div>
</template>

<script>
export default {
  name: 'TablePage',
  props: {
    itemsPerPage: {
      type: Number,
      default: 2
    },
    content: {
      type: Array
    }
  },
  data() {
    return {}
  },
  computed: {},
  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.page {
  td {
    padding: 6px;
    min-width: 150px;
    font: 16px/24px 'Arial';
    border: 1px solid #000;
  }
}
</style>
