(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{101:function(e,t){},103:function(e,t){},136:function(e,t){},137:function(e,t){},185:function(e,t,n){},186:function(e,t,n){"use strict";n.r(t);var a=n(5),r=n.n(a),o=n(87),i=n.n(o),c=(n(95),n(31)),s=n(32),u=n(34),d=n(33),l=n(35),f=n(6),v=n.n(f),p=n(12),h=n(89),m={active:{color:"#333",backgroundColor:"azure",border:"1px solid #222",borderRadius:"30px",padding:"5px 10px",position:"absolute",margin:"5px"},absolute:{top:"50px",left:"50%",zIndex:999,transform:"translateX(-50%)"},disabled:{color:"#AAA",backgroundColor:"#CCC"}},b=function(e){return r.a.createElement("button",{style:Object(h.a)({},m.active,e.disabled?m.disabled:{},e.absolute?m.absolute:{}),onClick:e.onClick,disabled:e.disabled},e.label)};b.defaultProps={disabled:!1};var g=b,w=n(88),k=function(){var e=Object(p.a)(v.a.mark(function e(){var t,n;return v.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,w.a(.75);case 2:return t=e.sent,n=function(){var e=Object(p.a)(v.a.mark(function e(n){var a;return v.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(n){e.next=2;break}return e.abrupt("return",[]);case 2:return e.next=4,t.estimateSinglePose(n,.5,!0);case 4:return a=e.sent,e.abrupt("return",a.keypoints.filter(function(e){return"nose"===e.part}));case 6:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}(),e.abrupt("return",{detectPose:n});case 5:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}(),x=n(48),C=n.n(x),y=function(e,t,n){var a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:C.a,r=new Image;switch(r.onload=function(){e.drawImage(r,t-25,n-25,50,50)},a){case"nose":default:r.src=C.a}},R=function(e){function t(e){var n;return Object(c.a)(this,t),(n=Object(u.a)(this,Object(d.a)(t).call(this,e))).videoRef=void 0,n.canvasRef=void 0,n.noseDetector=void 0,n.getCameras=Object(p.a)(v.a.mark(function e(){var t;return v.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(navigator.mediaDevices&&navigator.mediaDevices.enumerateDevices){e.next=3;break}return console.log("enumerateDevices() is not supported."),e.abrupt("return");case 3:return e.next=5,navigator.mediaDevices.enumerateDevices();case 5:return t=e.sent,e.abrupt("return",t.filter(function(e){return"videoinput"===e.kind}));case 7:case"end":return e.stop()}},e)})),n.detectPoseInFrame=Object(p.a)(v.a.mark(function e(){var t,a,r,o,i;return v.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(n.videoRef.current&&n.canvasRef.current){e.next=2;break}return e.abrupt("return");case 2:return e.next=4,n.noseDetector.detectPose(n.videoRef.current);case 4:i=e.sent,t=n.canvasRef.current,a=t.getContext("2d"),r=window.innerWidth,o=window.innerHeight,t.width=r,t.height=o,n.videoRef.current.width=r,n.videoRef.current.height=o,i.forEach(function(e){"nose"===e.part&&a&&(a.clearRect(0,0,r,o),a.save(),a.scale(-1,1),a.translate(-r,0),n.videoRef.current&&a.drawImage(n.videoRef.current,0,0,r,o),a.restore(),a.beginPath(),y(a,e.position.x,e.position.y),a.fill())}),requestAnimationFrame(n.detectPoseInFrame);case 15:case"end":return e.stop()}},e)})),n.loadCamera=Object(p.a)(v.a.mark(function e(){var t,a,r=arguments;return v.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t=r.length>0&&void 0!==r[0]?r[0]:"",e.next=3,navigator.mediaDevices.getUserMedia({audio:!1,video:{deviceId:t}});case 3:return a=e.sent,n.videoRef.current&&(n.videoRef.current.srcObject=a,n.videoRef.current.play()),e.abrupt("return",a);case 6:case"end":return e.stop()}},e)})),n.changeCameraSource=Object(p.a)(v.a.mark(function e(){var t,a,r;return v.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t=n.state,a=t.cameras,r=t.activeCamera,a.forEach(function(e,t){if(e.deviceId===r){var o=a[(t+1)%a.length].deviceId;n.loadCamera(o),n.setState({activeCamera:o})}});case 2:case"end":return e.stop()}},e)})),n.state={cameras:[],activeCamera:""},n.videoRef=r.a.createRef(),n.canvasRef=r.a.createRef(),n}return Object(l.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=Object(p.a)(v.a.mark(function e(){var t;return v.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.getCameras();case 2:return t=e.sent,e.next=5,k();case 5:if(this.noseDetector=e.sent,!(t&&t.length>0)){e.next=10;break}return e.next=9,this.loadCamera(t[0].deviceId);case 9:this.setState({cameras:t,activeCamera:t[0].deviceId});case 10:this.detectPoseInFrame();case 11:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){return r.a.createElement("div",null,this.state.cameras.length>1&&r.a.createElement(g,{label:"Change camera",onClick:this.changeCameraSource,absolute:!0}),r.a.createElement("video",{autoPlay:!0,width:"100%",height:"100%",muted:!0,className:"video-player",playsInline:!0,ref:this.videoRef,style:{transform:"scaleX(-1)",display:"none"}}),r.a.createElement("canvas",{ref:this.canvasRef,style:{position:"absolute",top:0,left:0}}))}}]),t}(r.a.Component),j=(n(185),function(e){function t(){return Object(c.a)(this,t),Object(u.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(l.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"App"},r.a.createElement("section",{className:"App-body"},r.a.createElement(R,null)))}}]),t}(a.Component)),O=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function E(e,t){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var n=e.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See http://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}}).catch(function(e){console.error("Error during service worker registration:",e)})}i.a.render(r.a.createElement(j,null),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/emojiface",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",function(){var t="".concat("/emojiface","/service-worker.js");O?(function(e,t){fetch(e).then(function(n){var a=n.headers.get("content-type");404===n.status||null!=a&&-1===a.indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):E(e,t)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(t,e),navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit http://bit.ly/CRA-PWA")})):E(t,e)})}}()},48:function(e,t,n){e.exports=n.p+"static/media/nose.f668a93b.svg"},90:function(e,t,n){e.exports=n(186)},95:function(e,t,n){}},[[90,1,2]]]);
//# sourceMappingURL=main.c4131a5c.chunk.js.map