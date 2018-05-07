package test.dao;

import java.util.List;

import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.lcz.cloud_note.dao.BookDao;
import com.lcz.cloud_note.entity.Book;

public class TestBookDao {
	
	String[] conf= {"conf/spring_mvc.xml","conf/spring_mybatis.xml"};
	ApplicationContext ac=new ClassPathXmlApplicationContext(conf);
	@Test
	//测试加载book
	public void testDao() {
		BookDao dao = ac.getBean("bookDao",BookDao.class);
		List<Book> books = dao.findByUserId("48595f52-b22c-4485-9244-f4004255b972");
		for(Book book:books) {
			System.out.println(book);
		}
	}
}
