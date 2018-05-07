//格式化字符串，转义<和>
function formate_name(e){
	e=e.replace(/</g,'&lt;');
	e=e.replace(/>/g,'&gt;');
	return e;
}
//去掉空格
function check_null(s){
	s=s.replace(/ /g,'');
	s=s.length;
	return s;
}
//隐藏
function yc(a){
	a.hide();
}



//获取笔记本列表
function get_nb_list(){
	loadNormalNoteBook();
}

//获取特殊笔记本列表
function get_spnb_list(){
	loadSpecialNoteBook();
}



//获取活动列表
function activity_list(){
	getActivityList();
}

//获取活动页面参加活动笔记列表
function get_activity_list(){
	var param=window.location.hash;
	global_ac_id=param.replace(/#/,'');
	$("#fifth_side_right .contact-body").empty();
	$("#more_activity_note").val(1);
	getNoteActivitys(global_ac_id,1);
}



//获取当前选中的笔记本节点(li节点)
function getCheckedNoteBook() {
	return $("#first_side_right .checked").parent();
}

//获取当前选中的笔记节点(li节点)
function getCheckedNote() {
	return $("#second_side_right .checked").parent();
}

//获取回收站中当前选中的笔记节点(li节点)
function getRecycleCheckedNote() {
	return $("#four_side_right .checked").parent();
}

//获取搜索列表中当前选中的笔记节点(li节点)
function getSearchCheckedNote() {
	return $("#sixth_side_right .checked").parent();
}

//获取收藏列表中当前选中的笔记节点(li节点)
function getLikeCheckedNote() {
	return $("#seventh_side_right .checked").parent();
}



//注册事件
$(function(){
	//显示用户名
	$(".profile-username").text(getCookie("userName"));
	
	//----关闭，取消
	$(document).on("click", ".close,.cancle", function() {
		$('#input_notebook,#input_note').val('');
        $('.modal.fade.in').hide();
        $('.opacity_bg').hide();
    }),
	
    
    
    /***********注册笔记本相关操作************/
	//----单击笔记本,查询笔记
	$(document).on("click", "#pc_part_1 li", function() {
		$('#pc_part_2,#pc_part_3').show();
		$('#pc_part_2 ul').empty();
		$('#pc_part_4,#pc_part_5,#pc_part_6,#pc_part_7,#pc_part_8').hide();
		$('#rollback_button,#like_button,#action_button').removeClass('clicked');
		$(this).siblings('li').children('a').removeClass('checked');
		$(this).children('a').addClass('checked');
		var notebookId=$(this).data('notebook').cn_notebook_id;
		//$('#notebookId').data('cnNotebookId',notebookId);
		//获取笔记本下的笔记列表
		getNormalNoteList(notebookId);
    }),
    
	//----打开创建笔记本界面
	$(document).on("click", "#add_notebook", function() {
		$('#can').load('./alert/alert_notebook.html',function(){
			$('#input_notebook').focus();
		});
		$('.opacity_bg').show();
    }),
    
	//----创建笔记本
	$(document).on("click", "#modalBasic .btn.btn-primary.sure", function() {
		var get_name=$('#input_notebook').val();
		var s_num=check_null(get_name);
		get_name=formate_name(get_name);
		if(get_name!=null&&get_name!=''&&s_num!=0){
			//保存
			addNoteBook(get_name);
		}
    }),
    
	//----双击,打开修改笔记本界面
	$(document).on("dblclick", "#pc_part_1 li:gt(0)", function() {
		//dom=$(this);
		$('#can').load('./alert/alert_rename.html',function(){
			$('#input_notebook_rename').focus();
			//$('#modalBasic_4 .sure').data({'dom':dom});
		});
		$('.opacity_bg').show();
		//flag=$(this).children('a').children('button').length;
    }),
    
    //修改笔记本
	$(document).on("click",'#modalBasic_4 .sure',function() {
		var dom = getCheckedNoteBook();
		var get_old_name=dom.text();
		var notebook = dom.data("notebook");
		var get_new_name=$('#input_notebook_rename').val();
		var get_name=$('#input_notebook_rename').val()?get_new_name:get_old_name;
		var s_num=check_null(get_name);
		get_name=formate_name(get_name);
		if(get_name!=get_old_name&&get_name!=null&&get_name!=''&&s_num!=0){
			//修改笔记本
			updateNoteBook(notebook.cn_notebook_id,get_name,dom);
		}
	});
    
	//----打开删除笔记本界面
	$(document).on("click", "#first_side_right .btn_delete", function() {
		$('#can').load('./alert/alert_delete_notebook.html');
		$('.opacity_bg').show();
		//dom=$(this).parents('li');
    }),
	
    //----删除笔记本
	$(document).on('click','#modalBasic_6 .btn.btn-primary.sure',function(){
		//判断是否有笔记，有的话禁止删除
		if($('#second_side_right ul').children().length >0){
			alert("该笔记本下存在笔记，不能删除");
			return ;
		}
		//删除
		var dom = getCheckedNoteBook();
		var notebook=dom.data('notebook');
		deleteNoteBook(notebook.cn_notebook_id,dom);
	});
    
	
	
	/***********注册笔记相关操作************/
	//----点击笔记
	$(document).on("click", "#pc_part_2 li", function() {
		$(this).siblings('li').children('a').removeClass('checked');
		$(this).children('a').addClass('checked');
		//var li_dom=$(this);
		//var note_id=$(this).data('note').cn_note_id;
		//$('#save_note').data({
		//	'noteId':note_id,
		//	'dom':li_dom
		//});
		var noteId = getCheckedNote().data("note").cn_note_id;
		getNoteDetail(noteId);
    }),
    
	//----打开创建笔记界面
	$(document).on("click", "#add_note",
    function(a) {
		$('#can').load('./alert/alert_note.html',function() {
			$('#input_note').focus();
		});
		$('.opacity_bg').show();
    }),
    
	//----创建笔记
	$(document).on("click", "#modalBasic_2 .btn.btn-primary.sure",
    function(a) {
		var noteBookName=$('#input_note').val()?$('#input_note').val():'新建笔记';
		noteBookName=formate_name(noteBookName);
		var noteBookId = getCheckedNoteBook().data("notebook").cn_notebook_id;
		//保存
		createNormalNote(noteBookId, noteBookName);
    }),
    
    //----保存笔记内容
    $(document).on("click","#save_note",function() {
		//var notebook_id=$('#notebookId').data('cnNotebookId');
    	var noteBookId=getCheckedNoteBook().data("notebook").cn_notebook_id;
		//var note_id=$(this).data('noteId');
    	var noteId=getCheckedNote().data("note").cn_note_id;
		//var noteDom=$(this).data('dom');
    	var noteDom=getCheckedNote();
    	
		var noteTitle=$('#input_note_title').val();
		noteTitle=formate_name(noteTitle);
		var noteBody=um.getContent();
		
		var note={
				cn_note_id:noteId,
				cn_notebook_id:noteBookId,
				cn_note_title:noteTitle,
				cn_note_body:noteBody
		};
		//修改
		updateNormalNote(note, noteDom);
    }),
    
    //----点击笔记下拉按钮
	$(document).on("click", ".btn_slide_down", function() {
		$(this).parents('li').children('.note_menu').addClass('note_menu_show').mouseleave(function(){
			$(this).removeClass('note_menu_show');
		});
    }),
    
    //----打开删除笔记界面
	$(document).on("click", "#second_side_right .btn_delete", function() {
		$('#can').load('./alert/alert_delete_note.html');
		$('.opacity_bg').show();
		//dom=$(this).parents('li');
    }),
    
	//----确认删除
	$(document).on('click','#modalBasic_7 .btn.btn-primary.sure', function() {
		var noteId = getCheckedNote().data("note").cn_note_id;
		deleteNormalNote(noteId, getCheckedNote());
	});
    
	//----打开移动笔记界面
	$(document).on("click", "#second_side_right .btn_move", function() {
		$('#can').load('./alert/alert_move.html',function(){
			// 获取笔记本列表
			setNoteBookToSelect("moveSelect");
			$('#moveSelect').focus();
		});
		$('.opacity_bg').show();
		//dom=$(this).parents('li');
    }),
    
	//----确认移动
	$(document).on('click','#modalBasic_11 .btn.btn-primary.sure',function(){
		var dom = getCheckedNote();
		var noteBookId = dom.data("note").cn_notebook_id;
		var toBookId = $('#moveSelect').val();
		if(toBookId!="" && toBookId!=noteBookId){
			// 执行移动笔记
			var noteId = dom.data("note").cn_note_id;
			moveNote(noteId,toBookId,dom);
			//$('.close,.cancle').trigger('click');
		}
	});
    
	//----分享笔记
	$(document).on("click", "#second_side_right .btn_share", function() {
		$(this).fadeOut(600);
		createShareNote(getCheckedNote().data("note").cn_note_id);
    }),
    
    
    /***********注册回收站相关操作************/
	//----点击回收站按钮
	$(document).on("click", "#rollback_button", function() {
		$('#pc_part_2,#pc_part_3,#pc_part_6,#pc_part_7,#pc_part_8').hide();
		$('#pc_part_4,#pc_part_5').show();
		$('#first_side_right li a').removeClass('checked');
		$('#like_button,#action_button').removeClass('clicked');
		$(this).addClass('clicked');
		$('#pc_part_4 ul').empty();//每次加载前先清空所有li
		var noteBookId=$('#rollback_button').data('notebook').cn_notebook_id
		getRecycleNoteList(noteBookId);
    }),
    
	//----点击回收站笔记
	$(document).on("click", "#pc_part_4 li", function() {
		$(this).siblings('li').children('a').removeClass('checked');
		$(this).children('a').addClass('checked');
		getRecycleNoteDetail(getRecycleCheckedNote().data('note').cn_note_id);
    }),
    
	//----点击回收站恢复按钮
	$(document).on("click", "#four_side_right .btn_replay", function() {
		$('#can').load('./alert/alert_replay.html',function(){
			setNoteBookToSelect("replaySelect");
			$('#replaySelect').focus();
		});
		$('.opacity_bg').show();
		//dom=$(this).parents('li');
    }),
    
	//----确认恢复
	$(document).on('click','#modalBasic_3 .btn.btn-primary.sure', function(){
		var noteId = getRecycleCheckedNote().data("note").cn_note_id;
		var noteBookId = $('#replaySelect').val();
		if(noteBookId!=""&&noteId!="") {
			moveNote(noteId,noteBookId,getRecycleCheckedNote());
		}
	});

	//----点击回收站删除按钮
	$(document).on("click", "#four_side_right .btn_delete", function() {
		$('#can').load('./alert/alert_delete_rollback.html');
		$('.opacity_bg').show();
		//dom=$(this).parents('li');
    }),
    
	//----确认删除
	$(document).on('click','#modalBasic_10 .btn.sure', function() {
		var noteId = getRecycleCheckedNote().data("note").cn_note_id;
		deleteRecycleNote(noteId,getRecycleCheckedNote());
	});
    
	
	/***********注册搜索笔记相关操作************/
	//----搜索笔记
	$(document).on("keyup", "body", function(e) {
		if($('#search_note').is(':focus')&&(e.keyCode==108||e.keyCode==13)){
			var m=$('#search_note').val();
			var n=m.replace(/ /g,'');
			var a=n.length;
			if(a!=0){
				$('#sixth_side_right ul').empty();
				$('#more_note').val(1);
				getShareNoteList(n,1);
			}
		}
    }),
    
	//----更多搜索笔记
	$(document).on("click", "#more_note", function() {
		var page = $('#more_note').val();
		var m=$('#search_note').val();
		var n=m.replace(/ /g,'');
		var a=n.length;
		if(a!=0){
			$('#more_note').val(parseInt(page)+1);
			getShareNoteList(n,parseInt(page)+1);
		}
    }),
    
	//----点击搜索笔记
	$(document).on("click", "#sixth_side_right li", function() {
		$(this).siblings('li').children('a').removeClass('checked');
		$(this).children('a').addClass('checked');
		var shareId=$(this).data('share').cn_share_id;
		getShareNoteDetail(shareId);
    }),
    
	//----收藏搜索笔记
	$(document).on("click", "#pc_part_6 .btn_like", function() {
		var dom=$(this);
		$('#can').load('./alert/alert_like.html',function(){
			$('#modalBasic_5 .btn.btn-primary.sure').click(function(){
				//$('.close,.cancle').trigger('click');
				var shareId=getSearchCheckedNote().data("share").cn_share_id;
				likeShareNote(shareId, dom);
			});
		});
		$('.opacity_bg').show();
    }),
    
    
    /***********注册收藏笔记相关操作************/
	//----点击收藏按钮
	$(document).on("click", "#like_button", function() {
		$('#pc_part_2,#pc_part_3,#pc_part_4,#pc_part_6,#pc_part_8').hide();
		$('#pc_part_7,#pc_part_5').show();
		$('#first_side_right li a').removeClass('checked');
		$('#rollback_button,#action_button').removeClass('clicked');
		$(this).addClass('clicked');
		$('#pc_part_7 ul').empty();//每次加载前先清空所有li
		var like_id=$('#like_button').data('notebook').cn_notebook_id;
		getLikeNoteList(like_id);
    }),
	
	//----点击收藏笔记
	$(document).on("click", "#pc_part_7 li", function() {
		$(this).siblings('li').children('a').removeClass('checked');
		$(this).children('a').addClass('checked');
		var note_id=$(this).data('note').cn_note_id;
		getLikeNoteDetail(note_id);
    }),
    
	//----点击取消收藏
	$(document).on("click", "#pc_part_7 li .btn_delete", function() {
		$('#can').load('./alert/alert_delete_like.html');
		$('.opacity_bg').show();
		//dom=$(this).parents('li');
    }),
    
	//----确认取消
	$(document).on('click','#modalBasic_9 .btn.btn-primary.sure',function(){
		var noteId = getLikeCheckedNote().data("note").cn_note_id;
		deleteLikeNote(noteId,getLikeCheckedNote());
		
	});
    
	
	/***********注册参加活动笔记相关操作************/
	//----点击参加活动笔记按钮
	$(document).on("click", "#action_button", function() {
		$('#pc_part_2,#pc_part_3,#pc_part_6,#pc_part_7,#pc_part_4').hide();
		$('#pc_part_8,#pc_part_5').show();
		$('#first_side_right li a').removeClass('checked');
		$('#rollback_button,#like_button').removeClass('clicked');
		$(this).addClass('clicked');
		$("#eighth_side_right ul").empty();
		var noteBookId = $('#action_button').data('notebook').cn_notebook_id;
		getNoteActivityList(noteBookId);
    }),
    
    //----点击参加活动笔记
	$(document).on("click", "#pc_part_8 li", function() {
		$(this).siblings('li').children('a').removeClass('checked');
		$(this).children('a').addClass('checked');
		getActivityNoteDetail($(this).data('note').cn_note_id);
    }),
	
    
    
    
    
    /***********注册活动相关操作************/
	//----更多活动笔记
	$(document).on("click", "#more_activity_note", function() {
		var page = $('#more_activity_note').val();
		$('#more_activity_note').val(parseInt(page)+1);
		getNoteActivitys(global_ac_id,parseInt(page)+1);
    });
	
	//----点击笔记(活动页面)
	$(document).on("click", "#action_part_1 li", function() {
		$('#rollback_button').removeClass('clicked');
		$(this).siblings('li').children('a').removeClass('checked');
		$(this).children('a').addClass('checked');
		$("#content_body").empty();
		getNoteActivityDetail($(this).data('noteActivity').cn_note_activity_id);
    }),
	
	//----点击参加活动（活动页面）
	$(document).on("click", "#join_action", function() {
		$('#modalBasic_15,.opacity_bg').show();
		$('#select_notebook ul').empty();
		$('#select_note ul').empty();
		getSelectNoteBook();
    }),
    
	//----准备选择参加活动笔记（活动页面）
	$(document).on("click", "#select_notebook li", function() {
		$(this).siblings('li').children('a').removeClass('checked');
		$(this).children('a').addClass('checked');
		var noteBookId=$(this).data('notebook').cn_notebook_id;
		$('#select_note ul').empty();
		getSelectNoteList(noteBookId);
    }),
    
	//----选择笔记（活动页面）
	$(document).on("click", "#select_note li", function() {
		$(this).siblings('li').children('a').removeClass('checked');
		$(this).children('a').addClass('checked');
    }),

	//----确认选择的笔记（活动页面）
	$(document).on("click", "#modalBasic_15 .btn.btn-primary.sure", function() {
		//var get_notename=$('#select_note li a.checked').text();
		//$('.close,.cancle').trigger('click');
		var dom=$("#select_note ul .checked").parent();
		var noteId=dom.data('note').cn_note_id;
		//var activity_Id=dom.data('noteBookId');
		createNoteActivity(noteId,global_ac_id,dom);
    }),
    
	//----点击收藏（活动页面）
	$(document).on('click',"#first_action .btn_like", function() {
		var dom = $(this).parents("li");
		var noteActivityId = dom.data("noteActivity").cn_note_activity_id;
		likeActivityNote(noteActivityId, $(this));
    }),
	
	//----顶笔记（活动页面）
	$(document).on("click", "#first_action .btn_up", function() {
		var dom = $(this).parents("li");
		var noteActivityId = dom.data("noteActivity").cn_note_activity_id;
		up(noteActivityId,$(this));
    }),
    
	//----踩笔记（活动页面）
	$(document).on("click", "#first_action .btn_down", function() {
		var dom = $(this).parents("li");
		var noteActivityId = dom.data("noteActivity").cn_note_activity_id;
		down(noteActivityId,$(this));
    });
	
});