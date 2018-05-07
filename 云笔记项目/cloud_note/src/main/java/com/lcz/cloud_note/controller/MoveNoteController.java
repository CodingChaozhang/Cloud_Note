package com.lcz.cloud_note.controller;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.lcz.cloud_note.service.NoteService;
import com.lcz.cloud_note.util.NoteResult;

@Controller
@RequestMapping("/note")
public class MoveNoteController {
	@Resource
	private NoteService noteService;
	@RequestMapping("/move")
	@ResponseBody
	public NoteResult<Object> execute(
		String noteId,String bookId){
		System.out.println("noteId="+noteId);
		System.out.println("bookId="+bookId);
		NoteResult<Object> result = noteService.moveNote(noteId, bookId);
		return result;
	}
}
