<template>
  <div>
    <nav-bar :title="problems[problemId - 1].title" to="/problem" />
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
      return this.$route.params.id
    }
  },
  methods: {
  },
}
</script>