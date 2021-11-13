package com.hoovereats.matching;

import com.google.firebase.auth.UserRecord;
import com.hoovereats.matching.responses.MatchingResultResponse;
import com.hoovereats.profile.User;
import com.hoovereats.profile.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class MatchingController {

	@Autowired
	UserRepository userRepository;

	@GetMapping(value="/matching", produces = MediaType.APPLICATION_JSON_VALUE)
	public List<MatchingResultResponse> getReceivers(@RequestAttribute("userRecord") UserRecord userRecord) {
		return ranking(userRepository.findUserByUId(userRecord.getUid()),
				userRepository.findReceivingUser());
	}

	static List<MatchingResultResponse> ranking(User currentUser, List<User> otherUsers) {
		List<MatchingResultResponse> matchingResultResponses = new ArrayList<>();
		for (User otherUser : otherUsers) {
			matchingResultResponses.add(calculateScore(currentUser, otherUser));
		}

		matchingResultResponses.sort((o1, o2) -> -Double.compare(o1.score, o2.score));
		return matchingResultResponses;
	}

	static MatchingResultResponse calculateScore(User currentUser, User otherUser) {
		double score = 0;
		MatchingResultResponse.MatchingReason reason = new MatchingResultResponse.MatchingReason();
		List<Integer> userPriority = currentUser.getPriorities();
		for (int category = 0; category < userPriority.size(); category++) {
			int weight = userPriority.get(category); //year->major->hobbies
			switch (category) {
				case 0:
					if (currentUser.getPrefYear().contains(otherUser.getGradYear())) {
						score += weight;
						reason.gradYear = otherUser.getGradYear();
					}
					break;
				case 1:
					if (currentUser.getPrefMajor().contains(otherUser.getMajor())) {
						score += weight;
						reason.majors.add(otherUser.getMajor());
					}
					break;
				case 2:
					if (currentUser.getHobbies() != null) {
						double smallScore = (double) weight/currentUser.getHobbies().size();
						for (String hobby : currentUser.getHobbies()) {
							if (otherUser.getHobbies().contains(hobby)) {
								score += smallScore;
								reason.hobbies.add(hobby);
							}
						}
					}
					break;
			}
		}
		return new MatchingResultResponse(otherUser, score, reason);
	}

}
