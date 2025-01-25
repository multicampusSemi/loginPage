package com.project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
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
            boolean isVerified = userService.isEmailVerified(user.getEmail());
            if (!isVerified) {
                redirectAttributes.addFlashAttribute("errorField", "email");
                redirectAttributes.addFlashAttribute("error", "이메일 인증을 완료해주세요.");
                return "redirect:/web/loginMain";
            }

            userService.createUser(user);
            redirectAttributes.addFlashAttribute("message", "회원가입이 완료되었습니다.");
            return "redirect:/web/loginMain?signupUsername=" + user.getUsername();

        } catch (DuplicateKeyException e) {
            String errorMessage = e.getMessage().toLowerCase();
            System.out.println("데이터베이스 오류 메시지: " + errorMessage);

            if (errorMessage.contains("key 'phone'")) {
            	redirectAttributes.addFlashAttribute("errorField", "phone"); // phone2로 수정
                redirectAttributes.addFlashAttribute("error", "이미 사용 중인 전화번호입니다.");
            } else if (errorMessage.contains("key 'username'")) {
            	redirectAttributes.addFlashAttribute("errorField", "username");
            	redirectAttributes.addFlashAttribute("error", "이미 사용 중인 아이디입니다.");
            } else {
                redirectAttributes.addFlashAttribute("errorField", "unknown");
                redirectAttributes.addFlashAttribute("error", "알 수 없는 오류가 발생했습니다.");
            }

            return "redirect:/web/loginMain";
        } catch (Exception e) {
            e.printStackTrace();
            redirectAttributes.addFlashAttribute("errorField", "unknown");
            redirectAttributes.addFlashAttribute("error", "회원가입 처리 중 오류가 발생했습니다.");
            return "redirect:/web/loginMain";
        }
    }




    @GetMapping("/kdhedit")
    public String editProfile(Model model, HttpSession session) {
        String username = (String) session.getAttribute("username");
        if (username == null) {
            System.out.println("세션에서 username을 찾을 수 없습니다.");
            return "redirect:/web/loginMain"; // 로그인 페이지로 리디렉션
        }
        System.out.println("세션에서 가져온 username: " + username);
        
        // 사용자 정보 조회
        kdhUser user = userService.getCurrentUser(username);
        model.addAttribute("user", user);
        return "kdh_html/kdhedit"; // JSP 파일 이름과 경로 매핑
    }


    @PostMapping("/kdhedit")
    public String updateProfile(
            @ModelAttribute kdhUser user, 
            @RequestParam(value = "passwordConfirm", required = false) String passwordConfirm,
            HttpSession session, 
            RedirectAttributes redirectAttributes) {
        try {
            System.out.println("========== 회원 정보 수정 요청 시작 ==========");

            // 세션에서 기존 사용자 정보 가져오기
            String currentUsername = (String) session.getAttribute("username");
            System.out.println("세션에서 가져온 username: " + currentUsername);

            kdhUser existingUser = userService.getCurrentUser(currentUsername);
            if (existingUser == null) {
                System.out.println("기존 사용자 정보를 찾을 수 없음.");
                redirectAttributes.addFlashAttribute("message", "사용자 정보를 찾을 수 없습니다.");
                return "redirect:/web/loginMain";
            }

            // 기존 사용자 정보 출력
            System.out.println("=== 기존 사용자 정보 ===");
            System.out.println("이름: " + existingUser.getName());
            System.out.println("이메일: " + existingUser.getEmail());
            System.out.println("비밀번호: " + existingUser.getPassword());
            System.out.println("생년월일: " + existingUser.getBirthYear() + "-" + existingUser.getBirthMonth() + "-" + existingUser.getBirthDay());
            System.out.println("전화번호: " + existingUser.getPhone());
            System.out.println("우편번호: " + existingUser.getZipcode());
            System.out.println("주소: " + existingUser.getAddress());
            System.out.println("상세주소: " + existingUser.getAddressDetail());

            // 수정된 사용자 정보 확인
            System.out.println("=== 입력된 사용자 정보 ===");
            System.out.println("이름: " + user.getName());
            System.out.println("이메일: " + user.getEmail());
            System.out.println("비밀번호: " + (user.getPassword() != null && !user.getPassword().isEmpty() ? "변경됨" : "변경 없음"));
            System.out.println("생년월일: " + user.getBirthYear() + "-" + user.getBirthMonth() + "-" + user.getBirthDay());
            System.out.println("전화번호: " + user.getPhone());
            System.out.println("우편번호: " + user.getZipcode());
            System.out.println("주소: " + user.getAddress());
            System.out.println("상세주소: " + existingUser.getAddressDetail());

            // 변경하지 않은 값은 기존 사용자 데이터 유지
            user.setName(existingUser.getName());
         // 생년월일 필드가 null이면 기존 사용자 데이터 유지
            user.setBirthYear(user.getBirthYear() == null ? existingUser.getBirthYear() : user.getBirthYear());
            user.setBirthMonth(user.getBirthMonth() == null ? existingUser.getBirthMonth() : user.getBirthMonth());
            user.setBirthDay(user.getBirthDay() == null ? existingUser.getBirthDay() : user.getBirthDay());

            user.setPhone(user.getPhone() == null || user.getPhone().isEmpty() ? existingUser.getPhone() : user.getPhone());
            user.setHomePhone(user.getHomePhone() == null || user.getHomePhone().isEmpty() ? existingUser.getHomePhone() : user.getHomePhone());
            user.setZipcode(user.getZipcode() == null || user.getZipcode().isEmpty() ? existingUser.getZipcode() : user.getZipcode());
            user.setAddress(user.getAddress() == null || user.getAddress().isEmpty() ? existingUser.getAddress() : user.getAddress());
            user.setAddressDetail(user.getAddressDetail() == null || user.getAddressDetail().isEmpty() 
                    ? existingUser.getAddressDetail() 
                    : user.getAddressDetail());
            // 비밀번호 변경 확인
            if (user.getPassword() == null || user.getPassword().isEmpty()) {
                System.out.println("비밀번호 변경 없음, 기존 비밀번호 유지");
                user.setPassword(existingUser.getPassword());
            } else {
                if (!user.getPassword().equals(passwordConfirm)) {
                    System.out.println("비밀번호 확인 불일치");
                    redirectAttributes.addFlashAttribute("message", "비밀번호와 비밀번호 확인이 일치하지 않습니다.");
                    return "redirect:/web/kdhedit";
                }
                System.out.println("비밀번호 업데이트 진행");
                user.setPassword(user.getPassword());
            }

            // 이메일 변경 확인
            if (!existingUser.getEmail().equals(user.getEmail())) {
                System.out.println("이메일 변경 감지: 인증 확인 필요");
                boolean isEmailVerified = userService.isEmailVerified(user.getEmail());
                if (!isEmailVerified) {
                    System.out.println("이메일 인증 미완료");
                    redirectAttributes.addFlashAttribute("message", "이메일 인증을 완료해주세요.");
                    return "redirect:/web/kdhedit";
                }
            } else {
                System.out.println("이메일 변경 없음");
            }

            // 최종 업데이트할 사용자 정보 출력
            System.out.println("=== 최종 저장될 사용자 정보 ===");
            System.out.println("이름: " + user.getName());
            System.out.println("이메일: " + user.getEmail());
            System.out.println("비밀번호: " + (user.getPassword() != null ? "설정됨" : "기존 유지"));
            System.out.println("생년월일: " + user.getBirthYear() + "-" + user.getBirthMonth() + "-" + user.getBirthDay());
            System.out.println("전화번호: " + user.getPhone());
            System.out.println("우편번호: " + user.getZipcode());
            System.out.println("주소: " + user.getAddress());

            // 사용자 정보 업데이트
            System.out.println("회원 정보 업데이트 진행 중...");
            userService.updateUser(user);
            System.out.println("회원 정보 업데이트 완료");

            redirectAttributes.addFlashAttribute("message", "회원정보가 성공적으로 수정되었습니다.");
            return "redirect:/web/main";

        } catch (Exception e) {
            System.out.println("회원정보 수정 중 오류 발생: " + e.getMessage());
            e.printStackTrace();
            redirectAttributes.addFlashAttribute("message", "회원정보 수정 중 오류가 발생했습니다.");
            return "redirect:/web/kdhedit";
        } finally {
            System.out.println("========== 회원 정보 수정 요청 종료 ==========");
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
                session.setAttribute("username", user.getUsername());
                model.addAttribute("message", "로그인되었습니다.");
                System.out.println("로그인 성공: " + username);
                System.out.println("세션에 저장된 username: " + user.getUsername());

                return "/krhmain"; // 메인 페이지로 이동
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
