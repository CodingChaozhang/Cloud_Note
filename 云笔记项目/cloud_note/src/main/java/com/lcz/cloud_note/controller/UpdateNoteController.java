package com.lcz.cloud_note.controller;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.lcz.cloud_note.service.NoteService;
import com.lcz.cloud_note.util.NoteResult;

@Controller
@RequestMapping("/note")
public class UpdateNoteController {
	@Resource
	private NoteService noteService;
	@RequestMapping("/update.do")
	@ResponseBody
	public NoteResult<Object>  execute(String noteId,String title,String body){
		NoteResult<Object> result = noteService.updateNote(noteId, title, body);
		return result;
	}
}
