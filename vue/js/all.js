var app = new Vue({
    el: '#app',
    data: {
        message: 'hello world',
        messagetow: '我是訊息二',
        money: 100000,
    }
})
app.message = 'test the change';

var vmodapp=new Vue({
    el:'#vmodapp',
    data:{
        message:'hello world'
    }
})