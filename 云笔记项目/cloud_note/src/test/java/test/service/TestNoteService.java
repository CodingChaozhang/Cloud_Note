package test.service;

import java.util.List;
import java.util.Map;

import org.junit.Before;
import org.junit.Test;

import com.lcz.cloud_note.entity.Note;
import com.lcz.cloud_note.service.NoteService;
import com.lcz.cloud_note.util.NoteResult;

import test.TestBase;

public class TestNoteService  extends TestBase{
	private NoteService noteService;
	@Before
	public void init() {
		noteService = super.getContext().getBean("noteService",NoteService.class);
	}
	@Test
	public void testNoteService() {
		NoteResult<List<Map>> result = noteService.loadBookNotes("20b4cbec-bd55-4c21-9c41-3a11ada2b803");
		System.out.println(result.getStatus());
		System.out.println(result.getMsg());
	}
	@Test
	public void testShow() {
		NoteResult<Note> result = noteService.loadNote("003ec2a1-f975-4322-8e4d-dfd206d6ac0c");
		System.out.println(result.getStatus());
		System.out.println(result.getMsg());
		System.out.println(result.getData());
	}
	@Test
	public void testUpdate() {
		String noteId="003ec2a1-f975-4322-8e4d-dfd206d6ac0c";
		String title="java学习笔记";
		String body="我正在努力学框架";
		NoteResult<Object> result = noteService.updateNote(noteId, title, body);
		System.out.println(result.getStatus());
		System.out.println(result.getMsg());
	}
}
