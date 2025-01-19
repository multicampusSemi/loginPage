package com.project.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.project.mapper.LjmSemiMapper;
import com.project.model.Cart;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService{
	private final LjmSemiMapper ljmsemiMapper;
	
	public void addProductCart(int userId, int productId, String productDescription, double shippingFee, double productPrice) {
        Cart cart = new Cart();
        cart.setUserId(userId);
        cart.setProduct_Id(productId);
        cart.setProduct_Description(productDescription);
        cart.setShipping_Fee(shippingFee);
        cart.setProduct_Price(productPrice);
        
        // DB에 추가
        ljmsemiMapper.addcart(cart);
    }
	
	public List<Cart> findAll(int userId) {
	    return ljmsemiMapper.findcart(userId);  // 모든 장바구니 항목을 가져오는 메서드
	}
}
