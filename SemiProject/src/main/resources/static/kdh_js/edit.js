document.addEventListener("DOMContentLoaded", function () {
    // 유효성 검사 메시지 출력 함수
    function showErrorMessage(inputId, message) {
        const errorElement = document.getElementById(`${inputId}-error`);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = "block";
            errorElement.style.color = "red";
        }
    }

    // 에러 메시지 숨김 함수
    function hideErrorMessage(inputId) {
        const errorElement = document.getElementById(`${inputId}-error`);
        if (errorElement) {
            errorElement.textContent = "";
            errorElement.style.display = "none";
        }
    }

    const emailInput = document.getElementById("email");
    const authCodeInput = document.getElementById("email-code"); // 변경된 ID 반영
    const passwordInput = document.getElementById("password");
    const passwordConfirmInput = document.getElementById("passwordConfirm");

    // 기존 값 저장
    const initialEmail = emailInput.value;
    let isEmailVerified = false; // 이메일 인증 상태
	
    // 비밀번호 입력 시 실시간 유효성 검사
    passwordInput.addEventListener("input", function () {
        if (/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/.test(passwordInput.value)) {
            hideErrorMessage("password");
        } else {
            showErrorMessage("password", "비밀번호는 8~12자리이며, 특수문자를 포함해야 합니다.");
        }
    });

    // 비밀번호 확인 입력 시 실시간 유효성 검사
    passwordConfirmInput.addEventListener("input", function () {
        if (passwordInput.value === passwordConfirmInput.value) {
            hideErrorMessage("passwordConfirm");
        } else {
            showErrorMessage("passwordConfirm", "비밀번호와 비밀번호 확인이 일치하지 않습니다.");
        }
    });
    const emailVerifyBtn = document.getElementById("send-code-btn"); 
    const emailError = document.getElementById("email-error");

    let isEmailUnique = false;  // 이메일 중복 여부 상태 변수
	 emailVerifyBtn.style.display = "none";
    emailInput.addEventListener("input", function () {
        const email = emailInput.value.trim();
	
    
        if (email !== initialEmail) {
        isEmailVerified = false;
        document.getElementById("authCodeGroup").style.display = "none";
    }

     if (!/\S+@\S+\.\S+/.test(email)) {
            showErrorMessage("email", "유효한 이메일 주소를 입력하세요.");
            emailVerifyBtn.style.display = "none";
            return;
        } else {
            hideErrorMessage("email");
        }
    fetch(`/email/check-duplicate?email=${encodeURIComponent(email)}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('서버 응답 오류');
            }
            return response.json();
        })
        .then(data => {
            if (data.duplicate) {
                showErrorMessage("email", "이미 등록된 이메일입니다.");
                emailVerifyBtn.style.display = "none";
            } else {
                emailError.textContent = "사용 가능한 이메일입니다.";
                emailError.style.color = "green";
                emailError.style.display = "block";
                emailVerifyBtn.style.display = "inline-block";
            }
        })
        .catch(error => {
            showErrorMessage("email", "서버 오류가 발생했습니다.");
            console.error("이메일 중복 확인 오류:", error);
        });
	});

    // 이메일 인증번호 전송 버튼 클릭 이벤트

    if (emailVerifyBtn) {
        emailVerifyBtn.addEventListener("click", function () {
            const email = emailInput.value.trim();

            console.log("보낼 이메일 주소:", email);

            if (!/\S+@\S+\.\S+/.test(email)) {
                showErrorMessage("email", "유효한 이메일 주소를 입력하세요.");
                return;
            }

            hideErrorMessage("email");

            fetch("/email/send-code", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams({ email: email })
            })
                .then(response => response.text())
                .then(data => {
                    console.log("서버 응답:", data);
                    document.getElementById("email-error").textContent = "인증번호가 발송되었습니다.";
                    document.getElementById("email-error").style.color = "green";
                    document.getElementById("email-error").style.display = "block";
                    document.getElementById("authCodeGroup").style.display = "flex";
                })
                .catch(error => {
                    showErrorMessage("email", "서버 오류가 발생했습니다. 다시 시도해주세요.");
                    console.error("이메일 인증 오류:", error);
                });
        });
    }

    // 이메일 인증번호 확인 버튼 클릭 이벤트
    const authCodeVerifyBtn = document.getElementById("verify-code-btn"); // ID 변경 반영
    if (authCodeVerifyBtn) {
        authCodeVerifyBtn.addEventListener("click", function () {
            const email = emailInput.value.trim();
            const code = authCodeInput.value.trim();

            if (!code) {
                showErrorMessage("authCode", "인증번호를 입력하세요.");
                return;
            }

            fetch("/email/verify-code", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams({ email: email, code: code })
            })
                .then(response => response.text())
                .then(data => {
                    console.log("서버 응답:", data);
                    if (data.includes("인증이 완료되었습니다.")) {
                        document.getElementById("authCode-error").textContent = "인증이 완료되었습니다.";
                        document.getElementById("authCode-error").style.color = "green";
                        document.getElementById("authCode-error").style.display = "block";
                        isEmailVerified = true;
                    } else {
                        showErrorMessage("authCode", "인증번호가 올바르지 않습니다.");
                    }
                })
                .catch(error => {
                    showErrorMessage("authCode", "서버 오류가 발생했습니다.");
                    console.error("인증 확인 오류:", error);
                });
        });
    }

    // 폼 제출 시 유효성 검사 및 빈 비밀번호 제출 방지
    const updateForm = document.getElementById("updateForm");
    if (updateForm) {
        updateForm.addEventListener("submit", function (e) {
            let isValid = true;

            // 비밀번호 유효성 검사 (값이 입력된 경우만)
            if (passwordInput.value) {
                if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/.test(passwordInput.value)) {
                    showErrorMessage("password", "비밀번호는 8~12자리이며, 특수문자를 포함해야 합니다.");
                    isValid = false;
                } else {
                    hideErrorMessage("password");
                }

                if (passwordInput.value !== passwordConfirmInput.value) {
                    showErrorMessage("passwordConfirm", "비밀번호와 비밀번호 확인이 일치하지 않습니다.");
                    isValid = false;
                } else {
                    hideErrorMessage("passwordConfirm");
                }
            } else {
                passwordInput.value = "";
                passwordConfirmInput.value = "";
            }

            // 이메일 변경 확인
            if (emailInput.value !== initialEmail && !isEmailVerified) {
                showErrorMessage("email", "이메일 인증을 완료해야 합니다.");
                isValid = false;
            }

            if (!isValid) {
                e.preventDefault();
                return;
            }
            // 모든 유효성 검사 통과 후 alert 추가
        alert("회원정보가 성공적으로 수정되었습니다!");
        });
    }

    // 우편번호 찾기 기능
    const findPostcodeBtn = document.getElementById("find-postcode");
    const zipcodeInput = document.getElementById("zipcode");
    const addressInput = document.getElementById("address");
    const addressDetailInput = document.getElementById("addressDetail");

    if (findPostcodeBtn && zipcodeInput && addressInput && addressDetailInput) {
        findPostcodeBtn.addEventListener("click", () => {
            new daum.Postcode({
                oncomplete: function (data) {
                    zipcodeInput.value = data.zonecode; // 우편번호
                    addressInput.value = data.roadAddress || data.jibunAddress; // 기본 주소
                    addressDetailInput.focus();
                    hideErrorMessage("zipcode");
                }
            }).open();
        });
    } else {
        console.error("우편번호 관련 요소를 확인해주세요.");
    }
});
