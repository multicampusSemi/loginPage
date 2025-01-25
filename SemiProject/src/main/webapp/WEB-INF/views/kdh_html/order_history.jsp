<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<!DOCTYPE html>
<html>
<head>
    <title>주문 내역</title>
    <link rel="stylesheet" href="/pje_css/order_history.css">
     <link rel="preconnect" href="https://fonts.googleapis.com">
    	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    	<link href="https://fonts.googleapis.com/css2?family=Hahmlet:wght@100..900&display=swap" rel="stylesheet">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="/pje_js/order_history.js"></script>
</head>
<body>
    <div class="sidebar">
        <ul>
            <li><a href="/recent-orders">최근 주문 상품</a></li>
            <li><a href="/orderHistory" class="active">주문 내역</a></li>
            <li><a href="/member-update">회원 정보 수정</a></li>
        </ul>
    </div>

    <div class="main-content">
        <h1>주문 내역</h1>

        <!-- 세션에서 가져온 사용자 정보 출력 -->
        <p>세션에서 가져온 사용자 ID: <%= session.getAttribute("userId") %></p>
        <p>세션에서 가져온 사용자 이름: <%= session.getAttribute("username") %></p>

        <table id="orderTable">
            <thead>
                <tr>
                    <th>주문 번호</th>
                    <th>상품 이름</th>
                    <th>수량</th>
                    <th>가격</th>
                    <th>상태</th>
                    <th>총 가격</th>
                </tr>
            </thead>
            <tbody>
                <c:forEach var="order" items="${orderHistory}" varStatus="status">
                    <tr>
                        <td>${order.id}</td>
                        <td>${order.productName}</td>
                        <td>${order.quantity}</td>
                        <td>${order.price}원</td>
                        <td>${order.status}</td>
                        <c:if test="${status.first}">
                            <td class="total-price" rowspan="${orderHistory.size()}">${totalPrice}원</td>
                        </c:if>
                    </tr>
                </c:forEach>
            </tbody>
        </table>
    </div>
</body>
</html>