package com.project.service;

import java.util.List;

import com.project.model.KrhNotice;

public interface krhNoticeService {
	List<KrhNotice> getAllNotice();
	void incrementViews(int id);
	KrhNotice getBoardById(int id);
}