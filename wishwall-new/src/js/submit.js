
function varify(){

    var password= $("#password").val();
    var repsword=$("#repsword").val();
    if (password!=repsword){
        $("#msg").html("重复密码错误，请重新输入!");
    }
    else 
        $("#msg").html("");
}

var data={};

// var url="http://116.62.226.141:8080";
var url="http://101.43.175.190:8081"

var flag;

function register() {
    var username= $("#username").val();
    var password= $("#password").val();
    var repsword=$("#repsword").val();
    
    if (username=='') {alert("用户名为空，请重新输入");flag=0; }
    else if (password=='') {alert("密码为空，请重新输入");flag=0;}
    else if (repsword=='' ){
        alert("确认密码错误，请重新输入");
        flag=0;
    }
    else{
        flag=1;
        data.username=username;
        data.pwd=password;
        submit(1);
    }
    
}

function login(){
    var username=$("#username").val();
    var password=$("#password").val();
    data.username=username;
    data.pwd=password;
    submit(2);
}


function submit(check){
    if (check==1){
    $.ajax({       //注册
        type: "POST",
        url:  url+"/api/register",
        data: JSON.stringify(data),

        xhrFields:{
            withCredentials:true
        },
        dataType:'JSON',
        crossDomain: true,
        
        success: function (data) {
            if (data.msg== "SUCCESS") { alert("注册成功！"); window.location.href = "../index.html"; }
            else if (data.msg== "ERROR") { alert("");  }
            else if (data.msg== "USERNAME_ERROR") { alert("学号不存在！");  }
            else if (data.msg== "USERNAME_REGISTERED") { alert("该学号已被注册！");  }
            else { alert("未知错误...");  }
        }, //根据后端返回判断是否注册成功
        error: function (jqXHR) { console.log("Error:" + jqXHR.status); }
    })
    console.log(data);
    }
    else if (check==2){
    $.ajax({
        type: "POST",
        url:url + "/api/login",
        data: JSON.stringify(data),

        xhrFields:{
            withCredentials:true
        },
        dataType:'JSON',
        crossDomain: true,

        success: function (data) {
            if (data.msg== "SUCCESS") {
                alert("登录成功！");
                window.location.href = "../main"; 
            }
            else if (data.msg== "USERNAME_ERROR") { alert("用户名错误！");  }
            else if (data.msg== "PWD_ERROR") { alert("密码错误！"); }
            else { alert("未知错误...");  }
        }, //根据后端返回判断是否登录成功   
        error: function (jqXHR) { console.log("Error:" + jqXHR.status); }
    })
    }
}

