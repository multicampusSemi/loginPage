package com.project.model;

import lombok.Data;

@Data
public class OrderItem {
	private String productName;
    private int quantity;
    private int productPrice;
    private int bookingId;
    private int productCount;
    private int totalAmount;
    private int shippingFee;
    private int productId;
    private int userId;
    private String status;
    
    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }
    public int getShippingFee() {
        return this.shippingFee;
    }

    // shippingFee를 설정하는 setter
    public void setShippingFee(int shippingFee) {
        this.shippingFee = shippingFee;
    }

    // 총 금액 계산을 위한 getter
    public int getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(int totalAmount) {
        this.totalAmount = totalAmount;  // 총 금액 설정
    }

}