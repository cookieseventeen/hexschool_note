//format function
// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
// 例子： 
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
var _this_date = new Date().Format("yyyy-MM-dd"),
    date_input = document.querySelector('#input-group-date'),
    _btn = document.querySelector('#sent-btn'),
    _training_date = new Array();

//setting today
date_input.value = _this_date;

function adddata(e) {
    var get_date = document.querySelector('#input-group-date').value,
        get_training = document.querySelector('#inputGroup-training').value,
        get_weight = document.querySelector('#inputGroup-weight').value,
        get_set = document.querySelector('#inputGroup-set').value,
        get_storage = localStorage.getItem('training_data');

    if (get_storage === null) {
        _training_date = [{
            date: get_date,
            item: get_training,
            weight: get_weight,
            set: get_set
        }];
        var stringify_data = JSON.stringify(_training_date);
        localStorage.setItem('training_data', stringify_data);
        update_table(_training_date);

    } else {
            _training_date=JSON.parse(get_storage);
            _training_date.push({date:get_date,item:get_training,weight:get_weight,set:get_set});
            localStorage.setItem('training_data', JSON.stringify(_training_date));
            update_table(_training_date);
        return
    }
}
function tablectrl(e){
    if(e.target.nodeName==='A'){/*這邊要特別注意大寫 */
        var _this_count=e.target.dataset.count;/*第一次執行的時候卡住 因為沒有加上target */
        _training_date= JSON.parse(localStorage.getItem('training_data'));
        _training_date.splice(_this_count,1);
        console.log(_training_date);
        localStorage.setItem('training_data', JSON.stringify(_training_date));
        update_table(_training_date);

    }else{
        return
    }
}

function update_table(data) {
    if (data != null) {
        var table_body=document.querySelector('#result_table tbody');
        var table_list = '';
        for (var i = 0; i < data.length; i++) {
            table_list += '<tr><td><a data-count="'+i+'" >刪除</a></td><td>' + data[i].date + '</td><td>'+ data[i].item +'</td> <td>'+ data[i].weight +'</td> <td>'+ data[i].set +'</td></tr>'
        }
        table_body.innerHTML=table_list;
    }else{
        return
    }
}

function build_data(e){
    var get_training_date=localStorage.getItem('training_data');
        _training_date=JSON.parse(get_training_date);
        update_table(_training_date);
}


//init table
build_data();
//add item
_btn.addEventListener('click', adddata);


//table控制 delete item 利用 target.nodeName 控制刪除
var table_body=document.querySelector('#result_table tbody');
table_body.addEventListener('click',tablectrl);


