<template>
  <div class="loader" />
</template>
<style lang="sass" scoped>
.loader
  width: 32px
  height: 32px
  border: 4px solid transparent
  border-top: 4px solid #82d357
  border-left: 4px solid #82d357
  border-radius: 50%
  animation: spin .5s ease infinite
  margin: 0 auto
@keyframes spin
  0%
    transform: rotate(0deg)
  100%
    transform: rotate(360deg)
</style>