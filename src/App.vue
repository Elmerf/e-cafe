<template>
  <div class="container">
    <Navbar/>
    <RecommendedItem/>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import RecommendedItem from './components/RecommendedItem'

export default {
  name: 'App',
  components: {
    Navbar,
    RecommendedItem,
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Comfortaa');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  background: whitesmoke;
}

body {
  font-family: 'Comfortaa', cursive;
}
</style>
