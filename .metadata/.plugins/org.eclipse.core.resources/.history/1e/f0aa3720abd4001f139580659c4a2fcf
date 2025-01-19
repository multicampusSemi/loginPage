$(document).ready(function() {
    $('#headers').load('header.html');  // header.html 파일의 내용을 #header div에 로드
    $('#footers').load('footer.html');  // footer.html 파일의 내용을 #footer div에 로드
});
//slider
const slides = document.querySelector('.slides');
    const slideCount = slides.children.length;
    let currentIndex = 0;

    const updateSlidePosition = () => {
      const slideWidth = slides.children[0].clientWidth;
      slides.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    };

    const showNextSlide = () => {
      currentIndex = (currentIndex + 1) % slideCount;
      updateSlidePosition();
    };

    const showPrevSlide = () => {
      currentIndex = (currentIndex - 1 + slideCount) % slideCount;
      updateSlidePosition();
    };

    // 자동 슬라이드 (5초 간격)
    setInterval(showNextSlide, 7000);

    //페이징 처리
let nowPage = 1;
function productpage(){
    let findStr="";
    $.ajax({
        url:"/product",
        type:"GET",
        data:{"findStr":findStr,"nowPage":nowPage},
        success:(resp)=>{
            let temp=$(resp).find(".product-page")
            $(".product-page").html(temp);
            //salepagesearch();
            //loadItem(findStr,nowPage);
        }
    })
}

function loadItem(findStr,nowPage){
    console.log("loadItem.....", findStr, nowPage)
    $.ajax({
        url:"/product",
        type:"GET",
        data:{"findStr":findStr,"nowPage":nowPage},
        success:(resp)=>{
            let temp=$(resp).find(".productpage-list");
            $(".salepagelist").html(temp);
            sessionStorage.setItem("saleNowPage",nowPage);
            $(".btnPrevEnable").on("click",()=>{
                console.log("prev...");
                let findStr=$(".findStr").val();
                if(sessionStorage.getItem("saleNowPage")!=null){
                    nowPage=sessionStorage.getItem("saleNowPage");
                    if(nowPage>1) nowPage--;
                }
                loadItem(findStr,nowPage);
            })
            $(".btnNextEnable").on("click", ()=>{
                console.log("next...")
                console.log(nowPage);
                let findStr = $(".findStr").val();
                if(sessionStorage.getItem("saleNowPage") != null){
                    nowPage = sessionStorage.getItem("saleNowPage");
                    nowPage++;               
                }
                loadItem(findStr, nowPage);
            })
        }
    })
}

//장바구니
function addcart(productId, productCount) {
    // 모든 .cart 버튼에 대해 클릭 이벤트 리스너를 추가
    document.querySelectorAll('.cart button').forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();  // 기본 폼 제출을 방지
            
            // 해당 버튼의 부모 form을 선택하여 FormData 생성
            var form = this.closest('form');  // 이 버튼에 해당하는 form을 찾음
            var formData = new FormData(form);  // 해당 form의 데이터를 가져옴

            // 제품 ID와 수량을 추가 (넘겨받은 productId와 productCount 사용)
            formData.set('productId', productId);
            formData.set('productCount', productCount);

            // Ajax 요청 보내기
            $.ajax({
                url: "/cart/add",
                type: 'POST',
                contentType: false,
                processData: false,
                data: formData,
                success: function(response) {
                    alert("상품이 장바구니에 담겼습니다.");
                    productSearch();  // 상품 검색 함수 호출 (필요하다면 구현)
                },
                error: function() {
                    alert("장바구니 추가 실패");
                }
            });
        });
    });
}

function productpagesearch(){
    let btnSearch = document.querySelector("#p-search");
    let findStr="";

    loadItem(findStr,nowPage);
    btnSearch.addEventListener('click',()=>{
        console.log("검색할거야");
        let findStr=$(".findStr").val();
        sessionStorage.setItem("findStr",findStr);
        loadItem(findStr,nowPage);
        cart();
    });
}