document.addEventListener("DOMContentLoaded", function () {
	
  // 탭 전환 로직
  const findIdTab = document.getElementById("find-id-tab");
  const findPwTab = document.getElementById("find-pw-tab");
  const findIdForm = document.getElementById("find-id-form");
  const findPwForm = document.getElementById("find-pw-form");

  findIdTab.addEventListener("click", () => {
    findIdTab.classList.add("active");
    findPwTab.classList.remove("active");
    findIdForm.classList.remove("hidden");
    findPwForm.classList.add("hidden");
  });

  findPwTab.addEventListener("click", () => {
    findPwTab.classList.add("active");
    findIdTab.classList.remove("active");
    findPwForm.classList.remove("hidden");
    findIdForm.classList.add("hidden");
  });
	const urlParams = new URLSearchParams(window.location.search);
    const tab = urlParams.get('tab');
    if (tab === 'password') {
        findPwTab.click(); // 비밀번호 찾기 탭 활성화
    }
  // jQuery AJAX 로직
  $("#find-id-btn").on("click", function (e) {
    e.preventDefault(); // 폼 제출 방지

    // 입력값 가져오기
    const name = $("#name").val();
    const email = $("#email-search").val();

    // AJAX 요청
    $.ajax({
      url: "/user/find-id",
      method: "POST",
      data: { name: name, email: email },
      success: function (response) {
        // 성공 시 메시지 표시
        $("#message")
          .text("아이디: " + response.unmaskedId)
          .removeClass("error")
          .addClass("success");
      },
      error: function (xhr) {
        // 실패 시 메시지 표시
        if (xhr.status === 404) {
          $("#message")
            .text("아이디를 찾을 수 없습니다.")
            .removeClass("success")
            .addClass("error");
        } else {
          $("#message")
            .text("오류가 발생했습니다. 다시 시도해주세요.")
            .removeClass("success")
            .addClass("error");
        }
      },
    });
  });

  // 이메일 인증 요청 및 검증 로직 추가
  $("#send-code-btn").on("click", function () {
    const email = $("#email-pw").val();
    if (!email) {
      alert("이메일을 입력해주세요.");
      return;
    }

    $.ajax({
      url: "/email/send-code",
      method: "POST",
      data: { email: email },
      success: function (response) {
        alert(response); // "인증번호가 이메일로 전송되었습니다."
      },
      error: function () {
        alert("이메일 전송 중 오류가 발생했습니다. 다시 시도해주세요.");
      },
    });
  });

  $("#verify-code-btn").on("click", function () {
    const email = $("#email-pw").val();
    const code = $("#email-code-pw").val();

    if (!code) {
      alert("인증번호를 입력해주세요.");
      return;
    }

    $.ajax({
      url: "/email/verify-code",
      method: "POST",
      data: { email: email, code: code },
      success: function (response) {
        alert("인증이 완료되었습니다.");
      },
      error: function () {
        alert("인증번호가 잘못되었거나 유효 시간이 초과되었습니다.");
      },
    });
  });

  // 모달 열기 전에 이메일 인증 여부 확인
$("#reset-password-btn").on("click", function () {
  const email = $("#email-pw").val(); // 이메일 입력 필드
  const username = $("#username-pw").val(); // 아이디 입력 필드
  const name = $("#name-pw").val(); // 이름 입력 필드

  // 입력값 확인
  if (!email || !username || !name) {
    alert("이메일, 아이디, 이름을 모두 입력해주세요.");
    return;
  }

  // 사용자 정보 확인 요청
  $.ajax({
    url: "/user/verify-info", // 사용자 정보 확인 엔드포인트
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify({
      email: email,
      username: username,
      name: name,
    }),
    success: function (response) {
      if (response.verified) {
        // 사용자 정보가 확인되었으므로 이메일 인증 여부 확인
        $.ajax({
          url: "/email/verify-status?email=" + encodeURIComponent(email),
          method: "GET",
          success: function (emailResponse) {
            console.log(emailResponse); // 응답 데이터 확인용
            if (emailResponse.verified) {
              $("#password-reset-modal").removeClass("hidden");
            } else {
              alert("이메일 인증이 필요합니다.");
            }
          },
          error: function () {
            alert("이메일 인증 상태 확인 중 오류가 발생했습니다.");
          },
        });
      } else {
        alert("입력하신 정보와 일치하는 사용자가 없습니다.");
      }
    },
    error: function () {
      alert("사용자 정보 확인 중 오류가 발생했습니다.");
    },
  });
});

  // 모달 닫기
  $("#close-modal-btn").on("click", function () {
    $("#password-reset-modal").addClass("hidden");
  });

  // 실시간 비밀번호 유효성 검사
  $("#new-password").on("input", function () {
    const password = $(this).val();
    const feedback = $("#password-feedback");
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!regex.test(password)) {
      feedback.show();
    } else {
      feedback.hide();
    }
  });

  $("#confirm-password").on("input", function () {
    const confirmPassword = $(this).val();
    const newPassword = $("#new-password").val();
    const feedback = $("#confirm-feedback");

    if (newPassword !== confirmPassword) {
      feedback.show();
    } else {
      feedback.hide();
    }
  });

  // 비밀번호 변경 폼 제출
  $("#reset-password-form").on("submit", function (e) {
    e.preventDefault();

    const newPassword = $("#new-password").val();
    const confirmPassword = $("#confirm-password").val();

    if (newPassword !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

 $.ajax({
  url: "/user/reset-password",
  method: "POST",
  contentType: "application/json",
  data: JSON.stringify({
    email: $("#email-pw").val(),
    password: $("#new-password").val(), // 서버가 필요로 하는 데이터만 전송
  }),
  success: function () {
    alert("비밀번호가 성공적으로 변경되었습니다.");
    $("#password-reset-modal").addClass("hidden");
    window.location.href = "/web/loginMain";
  },
  error: function (xhr) {
    alert("비밀번호 변경 중 오류가 발생했습니다.");
  },
});

  });
});