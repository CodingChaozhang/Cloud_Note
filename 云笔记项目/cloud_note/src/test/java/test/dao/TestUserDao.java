package test.dao;

import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.lcz.cloud_note.dao.UserDao;
import com.lcz.cloud_note.entity.User;


public class TestUserDao {
	//测试登录账号名的查找
	@Test
	public void testUserDao() {
		ApplicationContext ac=new ClassPathXmlApplicationContext("conf/spring_mybatis.xml");
		UserDao dao = ac.getBean("userDao",UserDao.class);
		User user = dao.findByName("demo");
		System.out.println(user);
	}
	//测试注册账号
	@Test
	public void testSave() {
		String[] conf= {"conf/spring_mybatis.xml","conf/spring_mvc.xml"};
		ApplicationContext ac=new ClassPathXmlApplicationContext(conf);
		UserDao dao = ac.getBean("userDao",UserDao.class);
		User user = new User();
		user.setCn_user_id("123456789");
		user.setCn_user_name("张三");
		user.setCn_user_password("123456");
		user.setCn_user_nick("三儿");
		dao.save(user);
		System.out.println(user);
	}
}
