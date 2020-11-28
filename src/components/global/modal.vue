<template>
  <transition name="fade">
    <div class="modal">
      <div ref="overlay" class="modal__overlay" @click="checkClosing">
        <div class="modal__window">
          <div
            ref="btn-close"
            class="modal__window__close"
            @click="checkClosing"
          ></div>
          <div class="modal__window__param"><span>Имя:</span> {{ content.name }}</div>
          <div class="modal__window__param"><span>E-mail:</span> {{ content.email }}</div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Modal',
  props: ['content'],
  data() {
    return {
      isBodyBlocked: false
    }
  },
  mounted() {
    window.addEventListener('keydown', this.handleKeyPress);
    this.toggleBodyState();
    this.renderBodyContainer();
  },
  methods: {
    checkClosing(e) {
      if (e.target === this.$refs['overlay'] || e.target === this.$refs['btn-close']) {
        this.close();
      }
    },
    close() {
      this.$emit('close');
    },
    handleKeyPress(e) {
      if (e.key === 'Escape') {
        this.close();
      }
    },
    toggleBodyState() {
      this.isBodyBlocked = !this.isBodyBlocked;
    },
    renderBodyContainer() {
      document.body.style.overflow = this.isBodyBlocked ? 'hidden' : 'auto';
    },
    stopScroll(e) {
      e.preventDefault();
    }
  },
  beforeUnmount() {
    window.removeEventListener('keydown', this.handleKeyPress);
    this.toggleBodyState();
    this.renderBodyContainer();
  }
}
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  font: 16px/24px 'Arial';

  &__overlay {
    position: absolute;
    background-color: rgba(0, 0, 0, .3);
    width: 100%;
    height: 100%;
  }

  &__window {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    max-width: 500px;
    height: 100%;
    max-height: 100px;
    padding: 20px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    &__close {
      position: absolute;
      right: 16px;
      top: 16px;
      width: 32px;
      height: 32px;
      opacity: 0.3;
      transition: all .2s ease-in;

      &:hover {
        opacity: 1;
      }

      &:before, &:after {
        position: absolute;
        left: 15px;
        content: ' ';
        height: 33px;
        width: 2px;
        background-color: #333;
      }
      &:before {
        transform: rotate(45deg);
      }
      &:after {
        transform: rotate(-45deg);
      }
    }

    &__param {
      span {
        min-width: 60px;
        display: inline-block;
      }
    }
  }
}
</style>
