package com.hoovereats.messaging.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity // This tells Hibernate to make a table out of this class
public class Message {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	@Column(name = "sender_uid")
	private String senderUid;
	@Column(name = "sender_name")
	private String senderName;
	@Column(name = "recipient_uid")
	private String recipientUid;
	@Column(name = "recipient_name")
	private String recipientName;
	private String content;
	private Long timestamp;
	@Column(name = "conversation_id")
	private Integer conversationId;

	public Message(Integer id, String senderUid, String senderName, String recipientUid, String recipientName, String content, Long timestamp, Integer conversationId) {
		this.id = id;
		this.senderUid = senderUid;
		this.senderName = senderName;
		this.recipientUid = recipientUid;
		this.recipientName = recipientName;
		this.content = content;
		this.timestamp = timestamp;
		this.conversationId = conversationId;
	}

	public Message() {

	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getSenderUid() {
		return senderUid;
	}

	public void setSenderUid(String senderUid) {
		this.senderUid = senderUid;
	}

	public String getSenderName() {
		return senderName;
	}

	public void setSenderName(String senderName) {
		this.senderName = senderName;
	}

	public String getRecipientUid() {
		return recipientUid;
	}

	public void setRecipientUid(String recipientUid) {
		this.recipientUid = recipientUid;
	}

	public String getRecipientName() {
		return recipientName;
	}

	public void setRecipientName(String recipientName) {
		this.recipientName = recipientName;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Long getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(Long timestamp) {
		this.timestamp = timestamp;
	}

	public Integer getConversationId() {
		return conversationId;
	}

	public void setConversationId(Integer conversationId) {
		this.conversationId = conversationId;
	}

	@Override
	public String toString() {
		return "Message{" +
				"id=" + id +
				", senderUid='" + senderUid + '\'' +
				", senderName='" + senderName + '\'' +
				", recipientUid='" + recipientUid + '\'' +
				", recipientName='" + recipientName + '\'' +
				", content='" + content + '\'' +
				", timestamp='" + timestamp + '\'' +
				", conversationId=" + conversationId +
				'}';
	}
}