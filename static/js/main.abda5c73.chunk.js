(this.webpackJsonpchessboard=this.webpackJsonpchessboard||[]).push([[0],{12:function(e,t,s){},13:function(e,t,s){},15:function(e,t,s){"use strict";s.r(t);var n=s(0),i=s.n(n),o=s(6),p=s.n(o),a=(s(12),s(13),s(2)),r=s(1),c=function(e){return Object(r.jsx)("div",{style:{height:"68px"},children:void 0!==e.image?Object(r.jsx)("div",{style:{backgroundImage:"url(".concat(e.image,")")},className:"chess-piece"}):null})},u={backgroundColor:"white",border:"solid",borderColor:"black",borderWidth:1,height:"68px",width:"68px"},y={backgroundColor:"green",border:"solid",borderColor:"black",borderWidth:1,height:"68px",width:"68px"},l=function(e){return Object(r.jsx)("div",{style:e.number%2===0?u:y,children:Object(r.jsx)(c,{image:e.image})})},h=s(3),f=s(4),x=["a","b","c","d","e","f","g","h"],d=["1","2","3","4","5","6","7","8"],v=70,m=Object(f.a)((function e(t,s){Object(h.a)(this,e),this.x=t,this.y=s})),O=function(e,t){return e.x===t.x&&e.y===t.y},g=[{castle:!0,source:"".concat("/chess-app","/assets/Chess_kdt60.png"),position:new m(4,7),type:"king",team:"ours",checked:!1},{castle:!0,source:"".concat("/chess-app","/assets/Chess_klt60.png"),position:new m(4,0),type:"king",team:"opponent",checked:!1},{source:"".concat("/chess-app","/assets/Chess_qdt60.png"),position:new m(3,7),type:"queen",team:"ours"},{source:"".concat("/chess-app","/assets/Chess_qlt60.png"),position:new m(3,0),type:"queen",team:"opponent"},{source:"".concat("/chess-app","/assets/Chess_bdt60.png"),position:new m(2,7),type:"bishop",team:"ours"},{source:"".concat("/chess-app","/assets/Chess_bdt60.png"),position:new m(5,7),type:"bishop",team:"ours"},{source:"".concat("/chess-app","/assets/Chess_blt60.png"),position:new m(2,0),type:"bishop",team:"opponent"},{source:"".concat("/chess-app","/assets/Chess_blt60.png"),position:new m(5,0),type:"bishop",team:"opponent"},{source:"".concat("/chess-app","/assets/Chess_ndt60.png"),position:new m(1,7),type:"knight",team:"ours"},{source:"".concat("/chess-app","/assets/Chess_ndt60.png"),position:new m(6,7),type:"knight",team:"ours"},{source:"".concat("/chess-app","/assets/Chess_nlt60.png"),position:new m(1,0),type:"knight",team:"opponent"},{source:"".concat("/chess-app","/assets/Chess_nlt60.png"),position:new m(6,0),type:"knight",team:"opponent"},{castle:!0,source:"".concat("/chess-app","/assets/Chess_rdt60.png"),position:new m(0,7),type:"rook",team:"ours"},{castle:!0,source:"".concat("/chess-app","/assets/Chess_rdt60.png"),position:new m(7,7),type:"rook",team:"ours"},{castle:!0,source:"".concat("/chess-app","/assets/Chess_rlt60.png"),position:new m(0,0),type:"rook",team:"opponent"},{castle:!0,source:"".concat("/chess-app","/assets/Chess_rlt60.png"),position:new m(7,0),type:"rook",team:"opponent"},{source:"".concat("/chess-app","/assets/Chess_pdt60.png"),position:new m(0,6),type:"pawn",team:"ours",enPassant:!1},{source:"".concat("/chess-app","/assets/Chess_pdt60.png"),position:new m(1,6),type:"pawn",team:"ours",enPassant:!1},{source:"".concat("/chess-app","/assets/Chess_pdt60.png"),position:new m(2,6),type:"pawn",team:"ours",enPassant:!1},{source:"".concat("/chess-app","/assets/Chess_pdt60.png"),position:new m(3,6),type:"pawn",team:"ours",enPassant:!1},{source:"".concat("/chess-app","/assets/Chess_pdt60.png"),position:new m(4,6),type:"pawn",team:"ours",enPassant:!1},{source:"".concat("/chess-app","/assets/Chess_pdt60.png"),position:new m(5,6),type:"pawn",team:"ours",enPassant:!1},{source:"".concat("/chess-app","/assets/Chess_pdt60.png"),position:new m(6,6),type:"pawn",team:"ours",enPassant:!1},{source:"".concat("/chess-app","/assets/Chess_pdt60.png"),position:new m(7,6),type:"pawn",team:"ours",enPassant:!1},{source:"".concat("/chess-app","/assets/Chess_plt60.png"),position:new m(0,1),type:"pawn",team:"opponent",enPassant:!1},{source:"".concat("/chess-app","/assets/Chess_plt60.png"),position:new m(1,1),type:"pawn",team:"opponent",enPassant:!1},{source:"".concat("/chess-app","/assets/Chess_plt60.png"),position:new m(2,1),type:"pawn",team:"opponent",enPassant:!1},{source:"".concat("/chess-app","/assets/Chess_plt60.png"),position:new m(3,1),type:"pawn",team:"opponent",enPassant:!1},{source:"".concat("/chess-app","/assets/Chess_plt60.png"),position:new m(4,1),type:"pawn",team:"opponent",enPassant:!1},{source:"".concat("/chess-app","/assets/Chess_plt60.png"),position:new m(5,1),type:"pawn",team:"opponent",enPassant:!1},{source:"".concat("/chess-app","/assets/Chess_plt60.png"),position:new m(6,1),type:"pawn",team:"opponent",enPassant:!1},{source:"".concat("/chess-app","/assets/Chess_plt60.png"),position:new m(7,1),type:"pawn",team:"opponent",enPassant:!1}],k=function(){function e(){Object(h.a)(this,e)}return Object(f.a)(e,[{key:"tileIsOccupied",value:function(e,t){return!!t.find((function(t){return O(t.position,e)}))}},{key:"tileIsOccupiedByOpponent",value:function(e,t,s){return!!t.find((function(t){return O(t.position,e)&&t.team!==s}))}},{key:"tileIsEmptyOrOccupiedByOpponent",value:function(e,t,s){return!this.tileIsOccupied(e,t)||this.tileIsOccupiedByOpponent(e,t,s)}},{key:"tileIsSafe",value:function(e,t,s){var n=this,i=[],o="ours"===s?1:-1;return t.filter((function(p){if("pawn"===p.type&&p.team!==s)(e.x-p.position.x===-1&&e.y-p.position.y===o||e.x-p.position.x===1&&e.y-p.position.y===o)&&i.push(p);else if("king"===p.type&&p.team!==s){var a=e.x<p.position.x?-1:e.x>p.position.x?1:0,r=e.y<p.position.y?-1:e.y>p.position.y?1:0;e.x-p.position.x===a&&e.y-p.position.y===r&&i.push(p)}else!0===n.isValidMove(p.position,e,p.type,p.team,t)&&p.team!==s&&"king"!==p.type&&i.push(p);return null})),!(i.length>0)}},{key:"isEnPassantMove",value:function(e,t,s,n,i){var o="ours"===n?-1:1;if("pawn"===i&&((t.x-e.x===-1||t.x-e.x===1)&&t.y-e.y===o&&s.find((function(e){return e.position.x===t.x&&e.position.y===t.y-o&&e.enPassant}))))return!0;return!1}},{key:"isPromotion",value:function(e,t,s,n,i){var o="ours"===n?-1:1,p="ours"===n?0:7;if("pawn"===i&&e.y+o===p)return!0}},{key:"isCheck",value:function(e,t,s,n,i){var o=this,p=s.find((function(e){return e.team===n&&"king"===e.type}));if(this.isValidMove(e,t,i,n,s)){var a=s.find((function(e){return e.team!==n&&"king"===e.type}));if(this.isValidMove(t,a.position,i,n,s)){if(!0===p.checked){var r=s.filter((function(e){return e.team!==n&&!0===o.isValidMove(e.position,p.position,e.type,e.team,s)}));return!!this.isValidMove(e,r[0].position,i,n,s)}return a.checked=!0,a.castle=!1,!0}}return!1}},{key:"canBeBlocked",value:function(e,t,s,n,i){var o=this,p=s.find((function(e){return e.team!==n&&"king"===e.type})),a=[];return s.filter((function(e){if(e.team!==n&&"king"!==e.type){var r={x:p.position.x-t.x,y:p.position.y-t.y},c=0===r.x?0:r.x<0?-1:1,u=0===r.y?0:r.y<0?-1:1;if(!O(p.position,t))if(0===r.x){for(var y=1;y<Math.abs(r.y);y++)if(o.isValidMove(t,{x:0*c+t.x,y:y*u+t.y},i,n,s)&&o.isValidMove(e.position,{x:0*c+t.x,y:y*u+t.y},e.type,e.team,s,p.checked))return a.push(e),!0}else if(0===r.y)for(var l=0;l<Math.abs(r.x);l++){if(o.isValidMove(t,{x:l*c+t.x,y:0*u+t.y},i,n,s)&&o.isValidMove(e.position,{x:l*c+t.x,y:0*u+t.y},e.type,e.team,s,p.checked))return a.push(e),!0}for(var h=0;h<Math.abs(r.x);h++)for(var f=0;f<Math.abs(r.y);f++)if(o.isValidMove(t,{x:h*c+t.x,y:f*u+t.y},i,n,s)&&o.isValidMove(e.position,{x:h*c+t.x,y:f*u+t.y},e.type,e.team,s,p.checked))return a.push(e),!0}return e})),a.length>0}},{key:"isCheckMate",value:function(e,t,s,n,i){if(this.isValidMove(e,t,i,n,s)){var o=s.find((function(e){return e.team!==n&&"king"===e.type}));if(this.isValidMove(t,o.position,i,n,s)){for(var p=-1;p<2;p++)for(var a=-1;a<2;a++){var r=p,c=a,u={x:o.position.x+r,y:o.position.y+c};if(this.isValidMove(o.position,u,o.type,o.team,s)){if(this.isValidMove(o.position,u,o.type,o.team,s))break}else if(!this.canBeBlocked(e,t,s,n,i))return!!this.tileIsSafe(t,s,n)}return!1}}return!1}},{key:"isCastle",value:function(e,t,s,n,i,o){if("king"===i&&!1===o&&2===Math.abs(e.x-t.x)&&t.y===e.y&&!this.tileIsOccupied(t,s))if(t.x-e.x===-2)for(var p=1;p<3;p++){var a={x:e.x-p,y:e.y};if(this.tileIsSafe(a,s,n))if(O(a,t)){if(!this.tileIsOccupied({x:a.x-1,y:a.y},s))return!0}else if(this.tileIsOccupied(a,s))break}else if(t.x-e.x===2)for(var r=1;r<3;r++){var c={x:e.x+r,y:e.y};if(this.tileIsSafe(c,s,n))if(O(c,t)){if(!this.tileIsOccupied({x:c.x-1,y:c.y},s))return!0}else if(this.tileIsOccupied(c,s))break}}},{key:"isSelfCheck",value:function(e,t,s,n,i,o){var p=this;if(this.isValidMove(e,t,i,n,s,o)){var a=s.find((function(e){return e.team===n&&"king"===e.type})),r=s.filter((function(e){return e.team!==n})),c="king"===i?a:s.find((function(t){return O(t.position,e)}));c.position.x=t.x,c.position.y=t.y;var u=[];return r.filter((function(n){return p.isValidMove(n.position,a.position,n.type,n.team,s)?!O(t,n.position)&&(c.position.x=e.x,c.position.y=e.y,u.push(n)):null})),u.length>0?1!==u.length||(!this.isValidMove(e,u[0].position,i,n,s)||!O(u[0].position,t)):(c.position.x=e.x,c.position.y=e.y,!1)}return!0}},{key:"isValidMove",value:function(e,t,s,n,i,o){if(t!==e)if("pawn"===s){var p="ours"===n?6:1,a="ours"===n?-1:1;if(e.x===t.x&&e.y===p&&t.y-e.y===2*a){if(!this.tileIsOccupied(t,i)&&!this.tileIsOccupied({x:t.x,y:t.y-a},i))return!0}else if(e.x===t.x&&t.y-e.y===a){if(!this.tileIsOccupied(t,i))return!0}else if(t.x-e.x===-1&&t.y-e.y===a){if(this.tileIsOccupiedByOpponent(t,i,n))return!0}else if(t.x-e.x===1&&t.y-e.y===a&&this.tileIsOccupiedByOpponent(t,i,n))return!0}else if("knight"===s)for(var r=-1;r<2;r+=2)for(var c=-1;c<2;c+=2){if(t.y-e.y===2*r&&t.x-e.x===c&&(!this.tileIsOccupied(t,i)||this.tileIsOccupiedByOpponent(t,i,n)))return!0;if(t.x-e.x===2*r&&t.y-e.y===c&&(!this.tileIsOccupied(t,i)||this.tileIsOccupiedByOpponent(t,i,n)))return!0}else if("bishop"===s)for(var u=1;u<8;u++){if(t.x>e.x&&t.y>e.y){var y={x:e.x+u,y:e.y+u};if(O(y,t)){if(this.tileIsEmptyOrOccupiedByOpponent(y,i,n))return!0}else if(this.tileIsOccupied(y,i))break}if(t.x>e.x&&t.y<e.y){var l={x:e.x+u,y:e.y-u};if(O(l,t)){if(this.tileIsEmptyOrOccupiedByOpponent(l,i,n))return!0}else if(this.tileIsOccupied(l,i))break}if(t.x<e.x&&t.y>e.y){var h={x:e.x-u,y:e.y+u};if(O(h,t)){if(this.tileIsEmptyOrOccupiedByOpponent(h,i,n))return!0}else if(this.tileIsOccupied(h,i))break}if(t.x<e.x&&t.y<e.y){var f={x:e.x-u,y:e.y-u};if(O(f,t)){if(this.tileIsEmptyOrOccupiedByOpponent(f,i,n))return!0}else if(this.tileIsOccupied(f,i))break}}else if("rook"===s){if(e.x===t.x)for(var x=1;x<8;x++){var d=t.y<e.y?-1:1,v={x:e.x,y:e.y+x*d};if(O(v,t)){if(this.tileIsEmptyOrOccupiedByOpponent(v,i,n))return!0}else if(this.tileIsOccupied(v,i))break}if(e.y===t.y)for(var m=1;m<8;m++){var g=t.x<e.x?-1:1,k={x:e.x+m*g,y:e.y};if(O(k,t)){if(this.tileIsEmptyOrOccupiedByOpponent(k,i,n))return!0}else if(this.tileIsOccupied(k,i))break}}else if("queen"===s)for(var b=1;b<8;b++){var w=t.x<e.x?-1:t.x>e.x?1:0,C=t.y<e.y?-1:t.y>e.y?1:0,I={x:e.x+b*w,y:e.y+b*C};if(O(I,t)){if(this.tileIsEmptyOrOccupiedByOpponent(I,i,n))return!0}else if(this.tileIsOccupied(I,i))break}else if("king"===s){var j=t.x<e.x?-1:t.x>e.x?1:0,M=t.y<e.y?-1:t.y>e.y?1:0,P={x:e.x+j,y:e.y+M};if(!1===o){if(O(P,t)){if(this.tileIsEmptyOrOccupiedByOpponent(P,i,n))return!0}else if(this.tileIsOccupied(P,i))return!1}else if(!0===o&&this.tileIsSafe(P,i,n)&&O(P,t)){if(this.tileIsEmptyOrOccupiedByOpponent(P,i,n))return!0;if(this.tileIsOccupied(P,i))return!1}}return!1}}]),e}(),b=s(7),w={display:"flex",border:"solid",borderColor:"black",borderWidth:"2",flexWrap:"wrap",width:"560px"},C=function(){var e=[],t=Object(n.useState)(null),s=Object(a.a)(t,2),i=s[0],o=s[1],p=Object(n.useState)(g),c=Object(a.a)(p,2),u=c[0],y=c[1],h=Object(n.useState)({x:-1,y:-1}),f=Object(a.a)(h,2),m=f[0],C=f[1],I=Object(n.useState)("opponent"),j=Object(a.a)(I,2),M=j[0],P=j[1],_=Object(n.useState)({type:"",text:"alert message",show:!1}),B=Object(a.a)(_,2),V=B[0],S=B[1],E=Object(n.useRef)(null),q=new k,L=function(){S({type:"",text:"Checkmate! ".concat("opponent"===M?"Light":"Dark"," wins!"),show:!0})};return x.map((function(t,s){return d.map((function(t,n){var i=n+s,o=u.find((function(e){return O(e.position,{x:n,y:s})})),p=o?o.source:void 0;return e.push(Object(r.jsx)(l,{image:p,number:i},"".concat(n,", ").concat(s))),null})),null})),Object(r.jsxs)("div",{style:{display:"flex",flexDirection:"column",maxHeight:"100%"},children:[Object(r.jsx)("div",{children:"ours"===M?"Dark":"Light"}),Object(r.jsx)("div",{onMouseDown:function(e){return function(e){var t=e.target;if(t.classList.contains("chess-piece")){var s=E.current,n=Math.floor((e.clientX-s.offsetLeft)/v),i=Math.floor((e.clientY-s.offsetTop)/v);C({x:n,y:i});var p=e.clientX-35,a=e.clientY-35;t.style.position="absolute",t.style.left="".concat(p,"px"),t.style.top="".concat(a,"px"),o(t)}}(e)},onMouseMove:function(e){return function(e){var t=E.current;if(i&&t){var s=e.clientX-35,n=e.clientY-35,o=t.offsetLeft-25,p=t.offsetTop-20,a=o+t.clientWidth-25,r=p+t.clientHeight-40;i.style.position="absolute",i.style.left="".concat(s<o?o:s>a?a:s,"px"),i.style.top="".concat(n<p?p:n>r?r:n,"px")}}(e)},onMouseUp:function(e){return function(e){var t=E.current;if(i&&t){var s=Math.floor((e.clientX-t.offsetLeft)/v),n=Math.floor((e.clientY-t.offsetTop)/v),p=u.find((function(e){return O(e.position,m)}));if(p.team===M){if(p){var a=q.isCastle(m,{x:s,y:n},u,p.team,p.type,p.checked),r=q.isEnPassantMove(m,{x:s,y:n},u,p.team,p.type),c=q.isPromotion(m,{x:s,y:n},u,p.team,p.type),l=q.isCheck(m,{x:s,y:n},u,p.team,p.type),h=q.isSelfCheck(m,{x:s,y:n},u,p.team,p.type,p.checked),f=q.isCheckMate(m,{x:s,y:n},u,p.team,p.type),x=q.isValidMove(m,{x:s,y:n},p.type,p.team,u,p.checked),d="ours"===p.team?-1:1;if(a){var g=s-m.x===-2?0:7,k=u.reduce((function(e,t){return t.team===p.team&&"king"===t.type?(t.position.x=s,t.castle=!1,e.push(t)):t.team===p.team&&"rook"===t.type&&t.position.x===g&&(g>0?(t.position.x=s-1,t.castle=!1,e.push(t)):(t.position.x=s+1,t.castle=!1,e.push(t))),e.push(t),e}),[]);y(k),P("opponent"===M?"ours":"opponent")}if(l){var b=u.reduce((function(e,t){return t.team!==p.team&&"king"===t.type&&(t.castle=!1,t.check=!0,e.push(t)),e}),[]);y(b),P("opponent"===M?"ours":"opponent")}if(f&&L(),c){var w=u.reduce((function(e,t){return O(t.position,m)&&(t.type="queen",t.source="ours"===p.team?"".concat("/chess-app","/assets/Chess_qdt60.png"):"".concat("/chess-app","/assets/Chess_qlt60.png"),e.push(t)),e}),[]);y(w),P("opponent"===M?"ours":"opponent")}if(r){var C=u.reduce((function(e,t){return O(t.position,m)?(t.enPassant=!1,t.position.x=s,t.position.y=n,e.push(t)):O(t.position,{x:s,y:n-d})||("pawn"===t.type&&(t.enPassant=!1),e.push(t)),e}),[]);y(C),P("opponent"===M?"ours":"opponent")}else if(x&&!h){var I=u.reduce((function(e,t){return t.team===p.team&&"king"===t.type&&(t.checked=!1,e.push(t)),O(t.position,m)?(t.enPassant=2===Math.abs(m.y-n)&&"pawn"===t.type,t.position.x=s,t.position.y=n,e.push(t)):O(t.position,{x:s,y:n})||("pawn"===t.type&&(t.enPassant=!1),e.push(t)),e}),[]);y(I),P("opponent"===M?"ours":"opponent")}else i.style.position="relative",i.style.removeProperty("top"),i.style.removeProperty("left")}y((function(e){return e.map((function(t){if(O(t.position,m)){var o=q.isValidMove(m,{x:s,y:n},t.type,t.team,e),a=q.isSelfCheck(m,{x:s,y:n},e,p.team,p.type);o&&!a?(t.position.x=s,t.position.y=n):(i.style.position="relative",i.style.removeProperty("top"),i.style.removeProperty("left"))}return t}))})),o(null)}else i.style.position="relative",i.style.removeProperty("top"),i.style.removeProperty("left"),o(null)}}(e)},ref:E,style:w,children:e}),Object(r.jsx)(b.a,{header:"Header",btnText:"Close",text:V.text,type:V.type,show:V.show,onClosePress:function(){S({type:"",text:"",show:!1}),window.location.reload()},pressCloseOnOutsideClick:!0,showBorderBottom:!0,alertStyles:{backgroundColor:"white",border:"solid black 5px",position:"absolute",top:"10%",right:"25%",width:"50%"},headerStyles:{},textStyles:{},buttonStyles:{}})]})};var I=function(){return Object(r.jsx)("div",{className:"App",children:Object(r.jsx)(C,{})})},j=function(e){e&&e instanceof Function&&s.e(3).then(s.bind(null,16)).then((function(t){var s=t.getCLS,n=t.getFID,i=t.getFCP,o=t.getLCP,p=t.getTTFB;s(e),n(e),i(e),o(e),p(e)}))};p.a.render(Object(r.jsx)(i.a.StrictMode,{children:Object(r.jsx)(I,{})}),document.getElementById("root")),j()}},[[15,1,2]]]);
//# sourceMappingURL=main.abda5c73.chunk.js.map