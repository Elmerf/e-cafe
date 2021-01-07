<template>
    <div class="content-wrap">
      <Navbar/>
      <RecommendedItem/>
      <MenuItem/>
    </div>
</template>

<script>
import MenuItem from '../components/MenuItem'
import Navbar from '../components/Navbar'
import RecommendedItem from '../components/RecommendedItem'

export default {
    name: 'Home',
    components: {
        Navbar,
        RecommendedItem,
        MenuItem,
    }
}
</script>