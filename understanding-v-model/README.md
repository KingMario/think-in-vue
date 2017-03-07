## 开发一个简单指令理解 Vue 的 v-model 语法糖

Vue 中有若干个“语法糖”：
* v-model 语法糖
* 组件注册语法糖
* arr.$set 语法糖

后两种语法糖即使不深入理解，也可以直接应用，然而如果没有充分理解第一种语法糖，那么就可能遇到一些奇怪的问题。

考虑如下需求：
> 编写一个自定义指令，使得在文本输入框中输入的敏感词（如：*f..k*）自动删除，并更新通过 v-model 指令所绑定的 Vue 实例数据。

自定义指令定义对象包含若干钩子函数，我们在 update 钩子函数里实现相关功能：
```
Vue.directive('exclude', {
  update: function (el, {value}) {
    try
      el.value = el.value.replace(new RegExp(value, 'gi'), '')
    } catch (e) {
    }
  }
})
```
其中 {value} 是 ES6 的解构语法，可以在函数体内通过 value 直接获取参数对象的 value 属性。为避免修改指令参数对应的 Vue 实例数据时导致 new RegExp 出错，这里的赋值语句使用 try ... catch 进行错误捕获。

对应模板如下：
```
<div class="app">
  To be excluded: <input v-model="excluded"><br>
  <textarea v-model="content" v-exclude="excluded"></textarea>
  <div>
    {{content}}
  </div>
</div>
```
其中的 excluded 和 content 均为 Vue 实例数据。

然而在实际使用时，却发现，textarea 中输入的 fork 虽然被删除了，但 Vue 实例数据中的数据仍然包含了对应的单词。
![No Event](noevent.gif)

这是什么原因导致的呢？这涉及到 v-model 是一个语法糖这样一个事实，`<input v-model="something">` 等价于 `<input v-bind:value="something" v-on:input="something = $event.target.value">`，因此在自定义指令中，通过 update 钩子函数在用户输入变化时修改 DOM 元素的 value 还不够，还需要触发 DOM 元素的 input 事件，使得通过 v-model 指令绑定的 Vue 实例数据得到更新，自定义指令修改如下：
```
Vue.directive('exclude', {
  update: function (el, {value}) {
    try
      el.value = el.value.replace(new RegExp(value, 'gi'), '')
      el.dispatchEvent(new Event('input'))
    } catch (e) {
    }
  }
})
```


考虑到 v-model 支持 lazy 修饰符，使用 lazy 修饰符时，v-model 的数据更新是在 change 事件中触发，我们还需要能够针对不同的情况触发不同的事件，处理方式是在 v-exclude 指令中也增加可选的 lazy 修饰符，代码修改如下：
```
Vue.directive('exclude', {
  update: function(el, {value, modifiers}, vnode) {
    try {
      el.value = el.value.replace(new RegExp(value, 'gi'), '')
      modifiers.lazy ? el.dispatchEvent(new Event('change')) : el.dispatchEvent(new Event('input'))
    } catch (e) {
    }
  }
})
```
约定若 v-model 使用了 lazy 修饰符，v-exclude 同样也要使用 lazy 修饰符。

基于对 v-model 语法糖的理解，在创建如 date-picker 之类的自定义组件时，在组件中添加 value 的 prop 用于数据的传入，并在用户交互时通过 $emit 方法使用新的数据为参数触发一个 input 事件，就可以在标签中通过 v-model 双向绑定数据到子组件中了。
