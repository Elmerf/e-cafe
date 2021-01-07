<template>
    <div class="content-wrap">
        <div class="navbar-wrapper">
            <header>
            <h2 class="logo">List keranjang menu</h2>
            </header>
            <h4>No Meja Kamu: {{ noMeja }}</h4>
        </div>
        <div class="cart-container">
            <table>
                <thead>
                    <th></th>
                    <th>Nama</th>
                    <th>Harga</th>
                </thead>
                <tbody>
                    <tr v-for="(cart, keys) in keranjang" :key="keys">
                        <td>{{ cart.jumlah }}x</td>
                        <td>{{ cart.nama }}</td>
                        <td>{{ cart.totalHarga }}</td>
                    </tr>
                    <tr v-if="Object.keys(keranjang).length === 0">
                        <td colspan="3" style="text-align: center">Belum Ada Menu di Keranjang</td>
                    </tr>
                    <tr v-else>
                        <td colspan="2">Subtotal</td>
                        <td> {{ subTotal }} </td>
                    </tr>
                </tbody>
            </table>
            <div v-if="Object.keys(keranjang).length !== 0" class="bayar-wrapper">
                <input type="text" placeholder="Masukkan Nama Kamu" v-model="namaPemesan"/>
                <button @click="bayarMenu">Bayar</button>
            </div>
        </div>
    </div>
</template>

<script>
import carts from '../assets/data/carts'

export default {
    name: "Cart",
    data() {
        return {
            keranjang: carts,
            noMeja: 0,
            namaPemesan: ''
        }
    },
    mounted() {
        const queryString = window.location.search
        const urlParams = new URLSearchParams(queryString)
        const noMeja = urlParams.get('no_meja')
        this.noMeja = noMeja

        console.log(carts)
    },
    computed: {
        subTotal() {
            return this.keranjang.reduce(function (total, value) {
                return total + Number(value.totalHarga);
            }, 0)
        }
    },
    methods: {
        bayarMenu() {
            if(this.namaPemesan === '') {
                alert("Masukkan Nama")
            }
            else {
                alert("Transaksi Diproses")
            }
        }
    }
}
</script>

<style>
.cart-container {
    padding: 10px 5%;
}
table {
    width: 100%;
    margin-bottom: 10px;
}
table td, th {
    padding: 10px 5px;
}
.bayar-wrapper input[type=text] {
    padding: 10px;
    font-size: 17px;
    border: 1px solid grey;
    float: left;
    width: 80%;
    background: #f1f1f1;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
}
.bayar-wrapper button {
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
</style>