import{_ as k}from"./Modal.01712055.js";import{_ as g,u as y,r as D,o as s,c as l,Z as p,aL as u,d as V,w as d,b as e,t as a,i,g as x,e as _}from"./index.e70b3d69.js";import{p as h}from"./problems.45b2c969.js";import{_ as M}from"./meow-puzzle.d6420114.js";import{_ as N}from"./rule-gifts.df448891.js";const B="/imgs/done.svg",C={setup(){y({title:"\u984C\u76EE"})},data(){return{problems:h,done:{1:!1,2:!1,3:!1,4:!1,5:!1},allDoneModal:!1,hasPartner:!1}},created(){this.hasPartner=localStorage.getItem("partnerToken")!==null,this.checkDone()},methods:{checkDone(){for(let r of Object.keys(this.done)){let t=localStorage[`problem-${r}`];t&&(t=JSON.parse(t),t.length==h[r-1].required.length&&(this.done[r]=!0))}Object.values(this.done).every(r=>r)&&(this.allDoneModal=!0)}}},O=e("h1",null,"\u984C\u76EE",-1),P=e("div",{class:"card"},[e("div",{class:"card-title"}," \u4ECB\u7D39 "),e("div",{class:"card-description"}," \u984C\u76EE\u5167\u5BB9\u5305\u542B\u4E86\u8F38\u5165\u548C\u8F38\u51FA\u5169\u500B\u90E8\u5206\uFF0C\u8ACB\u5617\u8A66\u627E\u51FA\u5169\u8005\u7684\u898F\u5F8B\uFF0C\u4EE5\u624B\u4E2D\u7684\u788E\u7247\u62FC\u6E4A\u51FA\u7A0B\u5F0F\u78BC\u4F86\u89E3\u958B\u984C\u76EE\u5427\uFF01 "),e("img",{src:M})],-1),S={class:"problem-card-header"},j={class:"problem-card-header-num"},w={class:"problem-card-header-title"},I={key:0,src:B,class:"done"},L={key:1,class:"problem-card-content"},T=e("div",{class:"problem-card-content-title"},[e("div",{class:"problem-card-input"},"Input"),e("div",{class:"problem-card-output"},"Output")],-1),q={class:"problem-card-input"},E={class:"problem-card-output"},F=_(" \u89E3\u984C "),H=_(" \u606D\u559C\uFF01 "),J=e("br",null,null,-1),U=e("small",null,"\uFF0A \u734E\u54C1\u6578\u91CF\u6709\u9650\uFF0C\u5148\u5230\u5148\u5F97\u3002",-1),Z=e("img",{src:N},null,-1);function z(r,t,A,G,o,K){const f=D("router-link"),v=k;return s(),l("div",null,[O,P,(s(!0),l(p,null,u(o.problems,(c,n)=>(s(),l("div",{class:"problem-card card",key:n},[e("div",S,[e("div",j,a(n+1),1),e("div",w,a(c.title),1)]),o.done[n+1]?(s(),l("img",I)):i("",!0),o.done[n+1]?i("",!0):(s(),l("div",L,[T,(s(!0),l(p,null,u(c.data,(m,b)=>(s(),l("div",{class:"problem-card-content-data",key:b},[e("div",q,a(m.input),1),e("div",E,a(m.output),1)]))),128))])),o.done[n+1]?i("",!0):(s(),x(f,{key:2,class:"btn",to:`/problem/${n+1}`},{default:d(()=>[F]),_:2},1032,["to"]))]))),128)),V(v,{modelValue:o.allDoneModal,"onUpdate:modelValue":t[1]||(t[1]=c=>o.allDoneModal=c)},{title:d(()=>[H]),content:d(()=>[_(" \u4F60\u5DF2\u6210\u529F"+a(o.hasPartner?"\u548C\u4F60\u7684\u5925\u4F34":"")+"\u5B8C\u6210\u6240\u6709\u984C\u76EE\uFF0C\u8ACB"+a(o.hasPartner?"\u8207\u5925\u4F34\u4E00\u540C":"")+"\u524D\u5F80\u670D\u52D9\u53F0\u9818\u53D6\u734E\u54C1\u8207\u62BD\u734E\u5238\u5427\uFF01 ",1),J,U,Z]),actions:d(()=>[e("a",{class:"modal-action primary",onClick:t[0]||(t[0]=c=>o.allDoneModal=!1)},"\u4E86\u89E3")]),_:1},8,["modelValue"])])}const $=g(C,[["render",z]]);export{$ as default};
