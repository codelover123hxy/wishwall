var userName;
var total;
var noteColor = [
    "mdui-color-amber-100",
    "mdui-color-blue-100",
    "mdui-color-red-100",
    "mdui-color-purple-100"
];
var url="http://101.43.175.190:8081";
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
            
            if (data.msg=="SUCCESS")
            {
                userName =data.data;
                $("#userName").html(userName);
                getUserWish(userName);
            }
        }
    })

});



function getUserWish(userName) {
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
            total = data.data.length;
         
            // console.log(total);
            var Data=data.data.data;
            if (total > 0)
                for (i = 0; i < total; i++) {
                    var ele = document.createElement("div");
                    // ele.className = "note mdui-card " + noteColor[Number(data.color[i])];
                    // ele.setAttribute("title", String(i));
                    ele.innerHTML =  "<div class='border'  style='border-radius:10px;background-color:rgba(253, 242, 198, 0.8) ;margin:10px;height:120px;width:300px'> "
                    +" <span class='quote'> “</span> <span class='sheet'>"
                     + Data[i].content + "</span> <div class='attach'   ><span class='check' style='display:none'>id:" 
                     + Data[i].id + "</span><span class='index' style='display :none'>" + String(i)
                     +"</span></div><div class='tools mdui-btn-group' style='margin-left:65px;margin-top:15px '><button class='edit' +"
                     +" style='height:40px;width:80px;border-radius:15px;border:none;background:linear-gradient(145deg, #fffff0, #dfe6ca)'   "
                      +"onclick='edit(  "   + String(i)  +  "  )'>修改</button>"
                     +"<button class='delete' style='margin-left:20px;height:40px;width:80px ;border-radius:15px;border:none;background:linear-gradient(145deg, #fffff0, #dfe6ca) '   onclick='delect(" 
                     + String(i) + ")'>删除</button></div> </div>"    ;
                    document.getElementsByClassName("column")[i % 3].appendChild(ele);
                }
            else {
                $("#internal").html("<h3>你还没发表过心愿哦~，点击左上角发表吧！</h3>")
            }
        },
        error: function (jqXHR) { console.log("Error:" + jqXHR.status); }
    });
}
 function find(num) { //flex瀑布流打乱了 DOM 顺序，所以执行查询
    for (var i = 0; i < total; i++)
    {
        
         if ($(".index")[i].innerHTML == num)
             return i;
    }
}
function edit(num) {
    var pos=find(num);
    var number=num;
    var id = $(".check")[pos].innerHTML.split(":")[1];
    var content = $(".sheet")[pos].innerHTML;
    var Data={};
    var len;
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
            var Data=data.data.data;
            for (i = 0; i < len; i++) {
                if(id==Data[i].id)
                {  
                    if(Data[i].isClaim==false)
                    {
                        window.location.href = "/userManager/add/?user=" + userName + "&id=" + id;
                    }
                    else{
                        alert("该心愿已被认领,无法修改");
                    } 
                }
            }
            },
            error: function (jqXHR) { console.log("Error:" + jqXHR.status); }
    });    
}
function delect(num) {
    var confirm = window.confirm("确定要删除这条心愿吗？");
    if (confirm == true) {
        pos = find(num);
        var wishID = $(".check")[pos].innerHTML.split(":")[1];
        data={};
        data.id=Number(wishID);
        $.ajax({
            type: "delete",
            url: url+ "/api/deleteWish",
            
            xhrFields:{
                withCredentials:true
            },
            dataType:'json',
            
            
            data: JSON.stringify(data), // GET请求发送字符串
            success: function (data) {
                if (data.msg == "SUCCESS") {
                    alert("删除成功");
                    window.location.reload();
                }
            },
            error: function (jqXHR) { console.log("Error:" + jqXHR.status); }
        });
    }
    else return;

}
function quit() {
    window.location.href = "/";
}
function toMain() {
    window.location.href = "/main/?user=" + userName;
}
function toAdd() {
    window.location.href = "/userManager/add/?user=" + userName;
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