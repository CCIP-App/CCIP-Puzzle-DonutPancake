<template>
  <div>
    <nav-bar title="遊戲方式" />
    <div class="rule-card card">
      <div class="rule-card-title">
        程式碼碎片
      </div>
      <div class="rule-card-description">
        在報到時會獲得兩個程式碼碎片，可以在「我的碎片」中檢視。
      </div>
      <div class="rule-card-img">
        <img src="/imgs/rule-puzzle.png" />
      </div>
    </div>
    <div class="rule-card card">
      <div class="rule-card-title">
        取得更多碎片
      </div>
      <div class="rule-card-description">
        在工作人員掃描你的票券 QR Code 後即可獲得隨機碎片，你可以透過走訪攤位、參與十週年回憶展或是參加開放式議程「專案家家酒」來獲得碎片。 <br />
        <small>
          <ul>
            <li>每個攤位只能獲得一次碎片。</li>
            <li>
              開放式議程「專案家家酒」碎片獲得方式如下：
              <ul>
                <li>事前已提供專案展出者可獲得兩個碎片。</li>
                <li>現場參與互動討論者可獲得一個碎片。</li>
              </ul>
            </li>
          </ul>
        </small>
      </div>
      <div class="rule-card-img">
        <img src="/imgs/rule-booth.png" />
      </div>
    </div>
    <div class="rule-card card">
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
    <div class="rule-card card">
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
    <div class="rule-card card">
      <div class="rule-card-title">
        兌獎方式
      </div>
      <div class="rule-card-description">
        成功解開所有題目後，可至服務台兌換限量獎品，並獲得抽獎券，屆時將會在閉幕式抽出得獎者。
        <small>
          <ul>
            <li>獎品數量有限，先到先得。</li>
          </ul>
        </small>
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