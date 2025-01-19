package com.project.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.project.mapper.krhNoticeMapper;
import com.project.model.KrhNotice;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class krhNoticeServiceImpl implements krhNoticeService{
	private final krhNoticeMapper krhnoticeMapper;
	
	@Override
    public List<KrhNotice> getAllNotice() {
        return krhnoticeMapper.getAllNotice();
    }

	@Override
	public void incrementViews(int id) {
		// TODO Auto-generated method stub
		krhnoticeMapper.incrementViews(id);
	}

	@Override
	public KrhNotice getBoardById(int id) {
		// TODO Auto-generated method stub
		return krhnoticeMapper.getBoardById(id);
	}


	
	
}