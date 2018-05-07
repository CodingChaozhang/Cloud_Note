
///////////////////////////////////////////////////////////////////////////////////////////


/****-over
 * 公共方法集
 */

/**
 * 将笔记本列表放置到select组件中
 */
function setNoteBookToSelect(selectId){
	// 获取笔记本列表
	notebookNormalList(function (data){
		if(data != null){
			for(var i = 0; i < data.resource.length;i ++){
				var obj = data.resource[i];
				var opt = "<option value='"+obj.cnNotebookId+"'>"+obj.cnNotebookName+"</option>";
				$('#'+selectId).append(opt);
			}
		}
	},function (errorData) {
		
	});
}





