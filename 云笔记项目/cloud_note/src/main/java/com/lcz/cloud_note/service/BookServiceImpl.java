package com.lcz.cloud_note.service;


import java.sql.Timestamp;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.lcz.cloud_note.dao.BookDao;
import com.lcz.cloud_note.entity.Book;

import com.lcz.cloud_note.util.NoteResult;
import com.lcz.cloud_note.util.NoteUtil;

@Service("bookService")//扫描到spring容器里面
public class BookServiceImpl implements BookService {
	@Resource
	BookDao bookDao;
	//根据登录的uid查找笔记本的数据
	public NoteResult<List<Book>> loadUserBook(String userId) {
		//接受结果
		NoteResult<List<Book>> result=new NoteResult<List<Book>>();
		//查询
		List<Book> books = bookDao.findByUserId(userId);
		
		result.setStatus(0);
		result.setMsg("查询笔记本成功");
		result.setData(books);
		return result;
	}
	//增加笔记本事件
	public NoteResult<Book> addBook(String userId, String title) {
		Book book=new Book();
		//增加笔记本id
		String bookId=NoteUtil.createId();
		book.setCn_notebook_id(bookId);
		//增加用户id
		book.setCn_user_id(userId);
		//增加笔记本名称
		book.setCn_notebook_name(title);
		//增加笔记本的类型
		book.setCn_notebook_type_id("1");
		//增加笔记本的创建时间
		Timestamp time = new Timestamp(System.currentTimeMillis()); 
		book.setCn_notebook_createtime(time);
		//保存笔记本
		bookDao.save(book);
		//返回结果
		NoteResult<Book> result = new NoteResult<Book>();
		result.setStatus(0);
		result.setMsg("创建笔记本成功");
		result.setData(book);
		return result;
	}

}
