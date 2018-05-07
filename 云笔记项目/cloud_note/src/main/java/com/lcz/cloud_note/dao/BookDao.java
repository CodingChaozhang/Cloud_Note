package com.lcz.cloud_note.dao;

import java.util.List;

import com.lcz.cloud_note.entity.Book;


public interface BookDao {
	//根据登录的uid查找笔记本的数据
	public List<Book> findByUserId(String userId);
	//增加笔记本的操作
	public void save(Book book);
}
