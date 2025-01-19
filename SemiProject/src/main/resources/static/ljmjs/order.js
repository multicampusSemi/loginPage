function generateProductRows(orderItems) {
    console.log("orderItems:", orderItems);

    if (orderItems && orderItems.length > 0) {
        let orderListHTML = '';
        let totalPrice = 0;
        let totalShippingFee = 0;

        // 각 주문 항목에 대해 처리
        orderItems.forEach(function(item) {
            let itemPrice = parseInt(item.productPrice) || 0;
            let itemShippingFee = parseInt(item.shippingFee) || 0;
            let itemQuantity = parseInt(item.quantity) || 0;

            let itemTotalPrice = itemPrice * itemQuantity;
            let itemTotalShippingFee = itemShippingFee * itemQuantity;

            orderListHTML += `
                <div class="order-item-main">
                    <table class="order-item-table">
                        <tr>
                            <td><strong>상품명 : </strong></td>
                            <td>${item.productName}</td>
                        </tr>
                        <tr>
                            <td><strong>수량 : </strong></td>
                            <td>${item.quantity}</td>
                        </tr>
                        <tr>
                            <td><strong>가격 : </strong></td>
                            <td>${item.productPrice}</td>
                        </tr>
                        <tr>
                            <td><strong>배송비 : </strong></td>
                            <td>${item.shippingFee}</td>
                        </tr>
                    </table>
                </div>
            `;

            totalPrice += itemTotalPrice;
            totalShippingFee += itemTotalShippingFee;
        });

        // 주문 항목을 화면에 표시
        document.getElementById('orderlist').innerHTML = orderListHTML;

        // 총 가격 및 배송비 계산 후 표시
        let totalAmount = totalPrice + totalShippingFee;
        document.getElementById('price').innerHTML = `
            <div class='price'>
                <p>총 가격: ${totalPrice}원</p>
                <p>총 배송비: ${totalShippingFee}원</p>
                <p>총 결제 금액: ${totalAmount}원</p>
            </div>
        `;
    } else {
        // 주문 항목이 없을 경우 메시지 표시
        document.getElementById('orderlist').innerHTML = `<p>주문되는 상품이 없습니다.</p>`;
    }
}

