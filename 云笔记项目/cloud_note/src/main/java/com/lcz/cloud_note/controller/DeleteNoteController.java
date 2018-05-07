package com.lcz.cloud_note.controller;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.lcz.cloud_note.service.NoteService;
import com.lcz.cloud_note.util.NoteResult;

@Controller
@RequestMapping("/note")
public class DeleteNoteController {
	@Resource
	private NoteService noteService;
	@RequestMapping("/delete")
	@ResponseBody
	public NoteResult execute(String noteId){
		NoteResult result=noteService.deleteNote(noteId);
		return result;
	}
}
