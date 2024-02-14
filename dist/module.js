define(["@emotion/css","@grafana/data","@grafana/runtime","@grafana/ui","react","rxjs"],((e,t,n,a,r,l)=>(()=>{"use strict";var o=[e=>{e.exports=r},e=>{e.exports=a},t=>{t.exports=e},,e=>{e.exports=t},e=>{e.exports=n},e=>{e.exports=l}],i={};function s(e){var t=i[e];if(void 0!==t)return t.exports;var n=i[e]={exports:{}};return o[e](n,n.exports,s),n.exports}s.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return s.d(t,{a:t}),t},s.d=(e,t)=>{for(var n in t)s.o(t,n)&&!s.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},s.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),s.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var c={};return(()=>{s.r(c),s.d(c,{plugin:()=>x});var e=s(4),t=s(5);function n(e,t,n){return(t=function(e){var t=function(e,t){if("object"!=typeof e||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var a=n.call(e,t||"default");if("object"!=typeof a)return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==typeof t?t:String(t)}(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}class a{constructor(e,t){n(this,"cmdbEndpoint",""),n(this,"grafanaEndpoint",""),this.cmdbEndpoint=e,this.grafanaEndpoint=t}getCloudElements(e){return fetch(`${this.cmdbEndpoint}/cloud-element/search?id=${e}`).then((e=>e.json()))}getSupportedPanels(e,t){return fetch(`${this.cmdbEndpoint}/cloud-element-supported-api/search?elementType=${e}&cloud=${t}`).then((e=>e.json()))}}const r={constant:6.5};let l;!function(e){e[e.Builder=0]="Builder",e[e.Code=1]="Code"}(l||(l={}));const o=[{label:"JSON",value:"JSON"},{label:"Frame",value:"Frame"}],i=(l.Builder,l.Code,function(e,t,n){return{cloudIdentifierName:t.instanceName,type:"appkube-api",queryMode:"Metrics",matchExact:!0,expression:"",id:"",alias:"",period:"",zone:"",externalId:"",crossAccountRoleArn:"",elementType:t.elementType,elementId:parseInt(e,10),cloudIdentifierId:t.instanceId,awsxUrl:n}});var d=s(6);function u(e,t,n){return(t=function(e){var t=function(e,t){if("object"!=typeof e||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var a=n.call(e,t||"default");if("object"!=typeof a)return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==typeof t?t:String(t)}(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}class p extends t.DataSourceWithBackend{constructor(e){super(e),u(this,"service",void 0),u(this,"awsxUrl",void 0),this.service=new a(e.jsonData.cmdbEndpoint||"",e.jsonData.grafanaEndpoint||""),e.meta.jsonData=JSON.parse(JSON.stringify(e.jsonData)),this.awsxUrl=e.jsonData.awsxEndPoint||""}getCloudElements(e){return(0,d.from)(this.service.getCloudElements(e).then((t=>{let n={};if(t&&t[0]){const a=t[0];a&&(n=i(e,a,this.awsxUrl))}return n})))}getDefaultQuery(e){return r}query(e){let t="";var n;document.getElementById("elementId")&&(t=null===(n=document.getElementById("elementId"))||void 0===n?void 0:n.value);return t?this.getCloudElements(t).pipe((0,d.mergeMap)((t=>{let n=e.targets;for(let e=0;e<n.length;e++)n[e]=Object.assign({},n[e],t);return super.query(e)}))):super.query(e)}}var m=s(0),g=s.n(m),f=s(1);var v=s(2);const b=["children"];const h=e=>{let{children:t}=e,n=function(e,t){if(null==e)return{};var n,a,r={},l=Object.keys(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,b);const a=(0,f.useStyles2)((0,m.useCallback)((e=>y(e,n)),[n]));return g().createElement("div",{className:a.root},t)},y=(e,t)=>{var n,a,r;return{root:(0,v.css)({display:"flex",flexDirection:null!==(n=t.direction)&&void 0!==n?n:"row",flexWrap:null===(a=t.wrap)||void 0===a||a?"wrap":void 0,alignItems:t.alignItems,gap:e.spacing(null!==(r=t.gap)&&void 0!==r?r:2),flexGrow:t.flexGrow})}},E=e=>{let{label:t,collapsible:n,collapsed:a=!0,title:r,dataTestId:l,children:o}=e;const i=(0,f.useStyles2)(I),[s,c]=(0,m.useState)(a),d=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return`infinity-query-row${e?"-"+e:""}-${(l||t).replace(/\ /g,"-")}`.toLowerCase()};return g().createElement("div",{className:i.root,"data-testid":d("wrapper")},n&&g().createElement(g().Fragment,null,g().createElement(f.Button,{icon:s?"angle-down":"angle-right",fill:"text",size:"sm",variant:"secondary",onClick:e=>{c(!s),e.preventDefault()},style:{marginRight:"10px"},"data-testid":d("collapse-"+(s?"hide":"show"))}),g().createElement("span",{onClick:e=>{c(!s),e.preventDefault()},"data-testid":d("title")},g().createElement("b",{className:i.collapseTile},t)),g().createElement("span",{className:i.collapseTileSecondary},r?r():"Options")),s&&g().createElement("div",{style:{display:"flex",marginTop:t&&n?"15px":"0px",marginLeft:"0px"},"data-testid":d("children")},o))},I=e=>({root:(0,v.css)({padding:e.spacing(1),backgroundColor:e.colors.background.secondary,borderRadius:e.shape.borderRadius(1)}),collapseTile:(0,v.css)({marginRight:e.spacing(1),color:e.colors.secondary.text}),collapseTileSecondary:(0,v.css)({color:e.colors.text.secondary,fontSize:e.typography.bodySmall.fontSize,"&:hover":{color:e.colors.secondary.text}})}),j=e=>{let{children:t}=e;return g().createElement(h,{gap:.5,direction:"column"},t)};const x=new e.DataSourcePlugin(p).setConfigEditor((function(e){const{onOptionsChange:t,options:n}=e,{jsonData:a}=n;return g().createElement("div",{className:"gf-form-group"},g().createElement(f.InlineField,{label:"Grafana Endpoint",labelWidth:24},g().createElement(f.Input,{onChange:e=>{const a=Object.assign({},n.jsonData,{grafanaEndpoint:e.target.value});t(Object.assign({},n,{jsonData:a}))},value:a.grafanaEndpoint||"",placeholder:"http://localhost:3001",width:40})),g().createElement(f.InlineField,{label:"CMDB API Endpoint",labelWidth:24},g().createElement(f.Input,{onChange:e=>{const a=Object.assign({},n.jsonData,{cmdbEndpoint:e.target.value});t(Object.assign({},n,{jsonData:a}))},value:a.cmdbEndpoint||"",placeholder:"https://api.synectiks.net/cmdb",width:40})),g().createElement(f.InlineField,{label:"AWSX API Endpoint",labelWidth:24},g().createElement(f.Input,{onChange:e=>{const a=Object.assign({},n.jsonData,{awsxEndPoint:e.target.value});t(Object.assign({},n,{jsonData:a}))},value:a.awsxEndPoint||"",placeholder:"https://api.synectiks.net/cmdb",width:40})))})).setQueryEditor((function(e){let{query:t,onChange:n,onRunQuery:r,datasource:l}=e;const s=new a(l.meta.jsonData.cmdbEndpoint||"",l.meta.jsonData.grafanaEndpoint||""),[c,d]=(0,m.useState)(""),[u,p]=(0,m.useState)([]),v=(0,m.useRef)(!1),b=(0,m.useCallback)(((e,t)=>{s.getCloudElements(e).then((a=>{if(a&&a[0]){const r=a[0];if(r){const a=i(e,r,l.meta.jsonData.awsxEndPoint||"");t=Object.assign({},t,a),n(Object.assign({},t)),s.getSupportedPanels(r.elementType.toUpperCase(),"AWS").then((e=>{if(e&&e.length>0){const t=[];e.map((e=>{t.push({label:e.name,value:e.name})})),p(t)}}))}}}))}),[n]);(0,m.useEffect)((()=>{if(!1===v.current){let n="";var e;if(document.getElementById("elementId"))n=null===(e=document.getElementById("elementId"))||void 0===e?void 0:e.value;else n=t.elementId;n?(d(n),b(n,t)):alert("Please set 'elementId' variable"),v.current=!0}}),[t,n,b]);const{elementType:h,cloudIdentifierId:y,queryString:I,responseType:x}=t;return g().createElement("div",null,g().createElement(j,null,g().createElement(E,{label:""},g().createElement(f.InlineField,{label:"Element Type"},g().createElement(f.Input,{value:h,onChange:e=>(e=>{n(Object.assign({},t,{elementType:e.target.value}))})(e)})),g().createElement(f.InlineField,{label:"Instance ID"},g().createElement(f.Input,{value:y,onChange:e=>(e=>{n(Object.assign({},t,{cloudIdentifierId:e.target.value}))})(e)})),g().createElement(f.InlineField,{label:"Element ID"},g().createElement(f.Input,{disabled:!0,value:c})))),g().createElement(j,null,g().createElement(E,{label:""},g().createElement(f.InlineField,{label:"Supported Panels"},g().createElement(f.Select,{className:"min-width-12 width-12",value:I,options:u,onChange:e=>{return a=e.value,void n(Object.assign({},t,{queryString:a}));var a},menuShouldPortal:!0})),g().createElement(f.InlineField,{label:"Response Type"},g().createElement(f.Select,{className:"min-width-12 width-12",value:x,options:o,onChange:e=>{return a=e.value,void n(Object.assign({},t,{responseType:a}));var a},menuShouldPortal:!0})))))}))})(),c})()));
//# sourceMappingURL=module.js.map