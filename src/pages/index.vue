<template>
  <div>
    <div class="title-bar">
      <h1>碎片</h1>
      <div class="actions">
        <div class="icon-btn" @click="copyTokenURL">
          <i class='bx bx-copy'></i>
        </div>
        <div class="icon-btn" @click="historyModal = true">
          <i class='bx bx-history'></i>
        </div>
      </div>
    </div>
    <h2 v-if="hasPartner">你的碎片</h2>
    <div class="card" v-if="!puzzles">
      <loader />
    </div>
    <div class="card puzzle-cards" v-else-if="puzzles.length">
      <div class="puzzle-card" v-for="puzzle of puzzles" :key="puzzle">
        {{ puzzleList[puzzle] }}
      </div>
    </div>
    <h2 v-if="hasPartner">夥伴的碎片</h2>
    <div class="card" v-if="hasPartner && !partnerPuzzles">
      <loader />
    </div>
    <div class="card puzzle-cards" v-else-if="hasPartner && partnerPuzzles?.length">
      <div class="puzzle-card" v-for="puzzle of partnerPuzzles" :key="puzzle">
        {{ puzzleList[puzzle] }}
      </div>
    </div>
    <div class="btn" @click="addPartnerModal = true">
      <span v-if="hasPartner">
        <i class='bx bx-refresh'></i>
        <span>更換夥伴</span>
      </span>
      <span v-else>
        <i class='bx bx-plus'></i>
        <span>加入夥伴</span>
      </span>
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
    <modal v-model="addPartnerModal">
      <template #title>
        <span v-if="hasPartner">
          更換夥伴
        </span>
        <span v-else>
          加入夥伴
        </span>
      </template>
      <template #content>
        <div class="add-partner-steps">
          <div class="add-partner-step">
            <div class="step-icon">
              <i class='bx bx-copy'></i>
            </div>
            <div class="step-title">1. 複製連結</div>
            <div class="step-description">開啟夥伴的碎片頁面，輕觸右上角的複製按鈕。</div>
          </div>
          <div class="add-partner-step">
            <div class="step-icon">
              <i class='bx bx-paste'></i>
            </div>
            <div class="step-title">2. 貼上連結</div>
            <div class="step-description">透過通訊軟體等方式，取得夥伴的連結貼至下方欄位，並按下確定。</div>
          </div>
        </div>
        <input class="input" v-model="partnerToken" placeholder="請輸入夥伴的連結" />
        <div class="input-description">
          <span v-if="hasPartner">
            你先前已新增其他夥伴，與新的夥伴踏上旅程的話，先前的夥伴將會被取代。
          </span>
          <span v-else>
            與夥伴踏上旅程的話，可以使用對方的碎片進行解題。
          </span>
        </div>
      </template>
      <template #actions>
        <a class="modal-action" @click="addPartnerModal = false">取消</a>
        <a class="modal-action primary" @click="addPartner">確定</a>
      </template>
    </modal>
    <modal v-model="historyModal">
      <template #title>
        碎片取得紀錄
      </template>
      <template #content>
        <div class="history-cards">
          <div class="history-card" v-for="deliverer of deliverers" :key="deliverer.timestamp">
            <div class="history-card-name">
              {{ deliverer.deliverer }}
            </div>
            <div class="history-card-time">
              {{ new Date(deliverer.timestamp * 1000).toLocaleString('zh-TW', {
                  timeZone: 'Asia/Taipei',
                  hourCycle: 'h23',
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
        </div>
        <div v-if="!deliverers?.length">
          暫無紀錄
        </div>
      </template>
      <template #actions>
        <a class="modal-action" @click="historyModal = false">關閉</a>
      </template>
    </modal>
  </div>
</template>
<script>
import puzzleList from '@/assets/puzzles'
import { useToast } from "vue-toastification";
export default {
  setup() {
    const toast = useToast();
    return { toast }
  },
  data() {
    return ({
      puzzleList,
      nonTokenModal: false,
      historyModal: false,
      addPartnerModal: false,
      partnerToken: '',
      hasPartner: false,
      puzzles: null,
      partnerPuzzles: null,
      deliverers: null
    })
  },
  async created() {
    this.getData()
  },
  methods: {
    async getData() {
      // get token from url query
      let token = this.$route.query.token || localStorage.getItem('token')
      let partnerToken = localStorage.getItem('partnerToken')
      if (token) {
        localStorage.setItem('token', token)
        let res = await this.getPuzzles(token)
        if (res) {
          this.puzzles = res.puzzles
          this.deliverers = res.deliverers
        } else {
          this.nonTokenModal = true
          this.puzzles = []
          this.deliverers = []
        }
      } else {
        this.nonTokenModal = true
        this.puzzles = []
        this.deliverers = []
      }
      if (partnerToken) {
        this.hasPartner = true
        let res = await this.getPuzzles(partnerToken)
        if (res) {
          this.partnerPuzzles = res.puzzles
        } else {
          // partner token is invalid
          this.hasPartner = false
          localStorage.removeItem('partnerToken')
          this.toast.error('無法取得夥伴的碎片，請重新加入夥伴。')
          this.partnerPuzzles = []
        }
      }
    },
    async getPuzzles(token) {
      let result = await fetch(`https://sitcon.opass.app/event/puzzle?token=${token}`)
      if (result.ok) {
        result = await result.json()
        result.deliverers = result.deliverers.sort((a, b) => b.timestamp - a.timestamp)
        return result
      }
      return null
    },
    copyTokenURL() {
      let token = localStorage.getItem('token')
      try {
        navigator.clipboard.writeText(`https://puzzle.sitcon.party/?token=${token}`)
        this.toast.success('連結複製成功！')
      } catch (e) {
        window.prompt("請複製以下連結", `https://puzzle.sitcon.party/?token=${token}`)
      }
    },
    async addPartner() {
      let partnerTokenURL = this.partnerToken
      if (!partnerTokenURL.startsWith('https://puzzle.sitcon.party/?token=')) {
        this.toast.error('糟糕，你輸入的似乎不是正確的連結！')
        return
      }
      partnerTokenURL = new URL(partnerTokenURL)

      let partnerToken = partnerTokenURL.searchParams.get('token')
      if (!partnerToken) {
        this.toast.error('糟糕，你輸入的似乎不是正確的連結！')
        return
      }

      let selfToken = this.$route.query.token || localStorage.getItem('token')
      if (partnerToken != selfToken) {
        let res = await this.getPuzzles(partnerToken)
        if (res) {
          localStorage.setItem('partnerToken', partnerToken)
          this.hasPartner = true
          this.addPartnerModal = false
          this.partnerPuzzles = res.puzzles
          this.toast.success('成功加入夥伴！')
        } else {
          this.toast.error('糟糕，你輸入的似乎不是正確的連結！')
        }
      } else {
        this.toast.error('好像沒辦法將自己加入為夥伴。 (；′⌒`)')
      }
    }
  }
}
</script>
<style lang="sass" scoped>
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
.add-partner-steps
  display: grid
  grid-template-columns: repeat(2, 1fr)
  gap: 8px
  margin-bottom: 8px
  .add-partner-step
    background-color: #222
    padding: 6px 12px
    border-radius: 6px
    border: 1px solid rgba(255,255,255,.1)
    box-shadow: 0 2.5px 2.5px 0 rgba(0, 0, 0, 0.1)
    .step-icon
      font-size: 24px
    .step-title
      font-weight: 700
    .step-description
      font-size: .8rem
      opacity: .75
.cat-bg
  width: 70%
  margin: 0 auto
  display: block
  margin-top: 16px
</style>