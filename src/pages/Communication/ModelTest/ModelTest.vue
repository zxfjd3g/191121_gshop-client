<template>
  <div>
    <h2>深入v-model</h2>

    <input type="text">
    <span>xxx</span>
    <br>
  </div>
</template>

<script type="text/ecmascript-6">
  import CustomInput from './CustomInput.vue'
  export default {
    name: 'ModelTest',
    components: {
      CustomInput
    }
  }
</script>
