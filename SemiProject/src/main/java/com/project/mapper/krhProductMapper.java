package com.project.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

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
}