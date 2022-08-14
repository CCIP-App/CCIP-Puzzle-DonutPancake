<template>
  <div>
    <h1>遊戲方式</h1>
    <div class="card">
      <div class="card-title">
        程式碼碎片
      </div>
      <div class="card-description">
        在報到時會獲得兩個程式碼碎片，可以在「碎片」頁面中檢視。
      </div>
      <img src="/imgs/rule-puzzle.png" />
    </div>
    <div class="card">
      <div class="card-title">
        取得更多碎片
      </div>
      <div class="card-description">
        在工作人員掃描你的票券 QR Code 後即可獲得隨機碎片，你可以透過走訪攤位或是參與十週年回憶展來獲得碎片。
      </div>
      <img src="/imgs/rule-booth.png" />
      <div class="card-description">
        <small>
          <ul>
            <li>每個攤位只能獲得一次碎片。</li>
          </ul>
        </small>
      </div>
    </div>
    <div class="card">
      <div class="card-title">
        尋找夥伴
      </div>
      <div class="card-description">
        你可以尋找持有不同碎片的夥伴，透過兩人持有的碎片，一起解開題目。
      </div>
      <img src="/imgs/rule-team.png" />
    </div>
    <div class="card">
      <div class="card-title">
        兌獎方式
      </div>
      <div class="card-description">
        成功解開所有題目後，可至服務台兌換限量獎品，並獲得抽獎券，屆時將會在閉幕式抽出得獎者。
      </div>
      <img src="/imgs/rule-gifts.png" />
      <div class="card-description">
        <small>
          <ul>
            <li>獎品數量有限，先到先得。</li>
          </ul>
        </small>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useHead } from "@vueuse/head"
useHead({
  title: '規則'
})
</script>
