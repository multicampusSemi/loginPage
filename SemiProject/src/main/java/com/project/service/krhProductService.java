package com.project.service;

import java.util.List;
import java.util.Locale.Category;

import com.project.model.BookingList;
import com.project.model.KrhProduct;
import com.project.model.krhCategory;

public interface krhProductService {
	// 상품 페이지 검색
	List<KrhProduct> productPageSearch(String keyword);
    
    //상품 리스트 갖고오기
    List<KrhProduct> findAll();

    List<KrhProduct> getProductsByCategoryId(String categoryId);
    
    List<krhCategory> getAllCategories();  // 모든 카테고리 가져오는 메서드 추가
    
    List<KrhProduct> main();

    //장바구니 추가
	void addToCart(BookingList bookingList);
}