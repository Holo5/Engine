<template>
  <transition name="fade">
    <div class="hotel-box draggable" ref="element">
      <div class="box-top" @mousedown="drag($event)">
        <slot name="title"></slot>
        <icon-button :type="'square'" :opacity="100" :icon="'close'" @click.native="close"></icon-button>
      </div>
      <div class="box-body">
        <slot name="body"></slot>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import Vue from 'vue';
import IconButton from '../Buttons/Small/IconButton.vue';

export default Vue.extend({
  name: 'elements-draggable-box',
  components: {
    IconButton
  },
  props: {
    positionX: {
      type: Number,
      default: 50,
    },
    positionY: {
      type: Number,
      default: 50,
    },
    isDraggable: {
      type: Boolean,
      default: true,
    },
  },
  data: () => ({
    mousePositions: {
      clientX: 0,
      clientY: 0,
      movementX: 0,
      movementY: 0,
    },
    waiting: false
  }),
  methods: {
    drag(mouseEvent: MouseEvent): void {
      if (this.isDraggable) {
        mouseEvent.preventDefault();

        this.mousePositions.clientX = mouseEvent.clientX;
        this.mousePositions.clientY = mouseEvent.clientY;

        document.onmousemove = (event) => this.elementDrag(event);
        document.onmouseup = this.closeDragElement;
      }
    },
    elementDrag(event: MouseEvent): void {
      if (this.isDraggable) {
        event.preventDefault();

        this.mousePositions.movementX = this.mousePositions.clientX - event.clientX;
        this.mousePositions.movementY = this.mousePositions.clientY - event.clientY;
        this.mousePositions.clientX = event.clientX;
        this.mousePositions.clientY = event.clientY;

        const container: any = this.$root.$el;
        const element: any = this.$refs.element;

        let newLeft: number = element.offsetLeft - this.mousePositions.movementX;
        let newTop: number = element.offsetTop - this.mousePositions.movementY;

        newLeft = newLeft <= 0
          ? 0
          : newLeft >= container.offsetWidth - element.offsetWidth
            ? container.offsetWidth - element.offsetWidth
            : newLeft;

        newTop = newTop <= 0
          ? 0
          : newTop >= container.offsetHeight - element.offsetHeight
            ? container.offsetHeight - element.offsetHeight
            : newTop;

        element.style.top = `${newTop}px`;
        element.style.left = `${newLeft}px`;
      }
    },
    closeDragElement(): void {
      document.onmouseup = null;
      document.onmousemove = null;
    },
    close(): void {
      (this.$parent as any).closeBox();
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../../../../../assets/sass/variables";
@import "../../../../../assets/sass/colors";
@import "../../../../../assets/sass/mixins";

.hotel-box {
  @include blur-background;

  background-color: rgba($white, 0.97);
  border-radius: $big-border-radius;
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.3);
  position: fixed;
  pointer-events: auto;

  .box-top {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    padding: 15px;
    cursor: move;

    &::v-deep span {
      font-size: 22px;
      line-height: 16px;
      font-weight: bold;
      letter-spacing: -1px;
    }
  }
}
</style>
