<template>
  <div class="page-container">
    <div class="content-wrap">
      <Navbar/>
      <RecommendedItem/>
      <MenuItem/>
    </div>
    <footer id="footer">Tim Rebahan &copy; 2020</footer>
  </div>
</template>

<script>
import MenuItem from './components/MenuItem.vue'
import Navbar from './components/Navbar'
import RecommendedItem from './components/RecommendedItem'

export default {
  name: 'App',
  components: {
    Navbar,
    RecommendedItem,
    MenuItem,

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

.page-container {
  position: relative;
  min-height: 100vh;
}

.content-wrap {
  padding-bottom: 2.5rem; 
}

#footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 2.5rem;
  padding: 10px;
  text-align: center;
}
</style>
