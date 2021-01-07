<template>
  <div id="app">
    <div class="page-container">
      <router-view/>
      <footer id="footer">Tim Rebahan &copy; 2020</footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Comfortaa');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Comfortaa', cursive;
  background: whitesmoke;
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
