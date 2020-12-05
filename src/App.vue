<template>
  <div class="container">
    <Navbar/>
    <SearchBox/>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import SearchBox from './components/SearchBox'

export default {
  name: 'App',
  components: {
    Navbar,
    SearchBox,
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
</style>
