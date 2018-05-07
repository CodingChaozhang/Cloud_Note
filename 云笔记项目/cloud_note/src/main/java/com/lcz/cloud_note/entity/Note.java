package com.lcz.cloud_note.entity;

import java.io.Serializable;

public class Note implements Serializable{
	private String cn_note_id;
	private String cn_notebook_id;
	private String cn_user_id;
	private String cn_note_status_id;
	private String cn_note_type_id;
	private String cn_note_title;
	private String cn_note_body;
	private Long cn_note_create_time;
	private Long cn_note_last_modify_time;
	
	public String getCn_note_id() {
		return cn_note_id;
	}
	public void setCn_note_id(String cn_note_id) {
		this.cn_note_id = cn_note_id;
	}
	public String getCn_notebook_id() {
		return cn_notebook_id;
	}
	public void setCn_notebook_id(String cn_notebook_id) {
		this.cn_notebook_id = cn_notebook_id;
	}
	public String getCn_user_id() {
		return cn_user_id;
	}
	public void setCn_user_id(String cn_user_id) {
		this.cn_user_id = cn_user_id;
	}
	public String getCn_note_status_id() {
		return cn_note_status_id;
	}
	public void setCn_note_status_id(String cn_note_status_id) {
		this.cn_note_status_id = cn_note_status_id;
	}
	public String getCn_note_type_id() {
		return cn_note_type_id;
	}
	public void setCn_note_type_id(String cn_note_type_id) {
		this.cn_note_type_id = cn_note_type_id;
	}
	public String getCn_note_title() {
		return cn_note_title;
	}
	public void setCn_note_title(String cn_note_title) {
		this.cn_note_title = cn_note_title;
	}
	public String getCn_note_body() {
		return cn_note_body;
	}
	public void setCn_note_body(String cn_note_body) {
		this.cn_note_body = cn_note_body;
	}
	public Long getCn_note_create_time() {
		return cn_note_create_time;
	}
	public void setCn_note_create_time(Long cn_note_create_time) {
		this.cn_note_create_time = cn_note_create_time;
	}
	public Long getCn_note_last_modify_time() {
		return cn_note_last_modify_time;
	}
	public void setCn_note_last_modify_time(Long cn_note_last_modify_time) {
		this.cn_note_last_modify_time = cn_note_last_modify_time;
	}
	@Override
	public String toString() {
		return "Note [cn_note_id=" + cn_note_id + ", cn_notebook_id=" + cn_notebook_id + ", cn_user_id=" + cn_user_id
				+ ", cn_note_status_id=" + cn_note_status_id + ", cn_note_type_id=" + cn_note_type_id
				+ ", cn_note_title=" + cn_note_title + ", cn_note_body=" + cn_note_body + ", cn_note_create_time="
				+ cn_note_create_time + ", cn_note_last_modify_time=" + cn_note_last_modify_time + "]";
	}
	
	
}
