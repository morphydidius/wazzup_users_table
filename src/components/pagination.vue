<template>
  <div class="pagination">
    <div class="pagination__firstpage" @click="goToFirst" :disabled="isFirstPage">First</div>
    <div class="pagination__back" @click="goToPrev" :disabled="isFirstPage"></div>
    <div class="pagination__current">{{ currentPage }}</div>
    <div class="pagination__next" @click="goToNext" :disabled="isLastPage || !pagesTotal"></div>
    <div class="pagination__lastpage" @click="goToLast" :disabled="isLastPage || !pagesTotal">Last</div>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    currentPage: {
      type: Number,
      required: true
    },
    pagesTotal: {
      type: Number,
      required: true
    }
  },
  data() {
    return {}
  },
  computed: {
    isFirstPage() {
      return this.currentPage === 1;
    },
    isLastPage() {
      return this.currentPage === this.pagesTotal;
    }
  },
  mounted() {},
  methods: {
    goToPrev() {
      if (!this.isFirstPage) {
        this.$emit('go-to-prev');
      }
    },
    goToNext() {
      if (!this.isLastPage) {
        this.$emit('go-to-next');
      }
    },
    goToFirst() {
      if (this.pagesTotal) {
        this.$emit('go-to-first');
      }
    },
    goToLast() {
      if (this.pagesTotal) {
        this.$emit('go-to-last');
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.pagination {
  font: 16px/24px 'Arial';
  display: flex;
  justify-content: center;
  align-items: center;

  &__back {
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 8px 16px 8px 0;
    border-color: transparent #cccaca transparent transparent;
    cursor: pointer;
    transition: all .2s ease-in;

    &:hover {
      border-color: transparent gray transparent transparent;
    }
  }

  &__next {
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 8px 0 8px 16px;
    border-color: transparent transparent transparent #cccaca;
    cursor: pointer;
    transition: all .2s ease-in;

    &:hover {
      border-color: transparent transparent transparent gray;
    }
  }

  &__current {
    padding: 10px 20px;
  }

  &__firstpage {
    margin-right: 20px;
    cursor: pointer;
  }

  &__lastpage {
    margin-left: 20px;
    cursor: pointer;
  }

  &__back[disabled=true], &__next[disabled=true],
  &__firstpage[disabled=true], &__lastpage[disabled=true] {
    opacity: 0.2;
    cursor: default;
  }

  &__back[disabled=true]:hover {
    border-color: transparent #cccaca transparent transparent;
  }

  &__next[disabled=true]:hover {
    border-color: transparent transparent transparent #cccaca;
  }
}
</style>
