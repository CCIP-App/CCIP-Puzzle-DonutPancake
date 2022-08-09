<template>
  <div>
    <nav-bar title="遊戲方式" />
    <div class="rule-card">
      <div class="rule-card-title">
        程式碼碎片
      </div>
      <div class="rule-card-description">
        在入場時會獲得兩個程式碼碎片，可以在「我的碎片」中檢視，使用碎片解開所有題目後可兌換獎品。
      </div>
      <div class="rule-card-img">
        <img src="/imgs/rule-puzzle.png" />
      </div>
    </div>
    <div class="rule-card">
      <div class="rule-card-title">
        尋找夥伴
      </div>
      <div class="rule-card-description">
        你可以尋找持有不同碎片的夥伴，透過兩人持有的碎片，一起解開題目。
      </div>
      <div class="rule-card-img">
        <img src="/imgs/rule-team.png" />
      </div>
    </div>
    <div class="rule-card">
      <div class="rule-card-title">
        獲得更多碎片
      </div>
      <div class="rule-card-description">
        在工作人員掃描你的票券 QR Code 後即可獲得隨機碎片，你可以透過走訪攤位、參與十週年回憶展或是參加開放式議程「專案家家酒」來獲得碎片。 <br />
        <small>
          * 每個攤位只能獲得一次碎片。
        </small>
        <br />
        <small>
          * 參與開放式議程「專案家家酒」，事前已提供專案展出者會額外獲得兩個碎片，現場參與互動討論者可以獲得一個碎片。
        </small>
      </div>
      <div class="rule-card-img">
        <img src="/imgs/rule-booth.png" />
      </div>
    </div>
    <div class="rule-card">
      <div class="rule-card-title">
        不可重複使用
      </div>
      <div class="rule-card-description">
        碎片不可被重複使用，若你需要使用兩次相同的碎片，則需持有兩個相同的碎片。
      </div>
      <div class="rule-card-img">
        <img src="/imgs/rule-reuse.png" />
      </div>
    </div>
    <div class="rule-card">
      <div class="rule-card-title">
        兌獎方式
      </div>
      <div class="rule-card-description">
        成功解開所有題目後，可至服務台兌換限量獎品，並獲得抽獎券，屆時將會在閉幕式抽出得獎者。
      </div>
      <div class="rule-card-img">
        <img src="/imgs/rule-gifts.png" />
      </div>
    </div>

  </div>
</template>

<script>
export default {

}
</script>

<style lang="sass" scoped>
.rule-card
  border: 2px solid #82d357
  border-radius: 8px
  padding: 16px
  margin: 16px 0
  .rule-card-title
    font-size: 1.5rem
    font-weight: 700
    margin-bottom: 8px
  .rule-card-description
    line-height: 1.5
    margin-bottom: 8px
    opacity: 0.75
  img
    width: 50%
    display: block
    margin: 0 auto
</style>