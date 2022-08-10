<template>
  <div>
    <h1>題目</h1>
    <div class="card">
      <div class="card-title">
        介紹
      </div>
      <div class="card-description">
        題目內容包含了輸入和輸出兩個部分，請嘗試找出兩者的規律，以手中的碎片拼湊出程式碼來解開題目吧！
      </div>
      <img src="/imgs/meow-puzzle.png" />
    </div>
    <div class="problem-card card" v-for="(problem, i) of problems" :key="i">
      <div class="problem-card-header">
        <div class="problem-card-header-num">{{ i + 1 }}</div>
        <div class="problem-card-header-title">{{ problem.title }}</div>
      </div>
      <div class="problem-card-content">
        <div class="problem-card-content-title">
          <div class="problem-card-input">Input</div>
          <div class="problem-card-output">Output</div>
        </div>
        <div class="problem-card-content-data" v-for="(item, i) of problem.data" :key="i">
          <div class="problem-card-input">
            {{ item.input }}
          </div>
          <div class="problem-card-output">{{ item.output }}</div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return ({
      problems: [
        {
          title: '第一題',
          data: [
            { input: 5, output: 10 },
            { input: 3, output: 4 },
            { input: 6, output: 12 },
            { input: 4, output: 5 },
            { input: 2, output: 3 },
            { input: 7, output: 14 },
          ]
        },
        {
          title: '第二題',
          data: [
            { input: 'aa', output: 'True' },
            { input: 'SITCON', output: 'False' },
            { input: 'connoc', output: 'True' },
            { input: 'Pancake', output: 'False' },
          ]
        },
        {
          title: '第三題',
          data: [
            { input: 16, output: 2 },
            { input: 256, output: 4 },
            { input: 1024, output: 5 },
            { input: 262144, output: 9 },
          ]
        },
        {
          title: '第四題',
          data: [
            { input: `[3]`, output: `[3]` },
            { input: `['c', 'd', 'a', 'b', 'r']`, output: `['a', 'b', 'c', 'd', 'r']` },
            { input: `[67, 23, 12, 45]`, output: `[12, 23, 45, 67]` },
            { input: `['P', 'A', 'N', 'C', 'A', 'K', 'E']`, output: `['A', 'A', 'C', 'E', 'K', 'N', 'P']` },
          ]
        },
        {
          title: '第五題',
          data: [
            { input: 23, output: 119 },
            { input: 45, output: 450 },
            { input: 118, output: 3300 },
          ]
        }
      ]
    })
  }
}
</script>

<style lang="sass" scoped>
.problem-card
  .problem-card-header
    display: flex
    align-items: center
    font-size: 1.5em
    font-weight: 700
    margin-bottom: 8px
    .problem-card-header-num
      font-family: 'Ubuntu Mono', monospace
      color: #333
      background-color: #82d357
      height: 1.5em
      width: 1.5em
      margin-right: 8px
      display: flex
      justify-content: center
      align-items: center
      border-radius: 4px
  .problem-card-content
    font-family: 'Ubuntu Mono', monospace
    line-height: 1.25
    .problem-card-content-title,.problem-card-content-data
      display: grid
      grid-template-columns: repeat(2,1fr)
      gap: 8px
      .problem-card-input,.problem-card-output
        padding: 8px
        border-radius: 4px
        margin-bottom: 8px
        &.problem-card-input
          background-color: #222
          color: #d7ffd1
        &.problem-card-output
          background-color: #222
          color: #82d357
    .problem-card-content-title
      font-weight: 700
    .problem-card-content-data
      opacity: 0.8
</style>