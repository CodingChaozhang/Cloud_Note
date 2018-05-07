/***
 * 加载普通笔记本
 */
function loadNormalNoteBook(){
	$.ajax({
		type:"post",
		url:basePath+"notebook/findNormal.do",
		dataType:"json",
		data:{},
		success:function(result) {
			if(result.status==0) {
				var list = result.data;
				$(list).each(function(){
					$("#first_side_right ul").append('<li class="online"><a><i class="fa fa-book" title="笔记本" rel="tooltip-bottom"></i> '+this.cn_notebook_name+'<button type="button" class="btn btn-default btn-xs btn_position btn_delete"><i class="fa fa-times"></i></button></a></li>');
					$('#first_side_right li:last').data('notebook',this);
				});
			} else {
				alert(result.message);
			}
		},
		error:function(xhr,status,error) {
			alert("请求失败.");
		}
	});
}

/***
 * 加载特殊笔记本
 */
function loadSpecialNoteBook(){
	$.ajax({
		type:"post",
		url:basePath+"notebook/findSpecial.do",
		dataType:"json",
		data:{},
		success:function(result) {
			if(result.status==0) {
				var map = result.data;
				$('#first_side_right li:first').data('notebook',map.push);
				$('#rollback_button').data('notebook',map.recycle);
				$('#like_button').data('notebook',map.favorites);
				$('#action_button').data('notebook',map.action);
			} else {
				alert(result.message);
			}
		},
		error:function(xhr,status,error) {
			alert("请求失败.");
		}
	});
}

/****
 * 添加笔记本
 */
function addNoteBook(noteBookName){
	$.ajax({
		type:"post",
		url:basePath+"notebook/addNoteBook.do",
		dataType:"json",
		data:{"cn_notebook_name":noteBookName},
		success:function(result) {
			if(result.status==0) {
				var noteBook = result.data;
				$("#first_side_right ul li:first").after('<li class="online"><a><i class="fa fa-book" title="笔记本" rel="tooltip-bottom"></i> '+noteBook.cn_notebook_name+'<button type="button" class="btn btn-default btn-xs btn_position btn_delete"><i class="fa fa-times"></i></button></a></li>');
				$("#first_side_right ul li:first").next().data('notebook',noteBook);
				$(".close,.cancle").trigger("click");
			} else {
				alert(result.message);
			}
		},
		error:function(xhr,status,error) {
			alert("请求失败.");
		}
	});
}

/***
 * 重命名笔记本
 */
function updateNoteBook(noteBookId, noteBookName, dom){
	$.ajax({
		type:"post",
		url:basePath+"notebook/updateNoteBookName.do",
		dataType:"json",
		data:{"noteBookId":noteBookId,"noteBookName":noteBookName},
		success:function(result) {
			if(result.status==0) {
				dom.children('a').html('<i class="fa fa-book" title="笔记本" rel="tooltip-bottom"></i> '+noteBookName+'<button type="button" class="btn btn-default btn-xs btn_position btn_delete"><i class="fa fa-times"></i></button>');
				$('.close,.cancle').trigger('click');
			} else {
				alert(result.message);
			}
		},
		error:function(xhr,status,error) {
			alert("请求失败.");
		}
	});
}

/***
 * 删除笔记本
 */
function deleteNoteBook(noteBookId,dom){
	$.ajax({
		type:"post",
		url:basePath+"notebook/deleteNoteBook.do",
		dataType:"json",
		data:{"noteBookId":noteBookId},
		success:function(result) {
			if(result.status==0) {
				dom.remove();
				$('.close,.cancle').trigger('click');
			} else {
				alert(result.message);
			}
		},
		error:function(xhr,status,error) {
			alert("请求失败.");
		}
	});
}

/**
 * 将笔记本列表放置到select组件中
 */
function setNoteBookToSelect(selectId){
	$.ajax({
		type:"post",
		url:basePath+"notebook/findList.do",
		dataType:"json",
		data:{},
		success:function(result) {
			if(result.status==0) {
				var list = result.data;
				$(list).each(function(){
					var option = "<option value='"+this.cn_notebook_id+"'>"+this.cn_notebook_name+"</option>";
					$("#"+selectId).append(option);
				});
			} else {
				alert(result.message);
			}
		},
		error:function(xhr,status,error) {
			alert("请求失败.");
		}
	});
}