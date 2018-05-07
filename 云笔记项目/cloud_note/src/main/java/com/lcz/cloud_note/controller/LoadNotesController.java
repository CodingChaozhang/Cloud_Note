package com.lcz.cloud_note.controller;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.lcz.cloud_note.service.NoteService;
import com.lcz.cloud_note.util.NoteResult;

@Controller
@RequestMapping("/note")//匹配路径
public class LoadNotesController {
	@Resource
	private NoteService noteService;
	
	@RequestMapping("/loadnotes.do")
	@ResponseBody//以json格式返回
	public NoteResult<List<Map>> execute(String bookId){
		NoteResult<List<Map>> result = noteService.loadBookNotes(bookId);
		return result;
	}
}
