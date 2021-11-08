<template>
  <button @click="$emit('click')">
    <svg :style="style" :viewBox="viewBox">
      <path
          :fill="color"
          :d="icon"
      />
    </svg>
  </button>
</template>

<script>
export default {
  name: "MdiIcon",
  props: {
    icon: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: 'currentColor'
    },
    size: {
      type: String,
      default: 'medium'
    }
  },
  computed: {
    sizeNumber(){
      switch (this.size){
        case 'x-small':
          return '8';
        case 'small':
          return '16';
        case 'medium':
          return '24';
        case 'large':
          return '32';
        case 'x-large':
          return '48';
        default:
          return '24';
      }
    },
    sizePx(){
      return this.sizeNumber + 'px';
    },
    style(){
      return 'width: ' + this.sizePx +'; height: ' + this.sizePx;
    },
    viewBox(){
      return '0 0 ' + this.sizeNumber + ' ' + this.sizeNumber;
    }
  }
}
</script>

<style scoped>
button {
  all: unset;
  cursor: pointer;
}

button:focus {
  outline: orange 5px auto;
}
</style>
