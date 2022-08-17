<template>
  <div>
    <p style="margin-top:0;">
      請檢查 OPass 是否已成功報到，或透過下列方式進入遊戲。
    </p>
    <div class="select-items">
      <div class="select-item" @click="manualInputModal = true">
        <div class="icon">
          <i class='bx bxs-keyboard'></i>
        </div>
        <div class="content">
          <div class="title">手動輸入票券代碼</div>
          <div class="description"></div>
        </div>
      </div>
      <div class="select-item" @click="scanQRCodeModal = true">
        <div class="icon">
          <i class='bx bx-qr-scan'></i>
        </div>
        <div class="content">
          <div class="title">掃描票券 QR Code</div>
          <div class="description"></div>
        </div>
      </div>
    </div>
    <modal v-model="manualInputModal">
      <template #title>
        手動輸入票券代碼
      </template>
      <template #content>
        <p style="margin-top:0;">請輸入 OPass 票券代碼</p>
        <input class="input" v-model="token" placeholder="請輸入票券代碼" />
      </template>
      <template #actions>
        <a class="modal-action" @click="manualInputModal = false">取消</a>
        <a class="modal-action primary" @click="goToken">完成</a>
      </template>
    </modal>
    <modal v-model="scanQRCodeModal">
      <template #title>
        掃描票券 QR Code
      </template>
      <template #content>
        <p style="margin-top:0;">請開啟 OPass 中的我的票券，並掃描其中的 QR Code</p>

        <qr-stream @decode="onDecode" class="qrstream">
          <div class="frame"></div>
        </qr-stream>
      </template>
      <template #actions>
        <a class="modal-action" @click="scanQRCodeModal = false">取消</a>
      </template>
    </modal>
  </div>
</template>
<style lang="sass" scoped>
.qrstream
  width: 100%
  aspect-ratio: 1
  border-radius: 8px
  overflow: hidden
  background-color: #222
</style>
<script>
import { QrStream } from 'vue3-qr-reader';
export default {
  components: {
    QrStream
  },
  data() {
    return ({
      manualInputModal: false,
      scanQRCodeModal: false,
      token: '',
    })
  },
  methods: {
    goToken() {
      location.href = `/?token=${this.token}`
    },
    onDecode(content) {
      this.token = content;
      this.scanQRCodeModal = false;
      this.goToken();
    }
  }
}
</script>