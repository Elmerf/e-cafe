<template>
    <div class="container-recommended">
        <h3 class="recommended">Our Recommended</h3>
        <div class="card-container" 
          v-for="(value, index) in values" 
          :key="index"
        >
            <div class="float-layout" :class="value.on_sale !=0 ? '' : 'off-sale'">
                <div 
                  class="card-image" 
                  @click="showModal(value)"
                >
                    <img :src="require(`../assets/images/${value.gambar}`)" :alt="value.nama"/>
                    <div class="card">
                        <div class="card-title">{{ value.nama }}</div>
                        <span class="badge-oos" v-if="value.on_sale == 0">Habis</span>
                        <div class="card-desc">{{ value.deskripsi }}</div>
                        <div class="card-price">Rp{{ value.harga }}</div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="Object.keys(modalData).length !== 0">
          <Modal :show="openModal" v-on:closeModal="closeModal">
            <template v-slot:header>
              <h3>{{ modalData.nama }}</h3>
            </template>
            <template v-slot:body>
              <img :src="require(`../assets/images/${modalData.gambar}`)" :alt="modalData.nama"/>
              <h3>{{ modalData.harga }}</h3>
            </template>
            <template v-slot:footer>
              <div class="pilih-menu">
                <button class="minus" @click="minusMenu">-</button>
                <input type="text" size="2" readonly :value="count">
                <button class="add" @click="addMenu">+</button>
              </div>
              <div id="add-to-cart">
                <button class="addToCart" :disabled="isDisabled" id="count" @click="addToCart">Tambah</button>
              </div>
            </template>
          </Modal>
        </div>
    </div>
</template>

<script>
import Modal from './Modal'
import carts from '../assets/data/carts'

export default {
    name: "RecommendedItem",
    components: {
      Modal,
    },
    data() {
        return {
            isRemoved: false,
            isUpdated: false,
            isDisabled: true,
            count: 0,
            totalHarga: 0,
            openModal: false,
            modalData: [],
            values: []
        }
    },
    methods: {
      showModal(value) {
        let button = document.getElementById("count")
        this.modalData = value 
        this.openModal = true

        if(carts.length != 0) {
          let filteredMenu = carts
            .filter(cart => cart.id === this.modalData.id_menu && cart.jumlah > 0)
          
          if(filteredMenu[0].jumlah > 0) {
            this.count = filteredMenu[0].jumlah
            this.isDisabled = false

            button.textContent = "Update - " + this.count *  filteredMenu[0].harga
            button.disabled = false
            button.classList.remove("remove")

            this.isUpdated = true
          }
          else {
            this.count = 0
            this.isUpdated = false

            button.textContent = "Tambah"
          }
        }
      },
      closeModal() {
        let button = document.getElementById("count")
        button.innerHTML = "Tambah"
        button.disabled = true

        this.openModal = false
        this.count = 0
      },
      addMenu() {
        let button = document.getElementById("count")
        let harga = this.modalData.harga

        this.count++
        this.totalHarga = harga * this.count
        button.disabled = false

        if(this.isUpdated) {   
          button.innerHTML = "Update - " + this.totalHarga
        }
        else {
          button.innerHTML = "Tambah - " + this.totalHarga
        }
        button.classList.remove("remove")
      },
      minusMenu() {
        let button = document.getElementById("count")
        let harga = this.modalData.harga

        if(this.count != 0) {
          this.count--
        }

        this.totalHarga = harga * this.count

        if(this.isUpdated) {   
          button.innerHTML = "Update - " + this.totalHarga
        }
        else {
          button.innerHTML = "Tambah - " + this.totalHarga
        }

        if(this.count == 0 && this.isUpdated || this.isRemoved) {
          button.innerHTML = "Hapus dari Keranjang"
          button.classList.add("remove")
          this.isRemoved = true
          this.isUpdated = false
        } 
        else  if(this.count == 0) {
          button.innerHTML = "Tambah"
          button.disabled = true
          this.totalHarga = 0
        }
      },
      addToCart() {
        if(this.isUpdated) {
          let index = carts.findIndex((obj => obj.id == this.modalData.id_menu))
          carts[index].jumlah = this.count

          this.isUpdated = false
        }
        else if(this.isRemoved) {
          let index = carts.findIndex((obj => obj.id == this.modalData.id_menu))
          
          carts.splice(index, 1)
        }
        else {
          carts.push({
            id: this.modalData.id_menu,
            nama: this.modalData.nama,
            harga: this.modalData.harga,
            jumlah: this.count,
            totalHarga: this.totalHarga
          })
        }
    
        this.closeModal()
      }
    },
    mounted() {
      this.axios.get("http://192.168.43.226:3000/menus/favorited").then((response) => {
          this.values = response.data.values
      })
    },
}
</script>

<style>
img {
  background-color: white;
  float: left;
  width:  125px;
  height: 125px;
  object-fit: cover;
  border-radius: 10px;
  padding: 5px;
  margin: auto;
}
.container-recommended {
  padding: 10px 5%;
}
.recommended {
  padding: 0 5% 10px 5%;
}
.card-container {
  overflow: hidden; 
}
.float-layout {
  padding: 5px;
  width: 100%;
  height: auto;
  box-sizing: border-box;
  margin: 0;
  
}
.card {
  padding: 0 10px;
  background-color: white;
  color: black;
  min-height: 100%; 
  width: calc(100% - 125px);
  float: right;
}
.card-title {
  background-color: white;
  font-size: 20px;
  text-align: left;
  font-weight: bold;
  padding: 5px 0;
}
.card-desc {
  background-color: white;
  text-align: left;
  font-size: 14px;
  padding: 10px 0;
}
.card-image {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  background-color: white;
  display: flex;
  border-radius: 5px;
  cursor: pointer;
}
.card-price {
  background-color: white;
  padding: 5px 0;
  font-weight: 600;
}
.badge-oos {
  font-weight: 400;
  border-radius: 10px;
  padding: 5px 10px;  
  font-size: 14px;
  background-color: red;
}
.pilih-menu {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
}
.modal-footer button {
  color: white;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  margin: 0 5px;
  font-size: 24px;
}
button.minus{
  background: #6e6a6a;
}
button.add{
  background: rgb(253,184,21);
}
#add-to-cart {
  width: 80%;
  margin: 0 auto;
} 
button.addToCart {
  width: 100%;
  border-radius: 10px;
  background: rgb(253,184,21);
  color: black;
  font-size: 16px;
}
button.remove {
  background: red;
  color: white;
}
button.addToCart:disabled {
  background-color: rgba(238, 238, 238, 0.8);
}
.modal-footer input {
  text-align: center;
  font-size: 24px;
  background:#f1f1f1;
}
</style>