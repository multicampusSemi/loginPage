package com.project.controller;

import com.project.model.PjeRecent;
import com.project.model.kdhUser;
import com.project.service.RecentOrderService;

import jakarta.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Controller
public class PjeRecentController {
    private final RecentOrderService recentOrderService;

    public PjeRecentController(RecentOrderService recentOrderService) {
        this.recentOrderService = recentOrderService;
    }

    @GetMapping("/recent-orders")
    public String recentOrders(HttpSession session, Model model) {
    	kdhUser loggedInUser = (kdhUser) session.getAttribute("loggedInUser");  // 세션에서 사용자 ID 가져오기
        if (loggedInUser == null) {
            return "redirect:/web/loginMain";  // 로그인하지 않은 사용자는 로그인 페이지로 이동
        }

        // List<PjeRecent> recentOrders = recentOrderService.getRecentOrders(loggedInUser.getId());  // 사용자 ID로 최근 주문 조회
        // int totalAmount = recentOrders.stream()
        //                               .mapToInt(order -> order.getPrice() * order.getQuantity())
        //                               .sum();
        // model.addAttribute("recentOrders", recentOrders);
        // model.addAttribute("totalAmount", totalAmount);
        System.out.println("recentOrder호출");
        return "kdh_html/recent_orders";
    }

}