<template>
  <div class="mobile-view-container">
    <div class="mobile-view">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="sass" scoped>
.mobile-view-container
  background-color: #3a3a3a
  background-size: 80px 80px
.mobile-view
  width: 100%
  margin: 0 auto
  min-height: 100vh
  min-height: 100dvh
  background-color: #333
  color: #fff
  padding: 0 16px
  @media (min-width: 1024px)
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1)
    width: 512px
</style>