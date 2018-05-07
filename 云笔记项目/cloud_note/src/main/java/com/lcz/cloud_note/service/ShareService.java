package com.lcz.cloud_note.service;

import java.util.List;

import com.lcz.cloud_note.entity.Share;
import com.lcz.cloud_note.util.NoteResult;

public interface ShareService {
	//分享功能（实际上为保存到share表)
	public NoteResult<Object> shareNote(String noteId);
	//搜索功能
	public NoteResult<List<Share>> searchNote(String keyword);
	//点击搜索后的收藏笔记，从而查看笔记信息
	public NoteResult<Share> loadShareNote(String shareId);
}
