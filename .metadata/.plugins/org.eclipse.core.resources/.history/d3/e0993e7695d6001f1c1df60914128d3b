package com.project.service;

import org.springframework.stereotype.Service;

import com.project.mapper.kdhSemiMapper;
import com.project.model.kdhUser;

@Service
public class kdhUserService {

    private final kdhSemiMapper mapper;

    public kdhUserService(kdhSemiMapper mapper) {
        this.mapper = mapper;
    }
    // 사용자 이름으로 사용자 찾기
    public kdhUser findUserByUsername(String username) {
        kdhUser user = mapper.findUserByUsername(username);
        if (user != null) {
            // DB에서 가져온 비밀번호를 로그로 출력
            System.out.println("DB에서 가져온 비밀번호: " + user.getPassword());
        }
        return user;
    }

    // 새로운 사용자 삽입
 // 새로운 사용자 삽입
    public void createUser(kdhUser user) {
        mapper.insertUser(user); // 암호화 없이 비밀번호 저장
    }
    // 이메일로 사용자 찾기
    public kdhUser findUserByEmail(String email) {
        return mapper.findUserByEmail(email);
    }

    // 아이디 중복 검사
    public boolean isUsernameExists(String username) {
        return mapper.checkUsernameExists(username) > 0;
    }

    // 이메일 중복 검사
    public boolean isEmailExists(String email) {
        return mapper.checkEmailExists(email) > 0;
    }
 // 비밀번호 검증 (단순 문자열 비교)
    public boolean validatePassword(String rawPassword, String storedPassword) {
        System.out.println("=== 비밀번호 검증 시작 ===");
        System.out.println("입력한 비밀번호 (rawPassword): " + rawPassword);
        System.out.println("저장된 비밀번호 (storedPassword): " + storedPassword);

        boolean isMatch = rawPassword.equals(storedPassword);
        System.out.println("비밀번호 일치 여부: " + isMatch);
        System.out.println("=========================");

        return isMatch; // 문자열 비교로 검증
    }

    
   

    
}