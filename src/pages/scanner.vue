<template>
  <div class="mobile-view-container">
    <div class="mobile-view">
      <nav-bar title="攤位掃描器" hide-back />
      <qr-stream @decode="onDecode" class="qrstream">
        <div>
          <div style="color: red;" class="frame"></div>
          <div class="display-name">{{ displayName }}</div>
        </div>
      </qr-stream>
      <modal v-model="nonTokenModal">
        <template #title>
          未偵測到 Token
        </template>
        <template #content>
          請檢查連結是否有缺漏，若持續發生此問題，請聯絡工作人員。
        </template>
        <template #actions>
          <a class="modal-action" @click="nonTokenModal = false">關閉</a>
        </template>
      </modal>
      <modal v-model="tokenInvalidModal">
        <template #title>
          Token 無效
        </template>
        <template #content>
          請檢查連結是否有缺漏，若持續發生此問題，請聯絡工作人員。
        </template>
        <template #actions>
          <a class="modal-action" @click="nonTokenModal = false">關閉</a>
        </template>
      </modal>
      <audio id="beep" ref="beep" style="display: none;">
        <source src="/sounds/alert.wav" type="audio/ogg">
      </audio>
    </div>
  </div>
</template>

<style lang="sass" scoped>
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
  height: calc(var(--vh,1vh) * 100 - 60px) !important
  height: calc(100dvh - 60px) !important
  position: relative
  .frame
    position: absolute
    top: 0
    left: 0
    right: 0
    bottom: 0
    margin: auto
    width: 200px
    height: 200px
    border: 2px solid #82d357
    box-sizing: border-box
    pointer-events: none
    animation: blink 1s ease-in-out infinite
  .display-name
    position: absolute
    left: 0
    right: 0
    bottom: 0
    margin: auto
    color: #333
    font-size: 24px
    font-weight: 700
    text-align: center
    background-color: #82d357
    padding: 8px
    opacity: .75
@keyframes blink
  0%,100%
    opacity: 0.5
  50%
    opacity: 1
</style>
<script>
import { QrStream } from 'vue3-qr-reader';
import { useToast } from "vue-toastification";
export default {
  setup() {
    const toast = useToast();
    return { toast }
  },
  components: {
    QrStream,
  },
  data() {
    return ({
      nonTokenModal: false,
      tokenInvalidModal: false,
      displayName: '',
    })
  },
  created() {
    this.checkToken()
    // set --vh
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    // set theme-color to #82d357
    document.querySelector('meta[name="theme-color"]').setAttribute('content', '#82d357');
  },
  methods: {
    async checkToken() {
      // get token from url query
      let token = this.$route.query.token
      if (!token) {
        this.nonTokenModal = true
        return
      }
      // check token
      let res = await fetch(`https://sitcon.opass.app/event/puzzle/deliverer?token=${token}`)
      if (res.ok) {
        res = await res.json()
        if (res.slug) {
          this.displayName = res.slug
        }
      } else {
        this.tokenInvalidModal = true
      }
    },
    async onDecode(content) {
      if (content) {
        // play beep
        this.$refs.beep.play()
        // vibration
        if (navigator.vibrate) {
          navigator.vibrate(10)
        }

        console.log(content)
        let token = this.$route.query.token
        // post https://sitcon.opass.app/event/puzzle/deliverer?token=${token}
        let formData = new FormData()
        formData.append('receiver', content)
        let res = await fetch(`https://sitcon.opass.app/event/puzzle/deliver?token=${token}`, {
          method: 'POST',
          body: formData,
        })
        if (res.ok) {
          res = await res.json()
          this.toast.success(`已成功發送碎片！`)
        } else {
          res = await res.json()
          if (res.message == 'Already take from this deliverer') {
            this.toast.info(`該會眾已取得碎片！`)
          } else if (res.message == 'invalid receiver token') {
            this.toast.error(`無效的 QR code！`)
          } else {
            this.toast.error(res.message);
          }
        }
      }
    }
  }
}
</script>