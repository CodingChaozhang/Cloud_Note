package com.lcz.cloud_note.dao;

import java.util.List;

import com.lcz.cloud_note.entity.Share;

public interface ShareDao {
	//分享功能，实际上是将分享的内容插入到share中
	public void share(Share share);
	//搜索功能
	public List<Share> findLikeTitle(String title);
	//查询功能
	public Share findById(String shareId);
	
}
