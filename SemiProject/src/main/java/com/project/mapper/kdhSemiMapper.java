package com.project.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.project.model.kdhUser;

@Mapper
public interface kdhSemiMapper {
    kdhUser findUserByUsername(String username);
    void insertUser(kdhUser user);
    int checkUsernameExists(String username);
    int checkEmailExists(String email);
    String findUsernameByNameAndEmail(@Param("name") String name, @Param("email") String email);
    int updatePasswordByEmail(@Param("email") String email, @Param("password") String password);
    
    // 추가된 메소드
    int checkUserExistsByNameAndEmail(@Param("name") String name, @Param("email") String email);
    int saveVerificationCode(@Param("email") String email, @Param("code") String code);
    String getVerificationCodeByEmail(@Param("email") String email);
    String findPasswordByEmail(@Param("email") String email);
    int isEmailVerified(@Param("email") String email);
    int updateEmailVerifiedStatus(@Param("email") String email);
    kdhUser findUserByEmailUsernameAndName(@Param("email") String email,
            @Param("username") String username,
            @Param("name") String name);
    void updateUser(kdhUser user); // 업데이트 메서드

    kdhUser findUserById(String username); // 사용자 조회 메서드
    Integer countByEmail(String email);
    int countByPhone(String phone);
}
