<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<c:if test="${not empty message}">
<!DOCTYPE html>
<html>
<head>
    <title>메인 페이지</title>
</head>
<body>
    <h1>환영합니다!</h1>
    <p>로그인이 성공적으로 완료되었습니다.</p>
    <a href="/web/logout">로그아웃</a>
    <br><br>
    <!-- 회원정보 수정 버튼 -->
    <a href="/web/kdhedit" id="edit-profile-btn">회원정보 수정</a>

</body>
</html>

<%-- 로그인 성공 시 알림 --%>
    
</c:if>
