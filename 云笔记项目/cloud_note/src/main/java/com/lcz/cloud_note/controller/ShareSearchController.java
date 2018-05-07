package com.lcz.cloud_note.controller;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.lcz.cloud_note.entity.Share;
import com.lcz.cloud_note.service.ShareService;
import com.lcz.cloud_note.util.NoteResult;

@Controller
@RequestMapping("/share")
public class ShareSearchController {
	@Resource
	private ShareService shareService;
	@RequestMapping("/search.do")
	@ResponseBody
	public NoteResult<List<Share>> execute(String keyword){
		NoteResult<List<Share>> result = shareService.searchNote(keyword);
		return result;
	}
}
