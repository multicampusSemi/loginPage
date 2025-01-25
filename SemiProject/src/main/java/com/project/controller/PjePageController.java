package com.project.controller;

import com.project.model.PjeOrder;
import com.project.model.kdhUser;
import com.project.service.OrderHistoryService;

import jakarta.servlet.http.HttpSession;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PjePageController {
    private final OrderHistoryService historyService;

    public PjePageController(OrderHistoryService historyService) {
        this.historyService = historyService;
    }

    @GetMapping("/login")
    public String mainPage(HttpSession session, Model model) {
    	kdhUser loggedInUser = (kdhUser) session.getAttribute("loggedInUser");  // 세션에서 사용자 ID 가져오기
        if (loggedInUser == null) {
            return "redirect:/web/login";  // 로그인하지 않은 사용자는 로그인 페이지로 이동
        }

        List<PjeOrder> orders = historyService.getOrderHistoryList(loggedInUser.getId());  // 사용자 ID로 주문 내역 조회
        int totalPrice = orders.stream()
                               .mapToInt(order -> order.getPrice() * order.getQuantity())
                               .sum();
        model.addAttribute("orderHistory", orders);
        model.addAttribute("totalPrice", totalPrice);
        return "kdh_html/order_history";  // 주문내역 페이지를 메인 페이지로 설정
    }

    @GetMapping("/orderHistory")
    public String orderHistory(HttpSession session, Model model) {
        kdhUser loggedInUser = (kdhUser) session.getAttribute("loggedInUser");  // 세션에서 사용자 ID 가져오기
        if (loggedInUser == null) {
            return "redirect:/web/loginMain";  // 로그인하지 않은 사용자는 로그인 페이지로 이동
        }

        // List<PjeOrder> orders = historyService.getOrderHistoryList(loggedInUser.getId());  // 사용자 ID로 주문 내역 조회
        // int totalPrice = orders.stream()
        //                        .mapToInt(order -> order.getPrice() * order.getQuantity())
        //                        .sum();
        // model.addAttribute("orderHistory", orders);
        // model.addAttribute("totalPrice", totalPrice);
        System.out.println("orderHistory 호출");
        return "kdh_html/order_history";  // 기존 주문내역 페이지 유지
    }
    @GetMapping("/loginMain")
    public String loginMain() {
        System.out.println("loginMain 컨트롤러 호출됨!");
        return "kdh_html/loginMain";
    }
}