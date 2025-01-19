package com.project.model;
import java.time.LocalDateTime;

import lombok.Data;

@Data
public class KrhProduct {
	int productId;
	String productName;
	String productCode;
	int productPrice;
	String categoryId;
	String photo;
	int shippingfee;
	LocalDateTime createdAt;
	private int userId;
	int quantity;
}
