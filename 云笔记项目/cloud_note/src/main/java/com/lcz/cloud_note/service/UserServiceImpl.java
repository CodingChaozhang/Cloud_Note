package com.lcz.cloud_note.service;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.lcz.cloud_note.dao.UserDao;
import com.lcz.cloud_note.entity.User;
import com.lcz.cloud_note.util.NoteResult;
import com.lcz.cloud_note.util.NoteUtil;

@Service("userService") //扫描到Spring容器
@Transactional
public class UserServiceImpl implements UserService{
	@Resource
	private UserDao userDao;
	

	public NoteResult<User> checkLogin(String name, String password) {
		//接受结果数据
		NoteResult<User> result=new NoteResult<User>();
		//按参数name查询数据库
		User user = userDao.findByName(name);
		//检测用户名
		if(user==null) {
			result.setStatus(1);
			result.setMsg("用户名不存在");
			return result;
		}
		//检测密码
		String md5Password=NoteUtil.md5(password);//对输入的密码进行加密，然后进行比较
		if(!user.getCn_user_password().equals(md5Password)) {
			result.setStatus(2);
			result.setMsg("密码错误");
			return result;
		}
		//用户名跟密码都正确
		result.setStatus(0);
		result.setMsg("登录成功");
		result.setData(user);
		return result;
	}
	
	//保存一个用户名，输入类型为User(注册方法)
	public NoteResult<Object> addUser(String name, String password, String nick) {
		//接受结果数据
		NoteResult<Object> result = new NoteResult<Object>();
		//用户检测
		User hasUser = userDao.findByName(name);
		if(hasUser!=null) {//用户名存在
			result.setStatus(1);//用户名已经被占用
			result.setMsg("用户已经被占用");
			return result;
		}
		//用户名可用，添加用户的操作
		//添加用户
		User user = new User();
		//设置用户名
		user.setCn_user_name(name);
		//设置密码,密码存储需加密
		String md5Password = NoteUtil.md5(password);
		user.setCn_user_password(md5Password);
		//设置昵称
		user.setCn_user_nick(nick);
		//设置主键id
		String id = NoteUtil.createId();
		user.setCn_user_id(id);
		//执行保存操作
		userDao.save(user);
		//构建返回结果
		result.setStatus(0);
		result.setMsg("注册成功");
		return result;
	}
	//更改用户密码操作
	public NoteResult<Object> changeUser(String userName, String last_password, String final_password) {
		//返回结果
		NoteResult<Object> result=new NoteResult<Object>();
		//查找已经登录的用户的信息
		User user = userDao.findByName(userName);
		//获得原密码
		String user_password = user.getCn_user_password();
		//对传入的密码需加密才能比较
		last_password=NoteUtil.md5(last_password);
		final_password=NoteUtil.md5(final_password);
		System.out.println(user_password);
		System.out.println(last_password);
		System.out.println(final_password);
		//进行比较 密码不相等的话
		if(!user_password.equals(last_password)) {
			result.setStatus(1);
			result.setMsg("原密码不正确");
			return result;
		}else if(user_password.equals(final_password)) {
			result.setStatus(2);
			result.setMsg("要修改的密码与原密码一致");
			return result;
		}else{
			//密码正确，执行修改密码操作
			user.setCn_user_password(final_password);
			userDao.change(user);
			result.setStatus(0);
			result.setMsg("修改密码成功");
			return result;
		}
	}
	

}
