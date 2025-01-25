<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
    <title>마이페이지</title>
    <!-- CSS -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Hahmlet:wght@100..900&display=swap" rel="stylesheet">    
<link rel="stylesheet" href="${pageContext.request.contextPath}/kdh_css/edit.css">
</head>
<body>
<%@ include file="/WEB-INF/views/krhheader.jsp" %>
    <div class="container">
        <!-- 왼쪽 사이드바 -->
<nav class="sidebar">
    <ul>
        <li><a href="/recent-orders" class="active">최근 주문 상품</a></li>
            <li><a href="/orderHistory">주문 내역</a></li>
            <li><a href="/web/kdhedit">회원 정보 수정</a></li>
    </ul>
</nav>
<!-- 메인 컨텐츠 -->
<main class="content">
    <div class="agreement">
        <div class="am">
            <header>
                <h2>회원 정보 수정</h2>
            </header>
            <main>
                <form action="/web/kdhedit" method="post" id="updateForm">
           <fieldset>
               <div class="form-tabs">
          <div><b>기본 정보</b></div>
          <div><b>수정 가능</b><span class="required-dot">●</span> </div>
      </div>
               <div class="form-group">
                   <label for="name">이름</label>
                   <input type="text" id="name" name="name" placeholder="이름을 입력하세요" value="${user.name}" readonly>
               </div>
               <div class="form-group" id="birth">
                   <label for="birthdate">생년월일</label>
                   <div class="birthdate">
                       <input type="text" id="year" name="year" placeholder="년(4자리)" value="${user.birthYear}"readonly>
                       <input type="text" id="month" name="month" placeholder="월" value="${user.birthMonth}"readonly>
                       <input type="text" id="day" name="day" placeholder="일" value="${user.birthDay}"readonly>
                        </div>
                    </div>
                  <div class="form-group">
<label for="phone">휴대폰</label>
<input type="text" id="phone" name="phone" placeholder="010-1234-5678" value="${user.phone}"readonly>
</div>

                        <div class="form-group">
    <label for="home_phone">일반 전화번호</label>
    <input type="text" id="home_phone" name="home_phone" placeholder="예: 02-1234-5678" value="${user.homePhone}"readonly>
</div>

                        <div class="form-group">
                            <label for="id">아이디 </label>
                            <input type="text" id="username" name="username" placeholder="영문 소문자/숫자, 4-16자" value="${user.username}" readonly>
               </div>
               <div class="dot">
               <div class="form-group">
                   <label for="password" >비밀번호 </label>
                   <input type="password" id="password" name="password" placeholder="특수문자 포함 8~12자리">
               	<div id="password-error" class="error-message"></div>
               </div>
               <div class="form-group">
                   <label for="passwordConfirm">비밀번호 확인 </label>
                   <input type="password" id="passwordConfirm" name="passwordConfirm">
              		 <div id="passwordConfirm-error" class="error-message"></div>
               </div>
               <div class="form-group">
                   <label for="zipcode">우편번호</label>
                   <div class="inline-input">
                       <input type="text" id="zipcode" name="zipcode" value="${user.zipcode}">
                       <button type="button" id="find-postcode">찾기</button>
                   </div>
               </div>
             	<!-- 기본 주소 -->
				<div class="form-group">
				  <label for="address" class="address">기본 주소</label>
				  <input type="text" id="address" name="address" value="${user.address}">
				</div>
               <div class="form-group">
                   <label for="address">상세주소</label>
                   <input type="text" id="addressDetail" name="addressDetail" placeholder="상세주소를 입력하세요" value="${user.addressDetail}">
               </div>
               <div class="form-group">
        <label for="email">이메일 </label>
        <div class="inline-input">
            <input type="email" id="email" name="email" placeholder="이메일을 입력하세요" value="${user.email}" required>
            <button type="button" id="send-code-btn">인증하기</button>
        </div>
        <div id="email-error" class="error-message" style="display: none;"></div>
    </div>
    	</div>
    <!-- 인증번호 입력 -->
    <div class="form-group" id="authCodeGroup" >
        <label for="authCode">인증번호</label>
        <div class="inline-input">
            <input type="text" id="email-code" name="email-code" placeholder="인증번호 입력">
            <button type="button" id="verify-code-btn">확인</button>
        </div>
        <div id="authCode-error" class="error-message" style="display: none;"></div>
    </div>

                            </fieldset>
                            <button type="submit" class="submit-btn">수정하기</button>
                        </form>
                    </main>
                </div>
            </div>
        </main>
    </div>
    <div id="footers">
<%@ include file="/WEB-INF/views/krhfooter.jsp" %> 
</div>
</body>
<script src="${pageContext.request.contextPath}/kdh_js/edit.js" defer></script>
</html>