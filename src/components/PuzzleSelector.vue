<template>
  <div class="puzzle-selector">
    <div class="card" v-if="!puzzles">
      <loader />
    </div>
    <div class="card puzzle-cards" v-else-if="puzzles.length">
      <div class="puzzle-card" v-for="puzzle of puzzles" :key="puzzle" @click="selectPuzzle(puzzle)"
        :class="{ selected: modelValue.includes(puzzle) }">
        {{ puzzleList[puzzle] }}
      </div>
    </div>
  </div>
</template>

<script>
import puzzleList from '@/assets/puzzles'
import problems from '@/assets/problems'
import { useToast } from "vue-toastification";
export default {
  setup() {
    const toast = useToast();
    return { toast }
  },
  props: {
    modelValue: {
      type: Array,
      default: () => [],
    },
    problem: {
      type: Number,
      required: true,
    },
  },
  data() {
    return ({
      puzzleList,
      puzzles: null,
    })
  },
  created() {
    this.getData()
  },
  methods: {
    async getPuzzles(token) {
      let result = await fetch(`https://sitcon.opass.app/event/puzzle?token=${token}`)
      if (result.ok) {
        result = await result.json()
        result.deliverers = result.deliverers.sort((a, b) => b.timestamp - a.timestamp)
        return result
      }
      return null
    },
    selectPuzzle(puzzle) {
      let problem = problems[this.problem - 1]
      let requiredPuzzle = problem.required
      if (requiredPuzzle.includes(puzzle)) {
        this.modelValue.push(puzzle)
        this.$emit('update:modelValue', this.modelValue)
        localStorage.setItem(`problem-${this.problem}`, JSON.stringify(this.modelValue))
        if (requiredPuzzle.length === this.modelValue.length) {
          this.toast.success('恭喜你完成這個題目！')
        }
      } else {
        this.toast.error('這個碎片似乎拼不上這個題目')
      }
    },
    async getData() {
      let puzzleResult = []
      let token = localStorage.getItem('token')
      if (token) {
        let res = await this.getPuzzles(token)
        if (res) {
          puzzleResult = res.puzzles
        } else {
          res = []
          this.toast.error('無法取得碎片。')
        }
      }
      let partnerToken = localStorage.getItem('partnerToken')
      if (partnerToken) {
        let res = await this.getPuzzles(partnerToken)
        if (res) {
          puzzleResult = [...puzzleResult, ...res.puzzles]
        } else {
          this.toast.error('無法取得夥伴的碎片，請重新加入夥伴。')
        }
      }
      this.puzzles = [...new Set(puzzleResult)]
    }
  }
}
</script>

<style>
</style>