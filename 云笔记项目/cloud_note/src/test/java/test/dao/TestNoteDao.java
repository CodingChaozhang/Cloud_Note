package test.dao;

import java.util.List;
import java.util.Map;

import org.junit.Before;
import org.junit.Test;


import com.lcz.cloud_note.dao.NoteDao;
import com.lcz.cloud_note.entity.Note;

import test.TestBase;

public class TestNoteDao extends TestBase {
	private NoteDao noteDao;
	@Before
	public void init() {
		 noteDao = super.getContext().getBean("noteDao",NoteDao.class);
	}
	@Test
	public void testNoteDao() {
		List<Map> list = noteDao.findByBookId("20b4cbec-bd55-4c21-9c41-3a11ada2b803");
		for(Map note:list) {
			System.out.println(note.get("cn_note_id"));
			System.out.println(note.get("cn_note_title"));
		}
	}
	@Test
	public void testFindNoteDao() {
		Note note = noteDao.findByNoteId("003ec2a1-f975-4322-8e4d-dfd206d6ac0c");
		System.out.println(note.getCn_note_id());
		System.out.println(note.getCn_note_title());
	}
	
	@Test
	public void testUpdate() {
		Note note=new Note();
		String noteId="003ec2a1-f975-4322-8e4d-dfd206d6ac0c";
		note.setCn_note_id(noteId);
		String title="你好么";
		String body="我最近过的还不错";
		note.setCn_note_title(title);
		note.setCn_note_body(body);
		long time = System.currentTimeMillis();
		note.setCn_note_last_modify_time(time);
		int num = noteDao.updateNote(note);
		System.out.println(num);
	}
}
