<template>
  <div>
    <ThreeCanvas ref="threeRef" />
    <button @click="triggerSpin" class="myButton absolute top-4 left-4 p-4 bg-black text-white">Extra spin!</button>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  
  const threeRef = ref<InstanceType<typeof defineComponent>>()

  const triggerSpin = () => {
    threeRef.value?.spinCube();
  }
</script>

<style scoped>
  .myButton {
    position: absolute;
    top: 20px;
    left: 20px;
  }
</style>