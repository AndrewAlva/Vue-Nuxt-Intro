<template>
  <canvas ref="canvas" class="w-full h-screen block"></canvas>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  const canvas = ref<HTMLCanvasElement | null>(null)
  let cube: any // reference to the Three.js cube

  onMounted(() => {
    const { $three } = useNuxtApp()

    const scene = new $three.Scene()
    const camera = new $three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new $three.WebGLRenderer({ canvas: canvas.value! })
    renderer.setSize(window.innerWidth, window.innerHeight)

    const geometry = new $three.BoxGeometry()
    // const material = new $three.MeshBasicMaterial({ color: 0x00ff00 })
    const material = new $three.MeshStandardMaterial({ color: 0xffffff })
    cube = new $three.Mesh(geometry, material)
    scene.add(cube)

    const light = new $three.PointLight( 0xff0000, 100, 100 );
    light.position.set( 5, 5, 0 );
    scene.add( light );
    
    const light2 = new $three.PointLight( 0x0000ff, 30, 100 );
    light2.position.set( -5, -5, 5 );
    scene.add( light2 );

    camera.position.z = 3

    const animate = () => {
      requestAnimationFrame(animate)
      cube.rotation.x += 0.01
      cube.rotation.y += 0.01
      renderer.render(scene, camera)
    }

    animate()
  })

  // 👇 This function will be triggered from outside
  const spinCube = () => {
    const { $gsap } = useNuxtApp()
    if (cube) {
      $gsap.to(cube.rotation, { z: cube.rotation.z + Math.PI * 2, duration: 1, ease: 'power2.inOut' })
    }
  }

  // 👇 Make it available to the parent
  defineExpose({ spinCube })
</script>

<style scoped>
  canvas {
    position: absolute;
    top: 0; left: 0;
  }
</style>