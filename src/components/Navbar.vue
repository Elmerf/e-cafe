<template>
  <header>
    <h1 class="logo">E-Café Menu</h1>
    <h2 :style="[isMobile ? 'display: none' : 'display: flex']">Selamat Datang! Mau pesan apa kali ini?</h2>
    <a class="purchase" href="#">
      <button>Pembayaran </button>
    </a>
  </header>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      isMobile: false
    }
  },
  methods: {
    handleResize() {
      this.isMobile = window.matchMedia('(max-width: 600px)').matches
      ? true : false 
    }
  },
  mounted() {
    this.handleResize()
    window.addEventListener('resize', this.handleResize)
  },
  unmounted(){
    window.removeEventListener('resize', this.handleResize)
  }
}
</script>

<style scoped> 
h1, h2 {
  font-family: 'Comfortaa', cursive;
}

a, button {
  font-family: 'Comfortaa', cursive;
  font-weight: 700;
  font-size: 16px;
  color: #f9feff;
  text-decoration: none;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 10%;
}

button {
  padding: 9px 25px;
  background-color: rgba(0, 136, 169, 1);
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease 0s;
}

button:hover {
  background-color: rgba(0, 136, 169, 0.8);
}

.logo {
  cursor: pointer;
}
</style>
