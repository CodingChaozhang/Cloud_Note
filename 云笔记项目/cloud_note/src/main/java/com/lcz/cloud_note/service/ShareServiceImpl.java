package com.lcz.cloud_note.service;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.lcz.cloud_note.dao.NoteDao;
import com.lcz.cloud_note.dao.ShareDao;
import com.lcz.cloud_note.entity.Note;
import com.lcz.cloud_note.entity.Share;
import com.lcz.cloud_note.util.NoteResult;
import com.lcz.cloud_note.util.NoteUtil;
@Service("shareService")//增加到spring容器里面
@Transactional //spring事务
public class ShareServiceImpl  implements ShareService{
	@Resource
	private ShareDao shareDao;
	@Resource
	private NoteDao noteDao;
	//分享功能(实际上为增加内容)
	public NoteResult<Object> shareNote(String noteId) {
		//向cn_share表中插入记录
		Share share = new Share();
		String shareId = NoteUtil.createId();
		share.setCn_share_id(shareId);//主键
		share.setCn_note_id(noteId);
		//获取笔记标题和内容
		Note note=noteDao.findByNoteId(noteId);
		share.setCn_share_title(note.getCn_note_title());
		share.setCn_share_body(note.getCn_note_body());
		//保存分享记录
		shareDao.share(share);
//		//模拟异常
//		String str=null;
//		str.length();
		//构建result
		NoteResult<Object> result = new NoteResult<Object>();
		result.setStatus(0);
		result.setMsg("分享笔记成功");
		return result;
	}
	//搜索功能
	public NoteResult<List<Share>> searchNote(String keyword) {
		String title="%"+keyword+"%";
		//模糊查询
		List<Share> shares = shareDao.findLikeTitle(title);
		//构建返回结果
		NoteResult<List<Share>> result = new NoteResult<List<Share>>();
		result.setStatus(0);
		result.setMsg("搜索成功");
		result.setData(shares);
		return result;
	}
	//点击搜索后的收藏笔记，从而查看笔记信息
	public NoteResult<Share> loadShareNote(String shareId) {
		Share share = shareDao.findById(shareId);
		NoteResult result = new NoteResult();
		result.setStatus(0);
		result.setMsg("加载笔记成功");
		result.setData(share);
		return result;
	}

}
