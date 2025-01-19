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
	    <link rel="stylesheet" href="/krh_css/privacy.css">
	    <script src="/krh_js/privacy.js"></script>
	</head>
	
	<body>
	<%@ include file="/WEB-INF/views/krhheader.jsp" %>
		<div class="privacy">
        <div id="headers"></div>
        <div class="privacy-main">
            <header>
                <h2>개인정보 처리 방침</h2>
            </header>            
            <main>
                (주)YEONZ 쇼핑몰(이하 "회사" 또는 "쇼핑몰")은 고객님의 개인정보를 매우 중요하게 생각하며, 개인정보 보호법을 준수하고 있습니다. <br>
                본 개인정보 처리방침은 쇼핑몰이 수집하는 개인정보의 처리 목적, 처리 방법, 보유 기간 등과 관련된 내용을 설명합니다.
                <br><br>
                **1. 수집하는 개인정보 항목**
                <br>회사는 회원가입, 상품 구매, 결제 서비스 제공 등을 위해 다음과 같은 개인정보를 수집합니다.
                <br>- 필수항목: 이름, 이메일 주소, 전화번호, 배송 주소
                <br>- 결제 정보: 결제 카드 정보, 은행 계좌 정보
                <br>- 자동 수집 항목: IP 주소, 쿠키, 방문 일시 등
                <br><br>
                **2. 개인정보의 수집 및 이용 목적**
                <br>회사는 수집한 개인정보를 다음의 목적을 위해 사용합니다.
                <br>- 회원 가입 및 서비스 제공
                <br>- 상품 구매 및 결제 처리
                <br>- 배송, 교환, 환불 처리
                <br>- 고객 문의 및 불만 처리
                <br>- 맞춤형 서비스 및 마케팅 제공
                <br><br>
                **3. 개인정보의 보유 및 이용 기간**
                <br>회사는 고객님의 개인정보를 서비스 제공 기간 동안 보유하며, 회원 탈퇴 후에는 즉시 삭제됩니다. <br>다만, 법적 의무에 의해 보관해야 하는 정보는 해당 법적 보관 기간 동안 보유합니다.
                <br><br>
                **4. 개인정보의 제3자 제공**
                <br>회사는 고객님의 개인정보를 제3자에게 제공하지 않습니다. 다만, 배송을 위해 필요한 최소한의 개인정보는 배송업체와 공유할 수 있습니다.
                <br><br>
                **5. 개인정보 처리 위탁**
                <br>회사는 개인정보 처리 위탁을 받는 업체에게 개인정보를 제공합니다. 해당 업체는 다음과 같습니다.
                <br>- 배송업체: 고객님의 배송 정보를 이용하여 상품을 배송합니다.
                <br>- 결제 대행사: 결제 처리를 위해 결제 정보를 이용합니다.
                <br><br>
                **6. 이용자의 권리와 행사 방법**
                <br>고객님은 언제든지 자신의 개인정보를 열람, 수정, 삭제할 수 있습니다. 또한, 개인정보 처리에 대한 동의를 철회할 수 있습니다. 개인정보 관련 문의는 고객센터로 연락 바랍니다.
                <br><br>
                **7. 쿠키 및 자동 수집 장치의 운영**
                <br>회사는 고객님의 사이트 사용 패턴을 분석하기 위해 쿠키를 사용합니다. 쿠키는 고객님의 동의 하에 사용되며, 웹 브라우저 설정을 통해 쿠키 수집을 거부할 수 있습니다.
                <br><br>
                **8. 개인정보의 안전성 확보 조치**
                <br>회사는 고객님의 개인정보를 보호하기 위해 기술적, 관리적 안전성 확보 조치를 취하고 있습니다.
                <br>- 데이터 암호화
                <br>- 보안 서버 운영
                <br>- 해킹 및 악성 코드 방지 시스템 구축
                <br><br>
                **9. 개인정보 처리방침 변경**
                <br>회사는 개인정보 처리방침을 변경할 경우, 변경 내용을 쇼핑몰 사이트에 고지하며, 고지된 날짜부터 적용됩니다.
                <br><br>
                **10. 문의 및 연락처**
                <br>개인정보 관련 문의 사항은 아래의 연락처로 문의해 주시기 바랍니다.
                <br>- 이메일: samsungmulti@.com
                <br>- 전화: 123-456-7890

            </main>
        </div>
        <div id="footers">
        <%@ include file="/WEB-INF/views/krhfooter.jsp" %>
        </div>
    </div>
	</body>
</html>