package com.lcz.cloud_note.controller;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.lcz.cloud_note.entity.Note;
import com.lcz.cloud_note.entity.Share;
import com.lcz.cloud_note.service.NoteService;
import com.lcz.cloud_note.service.ShareService;
import com.lcz.cloud_note.util.NoteResult;

@Controller
@RequestMapping("/note")
public class LoadShareNoteController {
	@Resource
	private ShareService shareService;
	@RequestMapping("/load_share")
	@ResponseBody
	public NoteResult<Share> execute(String shareId){
		NoteResult<Share> result = shareService.loadShareNote(shareId);
		return result;
	}
}
