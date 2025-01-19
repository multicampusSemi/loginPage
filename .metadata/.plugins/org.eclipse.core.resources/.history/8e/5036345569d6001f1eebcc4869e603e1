<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="jakarta.tags.core" prefix="c" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Product Page</title>
    <link rel="stylesheet" href="/ljmcss/product.css">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="/ljmjs/product.js"></script>
</head>
<body>
    <div class="product">
        <div class="product-page">
            <div class="slider">
                <div class="slides">
                    <img src="/images/kpop1.jpg" alt="Image 1">
                    <img src="/images/kpop2.jpg" alt="Image 2">
                    <img src="/images/kpop3.jpg" alt="Image 3">
                </div>
            </div>
            <div class="container">
                <main>
                    <div class="productpage-list">
                        <ul class="products">
                            <c:if test="${not empty products}">
    <c:forEach var="product" items="${products}">
        <li class="product-each">
            <br/>
            <br/>
            <span class="name">${product.product_name}</span>
            <br/>
            <span class="price"><span class="pricecolor">${product.product_price}</span><span class="won">원</span></span>
            <span class="cart">
                <form action="/cart/add" method="post">
                    <input type="hidden" name="productId" value="${product.product_id}">
                    <button type="submit"><img src="/images/cart.png" alt="Add to Cart"></button>
                </form>
            </span>
        </li>
    </c:forEach>
</c:if>
<c:if test="${empty products}">
    <p>No products available.</p>
</c:if>
                        </ul>
                    </div>
                </main>
            </div>
        </div>
    </div>
</body>
</html>
