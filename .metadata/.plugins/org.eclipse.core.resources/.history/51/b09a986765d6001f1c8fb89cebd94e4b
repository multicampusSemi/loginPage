package com.project.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.project.model.BookingList;
import com.project.model.KrhProduct;
import com.project.model.krhCategory;

@Mapper
public interface krhProductMapper {
	// 상품 페이지 검색
    List<KrhProduct> productPageSearch(String keyword);
    
    //상품 리스트 갖고오기
    List<KrhProduct> findAll();

	List<KrhProduct> getProductsByCategoryId(String categoryId);

	List<krhCategory> getAllCategories();
	
	//신상품
	 List<KrhProduct> main();

	 //장바구니 추가
	void addToCart(BookingList bookingList);
	//장바구니 수량만 추가
	void updateCart(BookingList existingItem);
	//장바구니 기존에 존재하는 지 확인
	BookingList findByUserAndProduct(int userId, int productId);
}