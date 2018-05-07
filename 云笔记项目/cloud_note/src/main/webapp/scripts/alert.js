//弹出删除笔记确认对话框
function alertDeleteNoteWindow(){
	$("#can").load("./alert/alert_delete_note.html");
	$(".opacity_bg").show();
};
//弹出新建笔记本对话框
function alertAddBookWindow() {
	//弹出新建笔记本对话框
	$('#can').load('./alert/alert_notebook.html');
	//显示背景
	$('.opacity_bg').show();
};
//关闭对话框,对所有对话框都有效
function closeAlertWindow(){
	$("#can").html("");
	$(".opacity_bg").hide();
};
//弹出新建笔记的对话框
function alertAddNoteWindow(){
	//判断是否有笔记本被选中
	var $li=$("#book_ul a.checked").parent();
	if($li.length==0){
		alert("请选择笔记本");
	}else{
		$('#can').load('./alert/alert_note.html');
		$('.opacity_bg').show();
	}
};
//弹出转移笔记对话框
function alertMoveNoteWindow(){
	$(".opacity_bg").show();
	$("#can").load("alert/alert_move.html",function(){
		//为alert_move.html中<select>加载数据
		var books = $("#book_ul li");//获取book列表
		//循环book列表数据
		for(var i=0;i<books.length;i++){
			var $li = $(books[i]);//获取li元素并转为jQuery对象
			var bookId = $li.data("bookId");//获取笔记本id
			var bookName = $li.text().trim();//获取笔记本名
			//创建一个option元素
			var sopt = '';
			sopt+='<option value="'+bookId+'">';
			sopt+= bookName;
			sopt+='</option>';
			//添加到select中
			$("#moveSelect").append(sopt);
		}
	});
};

//转移笔记
function moveNote(){
	 //获取请求参数
	 //获取要转移的笔记ID
	 var $li = 
		$("#note_ul a.checked").parent();
	 var noteId = $li.data("noteId");
	 //获取要转入的笔记本ID
	 var bookId = $("#moveSelect").val();
	 //发送Ajax请求
	 $.ajax({
		 url:base_path+"/note/move.do",
		 type:"post",
		 data:{"noteId":noteId,"bookId":bookId},
		 dataType:"json",
		 success:function(result){
			 if(result.status==0){
				 //移除笔记li
				 $li.remove();
				 //提示成功
				 alert(result.msg);
			 }
		 },
		 error:function(){
			 alert("转移笔记异常");
		 }
	 });
 };
 
//弹出重命名笔记本对话框
 function alertRenameBookWindow(){
 	$("#can").load("alert/alert_rename.html");
 	$(".opacity_bg").show();
 };