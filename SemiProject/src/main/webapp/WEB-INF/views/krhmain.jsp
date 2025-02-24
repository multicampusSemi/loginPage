<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
	    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	    <title>YEONZ</title>
	    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
	        <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Hahmlet:wght@100..900&display=swap" rel="stylesheet">
	    <link rel="stylesheet" href="/krh_css/main.css">
	    <script src="/krh_js/main.js"></script>
	</head>
	
	<body>
	<%@ include file="/WEB-INF/views/krhheader.jsp" %>
    <div class="main">
        <div class="main-page">
                <div id="mainn">
                    <main>
                        <div class="slider">
                            <div class="slides">
                                <img src="/krh_img/kpop1.jpg">
                                <img src="/krh_img/kpop2.jpg">
                                <img src="/krh_img/kpop3.jpg">
                            </div>
                        </div>
                        <div class="newItem">
                            <h2>NEW ITEMS</h2>
                            <ul class="newItems">
                            <c:forEach var="product" items="${products}">
                                <li><img src="${product.photo}"/>
                                        <div class="product-info">
                                            <h3>${product.productName}</h3>
                                            <p>${product.productPrice}</p>
                                        </div>
                                    </a>
                                </li>
                             </c:forEach>
                            </ul>
                        </div>
                    </main>
                </div>
            </div>
        </div>
       <div id="footers">
        <%@ include file="/WEB-INF/views/krhfooter.jsp" %>
        </div>
	</body>
</html>