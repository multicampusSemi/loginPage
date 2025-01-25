$(document).ready(function () {
    // 사이드바 활성 링크 설정
    const currentPath = window.location.pathname;
    $(".sidebar ul li a").each(function () {
        if ($(this).attr("href") === currentPath) {
            $(this).addClass("active");
        }
    });

    // 주문 데이터
    const orders = [
        { productName: "Product 1", price: "$100", quantity: 2, color: "White" },
        { productName: "Product 2", price: "$200", quantity: 1, color: "Black" },
        { productName: "Product 3", price: "$150", quantity: 1, color: "Blue" },
        { productName: "Product 4", price: "$50", quantity: 3, color: "White" }
    ];

    // 테이블 렌더링
    const $table = $("#recentOrdersTable");
    let tableContent = "";
    $.each(orders, function (index, order) {
        tableContent += `
            <tr data-index="${index}">
                <td>${order.productName}</td>
                <td>${order.price}</td>
                <td>${order.quantity}</td>
                <td>
                    <select class="color-select" data-index="${index}">
                        <option value="White" ${order.color === "White" ? "selected" : ""}>White</option>
                        <option value="Black" ${order.color === "Black" ? "selected" : ""}>Black</option>
                        <option value="Blue" ${order.color === "Blue" ? "selected" : ""}>Blue</option>
                    </select>
                </td>
                <td>
                    <button class="cancel-button" data-id="${index}">취소</button>
                </td>
            </tr>
        `;
    });
    $table.html(tableContent);

    // 취소 버튼 클릭 이벤트
    $(".cancel-button").on("click", function () {
        const orderIndex = $(this).data("id");
        const orderName = orders[orderIndex].productName;
        window.location.href = `../pje_html/cancel_order.html?orderId=${orderIndex}`;
    });

    // 색상 변경 이벤트
    $(".color-select").on("change", function () {
        const orderIndex = $(this).data("index");
        const selectedColor = $(this).val();

        // 주문 배열 업데이트
        orders[orderIndex].color = selectedColor;

        alert(`${orders[orderIndex].productName}의 색상이 ${selectedColor}(으)로 변경되었습니다.`);
    });
});