define(["@emotion/css","@grafana/data","@grafana/runtime","@grafana/ui","react","rxjs"],((e,t,n,l,a,r)=>(()=>{"use strict";var o=[e=>{e.exports=a},e=>{e.exports=l},t=>{t.exports=e},,e=>{e.exports=t},e=>{e.exports=n},e=>{e.exports=r}],c={};function i(e){var t=c[e];if(void 0!==t)return t.exports;var n=c[e]={exports:{}};return o[e](n,n.exports,i),n.exports}i.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return i.d(t,{a:t}),t},i.d=(e,t)=>{for(var n in t)i.o(t,n)&&!i.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},i.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),i.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var s={};return(()=>{i.r(s),i.d(s,{plugin:()=>$});var e=i(4),t=i(5);const n=function(e){return fetch(`http://34.199.12.114:6057/api/cloud-element/search?id=${e}`).then((e=>e.json()))},l=function(e){return fetch(`http://localhost:3001/api/datasources/aws-namespace/${e}`).then((e=>e.json()))},a={constant:6.5};var r=i(6);class o extends t.DataSourceWithBackend{constructor(e){super(e)}findParam(e,t){t||(t=location.href),e=e.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");const n=new RegExp("[\\?&]"+e+"=([^&#]*)").exec(t);return null==n?"":n[1]}getCloudElements(e){return(0,r.from)(n(e).then((t=>{let n={};if(t&&t[0]){const l=t[0];n={elementType:l.elementType,elementId:parseInt(e,10),cloudIdentifierName:l.instanceName,cloudIdentifierId:l.instanceId,environmentId:parseInt(e,10)}}return n})))}getDefaultQuery(e){return a}query(e){const t=this.findParam("var-elementId",window.location.href);return t?this.getCloudElements(t).pipe((0,r.mergeMap)((t=>{let n=e.targets;for(let e=0;e<n.length;e++)n[e]=Object.assign({},n[e],t);return super.query(e)}))):super.query(e)}}var c=i(0),u=i.n(c),m=i(1);const d="metric",p="log",g="trace",h="api";let v;!function(e){e[e.Builder=0]="Builder",e[e.Code=1]="Code"}(v||(v={}));const E=[{label:"Metric",value:d},{label:"LOG",value:p},{label:"Trace",value:g},{label:"API",value:h}],b=[{label:"INFRA",value:"infra"},{label:"SERVICE",value:"service"}],y=[{label:"Maximum",value:"Maximum"},{label:"Minimum",value:"Minimum"},{label:"Sum",value:"Sum"},{label:"SampleCount",value:"SampleCount"},{label:"Average",value:"Average"}];v.Builder,v.Code;var f=i(2);const I=["children"];const C=e=>{let{children:t}=e,n=function(e,t){if(null==e)return{};var n,l,a={},r=Object.keys(e);for(l=0;l<r.length;l++)n=r[l],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,I);const l=(0,m.useStyles2)((0,c.useCallback)((e=>x(e,n)),[n]));return u().createElement("div",{className:l.root},t)},x=(e,t)=>{var n,l,a;return{root:(0,f.css)({display:"flex",flexDirection:null!==(n=t.direction)&&void 0!==n?n:"row",flexWrap:null===(l=t.wrap)||void 0===l||l?"wrap":void 0,alignItems:t.alignItems,gap:e.spacing(null!==(a=t.gap)&&void 0!==a?a:2),flexGrow:t.flexGrow})}},O=e=>{let{label:t,collapsible:n,collapsed:l=!0,title:a,dataTestId:r,children:o}=e;const i=(0,m.useStyles2)(j),[s,d]=(0,c.useState)(l),p=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return`infinity-query-row${e?"-"+e:""}-${(r||t).replace(/\ /g,"-")}`.toLowerCase()};return u().createElement("div",{className:i.root,"data-testid":p("wrapper")},n&&u().createElement(u().Fragment,null,u().createElement(m.Button,{icon:s?"angle-down":"angle-right",fill:"text",size:"sm",variant:"secondary",onClick:e=>{d(!s),e.preventDefault()},style:{marginRight:"10px"},"data-testid":p("collapse-"+(s?"hide":"show"))}),u().createElement("span",{onClick:e=>{d(!s),e.preventDefault()},"data-testid":p("title")},u().createElement("b",{className:i.collapseTile},t)),u().createElement("span",{className:i.collapseTileSecondary},a?a():"Options")),s&&u().createElement("div",{style:{display:"flex",marginTop:t&&n?"15px":"0px",marginLeft:"0px"},"data-testid":p("children")},o))},j=e=>({root:(0,f.css)({padding:e.spacing(1),backgroundColor:e.colors.background.secondary,borderRadius:e.shape.borderRadius(1)}),collapseTile:(0,f.css)({marginRight:e.spacing(1),color:e.colors.secondary.text}),collapseTileSecondary:(0,f.css)({color:e.colors.text.secondary,fontSize:e.typography.bodySmall.fontSize,"&:hover":{color:e.colors.secondary.text}})}),w=e=>{let{children:t}=e;return u().createElement(C,{gap:.5,direction:"column"},t)};function S(e){let{query:t,onChange:n,editorMode:l,metricsList:a}=e;const{elementType:r,cloudIdentifierId:o,metricName:c,statistic:i,metricQuery:s}=t;return u().createElement(w,null,u().createElement(O,{label:""},u().createElement(m.InlineField,{label:"Element Type"},u().createElement(m.Input,{value:r,onChange:e=>(e=>{n(Object.assign({},t,{elementType:e.target.value}))})(e)})),u().createElement(m.InlineField,{label:"Instance ID"},u().createElement(m.Input,{value:o,onChange:e=>(e=>{n(Object.assign({},t,{cloudIdentifierId:e.target.value}))})(e)}))),l===v.Builder?u().createElement(O,{label:""},u().createElement(m.InlineField,{label:"Metric Name"},u().createElement(m.Select,{className:"min-width-12 width-12",value:c,options:a,onChange:e=>{return l=e.value,void n(Object.assign({},t,{metricName:l}));var l},menuShouldPortal:!0})),u().createElement(m.InlineField,{label:"Statistic"},u().createElement(m.Select,{className:"min-width-12 width-12",value:i,options:y,onChange:e=>{return l=e.value,void n(Object.assign({},t,{statistic:l}));var l},menuShouldPortal:!0}))):u().createElement(O,{label:""},u().createElement(m.Input,{placeholder:"Enter your query",value:s,onChange:e=>(e=>{n(Object.assign({},t,{metricQuery:e.target.value}))})(e)})))}function T(e){let{query:t,onChange:n}=e;const{elementType:l,instanceID:a,logQuery:r,logGroup:o}=t;return u().createElement(w,null,u().createElement(O,{label:""},u().createElement(m.InlineField,{label:"Element Type"},u().createElement(m.Input,{value:l,onChange:e=>(e=>{n(Object.assign({},t,{elementType:e.target.value}))})(e)})),u().createElement(m.InlineField,{label:"Instance ID"},u().createElement(m.Input,{value:a,onChange:e=>(e=>{n(Object.assign({},t,{instanceID:e.target.value}))})(e)})),u().createElement(m.InlineField,{label:"Log Group"},u().createElement(m.Input,{value:o,onChange:e=>(e=>{n(Object.assign({},t,{logGroup:e.target.value}))})(e)}))),u().createElement(O,{label:""},u().createElement(m.Input,{placeholder:"Enter your log query",value:r,onChange:e=>(e=>{n(Object.assign({},t,{logQuery:e.target.value}))})(e)})))}function F(e){let{query:t,onChange:n}=e;const{elementType:l,instanceID:a,traceQuery:r,traceLocation:o}=t;return u().createElement(w,null,u().createElement(O,{label:""},u().createElement(m.InlineField,{label:"Element Type"},u().createElement(m.Input,{value:l,onChange:e=>(e=>{n(Object.assign({},t,{elementType:e.target.value}))})(e)})),u().createElement(m.InlineField,{label:"Instance ID"},u().createElement(m.Input,{value:a,onChange:e=>(e=>{n(Object.assign({},t,{instanceID:e.target.value}))})(e)})),u().createElement(m.InlineField,{label:"Trace Location"},u().createElement(m.Input,{value:o,onChange:e=>(e=>{n(Object.assign({},t,{traceLocation:e.target.value}))})(e)}))),u().createElement(O,{label:""},u().createElement(m.Input,{placeholder:"Enter your trace query",value:r,onChange:e=>(e=>{n(Object.assign({},t,{traceQuery:e.target.value}))})(e)})))}const N=e=>{const t=(0,m.useTheme2)(),n=R(t,e);return u().createElement("span",{className:(0,f.cx)(n.wrapper)})};N.defaultProps={v:0,h:0,layout:"block"};const R=(0,m.stylesFactory)(((e,t)=>{var n,l;return{wrapper:(0,f.css)([{paddingRight:e.spacing(null!==(n=t.h)&&void 0!==n?n:0),paddingBottom:e.spacing(null!==(l=t.v)&&void 0!==l?l:0)},"inline"===t.layout&&{display:"inline-block"},"block"===t.layout&&{display:"block"}])}}));var D;const k=["label","optional","tooltip","children","promoNode","width","invalid","borderColor","tag","dataTestId","horizontal"];function q(){return q=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var l in n)Object.prototype.hasOwnProperty.call(n,l)&&(e[l]=n[l])}return e},q.apply(this,arguments)}const P=e=>{const{label:t,optional:n,tooltip:l,children:a,promoNode:r,width:o,invalid:c,borderColor:i,tag:s,dataTestId:d,horizontal:p}=e,g=function(e,t){if(null==e)return{};var n,l,a={},r=Object.keys(e);for(l=0;l<r.length;l++)n=r[l],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,k),h=(0,m.useTheme2)(),v=M(h,o,c?"red":i,p),E=(null==g?void 0:g.htmlFor)||(null===m.ReactUtils||void 0===m.ReactUtils?void 0:m.ReactUtils.getChildId(a)),b=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return`infinity-query-field${e?"-"+e:""}-${(d||t).replace(/\ /g,"-")}`.toLowerCase()},y=u().createElement(u().Fragment,null,u().createElement("label",{className:v.label,htmlFor:E,"data-testid":b("label")},t,s&&u().createElement(m.Tag,{name:s,className:v.tag,colorIndex:10}),n&&u().createElement("span",{className:v.optional}," - optional"),r,l&&u().createElement(m.Tooltip,{placement:"top",content:l,theme:"info"},u().createElement(m.Icon,{name:"info-circle",size:"sm",className:v.icon}))),D||(D=u().createElement(N,{v:.5})));return p?u().createElement("div",{className:v.root,"data-testid":b("wrapper")},u().createElement(m.Field,q({className:v.field,label:y},g,{horizontal:!0}),a)):u().createElement("div",{className:v.root,"data-testid":b("wrapper")},u().createElement(m.Field,q({className:v.field,label:y},g),a))},M=(0,m.stylesFactory)((function(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"transparent",l=arguments.length>3&&void 0!==arguments[3]&&arguments[3];return{root:(0,f.css)({minWidth:e.spacing(null!=t?t:0),paddingInlineStart:"7px",paddingInlineEnd:"5px",borderLeft:`1px solid ${n}`,marginRight:l?"10px":"5px"}),label:(0,f.css)({fontSize:12,fontWeight:e.typography.fontWeightMedium,paddingLeft:"1px",border:l?`1px solid ${n}`:"",padding:l?"5px 10px 5px 0px":"",textAlign:l?"right":"left"}),tag:(0,f.css)({marginLeft:"10px"}),optional:(0,f.css)({fontStyle:"italic",color:e.colors.text.secondary}),field:(0,f.css)({marginBottom:0,marginRight:"0px"}),icon:(0,f.css)({color:e.colors.text.secondary,marginLeft:e.spacing(1),":hover":{color:e.colors.text.primary}})}}));var A,L,B;function Q(e){let{query:t,onChange:n}=e;const{elementType:l,instanceID:a,method:r,columns:o,isObjectInsteadOfArray:i,isDataInColumn:s,rowsRoots:d}=t,[p,g]=u().useState([]),h=(0,c.useRef)(!1);u().useEffect((()=>{!1===h.current&&g(o||[{selector:"",as:"",formatAs:""}]),h.current=!0}),[o]);const v=(e,l,a,r)=>{l[e][a]=r,n(Object.assign({},t,{columns:JSON.parse(JSON.stringify(l))}))},E=(e,t)=>{e.splice(t,1),g(JSON.parse(JSON.stringify(e)))};return u().createElement(w,null,u().createElement(O,{label:""},u().createElement(m.InlineField,{label:"Element Type"},u().createElement(m.Input,{value:l,onChange:e=>(e=>{n(Object.assign({},t,{elementType:e.target.value}))})(e)})),u().createElement(m.InlineField,{label:"Instance ID"},u().createElement(m.Input,{value:a,onChange:e=>(e=>{n(Object.assign({},t,{instanceID:e.target.value}))})(e)})),u().createElement(m.InlineField,{label:"Method"},u().createElement(m.Input,{value:r,onChange:e=>(e=>{n(Object.assign({},t,{method:e.target.value}))})(e)}))),A||(A=u().createElement(O,{label:""},u().createElement("h5",null,u().createElement("b",null,"Parsing Option and Result Field")))),u().createElement(O,{label:""},u().createElement(P,{label:"Rows/Root - Optional"},u().createElement("textarea",{value:d,onChange:e=>{n(Object.assign({},t,{rowsRoots:e.target.value}))},placeholder:"Rows/Root Selector"}))),L||(L=u().createElement(O,{label:""},u().createElement("label",null,"Rows/Root - Optional"))),(e=>{const t=[];for(let n=0;n<e.length;n++){const l=e[n];t.push(u().createElement(O,{label:"",key:`column-${n}`},u().createElement(m.InlineField,{label:"Selector"},u().createElement(m.Input,{value:l.selector,onChange:t=>v(n,e,"selector",t.target.value)})),u().createElement(m.InlineField,{label:"as"},u().createElement(m.Input,{value:l.as,onChange:t=>v(n,e,"as",t.target.value)})),u().createElement(m.InlineField,{label:"Format as"},u().createElement(m.Input,{value:l.formatAs,onChange:t=>v(n,e,"formatAs",t.target.value)})),e.length>1?u().createElement(m.Button,{onClick:()=>E(e,n),icon:"times"}):u().createElement(u().Fragment,null)))}return t})(p),u().createElement(O,{label:"Column - Optional"},u().createElement(m.Button,{onClick:()=>{p.push({selector:"",as:"",formatAs:""}),g(JSON.parse(JSON.stringify(p)))},icon:"plus-square"},"Column")),B||(B=u().createElement(O,{label:""},u().createElement("label",null,"Advance Options - Optional"))),u().createElement(O,{label:""},u().createElement(m.Checkbox,{value:i,label:"Root returns object instead of array?",onChange:e=>{n(Object.assign({},t,{isObjectInsteadOfArray:e.target.checked}))}})),u().createElement(O,{label:""},u().createElement(m.Checkbox,{value:s,label:"Is data in column format?",onChange:e=>{n(Object.assign({},t,{isDataInColumn:e.target.checked}))}})))}const $=new e.DataSourcePlugin(o).setConfigEditor((function(e){const{onOptionsChange:t,options:n}=e,{jsonData:l}=n;return u().createElement("div",{className:"gf-form-group"},u().createElement(m.InlineField,{label:"Path",labelWidth:12},u().createElement(m.Input,{onChange:e=>{const l=Object.assign({},n.jsonData,{path:e.target.value});t(Object.assign({},n,{jsonData:l}))},value:l.path||"",placeholder:"json field returned to frontend",width:40})),u().createElement(m.InlineField,{label:"API Endpoint",labelWidth:12},u().createElement(m.Input,{onChange:e=>{const l=Object.assign({},n.jsonData,{apiEndpoint:e.target.value});t(Object.assign({},n,{jsonData:l}))},value:l.apiEndpoint||"",placeholder:"API Endpoint",width:40})))})).setQueryEditor((function(e){let{query:t,onChange:a,onRunQuery:r}=e;const[o,i]=(0,c.useState)(""),[s,y]=(0,c.useState)([]),f=(0,c.useRef)(!1),I=(0,c.useCallback)(((e,t)=>{n(e).then((n=>{if(n&&n[0]){const r=n[0];t=Object.assign({},t,{elementType:r.elementType,elementId:parseInt(e,10),cloudIdentifierName:r.instanceName,cloudIdentifierId:r.instanceId,type:"appkube-cloudwatch",queryMode:"Metrics",source:"url",productId:1,environmentId:parseInt(e,10),moduleId:2,serviceId:2,serviceType:"java app service",cmdbUrl:"",vaultUrl:"",namespace:r.elementType,matchExact:!0,expression:"",id:"",alias:"",period:"",metricQueryType:0,metricEditorMode:0,sqlExpression:"",accountId:"657907747545",region:""}),a(Object.assign({},t)),l(n[0].elementType).then((e=>{y(e)}))}}))}),[a]);(0,c.useEffect)((()=>{if(!1===f.current){const e=C("var-elementId",window.location.href);e?(i(e),I(e,t)):alert("Please set 'elementId' variable"),f.current=!0}}),[t,a,I]);const C=(e,t)=>{t||(t=location.href),e=e.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");const n=new RegExp("[\\?&]"+e+"=([^&#]*)").exec(t);return null==n?"":n[1]},x=e=>{a(Object.assign({},t,e))},{sourceType:O,metricType:j,metricEditorMode:w}=t,N=w||v.Builder;return u().createElement("div",null,u().createElement("div",{style:{display:"flex",alignItems:"center"}},u().createElement(m.InlineField,{label:"Source Type"},u().createElement(m.Select,{className:"min-width-12 width-12",value:O,options:E,onChange:e=>(e=>{if(e===d?t.queryType="timeSeriesQuery":e===p&&(t.queryType="logAction"),t.sourceType=e,o)I(o,t);else{const e=C("var-elementId",window.location.href);e?(i(e),I(e,t)):alert("Please set 'elementId' variable")}})(e.value),menuShouldPortal:!0})),O===d?u().createElement(u().Fragment,null,u().createElement(m.InlineField,{label:"Source Type"},u().createElement(m.Select,{className:"min-width-12 width-12",value:j,options:b,onChange:e=>{return n=e.value,void a(Object.assign({},t,{metricType:n}));var n},menuShouldPortal:!0})),u().createElement(m.InlineField,{label:"Element ID"},u().createElement(m.Input,{disabled:!0,value:o})),u().createElement("div",{style:{display:"block",flexGrow:"1"}})):u().createElement(u().Fragment,null)),u().createElement("div",null,O===d?u().createElement(S,{query:t,onChange:x,editorMode:N,metricsList:s}):u().createElement(u().Fragment,null),O===p?u().createElement(T,{query:t,onChange:x}):u().createElement(u().Fragment,null),O===g?u().createElement(F,{query:t,onChange:x}):u().createElement(u().Fragment,null),O===h?u().createElement(Q,{query:t,onChange:x}):u().createElement(u().Fragment,null)))}))})(),s})()));
//# sourceMappingURL=module.js.map