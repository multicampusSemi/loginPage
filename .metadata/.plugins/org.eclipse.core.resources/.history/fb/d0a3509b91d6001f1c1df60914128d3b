package com.project.controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.project.model.KrhProduct;
import com.project.model.krhCategory;
import com.project.service.krhProductService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class krhMainController {
	private final krhProductService krhProductService;
	
	@GetMapping("/krhmain")
    public String main(Model model) {
		List<KrhProduct> products = krhProductService.main();
		model.addAttribute("products",products);
		return "krhmain";
    }
}
