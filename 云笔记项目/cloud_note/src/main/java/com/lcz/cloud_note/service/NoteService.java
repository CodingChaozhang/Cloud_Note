package com.lcz.cloud_note.service;

import java.util.List;
import java.util.Map;

import com.lcz.cloud_note.entity.Note;
import com.lcz.cloud_note.entity.Share;
import com.lcz.cloud_note.util.NoteResult;

public interface NoteService {
	//根据点击的bookId，从而返回一个笔记本中的笔记
	public NoteResult<List<Map>> loadBookNotes(String bookId);
	//单击笔记,加载笔记相关信息
	public NoteResult<Note> loadNote(String noteId);
	//更新笔记信息（保存笔记）事件
	public NoteResult<Object> updateNote(String noteId,String title,String body);
	//增加笔记事件
	public NoteResult<Note> addNote(String userId,String bookId,String title);
	//删除笔记事件
	public NoteResult deleteNote(String noteId);
	//转移笔记事件
	public NoteResult moveNote(String noteId, String bookId);
}
