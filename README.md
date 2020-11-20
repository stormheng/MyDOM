# MyDOM 说明
### 这是一个自己封装的DOM库
包括了两种封装风格
- 对象风格
- jQuery链式风格

### 学习封装库的思路
- 先看文档大致了解实现思路
- 自己进行简单的封装实现
- 对比源码，体会源码的精巧之处

### jQuery封装的大致思路
- 接受一个选择器，根据选择器得到一些元素，然后返回一个对象，这个对象有很多方法可以操作这些元素
- 基本思路代码
```js
window.jQuery = function(selector){
    const elements = document.querySelectorAll(selector)
    //api 可以操作 elements
    const api = {
        //闭包：函数访问外部变量elements
        addClass(){
            console.log(elements)
            //实现链式操作的关键
            return api
        }
    }
    return api
}
```
