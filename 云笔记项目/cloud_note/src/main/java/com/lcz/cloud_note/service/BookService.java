package com.lcz.cloud_note.service;

import java.util.List;

import com.lcz.cloud_note.entity.Book;
import com.lcz.cloud_note.util.NoteResult;

public interface BookService {
	//根据登录的uid查找笔记本的数据
	public NoteResult<List<Book>> loadUserBook(String userId);
	
	//增加笔记本名称
	public NoteResult<Book> addBook(String userId,String title);
}
