<template>
  <div class="container">
    <Navbar/>
    <MenuItem/>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import MenuItem from './components/MenuItem'

export default {
  name: 'App',
  components: {
    Navbar,
    MenuItem,
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@700&display=swap');

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
