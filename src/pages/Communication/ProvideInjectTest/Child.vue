<template>
  <div>
    <h3>子组件标题</h3>
    <GrandChild/>
  </div>
</template>

<script>
import GrandChild from './GrandChild'
export default {
  name: 'Child',
  components: {
    GrandChild
  }
}
</script>
