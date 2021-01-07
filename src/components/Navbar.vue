<template>
  <div class="navbar-wrapper">
    <header>
      <h2 class="logo">E-Café Menu</h2>
      <router-link 
        :to="{name:'Cart', query:{no_meja: noMeja}}" 
        class="cartIcon"
      >
      <div><i class="fas fa-shopping-cart fa-lg"></i></div>
      </router-link>
    </header>
    <h4>No Meja Kamu: {{ noMeja }}</h4>
  </div>
</template>

<script>
import carts from '../assets/data/carts'

export default {
  name: 'Navbar',
  data() {
    return {
      cart: carts,
      noMeja: 0
    }
  },
  mounted() {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const noMeja = urlParams.get('no_meja')
    this.noMeja = noMeja
  },
  methods: {
    emitedMethod() {
      this.emitter.emit("send-no-meja", this.noMeja);
    }
  }
}
</script>

<style> 
header {
  display: flex;
  justify-content: space-between;
  padding: 10px 5%;
  background-color: rgb(253,184,21);
}
.navbar-wrapper h4 {
  text-align: center;
  padding: 5px 0;
}
.cartIcon {
  padding: 5px;
  text-decoration: none;
  color: white;
}
</style>