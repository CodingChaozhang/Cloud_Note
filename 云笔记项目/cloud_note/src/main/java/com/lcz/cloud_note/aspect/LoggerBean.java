package com.lcz.cloud_note.aspect;

import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;

/**
 * 切面:封装打桩操作逻辑()
 * @author LvChaoZhang
 *
 */
@Component//扫描,起到定义<bean>的作用
@Aspect//指定为切面
public class LoggerBean {
	//指定通知类型/切入点表达式
	@Before("within(com.lcz.cloud_note.controller..*)")
	public void loggerController() {
		System.out.println("AOP功能注入Controller!");
	}
	
	//指定通知类型/切入点表达式
	@Before("within(com.lcz.cloud_note.service..*)")
	public void loggerService() {
		System.out.println("AOP功能注入Service!");
	}
}
