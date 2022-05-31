var userName, myTidyName;
var url="http://101.43.175.190:8081";
var noteColor = [
    "mdui-color-amber-100",
    "mdui-color-blue-100",
    "mdui-color-red-100",
    "mdui-color-purple-100"
];

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
                if (data.msg!="SUCCESS")
                {         
                    $("#quit").html("返回");
                    $("#userName").html("未登录");
                
                    getWish();
                }
                else{
                    userName=data.data;
                    $("#userName").html(userName);
                    $("#quit").html=("登出");
                    getWish();
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown)
            {
                 alert(XMLHttpRequest.responseText + " "+ XMLHttpRequest.status +" "+ textStatus +" "+ errorThrown);
            }
        });
    });



function getWish() {
    // 
    $.ajax({
        type: "GET",
        url: url+"/api/getWish",
        data: "",
        success: function (data) {
            var Data=data.data.data;
            // var ele0 = $(".note");
            var ele1 = $(".sheet");
            var ele2 = $(".object");
            // var ele3 = $(".check");
            var ele4 = $(".writer");
            var len=data.data.length;
            for (var i = 1; i <= 9; i++) { 
                {
                    if (i<=len)
                    {
                        ele1[i - 1].innerHTML =  Data[i-1].content;
                        // alert(Data[i].content);
                        ele2[i - 1].innerHTML = Data[i-1].id;
                        if (Data[i-1].isClaim==false) 
                        {
                            $(".organize")[i-1].innerHTML="未认领";
                        }
                        else if(Data[i-1].isClaim==true)
                        {   
                            $(".organize")[i-1].innerHTML="已认领";
                            $(".department")[i-1].innerHTML="已由"+ Data[i-1].claimName + "认领";
                        // $(".organize")[i-1].css("background-color","purple");
                        }
                    }
                    else {
                        $(".organize")[i-1].innerHTML="";
                    }
                ele4[i - 1].innerHTML = "by "+Data[i-1].name;
            }
        }
        },
        error: function (jqXHR) { console.log("Error:" + jqXHR.status); }
    });
}


function claim(n){
    
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
                myClaim(n);
            }
            else{
                errorClaim();
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown)
        {
             alert(XMLHttpRequest.responseText + " "+ XMLHttpRequest.status +" "+ textStatus +" "+ errorThrown);
        }
    });
}

function errorClaim()
{
    alert("请先登录再认领!");
}






function myClaim(n){
    var ele=$(".organize")[n];
    if(ele.innerHTML=="未认领")
    {
        var data={};
        // var id=;
        data.id=Number($(".object")[n].innerHTML);
        
        $.ajax({       
            type: "POST",
            url:  url+"/api/submitClaim",
            data: JSON.stringify(data),

            xhrFields:{
                withCredentials:true
            },
            dataType:'JSON',
            crossDomain: true,
            
            success: function (data) {
                if(data.msg=="SUCCESS"){
                    ele.innerHTML="已认领";
                    $(".department")[n].innerHTML="已由"+userName+"认领";
                    // ele.html("style='background-color:green'");
                    // ele.css('background','blue');
                    // $("#quit").css("color","red");
                    ele.css("background-color","purple");
                }
                
            }, //根据后端返回判断是否注册成功
            error: function (jqXHR) { console.log("Error:" + jqXHR.status); }
        })
    }

    else {
        var data={};
        // var id=;
        data.id=Number($(".object")[n].innerHTML);
        
        $.ajax({       
            type: "DELETE",
            url:  url+"/api/deleteClaim",
            data: JSON.stringify(data),

            xhrFields:{
                withCredentials:true
            },
            dataType:'JSON',
            crossDomain: true,
            
            success: function (data) {
                if(data.msg=="SUCCESS"){
                    ele.innerHTML="未认领";
                    $(".department")[n].innerHTML="";
                    // ele.css('font-color','blue');
                    // ele.css("background-color","green");
                }
                
            },
            error: function (jqXHR) { console.log("Error:" + jqXHR.status); }
        })
    }
}




function toAdd() {
   
    window.location.href = "/userManager/add/" ;
}
function quit(number) {
    var data={};
    $.ajax({
        type:"GET",
        data:data,
        url:url+"/api/loginOut",
        xhrFields:{
            withCredentials:true
        },
        dataType:'JSON',
        crossDomain: true,
        success: function (data) {  
            if (data.msg=="SUCCESS")
                window.location.href = "/main";
            else       window.location.href = "/";
        },
        error: function (jqXHR) { console.log("Error:" + jqXHR.status); }
    })
    
}
function closeComment() {
    $("#cover").css("display", "none");
    $("#container").css("display", "none");
}