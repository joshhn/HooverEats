package com.hoovereats.matching.responses;

import com.hoovereats.profile.User;

import java.util.ArrayList;
import java.util.List;

public class MatchingResultResponse {
	public User user;
	public double score;
	public MatchingReason reason;

	public MatchingResultResponse(User user, double score, MatchingReason reason) {
		this.user = user;
		this.score = score;
		this.reason = reason;
	}

	public static class MatchingReason {
		public Integer gradYear = null;
		public List<String> majors = new ArrayList<>();
		public List<String> hobbies = new ArrayList<>();
	}
}


