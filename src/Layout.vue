<template>
  <div class="mobile-view-container">
    <div class="mobile-view">
      <router-view></router-view>
      <div class="footer">
        SITCON X 大地遊戲 | <a href="https://github.com/CCIP-App/CCIP-Puzzle-DonutPancake" target="_blank">GitHub</a>
      </div>
    </div>
    <bottom-navigation />
  </div>
</template>

<script>
export default {

}
</script>

<style lang="sass" scoped>
@im
.mobile-view-container
  background-color: #3a3a3a
  background-size: 80px 80px
.mobile-view
  width: 100%
  margin: 0 auto
  height: calc(100vh - 64px)
  height: calc(100dvh - 64px)
  background-color: #333
  color: #fff
  padding: 0 16px
  overflow: hidden
  overflow-y: scroll
  @media (min-width: 1024px)
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1)
    width: 512px
.footer
  padding: 16px
  text-align: center
  font-size: 0.75rem
  color: #aaa
  a
    color: #aaa
</style>