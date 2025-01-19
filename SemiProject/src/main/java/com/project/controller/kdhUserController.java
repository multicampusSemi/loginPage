package com.project.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.NoSuchElementException;

import org.apache.catalina.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import com.project.model.kdhUser;
import com.project.service.kdhUserService;

@RestController
@RequestMapping("/user")
public class kdhUserController {

    private static final Logger logger = LoggerFactory.getLogger(kdhUserController.class);
    private final kdhUserService userService;

    public kdhUserController(kdhUserService userService) {
        this.userService = userService;
    }

    @GetMapping("/find-id-page")
    public ModelAndView findIdPage() {
        return new ModelAndView("kdh_html/kdhfind");
    }

    @PostMapping("/find-id")
    public ResponseEntity<?> findId(@RequestParam("name") String name, @RequestParam("email") String email) {
        try {
            logger.info("아이디 찾기 요청: name={}, email={}", name, email);
            String username = userService.findUsernameByNameAndEmail(name, email);
            if (username != null) {
                logger.info("아이디 찾기 성공: username={}", username);
                return ResponseEntity.ok(Map.of("unmaskedId", username));
            } else {
                logger.warn("아이디 찾기 실패: 사용자 없음 (name={}, email={})", name, email);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("아이디를 찾을 수 없습니다.");
            }
        } catch (Exception e) {
            logger.error("아이디 찾기 중 오류 발생", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("아이디 찾기 중 오류가 발생했습니다.");
        }
    }
    @PostMapping("/verify-info")
    public ResponseEntity<Map<String, Boolean>> verifyUserInfo(@RequestBody kdhUser request) {
        boolean isVerified = userService.verifyUserInfo(request.getEmail(), request.getUsername(), request.getName());

        Map<String, Boolean> response = new HashMap<>();
        response.put("verified", isVerified);

        return ResponseEntity.ok(response);
    }
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> requestBody) {
        try {
            String email = requestBody.get("email");
            String newPassword = requestBody.get("password");

            logger.info("비밀번호 재설정 요청: email={}, password={}", email, newPassword);

            // 입력값 검증
            if (email == null || email.isEmpty() || newPassword == null || newPassword.isEmpty()) {
                logger.warn("비밀번호 재설정 요청: 유효하지 않은 입력값 (email={}, password={})", email, newPassword);
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("이메일 또는 비밀번호가 유효하지 않습니다.");
            }

            // 비밀번호 변경 로직
            boolean isUpdated = userService.updatePassword(email, newPassword);
            if (isUpdated) {
                logger.info("비밀번호 재설정 성공: email={}", email);
                return ResponseEntity.ok(Map.of("success", true, "message", "비밀번호가 성공적으로 변경되었습니다."));
            } else {
                logger.warn("비밀번호 재설정 실패: email={}", email);
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("비밀번호 변경에 실패했습니다.");
            }
        } catch (Exception e) {
            logger.error("비밀번호 재설정 중 오류 발생: email={}, error={}", requestBody.get("email"), e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("비밀번호 재설정 중 오류가 발생했습니다.");
        }
    }

}