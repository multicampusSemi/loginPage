<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
	    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	    <title>YEONZ</title>
	    <link rel="stylesheet" href="/krh_css/noticeview.css">
	    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Gothic+A1&display=swap" rel="stylesheet">
	</head>
	
	<body>
		<%@ include file="/WEB-INF/views/krhheader.jsp" %>
       <div class="noticeview">
	        <header>
	            <h2>Notice</h2>
	        </header>
	        <hr>
	        <main>
	            <div class="viewbox">
	                <div class="title">${notice.title}</div>
	                <div class="created">작성일: ${notice.createdAt}</div>
	                <div class="view">조회수: ${notice.views}</div>
	            </div>
	            <hr>
	            <div class="content">
	                ${notice.content}
	            </div>
	            <hr>
	        </main>
	        	<a href="/krhnotice">목록</a>
	    </div>
	<div id="footers">
	        	<%@ include file="/WEB-INF/views/krhfooter.jsp" %>
	        </div>
	</body>
</html>