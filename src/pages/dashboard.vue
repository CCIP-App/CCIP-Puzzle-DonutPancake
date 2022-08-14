<template>
  <div>
    <h1>Dashboard</h1>
    <p>下次重新整理：{{ countdown }} 秒</p>
    <div class="dashboard-item" v-for="item of data" :key="item._id.$oid">
      <div class="name">{{ puzzleList[item.puzzle] }}</div>
      <div class="item">
        <div class="value">
          {{ item.quantity.toLocaleString() }}
        </div>
        <div class="title">已發出</div>
      </div>
      <div class="item">
        <div class="value">
          {{ item.currency.toLocaleString() }}
        </div>
        <div class="title">有效</div>
      </div>
    </div>
  </div>
</template>
<script>
import puzzleList from '@/assets/puzzles'
import { useToast } from "vue-toastification";
import { useHead } from "@vueuse/head"
export default {
  setup() {
    const toast = useToast();
    useHead({
      title: 'Dashboard'
    })
    return { toast }
  },
  data() {
    return ({
      puzzleList,
      data: null,
      countdown: 60
    })
  },
  created() {
    this.getData()
    setInterval(() => {
      this.getData()
      this.countdown = 60
    }, 60000)
    setInterval(() => {
      this.countdown--
    }, 1000)
  },
  methods: {
    async getData() {
      let res = await fetch('https://sitcon.opass.app/event/puzzle/dashboard')
      let data = await res.json()
      // move last item to first
      let temp = data.pop()
      data.unshift(temp)

      this.data = data
    }
  },
}
</script>
<style lang="sass" scoped>
.dashboard-item
  border: 1px solid rgba(255,255,255,.2)
  border-radius: 3px
  padding: 6px 12px
  margin-bottom: 6px
  display: grid
  grid-template-columns: 1fr 96px 96px
  align-items: center
  font-family: 'Ubuntu Mono', 'Noto Sans TC', monospace
  .item
    text-align: right
    .value
      font-size: 1.5rem
      font-weight: bold
    .title
      font-size: 0.8rem
      opacity: .75
</style>