<template>
  <div class="home">
    <IndexLayout>
      <router-view></router-view>
    </IndexLayout>
  </div>
</template>

<script>
import IndexLayout from 'components/layout/IndexLayout'
export default {
  name: 'Home',
  components: {
    IndexLayout
  },

  data() {
    return {

    }
  }
}
</script>

<style scoped>

</style>