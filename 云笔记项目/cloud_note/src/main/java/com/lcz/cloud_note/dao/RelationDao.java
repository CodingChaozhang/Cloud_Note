package com.lcz.cloud_note.dao;
/**
 * 关联查询通过用户名查询用户和书籍信息
 * @author LvChaoZhang
 *
 */

import java.util.List;

import com.lcz.cloud_note.entity.Book;
import com.lcz.cloud_note.entity.User;

public interface RelationDao {
	//关联多个对象
	public User findUserAndBooks(String userId);	
	public User findUserAndBooks1(String userId);
	//关联单个对象
	public List<Book> findBookAndUser();
}
