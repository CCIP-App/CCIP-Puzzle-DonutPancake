<template>
  <div class="mobile-view-container">
    <div class="mobile-view">
      <qr-stream @decode="onDecode" class="qrstream">
        <div>
          <div class="header">
            <div class="title">櫃檯</div>
            <div class="subtitle">櫃檯掃描器</div>
          </div>
          <div class="frame">
            <div class="loader" v-if="loading" />
          </div>
          <div class="footer">
            <div class="steps">
              <div class="step" :class="{ active: step == 0 }">
                <div class="step-number">1</div>
                <div class="step-title">掃描 QR Code</div>
                <div class="step-description">請掃描第一位使用者的 QR Code。</div>
              </div>
              <div class="step" :class="{ active: step == 1 }">
                <div class="step-number">2</div>
                <div class="step-title">掃描 QR Code</div>
                <div class="step-description">請掃描第二位使用者的 QR Code。</div>
              </div>
              <div class="step" :class="{ active: step == 2 }">
                <div class="step-number">3</div>
                <div class="step-title">檢視是否符合資格</div>
                <div class="step-description">系統將自動顯示是否符合兌換資格。</div>
              </div>
            </div>
            <div class="btn" v-if="step == 1" @click="redeem">
              跳過第二位使用者的掃描
            </div>
            <div class="btn" @click="reset">
              重置
            </div>
          </div>
        </div>
      </qr-stream>
      <modal v-model="redeemModal">
        <template #content>
          <div class="redeem-icon">
            <i :class="redeemIcon"></i>
          </div>
          <div style="text-align: center;" v-html="redeemStatus" />
        </template>
        <template #actions>
          <a class="modal-action" @click="redeemModal = false">關閉</a>
        </template>
      </modal>
      <audio id="beep" ref="beep" style="display: none;">
        <source src="/sounds/alert.wav" type="audio/ogg">
      </audio>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.redeem-icon
  font-size: 64px
  text-align: center
.steps
  display: grid
  grid-template-columns: 1fr 1fr 1fr
  gap: 8px
  margin-bottom: 8px
  .step
    text-align: left
    border: 1px solid rgba(255,255,255,.1)
    padding: 8px
    border-radius: 4px
    transition: all .2s ease-in-out
    &.active
      border: 1px solid rgba(255,255,255,.5)
      background-color: rgba(255,255,255,.1)
    .step-number
      font-size: 24px
      font-weight: 700
    .step-title
      font-size: 16px
      font-weight: 700
    .step-description
      margin-top: 4px
      font-size: 14px
      opacity: 0.75

.mobile-view-container
  background-color: #3a3a3a
  background-size: 80px 80px
.mobile-view
  width: 100%
  margin: 0 auto
  height: calc(var(--vh,1vh) * 100)
  height: 100dvh
  background-color: #333
  color: #fff
  overflow: hidden
  overflow-y: scroll
  @media (min-width: 1024px)
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1)
    width: 512px
.qrstream
  width: 100% !important
  height: calc(var(--vh,1vh) * 100) !important
  height: calc(100dvh) !important
  position: relative
  .header,.footer
    position: absolute
    width: 100%
    padding: 8px
    background-color: rgba(0, 0, 0, 0.25)
    backdrop-filter: blur(4px)
    text-align: center
    left: 0
  .footer
    bottom: 0
  .header
    top: 0
    .title
      font-size: 24px
      font-weight: 700
    .subtitle
      margin-top: 4px
      font-size: 12px
      font-weight: 400
      opacity: 0.75
  .frame
    position: absolute
    top: 0
    left: 0
    right: 0
    bottom: 0
    margin: auto
    width: 200px
    height: 200px
    box-sizing: border-box
    pointer-events: none
    @supports not (selector(:has()))
      border: 2px solid #82d357
      animation: blink 1s ease-in-out infinite
    @supports (selector(:has()))
      &:not(:has(.loader))
        border: 2px solid #82d357
        animation: blink 1s ease-in-out infinite
    .loader
      position: absolute
      top: 0
      left: 0
      right: 0
      bottom: 0
      margin: auto
      width: 32px
      height: 32px
      border: 4px solid #82d357
      border-radius: 50%
      border-top-color: transparent
      border-right-color: transparent
      animation: spin 1s linear infinite
@keyframes spin
  0%
    transform: rotate(0deg)
  100%
    transform: rotate(360deg)
@keyframes blink
  0%,100%
    opacity: 0.5
  50%
    opacity: 1
</style>
<script>
import { QrStream } from 'vue3-qr-reader';
import { useToast } from "vue-toastification";
import { useHead } from "@vueuse/head"
import { inject } from 'vue'
export default {
  setup() {
    useHead({
      title: '櫃檯掃描器'
    })
    const toast = useToast();
    const cryoptojs = inject('cryptojs')
    return { toast, cryoptojs }
  },
  components: {
    QrStream,
  },
  data() {
    return ({
      nonTokenModal: false,
      tokenInvalidModal: false,
      redeemModal: false,
      redeemStatus: '兌換成功',
      redeemIcon: '兌換成功',
      loading: false,
      step: 0,
      token1: null,
      token2: null,
      puzzles: [],
    })
  },
  created() {
    // set --vh
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    // set theme-color to #82d357
    document.querySelector('meta[name="theme-color"]').setAttribute('content', '#82d357');
  },
  methods: {
    reset() {
      this.step = 0
      this.token1 = null
      this.token2 = null
      this.puzzles = []
      this.toast.info('狀態已重置')
    },
    async onDecode(content) {
      if (content) {
        // play beep
        this.$refs.beep.play()
        // vibration
        if (navigator.vibrate) {
          try {
            navigator.vibrate(10)
          } catch (e) {

          }
        }
        // check
        this.loading = true
        let tokenInvalid = await this.checkInvalid(content)
        this.loading = false
        if (tokenInvalid) {
          this.redeemStatus = '已被兌換'
          this.redeemIcon = [`bx`, `bxs-error`]
          if (typeof tokenInvalid == 'string') {
            this.redeemStatus += `<br/>兌換時間：${tokenInvalid}`
            this.redeemModal = true
          }
          this.reset()
          return
        }
        if (this.step == 0) {
          this.step = 1
          this.token1 = content
        }
        if (this.step == 1) {
          if (this.token1 != content) {
            this.step = 2
            this.token2 = content
            // check puzzle list & redeem
            this.redeem()
          }
        }
      }
    },
    async redeem() {
      let puzzles = [...new Set(this.puzzles)]
      if (puzzles.length == 27) {
        this.loading = true
        try {
          await fetch(`https://sitcon.opass.app/event/puzzle/revoke?token=${this.token1}`)
          if (this.token2 != '') {
            await fetch(`https://sitcon.opass.app/event/puzzle/revoke?token=${this.token2}`)
          }
        } catch (e) {
          this.loading = false
          this.toast.error('兌換時發生伺服器錯誤')
          this.reset()
          return
        }
        this.loading = false
        this.redeemStatus = '兌換成功'
        this.redeemIcon = [`bx`, `bxs-check-circle`]
        this.redeemModal = true
      } else {
        this.redeemStatus = `碎片不足(${puzzles.length}/27)`
        this.redeemIcon = [`bx`, `bx-sad`]
        this.redeemModal = true
      }
      this.reset()
    },
    async checkInvalid(token) {
      let publicToken = this.cryoptojs.SHA1(token).toString()
      let res = await fetch(`https://sitcon.opass.app/event/puzzle?token=${publicToken}`)
      if (res.ok) {
        res = await res.json()
        if (res.valid == null) {
          this.puzzles = [...this.puzzles, ...res.puzzles]
          return false
        } else {
          return new Date(res.valid * 1000).toLocaleString('zh-TW', {
            timeZone: 'Asia/Taipei',
            hourCycle: 'h23',
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
          })
        }
      } else {
        res = await res.json()
        if (res?.message) {
          this.toast.error('Token 無效')
          return true
        } else {
          this.toast.error('伺服器錯誤')
          return true
        }
      }
    },
  }
}
</script>