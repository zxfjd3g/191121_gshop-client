<template>
  <div class="spec-preview">
    <img :src="imgUrl" />
    <div class="mask"></div>
    <div class="big">
      <img :src="bigImgUrl" />
    </div>
    <div class="small"></div>
  </div>
</template>

<script>
  export default {
    name: "Zoom",
    props: {
      imgUrl: String,
      bigImgUrl: String
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

    .mask {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 999;
    }

    .small {
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

    .mask:hover~.small,
    .mask:hover~.big {
      display: block;
    }
  }
</style>