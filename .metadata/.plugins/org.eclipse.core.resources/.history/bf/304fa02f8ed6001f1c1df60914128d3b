package com.project.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.project.service.EmailService;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/email")
public class EmailController {

    private final EmailService emailService;
    private final Map<String, String> verificationCodes = new HashMap<>();

    public EmailController(EmailService emailService) {
        this.emailService = emailService;
    }

    @PostMapping("/send-code")
    public ResponseEntity<String> sendVerificationCode(@RequestParam String email) {
        String code = emailService.generateVerificationCode();
        verificationCodes.put(email, code);
        emailService.saveVerificationCode(email, code);
        emailService.sendVerificationEmail(email, code);
        return ResponseEntity.ok("인증번호가 이메일로 전송되었습니다.");
    }

    @PostMapping("/verify-code")
    public ResponseEntity<String> verifyCode(@RequestParam String email, @RequestParam String code) {
        String savedCode = emailService.getVerificationCodeByEmail(email);

        if (savedCode != null && savedCode.equals(code)) {
            boolean isUpdated = emailService.updateEmailVerifiedStatus(email);
            if (isUpdated) {
                verificationCodes.remove(email);
                return ResponseEntity.ok("인증이 완료되었습니다.");
            } else {
                return ResponseEntity.status(500).body("이메일 인증 상태를 업데이트하는 중 오류가 발생했습니다.");
            }
        } else {
            return ResponseEntity.status(400).body("인증번호가 일치하지 않습니다.");
        }
    }
    @GetMapping("/check-duplicate")
    public ResponseEntity<Map<String, Boolean>> checkDuplicateEmail(@RequestParam String email) {
        boolean exists = emailService.checkEmailExists(email);
        Map<String, Boolean> response = new HashMap<>();
        response.put("duplicate", exists);
        return ResponseEntity.ok(response);
    }

    
    @GetMapping("/verify-status")
    public ResponseEntity<Map<String, Boolean>> verifyEmailStatus(@RequestParam String email) {
        boolean isVerified = emailService.isEmailVerified(email);
        return ResponseEntity.ok(Map.of("verified", isVerified));
    }
}
