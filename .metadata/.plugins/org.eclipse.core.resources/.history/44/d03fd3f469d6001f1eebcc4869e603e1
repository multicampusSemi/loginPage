

//slider
document.addEventListener("DOMContentLoaded", function() {
    const slides = document.querySelector('.slides');

    // 슬라이드 요소가 존재하는지 확인
    if (!slides) {
        console.error("슬라이드 요소를 찾을 수 없습니다.");
        return;
    }

    const slideCount = slides.children.length;
    let currentIndex = 0;

    // 슬라이드의 위치를 업데이트하는 함수
    const updateSlidePosition = () => {
        const slideWidth = slides.children[0].clientWidth;
        slides.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    };

    // 다음 슬라이드를 표시하는 함수
    const showNextSlide = () => {
        currentIndex = (currentIndex + 1) % slideCount;
        updateSlidePosition();
    };

    // 이전 슬라이드를 표시하는 함수
    const showPrevSlide = () => {
        currentIndex = (currentIndex - 1 + slideCount) % slideCount;
        updateSlidePosition();
    };

    // 자동 슬라이드 (7초 간격)
    setInterval(showNextSlide, 7000);

    // 슬라이드의 크기가 변경될 때마다 슬라이드 위치를 업데이트하는 리스너 추가
    window.addEventListener('resize', updateSlidePosition);
});


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
function cart(){
    const sessionId=/*[[${session.getId()}]]*/'';
    document.getElementsByClassName('cart').addEventListener('click', function() {
        console.log("바보");
        var formData = new FormData(document.getElementsByClassName('.product-each'));
        formData.set('sessionId',sessionId);
        $.ajax ({
            url : "/submit",
            type: 'POST',
            contentType:false,
            processData:false,
            data: formData,
            success: (resp) => {
                alert("상품이 장바구니에 담겼습니다.");
                // $(".stockitems").reload();
                productSearch();
            }
        })
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