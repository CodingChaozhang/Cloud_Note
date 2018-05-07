package com.lcz.cloud_note.dao;

import com.lcz.cloud_note.entity.User;

public interface UserDao {
	//查找登录的账户名  返回查找到的用户名对象(登录方法)
	public User findByName(String name);
	//保存一个用户名，输入类型为User(注册方法)
	public void save(User user);
	//修改用户名密码的操作
	public void change(User user);
	
	
}
