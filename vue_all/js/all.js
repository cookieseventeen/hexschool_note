// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyD5mArY-z7jkxYbaXNYzpkR2RbY5hJvDy4",
    authDomain: "our-to-do-list-ce3b5.firebaseapp.com",
    databaseURL: "https://our-to-do-list-ce3b5.firebaseio.com",
    projectId: "our-to-do-list-ce3b5",
    storageBucket: "our-to-do-list-ce3b5.appspot.com",
    messagingSenderId: "246151140434",
    appId: "1:246151140434:web:48b833ac03de3e55"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var firebasedb = firebase.database();
/*
var initdata;
firebasedb
    .ref("tododata")
    .on('value', function (datacontent) {
        initdata = datacontent.val();
    });
*/
var vue_todolist = new Vue({
    el: '#vue_todolist',
    data: {
        todotips: '記載所有todo list,請再輸入匡輸入你要記錄的todo內容,記得按下儲存按鈕.',
        todoinput: '',
        todoitem: '',
        //resultoutput: '',
        degree: '1',
        executor: 'Ben',
        listfilter: 'all',
        cachetodo:'',
        cachetodocontent:''
    },
    methods: { //用來定義Ｖue 實體內使用的函數
        addlist: function (tododata) {

            if (!tododata.trim()) {
                alert('請輸入內容');
                return;
            }

            var time = (new Date()).valueOf();
            var data = {
                "time": time,
                "content": this.todoinput,
                "degree": this.degree,
                "executor": this.executor,
                "progress_rate": "0%",
                "status": "pause",
                "complated": false
            }

            firebasedb
                .ref("tododata")
                .push(data);
            console.log(data);

            this.todoinput = '';
        },
        delete_target: function (target) {
            var delete_target = target;

            firebasedb
                .ref("tododata/" + delete_target)
                .remove();
            console.log(delete_target);

        },
        complated_target: function (target) {
            console.log(target);
            /*console.log(this.todoitem);*/
            //console.log(firebasedb.ref("tododata/" + target+'/complated'));
            
            firebasedb
                .ref("tododata/" + target + '/complated')
                .once('value', function (snapshot) {
                    console.log('status:' + snapshot.val());

                    if (snapshot.val()) {
                        firebasedb
                            .ref("tododata/" + target + '/complated')
                            .set(false);
                    } else {
                        firebasedb
                            .ref("tododata/" + target + '/complated')
                            .set(true);
                    }

                });
            /*
            firebasedb
                .ref("tododata")
                .once('value', function (datacontent) {
                    this.todoitem = datacontent.val();
                });*/

        },
        edittodo: function(target,content){
            this.cachetodo=target;
            this.cachetodocontent=content;
        },
        leaveedit: function(){
            console.log();
            this.cachetodo='';
            this.cachetodocontent='';
        },
        updatetodo:function(){
            firebasedb.ref("tododata/" + this.cachetodo + '/content').set(this.cachetodocontent);
            this.cachetodo='';
            this.cachetodocontent='';
        },
        clear:function(){
            firebasedb.ref("tododata/").set('');
        }
    },
    mounted: function () { //初始執行的程式 也可以縮寫成mounted() {} mounted英文翻譯 已安裝
        var this_vue = this;
        firebasedb
            .ref("tododata")
            .on('value', function (datacontent) {
                this_vue.todoitem = datacontent.val();
            });
        console.log('mounted');
    },
    created: function () {
        console.log('created');
    },
    computed: { //computed 比較像一個監聽動態的執行函式,如果有觸擊的事件的話不必用這個,使用methods 會比較恰當,另外我們還有一個物件叫做watch,另外在做比較
        reversetext: function () {
            console.log('reversetext');
            return this
                .todoinput
                .split('')
                .reverse()
                .join('');
        },
        filtertodo: function () {

            if (this.listfilter == 'active') {
                console.log('active');
                var filter_data = new Object();

                for (var item in this.todoitem) {
                    if (this.todoitem[item].complated == false) {
                        filter_data[item] = this.todoitem[item];
                    }
                }
                console.log(filter_data);
                return filter_data;

            } else if (this.listfilter == 'complated') {
                console.log('complated');

                var filter_data = new Object();

                for (var item in this.todoitem) {
                    if (this.todoitem[item].complated == true) {
                        filter_data[item] = this.todoitem[item]; //設定物件名稱  以前適用filter_data.設定的名稱
                    }
                }
                console.log(filter_data);
                return filter_data;
            } else {
                console.log('all');
                return this.todoitem
            }
        },
        countercomplete:function(){
            var counter=0;

            for (var item in this.todoitem) {
                if (this.todoitem[item].complated == true) {
                    counter++
                }
            }
            console.log(counter);
            return counter
        }

    }
});

Vue.component('counter-component', {
    data: function () {
        return {counter: 0}
    },
    template: '<div class="counter"> <button @click="counter +=1" class="btn btn-sm">{{counte' +
            'r}}</button></div>'
});

var counter_component = new Vue({
    el: '#counter_demo',
    data: {
        counter: 0
    }
});

var toogledemo=new Vue({
    el: '#toogle_demo',
    data:{
        toogleclassswitch: false,
    }
})

/* Methods 與 Computed 的使用情境
- computed 是在監控資料更動後，重新運算結果呈現於畫面上
 * 一般來說不會修改資料，只會回傳用於畫面呈現的資料

- methods 就是互動的函式，需要觸發才會運作
會用來修改資料內容

效能
 * 如果資料量大，computed 自然會比較慢
只要資料變動就會觸發，無形之中執行次數也會增加勒
因此在大量資料時，會建議透過 methods
 * 減少不必要的運算喔
 */
