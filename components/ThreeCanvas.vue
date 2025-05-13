<template>
	<canvas ref="canvas" class="w-full h-screen block"></canvas>
</template>

<script setup lang="ts">
	import { onMounted, ref } from 'vue'
	const canvas = ref<HTMLCanvasElement | null>(null)
	let cube: any // reference to the Three.js cube
	let meshesGroup: any

	const width = ref(window.innerWidth)
	const height = ref(window.innerHeight)

	const updateSize = () => {
		width.value = window.innerWidth
		height.value = window.innerHeight
	}

	onMounted(() => {
		window.addEventListener('resize', updateSize)

		const { $three } = useNuxtApp()

		const scene = new $three.Scene()
		const camera = new $three.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000)
		const renderer = new $three.WebGLRenderer({ canvas: canvas.value! })
		renderer.setSize(width.value, height.value)

		watch([width, height], ([w, h]) => {
			renderer.setSize(w, h)
			camera.aspect = w / h
			camera.updateProjectionMatrix()
		})

		
		const manager = new $three.LoadingManager()
		manager.onLoad = () => {
			console.log('✅ All textures loaded.')
			// You can now create your materials and add meshes
			for (const key in textures) {
				if (Object.prototype.hasOwnProperty.call(textures, key)) {
					const texture = textures[key];
					
					const geo = new $three.PlaneGeometry(1, 1.25);
					const material = new $three.MeshBasicMaterial({ map: texture });
					const mesh = new $three.Mesh(geo, material);
					mesh.scale.setScalar(2)
					meshesGroup.add(mesh);

					const i = circleConfig.counter;
					mesh.position.x = Math.sin(i * circleConfig.angle) * circleConfig.radius;
					mesh.position.z = Math.cos(i * circleConfig.angle) * circleConfig.radius;
					mesh.rotation.y = (i * circleConfig.angle) + Math.PI;
					circleConfig.counter++;
				}
			}
		}
		manager.onError = (url: any) => {
			console.error(`❌ Failed to load ${url}`)
		}

		const loader = new $three.TextureLoader(manager)
		const texturePaths = {
			s0: '/textures/s0.png',
			s1: '/textures/s1.png',
			s2: '/textures/s2.png',
			s3: '/textures/s3.png',
			s4: '/textures/s4.png',
			s5: '/textures/s5.png',
			s6: '/textures/s6.png',
			s7: '/textures/s7.png',
			s8: '/textures/s8.png',
			s9: '/textures/s9.png',
			t1: '/textures/t1.png',
			t2: '/textures/t2.png',
			t3: '/textures/t3.png',
			t4: '/textures/t4.png',
		}
		
		const circleConfig = {
			total: (Object.keys(texturePaths).length - 1),
			radius: 5,
			angle: (Math.PI * 2) / (Object.keys(texturePaths).length - 1),
			counter: 0
		};
		
		const textures: Record<string, $three.Texture> = {}

		Object.entries(texturePaths).forEach(([key, path]) => {
			textures[key] = loader.load(path)
		})

		meshesGroup = new $three.Group();
		scene.add(meshesGroup);



		// LIGHTS
		const light = new $three.PointLight(0xff0000, 100, 100);
		light.position.set(5, 5, 0);
		scene.add(light);

		const light2 = new $three.PointLight(0x0000ff, 30, 100);
		light2.position.set(-5, -5, 5);
		scene.add(light2);

		// camera.position.z = 13
		// camera.position.y = 5
		// camera.rotation.x = -0.5

		const animate = () => {
			requestAnimationFrame(animate)
			meshesGroup.rotation.y += 0.001
			renderer.render(scene, camera)
		}

		animate()
	})

	onUnmounted(() => {
		window.removeEventListener('resize', updateSize)
	})

	// 👇 This function will be triggered from outside
	const spinCube = () => {
		const { $gsap } = useNuxtApp()
		if (meshesGroup) {
			$gsap.to(meshesGroup.rotation, { y: meshesGroup.rotation.y + Math.PI, duration: 1, ease: 'power2.inOut' })
		}
	}

	// 👇 Make it available to the parent
	defineExpose({ spinCube })
</script>

<style scoped>
	canvas {
		position: absolute;
		top: 0;
		left: 0;
	}
</style>