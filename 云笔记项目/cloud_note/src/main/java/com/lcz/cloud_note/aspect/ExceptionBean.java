package com.lcz.cloud_note.aspect;

import java.io.FileWriter;
import java.io.PrintWriter;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

/**
 * 保存异常信息到日志中
 * @author LvChaoZhang
 *
 */
@Component//扫描到spring容器里面
@Aspect//将该类作为切面组件
public class ExceptionBean {
	//指定异常通知和切入点表达式 e是目标组件抛出来的异常对象
	@AfterThrowing(throwing="e",pointcut="within(com.lcz.cloud_note.service..*)")
	public void execute(Exception e) {
		try {
			//将e对象信息写入note_error.log文件
			FileWriter fw = new FileWriter("D:\\note_error.log",true);
			//利用pw对象写入异常信息
			PrintWriter pw = new PrintWriter(fw);
			//获取异常发生时间
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			String time = sdf.format(new Date());
			//打印异常头部描述
			pw.println("******************************");
			pw.println("*发生时间："+time);
			pw.println("*异常类型："+e);
			pw.println("**********异常详情*************");
			//将异常栈信息打印
			e.printStackTrace(pw);
			pw.close();
			fw.close();
		} catch (Exception ex) {
			System.out.println("记录异常失败");
		}
	}
}
