<template>
  <div class="nav-bar">
    <router-link class="back" to="/">
      <div class="icon">
        ◀️
      </div>
      返回
    </router-link>
    <div class="title">
      {{ title }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="sass" scoped>
.nav-bar
  display: grid
  align-items: center
  padding: 16px
  grid-template-columns: 1fr 3fr 1fr
  margin: 0 -16px
  background-color: #82d357
  .back
    display: flex
    align-items: center
    cursor: pointer
    color: #333
    text-decoration: none
    .icon
      font-size: 16px
      margin-right: 8px
      font-family: 'Noto Emoji', sans-serif
  .title
    text-align: center
    font-size: 24px
    font-weight: 700
    color: #333
</style>