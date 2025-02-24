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
	<div class="main">
        <div class="main-page">
            <header>
                <div class="headerbackground">
                    <nav>
                        <ul class="navtag1">
                        <c:if test="${empty sessionScope.loggedInUser}">
                            <li><a href="/web/main">login</a></li>
                        </c:if>
                         <c:if test="${not empty sessionScope.loggedInUser}">
                            <li><a href="/web/logout">logout</a></li>
                        </ul>
                        </c:if>
                    </nav>
                    <div class="title">
                        <a href="/krhmain">
                            <h2>YEO<br/>NZ</h2>
                        </a>
                    </div>
                    <nav>
                        <ul class="navtag2">
                            <li class="left-item"><a href="/findAll">PRODUCT</a>
                            </li>
                            <c:if test="${not empty sessionScope.loggedInUser}">
	                            <li class="right-item"><a href="/web/kdhedit">마이페이지</a></li>
	                            <li class="right-item"><a href="/booking">장바구니</a></li>
	                       </c:if>
                        </ul>
                    </nav>
                </div>
            </header>
        </div>
    </div>
	</body>
</html>