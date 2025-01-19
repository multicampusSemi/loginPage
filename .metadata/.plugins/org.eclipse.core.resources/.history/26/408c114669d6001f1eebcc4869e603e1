<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
	    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	    <title>YEONZ</title>
	    <link rel="stylesheet" href="/ljmcss/product.css">
	    <link rel="preconnect" href="https://fonts.googleapis.com">
    	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
   		 <link href="https://fonts.googleapis.com/css2?family=Hahmlet:wght@100..900&display=swap" rel="stylesheet">
	    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
	    <script src="/ljmjs/product.js"></script>
	</head>
	
	<body>
	<%@ include file="/WEB-INF/views/krhheader.jsp" %>
		<div class="product">
        <div class="product-page">
            <div class="slider">
                <div class="slides">
                    <img src="/krh_img/kpop1.jpg">
                    <img src="/krh_img/kpop2.jpg">
                    <img src="/krh_img/kpop3.jpg">
                </div>
            </div>
            <div class="product-search">
	            <form action="/search" method="get">
	                <input type="text" name="keyword" id="p-search" placeholder="상품명을 입력하시오">
	                <button type="submit" name="btn1" id="btn1">검색</button>
	            </form>
            </div>

            <div class="container">
                <aside height="500px">
                    <ul class="category">
                        <h3 class="ctitle">PRODUCT</h3>
						<c:forEach var="category" items="${categories}">
				            <li>
				                <a href="/productsC?category=${category.categoryId}"
				                   class="${category.categoryId == selectedCategory ? 'selected' : ''}">
				                   ${category.categoryName}
				                </a>
				            </li>
				        </c:forEach>
                    </ul>
                </aside>
                <main>
                    <div class="productpage-list">
                        <ul class="products">
	                        <c:if test="${not empty products}">
	                            <c:forEach var="product" items="${products}">
	                               <li class="product-each">
	                                  <span><img src="${product.photo}" alt="${product.productName}" width="250px" height="350px"></span>
	                                  <br/>
	                                  <br/>
	                                  <span class="name">${product.productName}</span>
	                                  <br/>
	                                  <span class="price"><span class="pricecolor">${product.productPrice}</span><span class="won">원</span></span>
	                                  <br/><br/>
	                                  <form action="/addcart" method="post">
	                                  		<input type="hidden" name="productId" value="${product.productId}">
            								<input type="hidden" name="userId" value="${sessionScope.userId}"> <!--동하님 코드 참조-->
            								<input type="hidden" name="quantity" value="1"><!--수량 안 나오게-->
	                                  		<button type="submit" class="cart"><img src="/krh_img/cart.png"></button>
	                                  </form>
	                                </li>
	                              </c:forEach>
	                         </c:if>
	                       <!-- 상품이 없을 경우 메시지 -->
	                       <c:if test="${empty products}">
	                      	<li class="product-none">찾으시는 상품이 없습니다.</li>
	                       </c:if>
                        </ul>

                        <div class="btnZone">
						    <button type="button" id="prevBtn" class="${page.nowPage > 1 ? 'btnPrevEnable' : 'btnPrev'}" onclick="movePage('prev')">< </button>
						    &nbsp; &nbsp;
						    <button type="button" id="nextBtn" class="${page.totSize > page.endNo ? 'btnNextEnable' : 'btnNext'}" onclick="movePage('next')"> ></button>
						</div>
                    </div>
                </main>
            </div>
        </div>
        <div id="footers">
        <%@ include file="/WEB-INF/views/krhfooter.jsp" %>
        </div>
        
    </div>
	</body>
</html>