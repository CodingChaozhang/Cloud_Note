package test.service;

import javax.annotation.Resource;

import org.junit.Before;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.lcz.cloud_note.dao.UserDao;
import com.lcz.cloud_note.entity.User;
import com.lcz.cloud_note.service.UserService;
import com.lcz.cloud_note.service.UserServiceImpl;
import com.lcz.cloud_note.util.NoteResult;

public class TestUserService {
	private UserService service;
	@Before
	public void init() {
		String[] conf= {"conf/spring_mybatis.xml","conf/spring_mvc.xml","conf/spring_transaction.xml"};
		ApplicationContext ac=new ClassPathXmlApplicationContext(conf);
		service= ac.getBean("userService",UserService.class);
	}
	@Test //用例-1:测试用户名不存在的情况
	public void test1() {
		NoteResult<User> result = service.checkLogin("lcz", "123");
		System.out.println(service.getClass().getName());
//		System.out.println(result.getStatus());
//		System.out.println(result.getMsg());
//		System.out.println(result.getData());
	}
	@Test //用例-2:测试密码不存在的情况
	public void test2() {
		NoteResult<User> result = service.checkLogin("demo", "123");
		System.out.println(result.getStatus());
		System.out.println(result.getMsg());
		System.out.println(result.getData());
	}
	@Test //用例-3:测试登录成功的情况
	public void test3() {
		NoteResult<User> result = service.checkLogin("demo", "123456");
		System.out.println(result.getStatus());
		System.out.println(result.getMsg());
		System.out.println(result.getData());
	}
	@Test //用例4-预期结果：注册成功（测试注册对象）
	public void test4() {
		String name="小二";
		String password="123456";
		String nick="二儿";
		NoteResult<Object> result=service.addUser(name, password, nick);
		System.out.println(result.getStatus());
		System.out.println(result.getMsg());
	}
}
