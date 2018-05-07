/**login.js 封装登录和注册处理**/
//log_in.html主处理
$(function(){//页面载入完毕
	//给登录按钮绑定单击处理
	$("#login").click(checkLogin);
	//给注册按钮绑定单击处理
	$("#regist_button").click(registerUser);
});
//注册处理
function registerUser(){
	//获取参数
	var name=$("#regist_username").val().trim();//获取账户名
	var nick=$("#nickname").val().trim();//获取昵称
	var password=$("#regist_password").val().trim();//获取密码
	var final_password=$("#final_password").val().trim();//获取确认密码
	//检查数据格式
	var ok=true;//表示参数状态
	//检查用户
	if(name==""){
		$("#warning_1 span").html("用户名不能为空");
		$("#warning_1").show();//显示出来
		ok=false;
	}
	//检测密码
	//1.非空 2.不能小于6位
	if(password==""){
		$("#warning_2 span").html("密码不能为空");
		$("#warning_2").show();//显示出来
		ok=false;
	}else if(password.length>0&&password.length<6){
		$("#warning_2 span").html("密码不能小于小于6位");
		$("#warning_2").show();//显示出来
		ok=false;
	}
	//检测确认密码
	//1.非空 2.是否与密码一致
	if(final_password==""){
		$("#warning_3 span").html("确认密码不能为空");
		$("#warning_3").show();//显示出来
		ok=false;
	}else if(final_password!=password){
		$("#warning_3 span").html("输入密码不一致");
		$("#warning_3").show();//显示出来
		ok=false;
	}
	if(ok){//数据校验通过
		$.ajax({
			url:base_path+"/user/add.do",
			type:"post",
			data:{"name":name,"nick":nick,"password":password},
			dataType:"json",
			success:function(result){
				if(result.status==0){//成功
					alert(result.msg);//提示成功
					$("#back").click();//转向登录界面
				}else if(result.status==1){//用户名被占
					$("#warning_1 span").html(result.msg);
					$("#warning_1").show();
				}
			},
			error:function(){
				alert("注册异常");
			}
		});
	}
};
//登录处理
function checkLogin(){
	//获取参数
	var name=$("#count").val().trim();//获取输入的账号
	var password=$("#password").val().trim();//获取输入的密码
	//清空以前提示信息
	$("#count_span").html("");
	$("#password_span").html("");
	//格式检测
	var ok=true;
	if(name==""){
		$("#count_span").html("用户不能为空");
		ok=false;
	}
	if(password==""){
		$("#password_span").html("密码不能为空");
		ok=false;
	}
	//发送请求
	if(ok){  //检测格式通过
		//发送ajax请求
		$.ajax({
			url:base_path+"/user/login.do",
			type:"post",
			data:{"name":name,"password":password},
			dataType:"json",
			success:function(result){
				//result是服务器返回的JSON结果
				if (result.status==0) { //登录成功
					//将用户信息保存到Cookie
					var userName=result.data.cn_user_name;
					var userId=result.data.cn_user_id;
					addCookie("userId",userId,2);
					addCookie("userName",userName,2);
					window.location.href="edit.html";
				}else if(result.status==1){//用户名错误
					$("#count_span").html(result.msg);
				}else if(result.status==2){//密码错误
					$("#password_span").html(result.msg);
				}
			},
			error:function(){
				alert("登录失败!");
			}
		});
	}
};