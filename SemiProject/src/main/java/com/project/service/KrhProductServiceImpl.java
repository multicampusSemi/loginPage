package com.project.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.project.mapper.krhProductMapper;
import com.project.model.BookingList;
import com.project.model.KrhProduct;
import com.project.model.krhCategory;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class KrhProductServiceImpl implements krhProductService{
	private final krhProductMapper krhProductMapper;
	
	//검색
	@Override
	public List<KrhProduct> productPageSearch(String keyword) {
		// TODO Auto-generated method stub
		return krhProductMapper.productPageSearch(keyword);
	}

	//리스트업
	@Override
	public List<KrhProduct> findAll() {
		// TODO Auto-generated method stub
		return krhProductMapper.findAll();
	}

    // 카테고리 ID에 해당하는 상품들 조회
    @Override
    public List<KrhProduct> getProductsByCategoryId(String categoryId) {
        return krhProductMapper.getProductsByCategoryId(categoryId);
    }

    // 모든 카테고리 정보 조회
    @Override
    public List<krhCategory> getAllCategories() {
        return krhProductMapper.getAllCategories();  // 카테고리 정보 가져오는 메서드 호출
    }

	@Override
	public List<KrhProduct> main() {
		// TODO Auto-generated method stub
		return krhProductMapper.main();
	}


	@Override
	public void addToCart(BookingList bookingList) {
		// TODO Auto-generated method stub
		// 장바구니에 이미 상품이 있는지 확
		krhProductMapper.addToCart(bookingList);
	}


	
}