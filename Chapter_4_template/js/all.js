Vue.component('list-item', {
    data: function () {
        return {counter: 0}
    },
    template: `<li >
        {{item.name}} {{item.age}} 歲 <input></input>
    </li>`,
    props:['item']
});

var vue_todolist = new Vue({
    el: '#vue_template_demo',
    data: {
        vmodetext: '',
        vhtmldemo: '<p class="imvhtml">我是vhtml的測試字串<p>',
        voncedata: 'once',
        nember_1: '11',
        nember_2: '22',
        bindid: 'thisisvbind',
        disabledswitch: false,
        filtertext:'',
        objclass: {
            'rotate': false,
            'background-danger': false
        },
        arrayclass: [],
        inlinecssdemo: {
            backgroundColor: '#000',
            borderColor: 'red',
            borderWidth: '10px',
            borderboderStyle: 'solid'
        },
        inlinecssdemo2: {
            boxShadow: '2px 2px 2px 2px rgba(100,100,100,0.6)'
        },
        vuefordemo: {
            Ben: {
                name: '班',
                age: '32歲'
            },
            Mary: {
                name: '馬力',
                age: '33歲'
            }
        },
        arrayvuefordemo: [
            {
                name: '班',
                age: '32歲'
            }, {
                name: '馬力',
                age: '33歲'
            }

        ],
        filterarray:[],
    },
    methods: {
        reverseObj: function () {
            console.log(this.arrayvuefordemo);
            this.arrayvuefordemo.reverse();
            console.log('reverse');
        },
        filterdata: function(){
            var vm=this;//原本不解為什麼要特別弄一個this,出來,後來才發現,如果你有其他或函式可能也會用到this,那先宣告一個this就很重要;
            vm.filterarray=vm.arrayvuefordemo.filter(function(item){
                console.log(vm.filtertext,item.name,item.name.match(vm.filtertext));
                return item.name.match(vm.filtertext)
            });

        },
        cantwork:function(){
            console.log('cantwork');
            //this.arrayvuefordemo.length=0;
            //console.log('過去在一般狀態下寫ＪＳ 可能可以用這種方式將東西清除,但是在這裡不行這樣操作,就算你這樣操作,DOM也不會這樣改變');
            //console.log(this.arrayvuefordemo)

            //如果你直接更改陣列裡面的物件,其實他是可以直接更新資料的,包含前端的輸出
            //可是如果你是更改物件,他其實是不會動作的,必續透過set 才會重新渲染資料.
            
            //透過陣列更改資料可以改值 並且會重新更新前端的資料
            //this.arrayvuefordemo[0].name="班班";
            //this.arrayvuefordemo[0].age="100歲";
            

            //直接更新整個物件,並不會重新渲染前端,就像這個依樣
            /*this.arrayvuefordemo[0]={
                name: '100班',
                age: '100歲'
            };*/

            //透過vue set 的方式更新資料

            Vue.set(this.arrayvuefordemo,0,{
                name: '100班',
                age: '100歲'
            });

        }
    },
    mounted: function () {
        console.log('mounted');
    },
    created: function () {
        console.log('created');
    },
    /*
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
    */
});



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
