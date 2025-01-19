package com.project.service;

import org.springframework.stereotype.Service;

import com.project.mapper.LjmSemiMapper;

@Service
public class UsersService {
    private final LjmSemiMapper ljmSemiMapper;

    public UsersService(LjmSemiMapper ljmSemiMapper) {
        this.ljmSemiMapper = ljmSemiMapper;
    }

    public Integer getDefaultUserId() {
        return ljmSemiMapper.getDefaultUserId(); // DB에서 기본 사용자 ID 조회
    }
}