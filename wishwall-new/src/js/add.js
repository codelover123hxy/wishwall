var data = {};
// var url="http://116.62.226.141:8080";
var url="http://101.43.175.190:8081"
//var url="http://127.0.0.1:8080";
var userName, id, colornum = 0;
var flag = false;
var display = new Vue({
    el: "#workArea",
    data: {
        content: '',
        object: '',
        len: '0',
        writer: 'Anon',
        anon: []
    },
    mounted() {
        window.object = this.object;
    },
    methods: {
        inputContent: function () {
            this.len = this.content.length;
            this.object = object;
        },
        changeAnon: function (anon) {
            this.writer = !anon.state ? "Anon" : userName;
            anon.state = !anon.state;
        }
    },
})

$(document).ready(function () {

    var data={};
    
    $.ajax({
        type: "GET",
        url: url+ "/api/checkLogin",
        data:JSON.stringify(data),

        xhrFields:{
            withCredentials:true
        },
        dataType:'JSON',
        success: function (data) {
            userName =data.data;
            if (data.msg=="SUCCESS")
            {
                if (window.location.search.split("&")[1] == undefined) {
                    flag = true; //添加模式
                    $("#userName").html(userName);
                    $("#submit").html("发送心愿");
                }
                else { //编辑模式
                    flag = false;
                    $("#userName").html(userName);
                    $("#submit").html("修改心愿");
                    id = window.location.search.split("&")[1].split("=")[1];
                    editLaunch(id);
                }
            }
        else {
            alert("未登录，请先登录");
            window.location.href="../../signin";
        }

        },
        error: function(XMLHttpRequest, textStatus, errorThrown)
        {
             alert(XMLHttpRequest.responseText + " "+ XMLHttpRequest.status +" "+ textStatus +" "+ errorThrown);
        }
    });
});
function submit() {
        var content = $("#content").val();
        if (flag == true) {
            var data={};
            data.name = userName;
            data.content = content;
            console.log(data);
            if (content=="") alert("心愿为空!");
            else{
                $.ajax({
                    type: "POST",
                    url: url+ "/api/submitWish",

                    xhrFields:{
                        withCredentials:true
                    },
                    dataType:'JSON',
                    crossDomain: true,

                    xhrFields:{
                        withCredentials:true
                    },
                    dataType:'JSON',
                    data: JSON.stringify(data),
                    success: function (data) 
                    { 
                        alert("添加成功！"); location.reload(); 
                    }, //根据后端返回判断是否发送成功
                    error: function (jqXHR) { console.log("Error:" + jqXHR.status); }
                    
                })
            }
        }
        else{
            var Data={};
            var len;
            $.ajax({
                type: "GET",
                url: url+ "/api/getUserWish",
                xhrFields:{
                    withCredentials:true
                },
                dataType:'JSON',
                data: "",
                success: function (data) {
                    len = data.data.length;
                    var Data=data.data.data;
                    for (i = 0; i < len; i++) {
                        if(id==Data[i].id)
                        {  
                            var data1={};
                            data1.id = Number(id);
                            data1.name=userName;
                            data1.content = $("#content").val();
                            data1.isClaim=Data[i].isClaim;
                            data1.claimName=Data[i].claimName;
                           
                            $.ajax({
                                type: "POST",
                                url: url+ "/api/changeWish",
                                data: JSON.stringify(data1),
                                xhrFields:{
                                    withCredentials:true
                                },
                                dataType:'JSON',
                                crossDomain: true,  
                                success: function (data) 
                                { 
                                    if (data.msg=="SUCCESS")
                                    {
                                        alert("编辑成功！");
                                    }
                                    else if (data.msg=="CLAIMED")
                                    {
                                        alert("心愿已被认领,无法修改");
                                    }
                                    else if (data.msg=="WISH_ID_ERROR")
                                    {
                                        alert("心愿不存在");
                                    }
                                    else if (data.msg=="UID_ERROR")
                                    {
                                        alert("该用户无权限");
                                    }
                                    toManage(); 
                                }, //根据后端返回判断是否发送成功
                                ERROR: function (jqXHR) { console.log("Error:" + jqXHR.status); }
                            })
                            
                        }}

                        },
                        error: function (jqXHR) { console.log("Error:" + jqXHR.status); }
                        });
        }
    }

function editLaunch(id) {  //加载编辑模式
    var data1={};
    var len;
    var Data={};
    $.ajax({
        type: "GET",
        url: url+ "/api/getUserWish",
        // data: "user=" + userName, // GET请求发送字符串
        xhrFields:{
            withCredentials:true
        },
        dataType:'JSON',
        
        data: "",
        success: function (data) {
            len = data.data.length;           
            Data=data.data.data;
            for (var i = 0; i < len; i++) {
                if (id==Data[i].id)
                {
                    $("#content").val(Data[i].content);
                }
            }
        },
        error: function (jqXHR) { console.log("Error:" + jqXHR.status); }
    });
  
   



}
function quit() {
    data={};
    $.ajax({
        type: "GET",
        url: url+ "/api/loginOut",
        data: data,

        xhrFields:{
            withCredentials:true
        },
        dataType:'JSON',
        success: function (data) {
            window.location.href = "/";
        },
        error: function (jqXHR) { console.log("Error:" + jqXHR.status); }
    });
}
function toMain() {
    window.location.href = "/main" ;
}
function toManage() {
    window.location.href = "/userManager/manage" ;
}
function toAdd() {
    window.location.href = "/useManager/add";
}