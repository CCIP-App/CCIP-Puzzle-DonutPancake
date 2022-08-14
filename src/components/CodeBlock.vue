<template>
  <div class="card">

    <pre class="code-block" :class="selectedPuzzles.map(x => `selected-${x}`)" v-if="problem == 1">
def main(foo):
    <span class="puzzle-a">if</span> <span class="puzzle-b">foo > 4</span><span class="puzzle-a">:</span>
        <span class="puzzle-c">output = foo * 2</span>
    <span class="puzzle-a">else:</span>
        <span class="puzzle-d">output = foo + 1</span>
    <span class="puzzle-e">print(output)</span></pre>
    <pre class="code-block" :class="selectedPuzzles.map(x => `selected-${x}`)" v-if="problem == 2">
def main(foo):
    <span class="puzzle-f">temp =</span> <span class="puzzle-g">"".join(</span><span class="puzzle-h">reversed(foo)</span><span class="puzzle-g">)</span>
    <span class="puzzle-a">if</span> <span class="puzzle-i">foo == temp</span><span class="puzzle-a">:</span>
        <span class="puzzle-j">print("True")</span>
    <span class="puzzle-a">else:</span>
        <span class="puzzle-k">print("False")</span> </pre>
    <pre class="code-block" :class="selectedPuzzles.map(x => `selected-${x}`)" v-if="problem == 3">
def main(foo):
    <span class="puzzle-l">i = 1</span>
    <span class="puzzle-m">temp = 4</span>
    <span class="puzzle-n">while</span> <span class="puzzle-o">i != foo</span><span class="puzzle-n">:</span>
        <span class="puzzle-p">if</span> <span class="puzzle-q">temp == foo</span><span class="puzzle-p">:</span>
            <span class="puzzle-r">print(i)</span>
        <span class="puzzle-s">temp = temp * 4</span>
        <span class="puzzle-t">i = i + 1</span></pre>
    <pre class="code-block" :class="selectedPuzzles.map(x => `selected-${x}`)" v-if="problem == 4">
def main(foo):
    <span class="puzzle-u">foo.sort()</span>
    <span class="puzzle-v">print(foo)</span></pre>
    <pre class="code-block" :class="selectedPuzzles.map(x => `selected-${x}`)" v-if="problem == 5">
def main(foo):
    <span class="puzzle-w">output = 0</span>
    <span class="puzzle-x">foo = 118</span>
    <span class="puzzle-y">for i in</span> <span class="puzzle-z">range(1, foo)</span><span class="puzzle-y">:</span>
        <span class="puzzle-p">if</span> <span class="puzzle-aa">i % 3 == 0 or i % 5 == 0</span><span class="puzzle-p">:</span>
            <span class="puzzle-ab">output = output + i</span>
    <span class="puzzle-e">print(output)</span> </pre>
  </div>
</template>

<script>
export default {
  props: {
    selectedPuzzles: {
      type: Array,
      default: []
    },
    problem: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style lang="sass" scoped>
.code-block
  $puzzles: a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,aa,ab
  @each $puzzle in $puzzles
    &.selected-#{$puzzle}
      .puzzle-#{$puzzle}
        color: #333
        background-color: #82d357
    .puzzle-#{$puzzle}
      color: transparent
      background-color: #ccc
      user-select: none
      display: inline-block
      border-radius: 2px
      line-height: 1.25
      padding: 4px 4px
      margin: 1px
</style>
