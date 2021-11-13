package com.hoovereats.profile;

import javax.persistence.AttributeConverter;
import java.util.ArrayList;
import java.util.List;

public class ListIntegerConverter implements AttributeConverter<List<Integer>, String> {

	private static final String SEPARATOR = ";";

	@Override
	public List<Integer> convertToEntityAttribute(String s) {
		if (s == null) return null;
		ArrayList<Integer> set = new ArrayList<>();
		for (String string : s.split(SEPARATOR)) {
			if (!string.isEmpty()) {
				set.add(Integer.parseInt(string));
			}
		}
		return set;
	}

	@Override
	public String convertToDatabaseColumn(List<Integer> list) {
		if (list == null || list.isEmpty()) return null;
		StringBuilder sb = new StringBuilder();
		for (int i = 0; i < list.size()-1; i++) {
			sb.append(list.get(i)).append(SEPARATOR);
		}
		sb.append(list.get(list.size()-1));
		return sb.toString();
	}

}
