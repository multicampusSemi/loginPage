package com.project.controller;

import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.project.model.kdhUser;
import com.project.service.kdhUserService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@Controller
@RequestMapping("/web")
public class kdhWebController {

    private final kdhUserService userService;
    public kdhWebController(kdhUserService userService) {
        this.userService = userService;
    }

    @GetMapping("/main")
    public String mainPage(HttpSession session, Model model) {
        kdhUser loggedInUser = (kdhUser) session.getAttribute("loggedInUser");

        if (loggedInUser == null) {
            return "redirect:/web/loginMain";
        }

        model.addAttribute("user", loggedInUser);
        return "/krhmain";
    }

    @GetMapping("/loginMain")
    public String loginMainPage(
            @RequestParam(value = "signupUsername", required = false) String signupUsername,
            Model model) {
        if (signupUsername != null) {
            model.addAttribute("signupUsername", signupUsername);
        }
        return "kdh_html/kdhloginMain";
    }

    @PostMapping("/register")
    public String registerUser(@ModelAttribute kdhUser user, RedirectAttributes redirectAttributes) {
        try {
            System.out.println("=== 회원가입 디버깅 시작 ===");

            // 입력된 사용자 정보 확인
            System.out.println("입력된 사용자 정보: " + user);

            // 원래 비밀번호 확인
            String rawPassword = user.getPassword();
            System.out.println("입력된 원래 비밀번호: " + rawPassword);

            // 비밀번호를 그대로 저장
            user.setPassword(rawPassword);
            System.out.println("DB에 저장될 비밀번호: " + rawPassword);

            // 사용자 생성
            userService.createUser(user);
            System.out.println("DB에 저장된 사용자 정보: " + user);

            // 성공 메시지 설정
            redirectAttributes.addFlashAttribute("message", "회원가입이 완료되었습니다.");
            System.out.println("회원가입 성공: " + user.getUsername());
            return "redirect:/web/loginMain?signupUsername=" + user.getUsername();

        } catch (Exception e) {
            System.out.println("회원가입 처리 중 오류 발생: " + e.getMessage());
            e.printStackTrace();
            redirectAttributes.addFlashAttribute("error", "회원가입에 실패했습니다: " + e.getMessage());
            return "redirect:/web/loginMain";
        } finally {
            System.out.println("=== 회원가입 디버깅 종료 ===");
        }
    }
    @PostMapping("/login")
    public String login(@RequestParam("username") String username, 
                        @RequestParam("login_password") String password,
                        Model model, 
                        HttpSession session) {
        try {
            System.out.println("=== 로그인 디버깅 시작 ===");

            // 입력된 사용자 이름과 비밀번호 확인
            System.out.println("입력된 사용자 이름: " + username);
            System.out.println("입력된 비밀번호: " + password);

            // 데이터베이스에서 사용자 조회
            kdhUser user = userService.findUserByUsername(username);

            // 사용자 존재 여부 확인
            if (user == null) {
                System.out.println("사용자를 찾을 수 없습니다: " + username);
                model.addAttribute("loginError", "아이디 또는 비밀번호가 올바르지 않습니다.");
                return "kdh_html/kdhloginMain";
            }

            // 데이터베이스에 저장된 비밀번호 확인
            String storedPassword = user.getPassword();
            System.out.println("DB에 저장된 비밀번호: " + storedPassword);

            // 비밀번호 검증 (단순 문자열 비교)
            boolean isMatch = password.equals(storedPassword);
            System.out.println("비밀번호 일치 여부: " + isMatch);

            if (isMatch) {
                // 로그인 성공
                session.setAttribute("loggedInUser", user);
                model.addAttribute("message", "로그인되었습니다.");
                System.out.println("로그인 성공: " + username);
                return "redirect:/krhmain"; // 메인 페이지로 이동
            } else {
                // 비밀번호 불일치
                model.addAttribute("loginError", "아이디 또는 비밀번호가 올바르지 않습니다.");
                System.out.println("로그인 실패 - 비밀번호 불일치");
                return "kdh_html/kdhloginMain";
            }

        } catch (Exception e) {
            // 예외 처리
            System.out.println("로그인 처리 중 오류 발생: " + e.getMessage());
            e.printStackTrace();
            model.addAttribute("loginError", "로그인 처리 중 오류가 발생했습니다.");
            return "kdh_html/kdhloginMain";
        } finally {
            System.out.println("=== 로그인 디버깅 종료 ===");
        }
    }
    @RequestMapping("/logout")
    public String logout(HttpSession session) {
        session.invalidate();
        return "redirect:/web/loginMain";
    }
}