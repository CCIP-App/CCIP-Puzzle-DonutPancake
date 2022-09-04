import{_ as v}from"./Modal.01712055.js";import{v as f}from"./vue3-qr-reader.common.84d2c55e.js";import{_ as k,u as g,a as y,ap as b,r as z,o as l,c,b as e,d as h,w as p,i as _,S as d,p as S,f as w}from"./index.e70b3d69.js";import{_ as x}from"./alert.e79a58db.js";const C={setup(){g({title:"\u6AC3\u6AAF\u6383\u63CF\u5668"});const t=y(),s=b("cryptojs");return{toast:t,cryoptojs:s}},components:{QrStream:f.exports.QrStream},data(){return{nonTokenModal:!1,tokenInvalidModal:!1,redeemModal:!1,redeemStatus:"\u514C\u63DB\u6210\u529F",redeemIcon:"\u514C\u63DB\u6210\u529F",loading:!1,step:0,token1:null,token2:null,puzzles:[]}},created(){let t=window.innerHeight*.01;document.documentElement.style.setProperty("--vh",`${t}px`),document.querySelector('meta[name="theme-color"]').setAttribute("content","#82d357")},methods:{reset(){this.step=0,this.token1=null,this.token2=null,this.puzzles=[],this.toast.info("\u72C0\u614B\u5DF2\u91CD\u7F6E")},async onDecode(t){if(t){if(this.$refs.beep.play(),navigator.vibrate)try{navigator.vibrate(10)}catch{}this.loading=!0;let s=await this.checkInvalid(t);if(this.loading=!1,s){this.redeemStatus="\u5DF2\u88AB\u514C\u63DB",this.redeemIcon=["bx","bxs-error"],typeof s=="string"&&(this.redeemStatus+=`<br/>\u514C\u63DB\u6642\u9593\uFF1A${s}`,this.redeemModal=!0),this.reset();return}this.step==0&&(this.step=1,this.token1=t),this.step==1&&this.token1!=t&&(this.step=2,this.token2=t,this.redeem())}},async redeem(){[...new Set(this.puzzles)],this.loading=!0;try{await fetch(`https://sitcon.opass.app/event/puzzle/revoke?token=${this.token1}`),this.token2!=""&&await fetch(`https://sitcon.opass.app/event/puzzle/revoke?token=${this.token2}`)}catch{this.loading=!1,this.toast.error("\u514C\u63DB\u6642\u767C\u751F\u4F3A\u670D\u5668\u932F\u8AA4"),this.reset();return}this.loading=!1,this.redeemStatus="\u514C\u63DB\u6210\u529F",this.redeemIcon=["bx","bxs-check-circle"],this.redeemModal=!0,this.reset()},async checkInvalid(t){let s=this.cryoptojs.SHA1(t).toString(),o=await fetch(`https://sitcon.opass.app/event/puzzle?token=${s}`);return o.ok?(o=await o.json(),o.valid==null?(this.puzzles=[...this.puzzles,...o.puzzles],!1):new Date(o.valid*1e3).toLocaleString("zh-TW",{timeZone:"Asia/Taipei",hourCycle:"h23",year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit"})):(o=await o.json(),o!=null&&o.message?(this.toast.error("Token \u7121\u6548"),!0):(this.toast.error("\u4F3A\u670D\u5668\u932F\u8AA4"),!0))}}},i=t=>(S("data-v-de33ead1"),t=t(),w(),t),I={class:"mobile-view-container"},M={class:"mobile-view"},T=i(()=>e("div",{class:"header"},[e("div",{class:"title"},"\u6AC3\u6AAF"),e("div",{class:"subtitle"},"\u6AC3\u6AAF\u6383\u63CF\u5668")],-1)),Q={class:"frame"},j={key:0,class:"loader"},V={class:"footer"},D={class:"steps"},H=i(()=>e("div",{class:"step-number"},"1",-1)),R=i(()=>e("div",{class:"step-title"},"\u6383\u63CF QR Code",-1)),q=i(()=>e("div",{class:"step-description"},"\u8ACB\u6383\u63CF\u7B2C\u4E00\u4F4D\u4F7F\u7528\u8005\u7684 QR Code\u3002",-1)),A=[H,R,q],B=i(()=>e("div",{class:"step-number"},"2",-1)),L=i(()=>e("div",{class:"step-title"},"\u6383\u63CF QR Code",-1)),N=i(()=>e("div",{class:"step-description"},"\u8ACB\u6383\u63CF\u7B2C\u4E8C\u4F4D\u4F7F\u7528\u8005\u7684 QR Code\u3002",-1)),E=[B,L,N],P=i(()=>e("div",{class:"step-number"},"3",-1)),U=i(()=>e("div",{class:"step-title"},"\u6AA2\u8996\u662F\u5426\u7B26\u5408\u8CC7\u683C",-1)),W=i(()=>e("div",{class:"step-description"},"\u7CFB\u7D71\u5C07\u81EA\u52D5\u986F\u793A\u662F\u5426\u7B26\u5408\u514C\u63DB\u8CC7\u683C\u3002",-1)),Z=[P,U,W],F={class:"redeem-icon"},G=["innerHTML"],J={id:"beep",ref:"beep",style:{display:"none"}},K=i(()=>e("source",{src:x,type:"audio/ogg"},null,-1)),O=[K];function X(t,s,o,Y,n,r){const u=z("qr-stream"),m=v;return l(),c("div",I,[e("div",M,[h(u,{onDecode:r.onDecode,class:"qrstream"},{default:p(()=>[e("div",null,[T,e("div",Q,[n.loading?(l(),c("div",j)):_("",!0)]),e("div",V,[e("div",D,[e("div",{class:d(["step",{active:n.step==0}])},A,2),e("div",{class:d(["step",{active:n.step==1}])},E,2),e("div",{class:d(["step",{active:n.step==2}])},Z,2)]),n.step==1?(l(),c("div",{key:0,class:"btn",onClick:s[0]||(s[0]=(...a)=>r.redeem&&r.redeem(...a))}," \u8DF3\u904E\u7B2C\u4E8C\u4F4D\u4F7F\u7528\u8005\u7684\u6383\u63CF ")):_("",!0),e("div",{class:"btn",onClick:s[1]||(s[1]=(...a)=>r.reset&&r.reset(...a))}," \u91CD\u7F6E ")])])]),_:1},8,["onDecode"]),h(m,{modelValue:n.redeemModal,"onUpdate:modelValue":s[3]||(s[3]=a=>n.redeemModal=a)},{content:p(()=>[e("div",F,[e("i",{class:d(n.redeemIcon)},null,2)]),e("div",{style:{"text-align":"center"},innerHTML:n.redeemStatus},null,8,G)]),actions:p(()=>[e("a",{class:"modal-action",onClick:s[2]||(s[2]=a=>n.redeemModal=!1)},"\u95DC\u9589")]),_:1},8,["modelValue"]),e("audio",J,O,512)])])}const oe=k(C,[["render",X],["__scopeId","data-v-de33ead1"]]);export{oe as default};
