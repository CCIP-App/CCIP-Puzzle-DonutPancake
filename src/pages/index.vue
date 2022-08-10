<template>
  <div>
    <h1>碎片</h1>
    <div class="card " v-if="!puzzles">
      <loader />
    </div>
    <div class="card puzzle-cards" v-else-if="puzzles.length">
      <div class="puzzle-card" v-for="puzzle of puzzles" :key="puzzle">
        {{ puzzle }}
      </div>
    </div>
    <img src="/imgs/meow-puzzle.png" class="cat-bg" />
    <modal v-model="nonTokenModal">
      <template #title>
        未偵測到 Token
      </template>
      <template #content>
        請檢查 OPass 是否已成功報到，若持續發生此問題，請聯絡工作人員。
      </template>
      <template #actions>
        <a class="modal-action" @click="nonTokenModal = false">關閉</a>
      </template>
    </modal>
  </div>
</template>
<script>
export default {
  data() {
    return ({
      nonTokenModal: false,
      links: [
        {
          title: "夥伴",
          icon: "👥",
          link: "/team"
        }
      ],
      puzzles: null
    })
  },
  created() {
    // get token from url query
    let token = this.$route.query.token || localStorage.getItem('token')
    if (token) {
      localStorage.setItem('token', token)
      this.getPuzzles()
    } else {
      this.nonTokenModal = true
      this.puzzles = []
    }
  },
  methods: {
    async getPuzzles() {
      let token = localStorage.getItem('token')
      let result = await fetch(`https://sitcon.opass.app/event/puzzle?token=${token}`).then(res => res.json())
      this.puzzles = result.puzzles
    }
  }
}
</script>
<style lang="sass" scoped>
.puzzle-cards
  display: grid
  grid-template-columns: repeat(2, 1fr)
  gap: 8px
  .puzzle-card
    color: #333
    background-color: #82d357
    border: 2px solid #82d357
    border-radius: 4px
    padding: 8px
    font-family: 'Ubuntu Mono', 'Noto Sans TC', monospace
.cat-bg
  width: 70%
  margin: 0 auto
  display: block
  margin-top: 16px
</style>