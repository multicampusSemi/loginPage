package com.project.mapper;

import org.apache.ibatis.annotations.Mapper;
import com.project.model.kdhUser;

@Mapper
public interface kdhSemiMapper {
    kdhUser findUserByUsername(String username);
    void insertUser(kdhUser user);
    kdhUser findUserByEmail(String email);
    int checkUsernameExists(String username);
    int checkEmailExists(String email);
}