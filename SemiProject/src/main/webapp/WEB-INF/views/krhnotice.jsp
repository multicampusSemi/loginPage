<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
	    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	    <title>YEONZ</title>
	    <link rel="stylesheet" href="krh_css/notice.css">
	    <link rel="preconnect" href="https://fonts.googleapis.com">
	    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	    <link rel="preconnect" href="https://fonts.googleapis.com">
	    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	    <link href="https://fonts.googleapis.com/css2?family=Gothic+A1&display=swap" rel="stylesheet">
	</head>
	
	<body>
		<%@ include file="/WEB-INF/views/krhheader.jsp" %>
       	<div class="notice">
            <div class="notice-page">
                <header>
                    <h2>Notice</h2>
                </header>
                <main>
                    <table class="noticetable">
                        <thead class="table-dark">
                        </thead>
                        <tbody>
                                <c:forEach var="notice" items="${notices}">
                                    <tr>
                                        <td class="tdid">${notice.id}</td>
                                        <td class="tdtitle">
                                            <a href="krhnoticeview/${notice.id}" class="text-decoration-none">${notice.title}</a>
                                        </td>
                                        <td>${notice.createdAt}</td>
                                        <td>${notice.views}</td>
                                    </tr>
                                </c:forEach>
                        </tbody>
                    </table>
                </main>
            </div>
        </div>
        
        <div id="footers">
        	<%@ include file="/WEB-INF/views/krhfooter.jsp" %>
        </div>

	</body>
</html>