package test;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public abstract class TestBase {
	public ApplicationContext getContext() {
		String[] conf= {"conf/spring_mvc.xml","conf/spring_mybatis.xml"};
		ApplicationContext ac=new ClassPathXmlApplicationContext(conf);
		return ac;
	}
}
