/* 
引入需要使用的element-ui的组件
 */
import Vue from 'vue'
import {MessageBox, Message} from 'element-ui' // 只引入需要用的组件

Vue.prototype.$msgbox = MessageBox // 组件中通过this.$msgbox()显示提示框
Vue.prototype.$alert = MessageBox.alert  // 组件中通过this.$alert()显示提示框
Vue.prototype.$message = Message // 组件中通过this.$message()显示提示消息

console.dir(MessageBox)  // 能查看函数对象内部的属性或方法