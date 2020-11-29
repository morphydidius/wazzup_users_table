<template>
  <div class="users-table">
    <table border="1" cellspacing="0" cellpadding="0">
      <tr>
        <th
          v-for="(header, index) in tableHeaderContent"
          :key="index"
          @click="setSortParam(index)"
          @mouseover="showSort(index)"
          @mouseleave="hideSort"
        >
          {{ header }}
          <div class="users-table__arrows">
            <div
              v-if="getArrowMode(index, 'ascend')"
              class="users-table__arrows__up"
            ></div>
            <div
              v-if="getArrowMode(index, 'descend')"
              class="users-table__arrows__down"
            ></div>
          </div>
        </th>
      </tr>
      <tr
        v-for="(line, ind) in sortedContent"
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
    return {
      arrowsVisibleIndex: -1,
      sortParams: [],
      sortedContent: []
    }
  },
  computed: {},
  mounted() {},
  methods: {
    clickOnLine(line) {
      this.$emit('click-on-line', line);
    },
    hideSort() {
      this.arrowsVisibleIndex = -1;
    },
    getArrowMode(index, type) {
      return this.arrowsVisibleIndex === index || this.sortParams[index] && this.sortParams[index].sortType === type;
    },
    initSortParams() {
      this.sortParams = this.tableHeaderContent.map((headerItem, index) => ({
        index: index,
        sortType: null
      }));
    },
    setSortParam(index) {
      this.sortParams = this.sortParams.map((param) => {
        if (param.index !== index) {
          return {
            index: param.index,
            sortType: null
          };
        }
        if (!param.sortType || param.sortType === 'descend') {
          return {
            index: param.index,
            sortType: 'ascend'
          };
        }
        return {
          index: param.index,
          sortType: 'descend'
        }
      });
    },
    showSort(index) {
      this.arrowsVisibleIndex = index;
    }
  },
  watch: {
    'content.length'(value) {
      if (value) {
        this.initSortParams();
        this.sortedContent = this.content;
      }
    },
    sortParams() {
      this.sortedContent = this.sortParams.reduce((acc, param) => {
        if (param.sortType === 'ascend') {
          acc = acc.sort((curLine, nextLine) => {
            if (curLine[param.index] > nextLine[param.index]) {
              return 1;
            }
            if (curLine[param.index] < nextLine[param.index]) {
              return -1;
            }
            return 0;
          });
        }
        if (param.sortType === 'descend') {
          acc = acc.sort((curLine, nextLine) => {
            if (curLine[param.index] > nextLine[param.index]) {
              return -1;
            }
            if (curLine[param.index] < nextLine[param.index]) {
              return 1;
            }
            return 0;
          });
        }
        return acc;
      }, this.sortedContent);
    }
  }
}
</script>

<style lang="scss" scoped>
.users-table {
  table {
    font: 16px/24px 'Arial';
    width: 100%;
    max-width: 900px;
    margin: 20px auto;

    th, td {
      padding: 6px;
      min-width: 150px;
    }

    th {
      background-color: #cccaca;
      position: relative;
      cursor: pointer;
    }
  }
  &__arrows {
    width: 16px;
    height: 26px;
    position: absolute;
    top: 50%;
    right: 6px;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    justify-content: center;

    &__up {
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 0 8px 10px 8px;
      border-color: transparent transparent rgba(71, 71, 71, .5) transparent;
      margin-bottom: 6px;
      transition: all .2s ease-in-out;
    }

    &__down {
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 10px 8px 0 8px;
      border-color: rgba(71, 71, 71, .5) transparent transparent transparent;
      transition: all .2s ease-in-out;
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
