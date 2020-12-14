<template>
    <div class="container-recommended">
        <h3 class="recommended">Our Recommended</h3>
        <div class="card-container" 
          v-for="(value, index) in values" 
          :key="index"
        >
            <div class="float-layout">
                <div class="card-image">
                    <img :src="require(`../assets/images/${value.gambar}`)" :alt="value.nama"/>
                    <div class="card">
                        <div class="card-title">{{ value.nama }}</div>
                        <div class="card-desc">{{ value.deskripsi }}</div>
                        <div class="card-price">Rp{{ value.harga }}</div>
                    </div>
                </div>
            </div>
        </div> 
    </div>
</template>

<script>
export default {
    name: "RecommendedItem",
    data() {
        return {
            values: {}
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
  padding: 20px 5%;
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
/* div.card-image img {
  width: 30%;
  height: auto;
  border-radius: 10px;
} */

</style>