var app = new Vue({
    el: '#app',
    data: {
        message: 'hello world',
        messagetow: '我是訊息二',
        money: 100000,
    }
});
app.message = 'test the change';

var vmodapp = new Vue({
    el: '#vmodapp',
    data: {
        message: 'hello world'
    }
});


var vmodapp = new Vue({
    el: '#v-formyfamily',
    data: {
        myfamily: [{
                themember: '爸爸',
                age: 60
            },
            {
                themember: '媽媽',
                age: 62
            }, {
                themember: '姊姊',
                age: '35'
            }, {
                themember: '我',
                age: '32'

            }, {
                themember: '妹妹',
                age: '30'

            }
        ]
    },
    methods: {
        theage: function (the_name, the_age) {
            console.log(the_name + '的年齡是' + the_age + '歲');
        }
    }
});


var quiz = new Vue({
    el: '#quiz',
    data: {
        message: 'hello world',
        newtodoitem: '',
        todoitem: JSON.parse(localStorage.getItem('todolocalStorage'))||[]
    },
    methods: {
        addlist: function (tododata) {
            let time = (new Date()).valueOf();
            let localStoragetododata=localStorage.getItem('todolocalStorage');
            this.todoitem.push({
                thetime:time,
                content: tododata,
                completed:false,
            });
            localStorage.setItem('todolocalStorage', JSON.stringify(this.todoitem));
        },
        delectlist:function(target){
           
            this.todoitem.splice(this.todoitem.indexOf(target),1);

            localStorage.setItem('todolocalStorage', JSON.stringify(this.todoitem));
        }
    }
})

function getdata(target){
    if(localStorage.getItem(target)){
        console.log(JSON.parse(localStorage.getItem(target)));
        return JSON.parse(localStorage.getItem(target));
    }
}

function setdata(target,thetime,content){
    let tododata=JSON.stringify(localStorage.getItem(target))||[];
    tododata.push({thetime:content});
    localStorage.setItem(target, JSON.stringify(tododata));
}

/*
var vm= new Vue({
    el: '#app', //掛載的元素
    data:{},//綁定的資料
    props:{},//接收外部資料的屬性
    methods:{},//用來定義Ｖue 實體內使用的函數
    watch:{},//用來監聽觀察Ｖue實體內資料的變動
    completed:{},//自動為內部資料計算過後的屬性
    template:"...",//提供實體編譯過後的樣板
    components:{}//定義子元件
});
*/

