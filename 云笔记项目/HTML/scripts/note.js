/***
 * 加载普通笔记
 */
function getNormalNoteList(noteBookId){
	$.ajax({
		type:"post",
		url:basePath+"note/findNote.do",
		dataType:"json",
		data:{"noteBookId":noteBookId},
		success:function(result) {
			if(result.status==0) {
				var list = result.data;
				$(list).each(function(){
					var li = '<li class="online"><a><i class="fa fa-file-text-o" title="online" rel="tooltip-bottom"></i> ' + this.cn_note_title + '<button type="button" class="btn btn-default btn-xs btn_position btn_slide_down"><i class="fa fa-chevron-down"></i></button></a><div class="note_menu" tabindex="-1"><dl><dt><button type="button" class="btn btn-default btn-xs btn_move" title="移动至..."><i class="fa fa-random"></i></button></dt><dt><button type="button" class="btn btn-default btn-xs btn_share" title="分享"><i class="fa fa-sitemap"></i></button></dt><dt><button type="button" class="btn btn-default btn-xs btn_delete" title="删除"><i class="fa fa-times"></i></button></dt></dl></div></li>';
					$("#second_side_right ul").append(li);
					$("#second_side_right ul li:last").data("note",this);
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
 * 查询普通笔记内容
 */
function getNoteDetail(noteId){
	$.ajax({
		type:"post",
		url:basePath+"note/findNoteDetail.do",
		dataType:"json",
		data:{"noteId":noteId},
		success:function(result) {
			if(result.status==0) {
				var note = result.data;
				$("#input_note_title").val(note.cn_note_title);
				um.setContent(note.cn_note_body==null?"":note.cn_note_body);
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
 * 创建普通笔记
 */
function createNormalNote(noteBookId, noteBookName){
	$.ajax({
		type:"post",
		url:basePath+"note/addNote.do",
		dataType:"json",
		data:{"cn_notebook_id":noteBookId,"cn_note_title":noteBookName},
		success:function(result) {
			if(result.status==0) {
				var note = result.data;
				var li = '<li class="online"><a><i class="fa fa-file-text-o" title="online" rel="tooltip-bottom"></i> ' + note.cn_note_title + '<button type="button" class="btn btn-default btn-xs btn_position btn_slide_down"><i class="fa fa-chevron-down"></i></button></a><div class="note_menu" tabindex="-1"><dl><dt><button type="button" class="btn btn-default btn-xs btn_move" title="移动至..."><i class="fa fa-random"></i></button></dt><dt><button type="button" class="btn btn-default btn-xs btn_share" title="分享"><i class="fa fa-sitemap"></i></button></dt><dt><button type="button" class="btn btn-default btn-xs btn_delete" title="删除"><i class="fa fa-times"></i></button></dt></dl></div></li>';
				$("#second_side_right ul").prepend(li);
				$("#second_side_right ul li:first").data("note",note);
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
 * 更新普通笔记
 */
function updateNormalNote(note,noteDom){
	$.ajax({
		type:"post",
		url:basePath+"note/updateNote.do",
		dataType:"json",
		data:note,
		success:function(result) {
			if(result.status==0) {
				noteDom.children(".checked").html('<i class="fa fa-file-text-o" title="online" rel="tooltip-bottom"></i> ' + note.cn_note_title + '<button type="button" class="btn btn-default btn-xs btn_position btn_slide_down"><i class="fa fa-chevron-down"></i></button>');
				$("footer div strong").text("保存成功").parent().fadeIn(100);
				setTimeout(function(){
					$("footer div").fadeOut(500);
				}, 1500);
				//$(".close,.cancle").trigger("click");
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
 * 删除普通笔记
 */
function deleteNormalNote(noteId, dom){
	$.ajax({
		type:"post",
		url:basePath+"note/deleteNote.do",
		dataType:"json",
		data:{"noteId":noteId},
		success:function(result) {
			if(result.status==0) {
				dom.remove();
				//清除笔记内容
				$("#input_note_title").val("");
				um.setContent("");
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
 * 移动笔记
 */
function moveNote(noteId, noteBookId, dom){
	$.ajax({
		type:"post",
		url:basePath+"note/moveNote.do",
		dataType:"json",
		data:{"noteId":noteId,"noteBookId":noteBookId},
		success:function(result) {
			if(result.status==0) {
				dom.remove();
				//清除笔记内容
				$("#input_note_title").val("");
				um.setContent("");
				//清除回收站笔记内容
				$("#fifth_side_right .contact-body").html('<h4 id="noput_note_title"></h4>');
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
 * 分享笔记
 */
function createShareNote(noteId){
	$.ajax({
		type:"post",
		url:basePath+"note/shareNote.do",
		dataType:"json",
		data:{"noteId":noteId},
		success:function(result) {
			if(result.status==0) {
				$("footer div strong").text("分享成功").parent().fadeIn(100);
				setTimeout(function(){
					$("footer div").fadeOut(500);
				}, 1500);
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
 * 查询回收站笔记列表
 */
function getRecycleNoteList(noteBookId){
	$.ajax({
		type:"post",
		url:basePath+"note/findNote.do",
		dataType:"json",
		data:{"noteBookId":noteBookId},
		success:function(result) {
			if(result.status==0) {
				var notes = result.data;
				$(notes).each(function(){
					var li = '<li class="disable"><a ><i class="fa fa-file-text-o" title="online" rel="tooltip-bottom"></i> '+this.cn_note_title+'<button type="button" class="btn btn-default btn-xs btn_position btn_delete"><i class="fa fa-times"></i></button><button type="button" class="btn btn-default btn-xs btn_position_2 btn_replay"><i class="fa fa-reply"></i></button></a></li>';
					$("#four_side_right ul").append(li);
					$("#four_side_right ul li:last").data("note",this);
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
 * 查看回收站笔记内容
 */
function getRecycleNoteDetail(noteId) {
	$.ajax({
		type:"post",
		url:basePath+"note/findNoteDetail.do",
		dataType:"json",
		data:{"noteId":noteId},
		success:function(result) {
			if(result.status==0) {
				var note = result.data;
				$("#fifth_side_right .contact-body").html('<h4 id="noput_note_title">标题：'+note.cn_note_title+'</h4>');
				$("#fifth_side_right .contact-body").append(note.cn_note_body);
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
 * 删除回收站笔记
 */
function deleteRecycleNote(noteId,dom){
	$.ajax({
		type:"post",
		url:basePath+"note/deleteRecycleNote.do",
		dataType:"json",
		data:{"noteId":noteId},
		success:function(result) {
			if(result.status==0) {
				dom.remove();
				//清除回收站笔记内容
				$("#fifth_side_right .contact-body").html('<h4 id="noput_note_title"></h4>');
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
 * 搜索分享笔记列表
 */
function getShareNoteList(searchKey,currentPage){
	$.ajax({
		type:"post",
		url:basePath+"note/searchShareNote.do",
		dataType:"json",
		data:{"searchKey":searchKey,"currentPage":currentPage},
		success:function(result) {
			if(result.status==0) {
				$('#pc_part_2,#pc_part_3,#pc_part_4,#pc_part_7,#pc_part_8').hide();
				$('#pc_part_6,#pc_part_5').show();
				//$('#sixth_side_right ul').empty();
				//循环对象取值
				var shares = result.data;
				$(shares).each(function(){
					$('#sixth_side_right ul').append('<li class="online"><a href="#"><i class="fa fa-file-text-o" title="online" rel="tooltip-bottom"></i> '+this.cn_share_title+'<button type="button" class="btn btn-default btn-xs btn_position btn_like"><i class="fa fa-star-o"></i></button><div class="time"></div></a></li>');
					$('#sixth_side_right ul li:last').data("share",this);
				});
				$('#first_side_right li a').removeClass('checked');
				$('#like_button,#action_button,#rollback_button').removeClass('clicked');
				$(this).addClass('clicked');
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
 * 查询分享笔记内容
 */
function getShareNoteDetail(shareId){
	$.ajax({
		type:"post",
		url:basePath+"note/findShareNoteDetail.do",
		dataType:"json",
		data:{"shareId":shareId},
		success:function(result) {
			if(result.status==0) {
				var share = result.data;
				$("#fifth_side_right .contact-body").html('<h4 id="noput_note_title">标题：'+share.cn_share_title+'</h4>');
				$("#fifth_side_right .contact-body").append(share.cn_share_body);
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
 * 收藏分享笔记
 */
function likeShareNote(shareId,dom){
	$.ajax({
		type:"post",
		url:basePath+"note/likeShareNote.do",
		dataType:"json",
		data:{"shareId":shareId},
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
	$('.close,.cancle').trigger('click');
}

/***
 * 加载收藏笔记
 */
function getLikeNoteList(likeNoteId){
	$.ajax({
		type:"post",
		url:basePath+"note/findNote.do",
		dataType:"json",
		data:{"noteBookId":likeNoteId},
		success:function(result) {
			if(result.status==0) {
				var list = result.data;
				$(list).each(function(){
					var li = '<li class="idle"><a ><i class="fa fa-file-text-o" title="online" rel="tooltip-bottom"></i> '+this.cn_note_title+'<button type="button" class="btn btn-default btn-xs btn_position btn_delete"><i class="fa fa-times"></i></button></a></li>';
					$("#seventh_side_right ul").append(li);
					$("#seventh_side_right ul li:last").data("note",this);
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
 * 查看收藏笔记内容
 */
function getLikeNoteDetail(noteId) {
	$.ajax({
		type:"post",
		url:basePath+"note/findNoteDetail.do",
		dataType:"json",
		data:{"noteId":noteId},
		success:function(result) {
			if(result.status==0) {
				var note = result.data;
				$("#fifth_side_right .contact-body").html('<h4 id="noput_note_title">标题：'+note.cn_note_title+'</h4>');
				$("#fifth_side_right .contact-body").append(note.cn_note_body);
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
 * 删除收藏笔记
 */
function deleteLikeNote(noteId,dom){
	$.ajax({
		type:"post",
		url:basePath+"note/deleteNote.do",
		dataType:"json",
		data:{"noteId":noteId},
		success:function(result) {
			if(result.status==0) {
				dom.remove();
				//清除回收站笔记内容
				$("#fifth_side_right .contact-body").html('<h4 id="noput_note_title"></h4>');
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
 * 加载本用户参加活动笔记列表
 */
function getNoteActivityList(noteBookId){
	$.ajax({
		type:"post",
		url:basePath+"note/findNote.do",
		dataType:"json",
		data:{"noteBookId":noteBookId},
		success:function(result) {
			if(result.status==0) {
				var list = result.data;
				$(list).each(function(){
					var li = '<li class="offline"><a ><i class="fa fa-file-text-o" title="online" rel="tooltip-bottom"></i> '+this.cn_note_title+'</a></li>';
					$("#eighth_side_right ul").append(li);
					$("#eighth_side_right ul li:last").data("note",this);
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
 * 查询参加活动的笔记内容
 */
function getActivityNoteDetail(noteId) {
	$.ajax({
		type:"post",
		url:basePath+"note/findNoteDetail.do",
		dataType:"json",
		data:{"noteId":noteId},
		success:function(result) {
			if(result.status==0) {
				var note = result.data;
				$("#fifth_side_right .contact-body").html('<h4 id="noput_note_title">标题：'+note.cn_note_title+'</h4>');
				$("#fifth_side_right .contact-body").append(note.cn_note_body);
			} else {
				alert(result.message);
			}
		},
		error:function(xhr,status,error) {
			alert("请求失败.");
		}
	});
}