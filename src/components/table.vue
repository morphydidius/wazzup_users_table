<template>
  <div class="users-table">
    <table border="1" cellspacing="0" cellpadding="0">
      <tr>
        <th v-for="(header, index) in tableHeaderContent" :key="index">{{ header }}</th>
      </tr>
      <tr
        v-for="(line, ind) in content"
        :key="ind"
        class="users-table__line"
        @click="clickOnLine(line)"
      >
        <td v-for="(cell, i) in line" :key="i">{{ cell }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'UsersTable',
  props: ['content', 'tableHeaderContent'],
  data() {
    return {}
  },
  mounted() {},
  methods: {
    clickOnLine(line) {
      this.$emit('click-on-line', line);
    }
  }
}
</script>

<style lang="scss" scoped>
.users-table {
  table {
    font: 16px/24px 'Arial';
    width: 100%;
    max-width: 800px;
    margin: 20px auto;

    th, td {
      padding: 6px;
    }

    th {
      background-color: #cccaca;
    }
  }
  &__line {
    cursor: pointer;
    transition: ease-in-out .2s all;

    &:hover {
      background-color: rgba(204, 131, 20, .5);
    }
  }
}
</style>
