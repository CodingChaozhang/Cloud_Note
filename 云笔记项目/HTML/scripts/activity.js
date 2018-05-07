/***
 * 获得活动列表
 */
function getActivityList(){
	$.ajax({
		type:"post",
		url:basePath+"activity/findActivity.do",
		dataType:"json",
		data:{},
		success:function(result) {
			if(result.status==0) {
				var list = result.data;
				$(list).each(function(i){
					var color;
					if(i%4==0){
						color='bg-primary';
					}else if(i%4==1){
						color='bg-danger';
					}
					else if(i%4==2){
						color='bg-inverse';
					}else{
						color='bg-warning';
					};
					
					var column=i%3;
					$('#col_'+column).append('<div id="contentfeeds'+i+'" class="panel panel-animated panel-default animated fadeInUp" style="visibility: visible;"><div class="panel-body bordered-bottom"><div class="no-padding jumbotron '+color+'"><p class="lead"><a href="activity_detail.html#'+this.cn_activity_id+'">'+this.cn_activity_title+'</a></p></div><p class="text-muted">'+this.cn_activity_body+'</p><div class="text-muted"><small style="color:red;">活动结束时间:'+this.cn_activity_end_time+'</small></div></div></div>');
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
 * 查询指定活动下已参加活动的笔记列表
 */
function getNoteActivitys(activityId,currentPage){
	$.ajax({
		type:"post",
		url:basePath+"activity/findNoteActivity.do",
		dataType:"json",
		data:{"activityId":activityId,"currentPage":currentPage},
		success:function(result) {
			if(result.status==0) {
				var noteActivityList = result.data;
				//$("#first_action ul").empty();
				$(noteActivityList).each(function(){
					$("#first_action ul").append('<li class="online"><a ><i class="fa fa-file-text-o" title="online" rel="tooltip-bottom"></i> '+this.cn_note_activity_title+'<button type="button" class="btn btn-default btn-xs btn_position_3 btn_up"><i class="fa fa-thumbs-o-up"></i></button><button type="button" class="btn btn-default btn-xs btn_position_2 btn_down"><i class="fa fa-thumbs-o-down"></i></button><button type="button" class="btn btn-default btn-xs btn_position btn_like"><i class="fa fa-star-o"></i></button></a></li>');
					$("#first_action ul li:last").data("noteActivity",this);
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
 * 查询活动笔记内容
 */
function getNoteActivityDetail(noteActivityId){
	$.ajax({
		type:"post",
		url:basePath+"activity/findNoteActivityDetail.do",
		dataType:"json",
		data:{"noteActivityId":noteActivityId},
		success:function(result) {
			if(result.status==0) {
				var noteActivity = result.data;
				$("#content_body").append('<h4><strong>标题: </strong>'+noteActivity.cn_note_activity_title+'</h4>');
				$("#content_body").append(noteActivity.cn_note_activity_body);
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
 * 查询可选择的笔记本
 */
function getSelectNoteBook(){
	$.ajax({
		type:"post",
		url:basePath+"notebook/findList.do",
		dataType:"json",
		data:{},
		success:function(result) {
			if(result.status==0) {
				var list = result.data;
				$(list).each(function(){
					$("#select_notebook ul").append('<li class="online"><a ><i class="fa fa-book" title="online" rel="tooltip-bottom"></i> '+this.cn_notebook_name+'</a></li>');
					$('#select_notebook li:last').data('notebook',this);
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
 * 查询可选择的笔记
 */
function getSelectNoteList(noteBookId){
	$.ajax({
		type:"post",
		url:basePath+"note/findNote.do",
		dataType:"json",
		data:{"noteBookId":noteBookId},
		success:function(result) {
			if(result.status==0) {
				var list = result.data;
				$(list).each(function(){
					$("#select_note ul").append('<li class="online"><a ><i class="fa fa-file-text-o" title="online" rel="tooltip-bottom"></i> '+this.cn_note_title+'</a></li>');
					$("#select_note ul li:last").data("note",this);
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
 *	将用户选择的笔记参加活动
 */
function createNoteActivity(noteId,activityId,dom){
	$.ajax({
		type:"post",
		url:basePath+"activity/addNoteActivity.do",
		dataType:"json",
		data:{"activityId":activityId,"noteId":noteId},
		success:function(result) {
			if(result.status==0) {
				var noteActivity = result.data;
				$("#first_action ul").prepend('<li class="online"><a ><i class="fa fa-file-text-o" title="online" rel="tooltip-bottom"></i> '+noteActivity.cn_note_activity_title+'<button type="button" class="btn btn-default btn-xs btn_position_3 btn_up"><i class="fa fa-thumbs-o-up"></i></button><button type="button" class="btn btn-default btn-xs btn_position_2 btn_down"><i class="fa fa-thumbs-o-down"></i></button><button type="button" class="btn btn-default btn-xs btn_position btn_like"><i class="fa fa-star-o"></i></button></a></li>');
				$("#first_action ul li:first").data("noteActivity",noteActivity);
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
 *	分享活动笔记
 */
function likeActivityNote(noteActivityId, dom) {
	$.ajax({
		type:"post",
		url:basePath+"note/likeActivityNote.do",
		dataType:"json",
		data:{"noteActivityId":noteActivityId},
		success:function(result) {
			if(result.status==0) {
				dom.remove();
			} else {
				alert(result.message);
			}
		},
		error:function(xhr,status,error) {
			alert("请求失败.");
		}
	});
	$('#modalBasic_14 .cancle').trigger('click');
}

/***
 *	顶笔记
 */
function up(noteActivityId, dom) {
	$.ajax({
		type:"post",
		url:basePath+"activity/upNoteActivity.do",
		dataType:"json",
		data:{"noteActivityId":noteActivityId},
		success:function(result) {
			if(result.status==0) {
				dom.remove();
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
 *	踩笔记
 */
function down(noteActivityId, dom) {
	$.ajax({
		type:"post",
		url:basePath+"activity/downNoteActivity.do",
		dataType:"json",
		data:{"noteActivityId":noteActivityId},
		success:function(result) {
			if(result.status==0) {
				dom.remove();
			} else {
				alert(result.message);
			}
		},
		error:function(xhr,status,error) {
			alert("请求失败.");
		}
	});
}
