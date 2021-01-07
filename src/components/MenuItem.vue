<template>
    <div class="menu-container">
        <div class="search-wrapper">
            <input type="text" placeholder="Cari menu yang kamu mau" v-model="search">
            <button @click="resetSearch"><i :class="search != '' ? 'fas fa-times' : 'fa fa-search'"></i></button>
        </div>
        <div class="wrapper" v-if="search == ''">
            <div v-for="(category, index) in categories" :key="index">
                <h3 class="category">{{ category }}</h3>
                <div class="card-container" 
                    v-for="(menu, innerIndex) in menus(category)" 
                    :key="innerIndex"
                >
                    <div class="float-layout" :class="menu.on_sale !=0 ? '' : 'off-sale'">
                        <div 
                            class="card-image"
                            @click="showModal(menu)"
                        >
                            <img :src="require(`../assets/images/${menu.gambar}`)" :alt="menu.nama"/>
                            <div class="card">
                                <div class="card-title">{{ menu.nama }}</div>
                                <span class="badge-oos" v-if="menu.on_sale == 0">Habis</span>
                                <div class="card-desc">{{ menu.deskripsi }}</div>
                                <div class="card-price">Rp{{ menu.harga }}</div>
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
                            <button class="addToCart" :disabled="isDisabled" id="countMenu" @click="addToCart">Tambah</button>
                        </div>
                        </template>
                    </Modal>
                </div>
            </div>
        </div>
        <div class="wrapper" v-else>
            <h3 class="category">Hasil Pencarian:</h3>
            <div class="card-container" 
                    v-for="(menu, index) in filteredList" 
                    :key="index"
                >
                <div class="float-layout" :class="menu.on_sale !=0 ? '' : 'off-sale'">
                    <div 
                        class="card-image"
                        @click="showModal(menu)"
                    >
                        <img :src="require(`../assets/images/${menu.gambar}`)" :alt="menu.nama"/>
                        <div class="card">
                            <div class="card-title">{{ menu.nama }}</div>
                            <span class="badge-oos" v-if="menu.on_sale == 0">Habis</span>
                            <div class="card-desc">{{ menu.deskripsi }}</div>
                            <div class="card-price">Rp{{ menu.harga }}</div>
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
                            <button class="addToCart" disabled id="countMenu" @click="addToCart">Tambah</button>
                        </div>
                        </template>
                    </Modal>
                </div>
            </div>
            <div v-if="!filteredList.length" style="text-align: center">Tidak Ada Hasil</div>
        </div>
    </div>
</template>

<script>
import Modal from './Modal'
import carts from '../assets/data/carts'

export default {
    name: 'MenuItem',
    components: {
      Modal,
    },
    data() {
        return {
            isDisabled: true,
            count: 0,
            totalHarga: 0,
            openModal: false,
            modalData: [],
            search: '',
            values: []
        }
    },
    mounted() {
        this.axios.get("http://192.168.43.226:3000/menus").then((response) => {
            this.values = response.data.values
        })
    },
    computed: {
        categories() {
            const categories = new Set();
            this.values.forEach(value => categories.add(value.nama_kategori));
            return Array.from(categories);
        },
        filteredList() {
            return this.values.filter(menu => {
                return menu.nama.toLowerCase().includes(this.search.toLowerCase())
            })
        }
    },
    methods: {
        menus(category) {
            return this.values
                .filter(value => value.nama_kategori === category)
        },
        resetSearch() {
            this.search = ''
        },
        showModal(value) {
            let button = document.getElementsByClassName("addToCart")[0]
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
                }
                else {
                    this.count = 0
                }
            }
        },
        closeModal() {
            let button = document.getElementById("countMenu")
            button.innerHTML = "Tambah"
            
            this.isDisabled = true
            this.openModal = false
            this.count = 0
        },
        addMenu() {
            let button = document.getElementById("countMenu")
            let harga = this.modalData.harga

            this.count++
            this.totalHarga = harga * this.count
            this.isDisabled = false
            button.innerHTML = "Tambah - " + this.totalHarga

            console.log(button)
        },
        minusMenu() {
            let button = document.getElementById("countMenu")
            let harga = this.modalData.harga

            if(this.count != 0) {
                this.count--
            }

            this.totalHarga = harga * this.count
            button.innerHTML = "Tambah - " + this.totalHarga

            if(this.count == 0) {
                button.innerHTML = "Tambah"
                this.isDisabled = true
                this.totalHarga = 0
            }
        },
        addToCart() {
            carts.push({
            id: this.modalData.id_menu,
            nama: this.modalData.nama,
            harga: this.modalData.harga,
            jumlah: this.count,
            totalHarga: this.totalHarga
            })
            this.closeModal()
        }
    }
}
</script>

<style>
.menu-container {
  padding: 0 5%;
}
.category {
  padding: 10px 5% 10px 5%;
}
.off-sale img{
  opacity: 0.5;
}
.card-container .off-sale {
  cursor: not-allowed;
}
.off-sale .card-image {
  pointer-events: none;
}
.wrapper {
  margin: 5px 0%;
}
.search-wrapper {
  margin: 0 5%;
}
.search-wrapper input[type=text] {
  padding: 10px;
  font-size: 17px;
  border: 1px solid grey;
  float: left;
  width: 80%;
  background: #f1f1f1;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}
.search-wrapper button {
  float: left;
  width: 20%;
  padding: 10px;
  background:rgb(253,184,21);
  color: white;
  font-size: 17px;
  border: 1px solid grey;
  border-left: none;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  cursor: pointer;
}
.search-wrapper button:hover {
  background: rgba(253,184,21, 0.8);
}
.search-wrapper::after {
  content: "";
  clear: both;
  display: table;
}
i {
  background:rgb(253,184,21);
}
</style>