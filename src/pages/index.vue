<template>
  <div>
    <div class="title-bar">

      <h1>碎片</h1>
      <div class="actions">
        <div class="icon-btn" @click="historyModal = true">
          📜
        </div>
      </div>
    </div>
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
        Token 無效
      </template>
      <template #content>
        請檢查 OPass 是否已成功報到，若持續發生此問題，請聯絡工作人員。
      </template>
      <template #actions>
        <a class="modal-action" @click="nonTokenModal = false">關閉</a>
      </template>
    </modal>
    <modal v-model="historyModal">
      <template #title>
        攤位碎片取得紀錄
      </template>
      <template #content>
        <div class="history-cards">
          <div class="history-card" v-for="deliverer of deliverers" :key="deliverer.timestamp">
            <div class="history-card-name">
              {{ deliverer.deliverer }}
            </div>
            <div class="history-card-time">
              {{ new Date(deliverer.timestamp * 1000).toLocaleString('zh-TW', {
                  hour12: false,
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit"
                })
              }}
            </div>
          </div>
          <div class="history-card" v-if="!deliverers.length">
            <div class="history-card-name">
              暫無紀錄
            </div>
          </div>
        </div>
      </template>
      <template #actions>
        <a class="modal-action" @click="historyModal = false">關閉</a>
      </template>
    </modal>
  </div>
</template>
<script>
export default {
  data() {
    return ({
      nonTokenModal: false,
      historyModal: false,
      puzzles: null,
      deliverers: null
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
      let result = await fetch(`https://sitcon.opass.app/event/puzzle?token=${token}`)
      if (result.ok) {
        result = await result.json()
        this.puzzles = result.puzzles
        // sort by timestamp reverse
        this.deliverers = result.deliverers.sort((a, b) => b.timestamp - a.timestamp)
      } else {
        this.nonTokenModal = true
        this.puzzles = []
        this.deliverers = []
      }
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
.history-cards
  max-height: 300px
  overflow-y: scroll
  .history-card
    .history-card-name
      font-weight: 700
    .history-card-time
      font-family: 'Ubuntu Mono', 'Noto Sans TC', monospace
      opacity: .75
    & + .history-card
      margin-top: 4px
      border-top: 1px solid rgba(255, 255, 255, .05)
      padding-top: 4px
.cat-bg
  width: 70%
  margin: 0 auto
  display: block
  margin-top: 16px
</style>