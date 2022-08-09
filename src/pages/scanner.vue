<template>
  <div>
    <nav-bar title="攤位掃描器" hide-back />
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
  </div>
</template>
<script>
export default {
  data() {
    return ({
      nonTokenModal: false,
    })
  },
  created() {
    // get token from url query
    let token = this.$route.query.token
    if (token) {
      localStorage.setItem('token', token)
    } else {
      this.nonTokenModal = true
    }
  }
}
</script>