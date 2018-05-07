package com.lcz.cloud_note.util;

/**
 * 自定义异常
 * @author lvchaozhang
 */
public class NoteException extends RuntimeException{
	public NoteException(String msg,Throwable t){
		super(msg,t);
	}
}
