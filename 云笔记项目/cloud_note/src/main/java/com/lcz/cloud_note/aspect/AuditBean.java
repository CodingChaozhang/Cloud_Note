package com.lcz.cloud_note.aspect;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.Signature;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

/**
 * 性能审计用来查看执行各个业务需要的时间
 * 切面，用来性能测试 在service执行之前和service执行之后
 * @author LvChaoZhang
 *
 */
@Component//扫描,起到定义<bean>的作用
@Aspect//指定为切面
public class AuditBean {
	@Around("within(com.lcz.cloud_note.service..*)")//指定通知类型/切入点表达式
	public Object audit(ProceedingJoinPoint point) {
		Object object=null;
		try {
			long timeStart=System.currentTimeMillis();
			object=point.proceed();//执行service
			long timeEnd=System.currentTimeMillis();
			Signature str = point.getSignature();//获取service名称
			System.out.println(str+"耗时:"+(timeEnd-timeStart));
		} catch (Throwable e) {
			e.printStackTrace();
		}
		return object;
	}
}
