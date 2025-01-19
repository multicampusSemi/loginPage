package com.project.controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import com.project.model.KrhNotice;
import com.project.service.krhNoticeService;

@Controller
public class krhNoticeController {
	private final krhNoticeService krhnoticeService;

	public krhNoticeController(krhNoticeService krhnoticeService) {
		super();
		this.krhnoticeService = krhnoticeService;
	}
	
	@GetMapping("/krhnotice")
	public String getAllNotice(Model model) {
		List<KrhNotice> notices = krhnoticeService.getAllNotice();
		model.addAttribute("notices",notices);
		return "krhnotice";
	}
	
	//공지사항 자세히 보기
	@GetMapping("/krhnoticeview/{id}")
	public String view(@PathVariable int id, Model model) {
		krhnoticeService.incrementViews(id);
		model.addAttribute("notice", krhnoticeService.getBoardById(id));
		return "krhnoticeview";
	}

}
