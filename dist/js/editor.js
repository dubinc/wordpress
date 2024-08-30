!function(){"use strict";var e={n:function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,{a:n}),n},d:function(t,n){for(var r in n)e.o(n,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:n[r]})},o:function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}},t=window.wp.plugins,n=window.wp.element,r=window.wp.i18n,o=window.wp.compose,a=window.wp.data,i=window.wp.editor,c=window.wp.components,l=window.wp.apiFetch,s=e.n(l);var u=({shortLink:e,workspaceSlug:t})=>{let o,a;try{const t=new URL(e);o=t.hostname,a=t.pathname.split("/")[1]}catch(e){return console.error("Invalid URL:",e),null}return(0,n.createElement)("div",{className:"dubco-analytics-link"},(0,n.createElement)("p",null,(0,n.createElement)("a",{href:`https://app.dub.co/${t}/analytics?domain=${o}&key=${a}&tab=clicks`,target:"_blank",rel:"noopener noreferrer"},(0,r.__)("Analytics for link","dubinc"))))};const d=(0,a.withSelect)((e=>({metaFields:e("core/editor").getEditedPostAttribute("meta"),postStatus:e("core/editor").getEditedPostAttribute("status"),postId:e("core/editor").getCurrentPostId()}))),_=(0,a.withDispatch)((e=>({setMetaFields(t){e("core/editor").editPost({meta:t})}})));var p=(0,o.compose)([d,_])((({postStatus:e,metaFields:t,setMetaFields:o,postId:a})=>{const[l,d]=(0,n.useState)(!1),[_,p]=(0,n.useState)(""),[m,b]=(0,n.useState)(""),[h,w]=(0,n.useState)(!1),{_dubco_short_url:k,_dubco_short_url_id:E,_dubco_short_url_error:y,_dubco_workspace_slug:g}=t;return(0,n.useEffect)((()=>{if(k){const e=new URL(k);p(e.pathname.substring(1))}}),[k]),"publish"!==e?(0,n.createElement)(i.PluginDocumentSettingPanel,{title:(0,r.__)("Dubco","dubinc"),initialOpen:!1},(0,n.createElement)(c.Notice,{status:"warning",isDismissible:!1},(0,r.__)("You can only create short links for published posts. A short link will be created automatically, if it doesn't exists when this post is published","dubinc"))):(0,n.createElement)(i.PluginDocumentSettingPanel,{title:(0,r.__)("Dubco","dubinc"),initialOpen:!1},(0,n.createElement)(c.PanelRow,null,(0,n.createElement)("div",null,k&&(0,n.createElement)(n.Fragment,null,(0,n.createElement)("div",{className:"dubco-short-link"},l?(0,n.createElement)(c.TextControl,{value:_,label:(0,r.__)("Edit the pathname","dubinc"),onChange:e=>p(e)}):(0,n.createElement)(c.TextControl,{value:k,label:(0,r.__)("Url","dubinc"),onChange:e=>o({_dubco_short_url:e}),readOnly:!0}),l?(0,n.createElement)(c.Button,{variant:"primary",onClick:async()=>{try{b(""),w(!0);const e=await(async(e,t,n)=>s()({path:`/dubco/v1/links/${t}`,method:"PATCH",data:{post_id:e,key:n}}))(a,E,_);e&&o({_dubco_short_url:e.shortLink})}catch(e){b(e)}finally{w(!1)}d(!l)}},h?(0,r.__)("Updating","dubinc"):(0,r.__)("Update","dubinc")):(0,n.createElement)(c.Button,{variant:"primary",onClick:()=>d(!l)},(0,r.__)("Edit","dubinc"))),m&&(0,n.createElement)(c.Notice,{status:"error"},m),(0,n.createElement)(u,{shortLink:k,workspaceSlug:g})),!k&&(0,n.createElement)("div",{className:"dubco-creat-link"},(0,n.createElement)(c.Button,{variant:"primary",disabled:h,description:(0,r.__)("Create a short link for this post","dubinc"),onClick:async()=>{try{b(""),w(!0);const e=await(async e=>s()({path:"/dubco/v1/links",method:"POST",data:{post_id:e}}))(a);e&&o({_dubco_short_url:e.shortLink})}catch(e){b(e)}finally{w(!1)}}},h?(0,r.__)("Creating Short Link...","dubinc"):(0,r.__)("Create Short Link","dubinc")),y&&(0,n.createElement)(c.Notice,{status:"error",onRemove:()=>{o({_dubco_short_url_error:""})}},y),m&&(0,n.createElement)(c.Notice,{status:"error"},m)))))}));(0,t.registerPlugin)("dubco-side-panel",{render:p})}();