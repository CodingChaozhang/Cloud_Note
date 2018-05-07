package com.lcz.cloud_note.controller;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.lcz.cloud_note.entity.User;
import com.lcz.cloud_note.service.UserService;
import com.lcz.cloud_note.util.NoteResult;

@Controller
@RequestMapping("/user")//匹配请求路径
public class UserLoginController {
	@Resource
	private UserService userService;
	
	@RequestMapping("/login.do")//匹配请求
	@ResponseBody //以json结果输出
	public NoteResult<User> execute(String name,String password){
		//调用UserService处理登录请求
		System.out.println(name+","+password);
		NoteResult<User> result = userService.checkLogin(name, password);
		return result;
	}
}
