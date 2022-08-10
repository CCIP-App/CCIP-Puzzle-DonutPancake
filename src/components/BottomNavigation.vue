<template>
  <div class="bottom-navigation">
    <div class="container">

      <router-link class="bottom-navigation-link" v-for="item in items" :to="item.link" :key="item.link">
        <div class="bottom-navigation-icon">
          {{ item.icon }}
        </div>
        <div class="bottom-navigation-title">
          {{ item.title }}
        </div>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: 'BottomNavigation',
  data() {
    return ({
      items: [{
        title: "碎片",
        icon: "🧩",
        link: "/"
      }, {
        title: "題目",
        icon: "📝",
        link: "/problem"
      }, {
        title: "遊戲方式",
        icon: "🎮",
        link: "/rules"
      }]
    })
  },
}
</script>
<style lang="sass" scoped>
.bottom-navigation
  .container
    display: grid
    align-items: center
    grid-template-columns: 1fr 1fr 1fr
    height: 64px
    background-color: #3a3a3a
    @media (min-width: 1024px)
      width: 512px
      margin: 0 auto
    .bottom-navigation-link
      color: #fff
      opacity: 0.8
      text-decoration: none
      text-align: center
      height: 64px
      display: flex
      flex-direction: column
      justify-content: center
      align-items: center
      .bottom-navigation-icon
        font-size: 24px
        font-family: 'Noto Emoji', sans-serif
        border-radius: 50em
        padding: 4px 24px
      .bottom-navigation-title
        font-size: 12px
        margin-top: 4px
      &:hover
        opacity: 1
        .bottom-navigation-icon
          background-color: rgba(255,255,255,0.2)
      &.router-link-exact-active
        opacity: 1
        .bottom-navigation-icon
          background-color: #82d357
          color: #333
          text-align: center
        .bottom-navigation-title
          font-weight: 700
</style>