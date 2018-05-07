package com.lcz.cloud_note.controller;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.lcz.cloud_note.entity.Note;
import com.lcz.cloud_note.service.NoteService;
import com.lcz.cloud_note.util.NoteResult;

@Controller
@RequestMapping("/note")
public class LoadNoteController {
	@Resource
	private NoteService noteService;
	@RequestMapping("/load.do")
	@ResponseBody//以json格式返回数据
	public NoteResult<Note> execute(String noteId){
		NoteResult<Note> result = noteService.loadNote(noteId);
		return result;
	}
}
