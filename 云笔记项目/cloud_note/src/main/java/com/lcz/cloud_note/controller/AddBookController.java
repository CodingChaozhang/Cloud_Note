package com.lcz.cloud_note.controller;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.lcz.cloud_note.entity.Book;
import com.lcz.cloud_note.service.BookService;
import com.lcz.cloud_note.util.NoteResult;

@Controller
@RequestMapping("/book")
public class AddBookController {
	@Resource
	private BookService bookService;
	@RequestMapping("/add.do")
	@ResponseBody
	public NoteResult<Book> execute(String userId,String title){
		NoteResult<Book> result = bookService.addBook(userId, title);
		return result;
	}
}
