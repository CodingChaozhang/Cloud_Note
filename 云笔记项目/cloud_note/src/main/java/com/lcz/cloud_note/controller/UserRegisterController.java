package com.lcz.cloud_note.controller;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.lcz.cloud_note.service.UserService;
import com.lcz.cloud_note.util.NoteResult;

@Controller
@RequestMapping("/user")//匹配请求
public class UserRegisterController {
	@Resource
	private UserService userService;
	
	@RequestMapping("/add.do")
	@ResponseBody//以json数据格式返回数据
	public NoteResult<Object> execute(String name,String password,String nick) {
		//调用userService处理注册请求
		NoteResult<Object> result = userService.addUser(name, password, nick);
		System.out.println(result);
		return result;
	}
}
