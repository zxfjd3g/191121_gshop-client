<template>
  <div>
    <h2>自定义带Hover提示的按钮</h2>

    <HintButton title="添加商品" type="primary" icon="el-icon-plus"
      @click="add" @test="test"/> &nbsp;
    <hint-button title="修改商品" type="info" icon="el-icon-edit" 
      size="small" round @click="update"/>&nbsp;
    <hint-button title="删除商品" type="danger" icon="el-icon-delete" 
      size="mini" circle></hint-button>

  </div>
</template>

<script type="text/ecmascript-6">
  import HintButton from './HintButton'
  export default {
    name: 'AttrsListenersTest',

    methods: {
      add () {
        alert('点击响应')
      },

      test () {
        alert('test')
      },

      update () {
        alert('update')
      },
    },

    components: {
      HintButton
    }
  }
</script>
