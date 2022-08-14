<template>
  <div>
    <nav-bar :title="problems[problemId - 1].title" to="/problem" />
    <div class="card">
      <div class="card-title">
        如何解題？
      </div>
      <div class="card-description">
        請點擊位於下方碎片區域中的碎片，當點擊符合的碎片後，程式碼區域將會自動顯示該碎片。<br />你可以隨時退出題目頁面，進度會隨時儲存在你的裝置上，不必擔心進度遺失。
      </div>
    </div>
    <div class="problem-card card">
      <div class="problem-card-content">
        <div class="problem-card-content-title">
          <div class="problem-card-input">Input</div>
          <div class="problem-card-output">Output</div>
        </div>
        <div class="problem-card-content-data" v-for="(item, i) of problems[problemId - 1].data" :key="i">
          <div class="problem-card-input"> {{ item.input }} </div>
          <div class="problem-card-output">{{ item.output }}</div>
        </div>
      </div>
    </div>
    <code-block :problem="problemId" :selectedPuzzles="selectedPuzzles" />
    <puzzle-selector :problem="problemId" v-model="selectedPuzzles" />
  </div>
</template>
<script>

import problems from '@/assets/problems'
export default {
  data() {
    return ({
      selectedPuzzles: [],
      problems,
    })
  },
  computed: {
    problemId() {
      return parseInt(this.$route.params.id)
    }
  },
  methods: {
  },
}
</script>