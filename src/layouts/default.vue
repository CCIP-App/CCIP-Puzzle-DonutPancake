<template>
  <div class="mobile-view-container">
    <div class="mobile-view">
      <router-view />
    </div>
    <bottom-navigation />
  </div>
</template>

<script>
export default {
  created() {
    // --vh
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
}
</script>

<style lang="sass" scoped>
.mobile-view-container
  background-color: #3a3a3a
  background-size: 80px 80px
.mobile-view
  width: 100%
  margin: 0 auto
  height: calc(var(--vh,1vh) * 100 - 64px)
  background-color: #333
  color: #fff
  padding: 0 16px
  overflow: hidden
  overflow-y: scroll
  @supports (height: 100dvh)
    height: calc(100dvh - 64px)
  @media (min-width: 1024px)
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1)
    width: 512px
</style>