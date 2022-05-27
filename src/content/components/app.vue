<template>
  <div style="width:100%;height:100%;z-index:9999">
    <!-- <canvas
	id="canvas"
	ref="canvas"
	@mousedown="canvasDown($event)"
	@mouseup="canvasUp($event)"
	@mousemove="canvasMove($event)"
	></canvas> -->
    <!-- <div style="width:100%;height:100%px;background-color:red;z-index:9000px" >
      11
    </div> -->
    <img :src="imgUrl.value" class="img"/>
  </div>
</template>

<script>
import { ref } from "vue";
import html2canvas from "html2canvas";
export default {
  setup() {
    // 接收pop的点击按钮信息
    chrome.extension.onMessage.addListener(function(request) {
      isShow.value = request;
      drawBody();
    });
    const isShow = ref(false);
    const flag = ref(false);
    const imgUrl = ref("");
    //     const drawBody = () => {
    //      nextTick(() => {
    //       html2canvas(document.body, {
    //         backgroundColor: "transparent",
    // 		useCORS: true,
    //         width: window.screen.availWidth,
    //         height: window.screen.availHeight,
    //         windowHeight: document.body.scrollHeight,
    //         windowWidth: document.body.scrollWidth
    //       }).then(function(canvas) {
    // 		var img=document.querySelector('img')
    // var value = img.getAttribute('src');
    // document.querySelector('img').setAttribute('src',value+'?abc')
    // html2canvas(document.body,{
    // allowTaint:true,
    // useCORS:true
    // }).then(function(canvas) {
    // document.body.appendChild(canvas);
    // var src=canvas.toDataURL()
    // console.log(src)
    // });
    //       });
    // 	 })
    //     };
    const drawBody = () => {
      const img = document.querySelector("img");
      const value = img.getAttribute("src");
      document.querySelector("img").setAttribute("src", value + "?abc");
      html2canvas(document.body, {
        allowTaint: true,
        useCORS: true,
      }).then(function(canvas) {
        document.body.appendChild(canvas);
		canvas.style.position = 'fixed'
		canvas.style.width = '30%'
		canvas.style.height = '60%'
		canvas.style.right = 0
		canvas.style.top = 0
		canvas.style['z-index'] = 9999
        // const src = canvas.toDataURL();
		document.getElementsByTagName("canvas")[0].addEventListener("mousewheel", function(e){
			e.preventDefault()
    canvas.style.cursor = "move";
	const sty = canvas.currentStyle || window.getComputedStyle(canvas, null);
    canvas.onmousedown = e => {
      // 鼠标按下，计算当前元素距离可视区的距离
      const disX = e.clientX - canvas.offsetLeft;
      const disY = e.clientY - canvas.offsetTop;
      // 获取到的值带px 正则匹配替换
      let styL, styT;
      // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
      if (sty.left.includes("%")) {
        styL = +document.body.clientWidth * (+sty.left.replace(/%/g, "") / 100);
        styT = +document.body.clientHeight * (+sty.top.replace(/%/g, "") / 100);
      } else {
        styL = +sty.left.replace(/\px/g, "");
        styT = +sty.top.replace(/\px/g, "");
      }
      let dX = e.clientX;
      let dY = e.clientY;
      let directionX = "";
      let directionY = "";
      document.onmousemove = e => {
        if (dX - e.clientX < 0) {
          directionX = "右";
        } else {
          directionX = "左";
        }
        dX = e.clientX;
        if (dY - e.clientY < 0) {
          directionY = "下";
        } else {
          directionY = "上";
        }
        dY = e.clientY;
        if (canvas.getBoundingClientRect().left <= 1 && directionX === "左") return;
        if (
          canvas.getBoundingClientRect().right + 1 >= document.body.clientWidth &&
          directionX === "右"
        ){
        return;
		}
          
        if (canvas.getBoundingClientRect().top <= 1 && directionY === "上") return;
        if (
          canvas.getBoundingClientRect().bottom + 1 >= document.body.clientHeight &&
          directionY === "下"
        ){
         return;
		}
          
        // 通过事件委托，计算移动的距离
        const l = e.clientX - disX;
        const t = e.clientY - disY;

        // 移动当前元素
        canvas.style.left = `${l + styL}px`;
        canvas.style.top = `${t + styT}px`;
      };
      document.onmouseup = function () {
        document.onmousemove = null;
        document.onmouseup = null;
      };
	}
});
      });
    };
    return {
      imgUrl,
      drawBody,
      flag,
      isShow
    };
  }
};
</script>

<style lang="less">
// .img{
// //   position: fixed;
// //   top: 0;
// //   left: 0;
// //   right: 0;
// //   bottom: 0;
// //   z-index: 9000;
// //   background: rgba(0, 0, 0, 0.3);
// //   height: 30%;
// //   width: 30%;
// // background-color: forestgreen;
// }
</style>
