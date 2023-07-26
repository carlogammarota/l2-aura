<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <div>
    <div class="bg-blue-500 p-4 rounded-lg shadow-lg">
    <p class="bg-red">Este es un elemento con estilos de Tailwind CSS.</p>
  </div>
</div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  }
}
</script>
