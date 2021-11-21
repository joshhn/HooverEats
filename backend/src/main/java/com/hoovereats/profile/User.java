package com.hoovereats.profile;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;
import java.util.Arrays;
import java.util.List;

@Entity // This tells Hibernate to make a table out of this class
public class User {
	@Id
	private String uid;

	private String name;

	private String username;

	private String email;

	@Column(name = "photo_url")
	private String photoUrl;

	@Enumerated(EnumType.STRING)
	private Swipe type;

	@Column(name = "grad_year")
	private Integer gradYear;

	private String major;

	@Convert(converter = ListStringConverter.class)
	private List<String> hobbies;

	@Convert(converter = ListIntegerConverter.class)
	@Column(name = "pref_year")
	private List<Integer> prefYear;

	@Convert(converter = ListStringConverter.class)
	@Column(name = "pref_major")
	private List<String> prefMajor;

	@Convert(converter = ListIntegerConverter.class)
	private List<Integer> priorities;

	public User() {
	}

	public User(String uid, String name, String username, String email, String photoUrl,
				Swipe type, Integer gradYear, String major, List<String> hobbies,
				List<Integer> prefYear, List<String> prefMajor, List<Integer> priorities) {
		this.uid = uid;
		this.name = name;
		this.username = username;
		this.email = email;
		this.photoUrl = photoUrl;
		this.type = type;
		this.gradYear = gradYear;
		this.major = (major == null)?"undefined":major;
		this.hobbies = hobbies;
		this.prefYear = prefYear;
		this.prefMajor = prefMajor;
		this.priorities = (priorities == null)? Arrays.asList(1,1,1):priorities;
	}

	public String getUid() {
		return uid;
	}

	public void setUid(String uid) {
		this.uid = uid;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhotoUrl() {
		return photoUrl;
	}

	public void setPhotoUrl(String photoUrl) {
		this.photoUrl = photoUrl;
	}

	public Swipe getType() {
		return type;
	}

	public void setType(Swipe type) {
		this.type = type;
	}

	public Integer getGradYear() {
		return gradYear;
	}

	public void setGradYear(Integer gradYear) {
		this.gradYear = gradYear;
	}

	public String getMajor() {
		return major;
	}

	public void setMajor(String major) {
		this.major = major;
	}

	public List<String> getHobbies() {
		return hobbies;
	}

	public void setHobbies(List<String> hobbies) {
		this.hobbies = hobbies;
	}

	public List<Integer> getPrefYear() {
		return prefYear;
	}

	public void setPrefYear(List<Integer> prefYear) {
		this.prefYear = prefYear;
	}

	public List<String> getPrefMajor() {
		return prefMajor;
	}

	public void setPrefMajor(List<String> prefMajor) {
		this.prefMajor = prefMajor;
	}

	public List<Integer> getPriorities() {
		return priorities;
	}

	public void setPriorities(List<Integer> priorities) {
		this.priorities = priorities;
	}

	@Override
	public String toString() {
		return "User{" +
				"uid='" + uid + '\'' +
				", name='" + name + '\'' +
				", username='" + username + '\'' +
				", email='" + email + '\'' +
				", type=" + type +
				", gradYear='" + gradYear + '\'' +
				", major='" + major + '\'' +
				", hobbies=" + hobbies +
				", prefYear=" + prefYear +
				", prefMajor=" + prefMajor +
				", priorities=" + priorities +
				'}';
	}
}
