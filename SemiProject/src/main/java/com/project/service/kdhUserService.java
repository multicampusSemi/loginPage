package com.project.service;

import org.springframework.security.core.context.SecurityContextHolder;
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
    public boolean isPhoneNumberExists(String phone) {
        return mapper.countByPhone(phone) > 0;
    }
    public kdhUser getCurrentUser(String username) {
        return mapper.findUserById(username);
    }

    // 새로운 사용자 삽입
 // 새로운 사용자 삽입
    public void createUser(kdhUser user) {
        mapper.insertUser(user); // 암호화 없이 비밀번호 저장
    }
   
    public String findUsernameByNameAndEmail(String name, String email) {
        return mapper.findUsernameByNameAndEmail(name, email);
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
    public boolean updatePassword(String email, String newPassword) {
        int rowsAffected = mapper.updatePasswordByEmail(email, newPassword);
        return rowsAffected > 0;
    }
    public boolean checkUserExistsByNameAndEmail(String name, String email) {
        return mapper.checkUserExistsByNameAndEmail(name, email) > 0;
    }
    public boolean isEmailVerified(String email) {
        System.out.println("이메일 인증 상태 확인 요청: email=" + email);
        boolean result = mapper.isEmailVerified(email) > 0;
        System.out.println("이메일 인증 상태: email=" + email + ", isVerified=" + result);
        return result;
    }
    public boolean verifyUserInfo(String email, String username, String name) {
        return mapper.findUserByEmailUsernameAndName(email, username, name) != null;
    }
    public boolean saveVerificationCode(String email, String code) {
        System.out.println("인증 코드 저장 요청: email=" + email + ", code=" + code);
        int rowsInserted = mapper.saveVerificationCode(email, code);
        System.out.println("저장된 행 수: " + rowsInserted);
        return rowsInserted > 0;
    }
    public boolean updateEmailVerifiedStatus(String email) {
        // 로그 추가
        System.out.println("이메일 인증 상태 업데이트 요청: email=" + email);
        int rowsUpdated = mapper.updateEmailVerifiedStatus(email);
        System.out.println("업데이트된 행 수: " + rowsUpdated);
        return rowsUpdated > 0;
    }
    public boolean verifyCode(String email, String code) {
        String storedCode = mapper.getVerificationCodeByEmail(email);
        if (storedCode != null && storedCode.equals(code)) {
            // 인증 성공 시 상태 업데이트 호출
            return updateEmailVerifiedStatus(email);
        }
        return false;
    }
    public void updateUser(kdhUser user) {
        mapper.updateUser(user); // 매퍼를 통해 데이터베이스 업데이트
    }

   

    
}