package com.project.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.project.model.KrhNotice;

@Mapper
public interface krhNoticeMapper {
	List<KrhNotice> getAllNotice();

	KrhNotice getBoardById(int id);

	void incrementViews(int id);
}
