<template>
  <div>
    <ThreeCanvas />
    <button @click="animateCube" class="absolute top-4 left-4 p-4 bg-black text-white">Animate</button>
  </div>
</template>

<script setup>
const { $gsap } = useNuxtApp()

const animateCube = () => {
  $gsap.to('.box', { rotation: 360, duration: 2 })
}
</script>