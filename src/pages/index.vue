<template>
  <div style="padding: 16px 0;">
    <div class="game-header">
      <div class="game-title" data-shadow="程式碼拼圖">程式碼拼圖</div>
      <div class="game-subtitle" data-shadow="SITCON X 大地遊戲">SITCON X 大地遊戲</div>
    </div>
    <div class="game-cards">
      <router-link class="game-card" v-for="link of links" :key="link.link" :to="link.link">
        <div class="game-card-title">
          {{ link.title }}
        </div>
        <div class="game-card-icon">
          {{ link.icon }}
        </div>
      </router-link>
    </div>
    <img src="/imgs/meow-puzzle.png" class="cat-bg" />
  </div>
</template>
<script>
export default {
  data() {
    return ({
      links: [
        {
          title: "遊戲方式",
          icon: "🎮",
          link: "/rules"
        },
        {
          title: "題目",
          icon: "📝",
          link: "/problem"
        },
        {
          title: "我的碎片",
          icon: "🧩",
          link: "/my-fragment"
        },
        {
          title: "隊伍",
          icon: "👥",
          link: "/team"
        },
        {
          title: "獎項",
          icon: "🏆",
          link: "/prize"
        }
      ]
    })
  }
}
</script>
<style lang="sass" scoped>
.game-header
  padding: 64px 0
  border: 2px solid #82d357
  padding: 16px
  margin-bottom: 16px
  border-radius: 16px
  line-height: 1.5
  .game-title
    font-size: 3.5rem
    font-weight: 900
    text-align: center
    color: #82d357
  .game-subtitle
    font-size: 2rem
    font-weight: 700
    text-align: center
.game-cards
  display: grid
  grid-template-columns: repeat(1,1fr)
  grid-gap: 16px
  .game-card
    background-color: #82d357
    border: 2px solid #82d357
    color: #333
    font-weight: 700
    font-size: 1.5rem
    border-radius: 16px
    padding: 16px
    display: flex
    align-items: center
    text-decoration: none
    .game-card-title
      flex: 1
    .game-card-icon
      font-size: 2rem
      text-align: center
      width: 64px
      font-family: 'Noto Emoji', sans-serif
    &:hover
      background-color: #333
      color: #82d357
      border: 2px solid #82d357
      cursor: pointer
.cat-bg
  width: 70%
  margin: 0 auto
  display: block
  margin-top: 16px
  filter: invert(1)
  opacity: .25
</style>