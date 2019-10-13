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
var initdata;
firebasedb.ref("tododata").on('value', function (datacontent) {
    initdata = datacontent.val();
});


var vue_todolist = new Vue({
    el: '#vue_todolist',
    data: {
        todotips: '記載所有todo list,請再輸入匡輸入你要記錄的todo內容,記得按下儲存按鈕.',
        todoinput: '',
        todoitem: initdata,
        degree: '1',
    },
    methods: {
        addlist: function (tododata) {
            var time = (new Date()).valueOf();

            var data = {
                "time": time,
                "content": this.todoinput,
                "degree": this.degree,
                "executor": "Ben",
                "progress_rate": "77%",
                "status": "pause"

            }

            firebasedb.ref("tododata").push(data);
            console.log(data);
        },
    },
    mounted() {
        var this_vue = this;
        firebasedb.ref("tododata").on('value', function (datacontent) {
            this_vue.todoitem = datacontent.val();
        });

    }
});