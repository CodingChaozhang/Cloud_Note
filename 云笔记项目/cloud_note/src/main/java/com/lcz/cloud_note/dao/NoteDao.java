package com.lcz.cloud_note.dao;

import java.util.List;
import java.util.Map;

import com.lcz.cloud_note.entity.Note;

public interface NoteDao {
	//根据点击的bookId，从而返回一个笔记本中的笔记
	public List<Map> findByBookId(String bookId);
	
	//单击笔记,加载笔记相关信息
	public Note findByNoteId(String noteId);
	
	//更新笔记信息（保存笔记）事件
	public int updateNote(Note note);
	
	//增加笔记事件
	public void save(Note note);
	
	//删除(及移动)笔记事件（即动态的更新笔记的状态id为删除状态）
	public int dynamicUpdate(Note note);
}
