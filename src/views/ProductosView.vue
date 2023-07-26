<template>
  <div>
  SINGLE POST 
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="4000"
      controls
      indicators
      background="#ababab"
      img-width="1024"
      img-height="480"
      style="text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <!-- Text slides with image -->
      <b-carousel-slide v-for="(item, index) in producto.imagenes" :key="index" :img-src="item" :text="item.descripcion" ></b-carousel-slide>
        

    </b-carousel>

    <p class="mt-4">
      Slide #: {{ slide }}<br>
      Sliding: {{ sliding }}
    </p>
  </div>
</template>

<script>
import axios from 'axios'
  export default {
    data() {
      return {
        slide: 0,
        sliding: null,
        producto: {}
      }
    },
    mounted() {
      // Let's keep a reference to Slick instance
      axios
      .get(`https://api.alguientiene.com/productos/${this.$route.params.id}`)
      .then(response => (this.producto = response.data))
    },
    methods: {
      onSlideStart(slide) {
        this.sliding = true
      },
      onSlideEnd(slide) {
        this.sliding = false
      }
    }
  }
</script>

