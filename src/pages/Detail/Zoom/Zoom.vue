<template>
  <div class="spec-preview">
    <img :src="imgUrl" />
    <div class="event" @mousemove="handleMove" ref="event"></div>
    <div class="big">
      <img :src="bigImgUrl" ref="bigImg"/>
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
  import throttle from 'lodash/throttle'
  export default {
    name: "Zoom",
    props: {
      imgUrl: String,
      bigImgUrl: String
    },

    methods: {
      handleMove: throttle(function (event) { // 高频调用
        // 得到事件坐标
        const {offsetX, offsetY} = event
        console.log(offsetX, offsetY)
        // 得到mask的宽度
        const maskWidth = this.maskWidth

        // 计算当前mask要指定left和top
        let left = 0
        let top = 0
        left = offsetX - maskWidth/2
        top = offsetY - maskWidth/2

        // left必须在[0, maskWidth]
        if (left<0) {
          left = 0
        } else if (left>maskWidth) {
          left = maskWidth
        }
        // top必须在[0, maskWidth]
        if (top<0) {
          top = 0
        } else if (top>maskWidth) {
          top = maskWidth
        }

        // 指定mask div的left和top样式
        const maskDiv = this.$refs.mask
        maskDiv.style.left = left + 'px'
        maskDiv.style.top = top + 'px'

        // 指定大图 img的left和top样式
        const bigImg = this.$refs.bigImg
        bigImg.style.left = -2*left + 'px'
        bigImg.style.top = -2*top + 'px'
      }, 50),
    },
    mounted () {
      // 得到遮罩的宽度并保存
      this.maskWidth = this.$refs.event.clientWidth/2   //maskWidth是一个不变的值, 没有必要定义data中
      // console.log(this.maskWidth)
    }
  }
</script>

<style lang="less">
  .spec-preview {
    position: relative;

    img {
      width: 100%;
      height: 100%
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 999;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #ccc;
      overflow: hidden;
      z-index: 998;
      display: none;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }
</style>