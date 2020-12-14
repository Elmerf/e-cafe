<template>
    <div class="menu-container">
        <div v-for="(category, index) in categories" :key="index">
            <h3 class="category">{{ category }}</h3>
            <div class="card-container" 
                v-for="(menu, innerIndex) in menus(category)" 
                :key="innerIndex"
            >
                <div class="float-layout">
                    <div class="card-image">
                        <img :src="require(`../assets/images/${menu.gambar}`)" :alt="menu.nama"/>
                        <div class="card">
                            <div class="card-title">{{ menu.nama }}</div>
                            <div class="card-desc">{{ menu.deskripsi }}</div>
                            <div class="card-price">Rp{{ menu.harga }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MenuItem',
    data() {
        return {
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
        }
    },
    methods: {
        menus(category) {
            return this.values
                .filter(value => value.nama_kategori === category)
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

</style>