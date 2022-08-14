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
      <img src="/imgs/done.svg" class="done" v-if="done[i + 1]" />
      <template v-if="!done[i + 1]">
        <div class="problem-card-content">
          <div class="problem-card-content-title">
            <div class="problem-card-input">Input</div>
            <div class="problem-card-output">Output</div>
          </div>
          <div class="problem-card-content-data" v-for="(item, i) of problem.data" :key="i">
            <div class="problem-card-input"> {{ item.input }} </div>
            <div class="problem-card-output">{{ item.output }}</div>
          </div>
        </div>
      </template>
      <router-link class="btn" :to="`/problem/${i + 1}`" v-if="!done[i + 1]">
        解題
      </router-link>
    </div>
    <modal v-model="allDoneModal">
      <template #title>
        恭喜！
      </template>
      <template #content>
        你已成功{{ hasPartner ? '和你的夥伴' : '' }}完成所有題目，請{{ hasPartner ? '與夥伴一同' : '' }}前往服務台領取獎品與抽獎券吧！
        <br />
        <small>＊ 獎品數量有限，先到先得。</small>
        <img src="/imgs/rule-gifts.png" />
      </template>
      <template #actions>
        <a class="modal-action primary" @click="allDoneModal = false">了解</a>
      </template>
    </modal>
  </div>
</template>

<script>
import problems from '@/assets/problems'
export default {
  data() {
    return ({
      problems,
      done: {
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
      },
      allDoneModal: false,
      hasPartner: false,
    })
  },
  created() {
    this.hasPartner = localStorage.getItem('partnerToken') !== null
    this.checkDone()
  },
  methods: {
    checkDone() {
      for (let i of Object.keys(this.done)) {
        let item = localStorage[`problem-${i}`]
        if (item) {
          item = JSON.parse(item)
          if (item.length == problems[i - 1].required.length) {
            this.done[i] = true
          }
        }
      }
      if (Object.values(this.done).every(item => item)) {
        this.allDoneModal = true
      }
    }
  }

}
</script>