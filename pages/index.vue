<template>
  <div>
    <ThreeCanvas />
    <button @click="animateCube" class="myButton absolute top-4 left-4 p-4 bg-black text-white">Animate</button>
  </div>
</template>

<script setup>
const { $gsap } = useNuxtApp()

const animateCube = () => {
  $gsap.to('.box', { rotation: 360, duration: 2 })
}
</script>

<style scoped>
  .myButton {
    position: absolute;
    top: 20px;
    left: 20px;
  }
</style>