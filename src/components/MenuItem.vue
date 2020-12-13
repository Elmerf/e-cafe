<template>
    <div class="container-recommended">
        <h3 class="recommended">Our Recommended</h3>
        <div v-for="value in values" :key="value.id_menu">
            <img :src="require(`../assets/images/${value.gambar}`)" :alt="value.nama"/>
        </div> 
    </div>
</template>

<script>
export default {
    name: "MenuItem",
    data() {
        return {
            values: {}
        }
    },
    mounted() {
        this.axios.get("http://localhost:3000/menus/favorited").then((response) => {
            this.values = response.data.values
        })
    },
}
</script>

<style scoped>
img {
    /* float: left; */
    width:  200px;
    height: 200px;
    object-fit: cover;
}
.container-recommended {
    padding: 20px 0;
}
.recommended {
    padding: 0 10%;
}
</style>