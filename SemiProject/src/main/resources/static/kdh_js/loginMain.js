

document.addEventListener("DOMContentLoaded", () => {
    const openModal = document.getElementById("btnjoin");
    const closeModal = document.getElementById("closeModal");
    const modal = document.getElementById("modal");
      const message = "<%= request.getAttribute('message') %>";
    const error = "<%= request.getAttribute('error') %>";
    const loginError = "<%= request.getAttribute('loginError') %>";
	

 
    if (!openModal || !closeModal || !modal) {
        console.error("필수 요소가 존재하지 않습니다. HTML에서 id를 확인하세요.");
        return;
    }

    // 모달 열기
    openModal.addEventListener("click", () => {
        modal.classList.remove("hidden");
    });

    // 모달 닫기
    closeModal.addEventListener("click", () => {
        modal.classList.add("hidden");
    });

    // 모달 외부 클릭 시 닫기
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.add("hidden");
        }
    });
    
    const findPostcodeBtn = document.getElementById("find-postcode");  // 우편번호 찾기 버튼
const zipcodeInput = document.getElementById("zipcode");          // 우편번호 필드
const addressInput = document.getElementById("address");          // 기본 주소 필드
const addressDetailInput = document.getElementById("addressDetail"); // 상세 주소 필드

// 모든 요소가 존재하는지 체크 후 이벤트 리스너 등록
if (findPostcodeBtn && zipcodeInput && addressInput && addressDetailInput) {
    findPostcodeBtn.addEventListener("click", () => {
        new daum.Postcode({
            oncomplete: function (data) {
                // 도로명 주소 또는 지번 주소를 기본 주소에 입력
                zipcodeInput.value = data.zonecode; // 우편번호
                addressInput.value = data.roadAddress || data.jibunAddress; // 기본 주소
                
               

                // 상세 주소 필드로 포커스 이동
                addressDetailInput.focus();
            }
        }).open();
    });
} else {
    console.error("우편번호 관련 요소가 누락되었습니다. (#find-postcode, #zipcode, #address, #addressDetail)");
}

    const requiredInputs = document.querySelectorAll('[required]');
    const form = document.querySelector('#signup-form');
    const passwordInput = document.querySelector('#signup-password');
    const passwordConfirmInput = document.querySelector('#signup-password1');
    const emailInput = document.querySelector('#email');
    // 체크박스 요소와 에러 메시지
    const termsCheckbox = document.getElementById("agree-terms");
    const privacyCheckbox = document.getElementById("agree-privacy");
    const ageCheckbox = document.getElementById("agree-age");

    const termsError = document.getElementById("agree-terms-error");
    const privacyError = document.getElementById("agree-privacy-error");
    const ageError = document.getElementById("agree-age-error");
    const loadSignupUsername = () => {
        const savedUsername = sessionStorage.getItem("signupUsername");
        if (savedUsername) {
            const loginUsernameInput = document.getElementById("login-username");
            if (loginUsernameInput) {
                loginUsernameInput.value = savedUsername; // 저장된 아이디를 입력 필드에 설정
                sessionStorage.removeItem("signupUsername"); // 아이디를 한 번 표시한 후에는 삭제
            }
        }
    };
    const usernameInput = document.getElementById("username");


const emailSendButton = document.getElementById("send-code-btn");
   
if (emailSendButton) {
    emailSendButton.addEventListener("click", () => {
        const email = emailInput.value.trim();

        if (!email) {
            alert("이메일을 입력해주세요.");
            return;
        }

        fetch("/email/send-code", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({ email: email }),
        })
            .then((response) => response.text())
            .then((message) => {
                alert(message);
            })
            .catch(() => {
                alert("이메일 인증번호 발송 중 오류가 발생했습니다.");
            });
    });
}
   const emailVerifyButton = document.getElementById("verify-code-btn");
if (emailVerifyButton) {
    emailVerifyButton.addEventListener("click", () => {
        const email = emailInput.value.trim();
        const emailCodeInput = document.getElementById("email-code");
        const code = emailCodeInput.value.trim();

        if (!email || !code) {
            alert("이메일과 인증번호를 모두 입력해주세요.");
            return;
        }

        fetch("/email/verify-code", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({ email: email, code: code }),
        })
            .then((response) => {
                if (response.ok) {
                    alert("이메일 인증이 완료되었습니다.");
                    emailVerifyButton.dataset.verified = "true";
                } else {
                    alert("인증번호가 잘못되었거나 만료되었습니다.");
                }
            })
            .catch(() => {
                alert("이메일 인증 확인 중 오류가 발생했습니다.");
            });
    });
}

 async function checkUsernameExists(username) {
    console.log("검사할 아이디:", username);

    const usernameError = document.getElementById("username-error");

    try {
        const response = await fetch(`/web/validate-username?username=${encodeURIComponent(username)}&t=${new Date().getTime()}`);

        if (!response.ok) {
            throw new Error("서버 응답 오류");
        }

        const data = await response.json();
        console.log("서버 응답 데이터:", data); // 서버의 응답 확인

        // 기존 메시지 초기화
        usernameError.innerHTML = ""; 

        if (data.exists === false) {
            console.log("사용 가능한 아이디입니다.");
            usernameError.textContent = "사용 가능한 아이디입니다.";
            usernameError.style.color = "green";
            usernameError.style.display = "none";
        } else {
            console.log("중복된 아이디입니다.");
            usernameError.textContent = "* 중복된 아이디입니다.";
            usernameError.style.color = "red";
            usernameError.style.display = "block";
        }
        return data.exists === false;
    } catch (error) {
        console.error("아이디 확인 중 오류 발생:", error);
        usernameError.textContent = "서버 오류 발생, 다시 시도해주세요.";
        usernameError.style.color = "red";
        usernameError.style.display = "block";
        return false; // 오류 시 기본적으로 중복된 것으로 처리
    }
}

   // 이메일 중복 검사 함수
function checkEmailExists(email) {
    fetch(`/web/validate-email?email=${encodeURIComponent(email)}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            const errorMessage = document.querySelector("#email-error");
            if (!errorMessage) return;

            if (data.exists) {
                // 이미 사용 중인 이메일 - 에러 메시지 표시 및 전송 버튼 비활성화
                errorMessage.textContent = "이미 사용 중인 이메일입니다.";
                errorMessage.style.color = "red";
                errorMessage.style.display = "block";
                emailSendButton.disabled = true; // 버튼 비활성화
                emailSendButton.style.display = "none"; // 버튼 숨김 (선택 사항)
            } else {
                // 사용 가능한 이메일 - 에러 메시지 숨기고 전송 버튼 활성화
                errorMessage.style.display = "none";
                emailSendButton.disabled = false; // 버튼 활성화
                emailSendButton.style.display = "block";
            }
        })
        .catch(error => {
            console.error("이메일 확인 중 오류 발생:", error);
            const errorMessage = document.querySelector("#email-error");
            errorMessage.textContent = "서버 오류가 발생했습니다. 나중에 다시 시도해주세요.";
            errorMessage.style.color = "red";
            errorMessage.style.display = "block";
            emailSendButton.disabled = true; // 에러 발생 시 버튼 비활성화
            emailSendButton.style.display = "none"; // 버튼 숨김 (선택 사항)
        });
}
  // 이메일 입력 필드 이벤트 리스너
if (emailInput) {
    emailInput.addEventListener("blur", () => {
        const email = emailInput.value.trim();
        const emailError = document.querySelector("#email-error");

        if (!email) {
            emailError.textContent = "";
            emailError.style.color = "red";
            emailError.style.display = "block";
            emailSendButton.disabled = true;  // 빈 값일 때 버튼 비활성화
            emailSendButton.style.display = "none";
            return;
        }

        emailError.style.display = "none";
        checkEmailExists(email);
    });
     if (usernameInput) {
        usernameInput.addEventListener("blur", () => {
            const username = usernameInput.value.trim();
            if (username) {
                checkUsernameExists(username);
            }
        });
    }

    }

    // 로그인 페이지에 아이디를 자동 입력
    loadSignupUsername();

    // 기존 코드 유지
    // 에러 메시지 초기화 (처음 로드 시 숨김)
    [termsError, privacyError, ageError].forEach((error) => {
        error.style.display = "none";
    });
// 휴대폰 번호 입력 필드
// 휴대폰 번호 입력 필드
const phone1 = document.getElementById('phone1');  
const phone2 = document.getElementById('phone2');
const phone3 = document.getElementById('phone3');
const phoneInput = document.createElement('input');
const phoneError = document.getElementById("phone-error");
const phoneRequiredMsg = document.getElementById("phoneConfirm"); // 필수 입력 메시지 선택

phoneInput.type = 'hidden';
phoneInput.name = 'phone';
form.appendChild(phoneInput);



// 폼 제출 시 유효성 검사
form.addEventListener("submit", async (e) => {
    const phoneNumber = `${phone1.value.trim()}-${phone2.value.trim()}-${phone3.value.trim()}`;

    // 하이픈이 포함된 번호를 hidden input에 저장
    phoneInput.value = phoneNumber;

  	  // 필수 입력 메시지 숨기기
    phoneRequiredMsg.style.display = "none";

    // 휴대폰 자리수 유효성 검사
    if (!validatePhoneFields()) {
		phoneRequiredMsg.style.display = "block";
        e.preventDefault();
        return;
    }

   
    // 중복 검사 실행
    const isPhoneValid = await checkPhoneExists(phoneNumber);
    if (!isPhoneValid) {
        e.preventDefault();
    }
});

// 휴대폰 번호 자리수 검증 함수
function validatePhoneFields() {
    let isValid = true;

    const phone2Value = phone2.value.trim();
    const phone3Value = phone3.value.trim();

    // phone2와 phone3가 비어있는 경우 필수 입력 체크
    if (phone2Value === "" || phone3Value === "") {
        phoneError.textContent="";
        isValid = false;
    }
    // phone2의 유효성 검사 (4자리 숫자 확인)
    else if (!/^[0-9]{4}$/.test(phone2Value)) {
        phoneError.textContent = "전화번호 중간 부분은 4자리 숫자로 입력해주세요.";
        phoneError.style.color = "red";
        phoneError.style.display = "block";
        isValid = false;
    }
    // phone3의 유효성 검사 (4자리 숫자 확인)
    else if (!/^\d{4}$/.test(phone3Value)) {
        phoneError.textContent = "전화번호 마지막 부분은 4자리 숫자로 입력해주세요.";
        phoneError.style.color = "red";
        phoneError.style.display = "block";
        isValid = false;
    } else {
        // 모든 조건을 만족하면 메시지를 숨김
        phoneError.style.display = "none";
    }

    return isValid;
}

// 휴대폰 번호 중복 확인 함수
async function checkPhoneExists(phoneNumber) {
    try {
        const response = await fetch(`/phone/check?phone=${encodeURIComponent(phoneNumber)}`);
        if (!response.ok) {
            throw new Error(`서버 오류: ${response.status}`);
        }
        const data = await response.json();

        if (data.exists) {
            phoneError.textContent = "이미 사용 중인 휴대폰 번호입니다.";
            phoneError.style.color = "red";
            phoneError.style.display = "block";
            return false;
        } else {
            phoneError.textContent = "사용 가능한 번호입니다.";
            phoneError.style.color = "green";
            phoneError.style.display = "block";
            return true;
        }
    } catch (error) {
        console.error("휴대폰 번호 확인 중 오류 발생:", error);
        phoneError.textContent = "서버에 문제가 발생했습니다. 나중에 다시 시도하세요.";
        phoneError.style.color = "red";
        phoneError.style.display = "block";
        return false;
    }
}

// 휴대폰 입력 필드 이벤트 
[phone2, phone3].forEach((input, index) => {
    input.addEventListener("blur", async () => {
		
        if (validatePhoneFields()) {
            if (phone2.value.trim().length === 4 && phone3.value.trim().length === 4) {
                const phoneNumber = `${phone1.value.trim()}-${phone2.value.trim()}-${phone3.value.trim()}`;
                await checkPhoneExists(phoneNumber);
            }
        }
    });

      input.addEventListener("input", () => {
        if (!validatePhoneFields()) {
			console.log("유효하지않음 "+validatePhoneFields());
            phoneError.style.display = "block";  // 경고 메시지 유지
            phoneRequiredMsg.style.display="none";
        }else{
			console.log("유효함 "+validatePhoneFields());
            phoneRequiredMsg.style.display="none";
            phoneRequiredMsg.style.display="none";
			
		}   
    });
});

    //아이디 유효성 검사 함수
    const validateUsername = (input) =>{
        const parent = input.closest('.signupForm-group');
        let errorMessage = parent.querySelector('.error-message');
        const usernameValue = input.value.trim();
        const usernameRegex = /^[a-z0-9]{6,10}$/;
        if(!errorMessage){
            errorMessage = document.createElement('div');
            errorMessage.classList.add('error-message');
            parent.appendChild(errorMessage);
        }
        if (!usernameValue) {
            errorMessage.textContent = '* 필수 입력 사항입니다.';
            errorMessage.style.display = 'block';
            return false;
        }else if (!usernameRegex.test(usernameValue)) {
            errorMessage.textContent = '아이디 형식에 맞지 않습니다.';
            errorMessage.style.display = 'block';
            return false;
        }else {
            errorMessage.style.display = 'none';
            return true;
        }
        
    };
    
    // 비밀번호 유효성 검사 함수
    const validatePasswordFormat = (input) => {
        const parent = input.closest('.signupForm-group');
        let errorMessage = parent.querySelector('.error-message');
        const passwordValue = input.value.trim();
        const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,12}$/;

        if (!errorMessage) {
            errorMessage = document.createElement('div');
            errorMessage.classList.add('error-message');
            parent.appendChild(errorMessage);
        }

        if (!passwordValue) {
            errorMessage.textContent = '* 필수 입력 사항입니다.';
            errorMessage.style.display = 'block';
            return false;
        } else if (!passwordRegex.test(passwordValue)) {
            errorMessage.textContent = '형식에 맞지 않습니다 형식은 8자리 이상 특수문자 포함입니다.';
            errorMessage.style.display = 'block';
            return false;
        } else {
            errorMessage.style.display = 'none';
            return true;
        }
    };

    // 비밀번호 확인 값 일치 여부 검사 함수
    const validatePasswordMatch = () => {
        const parent = passwordConfirmInput.closest('.signupForm-group');
        let errorMessage = parent.querySelector('.error-message');
        const passwordValue = passwordInput.value.trim();
        const confirmPasswordValue = passwordConfirmInput.value.trim();

        if (!errorMessage) {
            errorMessage = document.createElement('div');
            errorMessage.classList.add('error-message');
            parent.appendChild(errorMessage);
        }

        if (!confirmPasswordValue) {
            errorMessage.textContent = '* 필수 입력 사항입니다.';
            errorMessage.style.display = 'block';
            return false;
        } else if (passwordValue !== confirmPasswordValue) {
            errorMessage.textContent = '비밀번호가 일치하지 않습니다.';
            errorMessage.style.display = 'block';
            return false;
        } else {
            errorMessage.style.display = 'none';
            return true;
        }
    };

    // 이메일 형식 검사 함수
    const validateEmailFormat = () => {
        const parent = emailInput.closest('.signupForm-group');
        let errorMessage = parent.querySelector('.error-message');
        const emailValue = emailInput.value.trim();
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
// 이메일 정규식

        if (!errorMessage) {
            errorMessage = document.createElement('div');
            errorMessage.classList.add('error-message');
            parent.appendChild(errorMessage);
        }

        if (!emailValue) {
            errorMessage.textContent = '* 필수 입력 사항입니다.';
            errorMessage.style.display = 'block';
            
            return false;
        } else if (!emailRegex.test(emailValue)) {
            errorMessage.textContent = '유효한 이메일 형식이 아닙니다.';
            errorMessage.style.display = 'block';
            emailSendButton.style.display ="none";
            return false;
        } else {
            errorMessage.style.display = 'none';
            return true;
     
        }
    };

    // 체크박스 유효성 검사 함수
    const validateCheckboxes = (showErrors = true) => {
        let isValid = true;

        if (!termsCheckbox.checked) {
            if (showErrors) termsError.style.display = "block";
            isValid = false;
        } else {
            termsError.style.display = "none";
        }

        if (!privacyCheckbox.checked) {
            if (showErrors) privacyError.style.display = "block";
            isValid = false;
        } else {
            privacyError.style.display = "none";
        }

        if (!ageCheckbox.checked) {
            if (showErrors) ageError.style.display = "block";
            isValid = false;
        } else {
            ageError.style.display = "none";
        }

        return isValid;
    };

    // 폼 제출 시 검증
    form.addEventListener("submit", (event) => {
        const isFormValid = validateCheckboxes(true);
        if (!isFormValid) {
            event.preventDefault(); // 폼 제출 중단
        }
    });

    // 체크박스 상태 변경 시 경고 메시지 업데이트
    [termsCheckbox, privacyCheckbox, ageCheckbox].forEach((checkbox, index) => {
        checkbox.addEventListener("change", () => {
            const errorElement = [termsError, privacyError, ageError][index];
            if (!checkbox.checked) {
                errorElement.style.display = "block";
            } else {
                errorElement.style.display = "none";
            }
        });
    });
   
    // 필수 입력 필드 검사 함수
    const validateRequiredFields = () => {
        let isValid = true;

        requiredInputs.forEach(input => {
			 // 휴대폰 필드는 개별 유효성 검사에서 처리하므로 제외
       
            const parent = input.closest('.signupForm-group');

            if (!parent) {
                console.error("입력 필드의 부모 요소(.signupForm-group)를 찾을 수 없습니다:", input);
                isValid = false;
                return;
            }

            let errorMessage = parent.querySelector('.error-message');

            if (!errorMessage) {
                errorMessage = document.createElement('div');
                errorMessage.classList.add('error-message');
                parent.appendChild(errorMessage);
            }

            if (!input.value.trim()) {
                errorMessage.textContent = '* 필수 입력 사항입니다.';
                errorMessage.style.display = 'block';
                isValid = false;
            } else {
                errorMessage.style.display = 'none';
            }
        });

        return isValid;
    };
    
const validateBirthDate = (showError = true) => {
    const yearInput = document.getElementById("birth_year");
    const monthInput = document.getElementById("birth_month");
    const dayInput = document.getElementById("birth_day");

    const yearValue = yearInput.value.trim();
    const monthValue = monthInput.value.trim();
    const dayValue = dayInput.value.trim();

    const parent = yearInput.closest('.signupForm-group');
    let errorMessage = parent.querySelector('.error-message');

    if (!errorMessage) {
        errorMessage = document.createElement('div');
        errorMessage.classList.add('error-message');
        parent.appendChild(errorMessage);
    }

    const yearRegex = /^(19[0-9]{2}|20[0-2][0-5])$/; // 1900~2025
    const monthRegex = /^(0?[1-9]|1[0-2])$/; // 1~12
    const dayRegex = /^(0?[1-9]|[12][0-9]|3[01])$/; // 1~31

    if (!yearValue || !monthValue || !dayValue) {
        if (showError) {
            errorMessage.textContent = '* 생년월일의 모든 필드를 입력해주세요.';
            errorMessage.style.display = 'block';
        }
        return false;
    } else if (!yearRegex.test(yearValue)) {
        if (showError) {
            errorMessage.textContent = '* 년도는 1900년 이상 2025년 이하여야 합니다.';
            errorMessage.style.display = 'block';
        }
        return false;
    } else if (!monthRegex.test(monthValue)) {
        if (showError) {
            errorMessage.textContent = '* 월은 1부터 12 사이여야 합니다.';
            errorMessage.style.display = 'block';
        }
        return false;
    } else if (!dayRegex.test(dayValue)) {
        if (showError) {
            errorMessage.textContent = '* 일은 1부터 31 사이여야 합니다.';
            errorMessage.style.display = 'block';
        }
        return false;
    } else {
        errorMessage.style.display = 'none';
        return true;
    }
};

    
 requiredInputs.forEach(input => {
    input.addEventListener('blur', () => {
        if (input.id === 'signup-password') {
            validatePasswordFormat(input);
        } else if (input.id === 'signup-password1') {
            validatePasswordMatch();
        } else if (input.id === 'email') {
            validateEmailFormat();
        } else if (input.id === 'username') {
            validateUsername(input);
        } else if (input.id === 'birth_year' || input.id === 'birth_month' || input.id === 'birth_day') {
            validateBirthDate(true);  // showError를 true로 설정
        } else {
            validateRequiredFields();
        }
    });
});
    // 체크박스 변경 시 실시간 검사
    [termsCheckbox, privacyCheckbox, ageCheckbox].forEach((checkbox) => {
        checkbox.addEventListener('change', () => validateCheckboxes(false));
    });
        const signupForm = document.getElementById("signup-form");
   
   
if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
        e.preventDefault(); // 기본 폼 제출 방지

        const email = emailInput.value.trim();
        const username = usernameInput.value.trim();
        const emailVerified = emailVerifyButton.dataset.verified === "true"; // 이메일 인증 여부 확인
		const phoneNumber = `${phone1.value.trim()}-${phone2.value.trim()}-${phone3.value.trim()}`;
        // 필수 체크 확인
        const isCheckboxValid = validateCheckboxes(true);
        const isBirthDateValid = validateBirthDate(true);
		 const isUsernameValid = validateUsername(usernameInput);
        const isPasswordValid = validatePasswordFormat(passwordInput);
        const isPasswordMatch = validatePasswordMatch();
        const isPhoneValid = validatePhoneFields();
        const isEmailValid = validateEmailFormat();
       
         if (!isPhoneValid) {
            alert("휴대폰 번호를 올바르게 입력해주세요.");
            phone2.focus();
            return;
        }
		 if (!isEmailValid) {
            alert("유효한 이메일을 입력해주세요.");
            emailInput.focus();
            return;
        }
          // 아이디 유효성 검사
        if (!isUsernameValid) {
            alert("아이디를 올바르게 입력해주세요.");
            usernameInput.focus();
            return;
        }

        // 비밀번호 유효성 검사
        if (!isPasswordValid) {
            alert("비밀번호를 올바르게 입력해주세요.");
            passwordInput.focus();
            return;
        }

        // 비밀번호 일치 여부 검사
        if (!isPasswordMatch) {
            alert("비밀번호가 일치하지 않습니다.");
            passwordConfirmInput.focus();
            return;
        }
		if(!isBirthDateValid){
			alert("생년월일이 올바르지 않습니다");
			document.getElementById("birth_year").focus();
			return;
		}
        if (!isCheckboxValid) {
            alert("모든 체크박스를 체크해주세요.");
            return;
        }

       

        if (!emailVerified) {
            alert("이메일 인증을 완료해주세요.");
            return;
        }

     
try {
	// usernameError 및 phoneError 요소 찾기
    const usernameError = document.getElementById("username-error");
    const phoneError = document.getElementById("phone-error");

    // 기존 에러 메시지 제거
    if (usernameError) usernameError.style.display = "none";
    if (phoneError) phoneError.style.display = "none";
     // 아이디 및 전화번호 중복 확인 병렬 실행
    const results = await Promise.allSettled([
        checkPhoneExists(phoneNumber),
        checkUsernameExists(username)
    ]);

    // Promise.allSettled 결과 처리
    const isPhoneAvailable = results[0].status === "fulfilled" && results[0].value;
    const isUsernameAvailable = results[1].status === "fulfilled" && results[1].value;

    if (!isUsernameAvailable) {
        alert("중복된 아이디입니다.");
        if (usernameError) {
            usernameError.textContent = "* 이미 사용 중인 아이디입니다.";
            usernameError.style.color = "red";
            usernameError.style.display = "block";
        }
        usernameInput.focus();
        return;
    }

    if (!isPhoneAvailable) {
        alert("중복된 번호입니다.");
        if (phoneError) {
            phoneError.textContent = "이미 사용 중인 휴대폰 번호입니다.";
            phoneError.style.color = "red";
            phoneError.style.display = "block";
        }
        phone2.focus();
        return;
    }

    // 이메일 인증 확인
    const response = await fetch(`/email/verify-status?email=${encodeURIComponent(email)}`, {
        method: "GET",
    });

    if (!response.ok) {
        throw new Error("서버로부터 인증 상태를 가져올 수 없습니다.");
    }

    const data = await response.json();

    if (data.verified) {
        alert("이메일 인증이 확인되었습니다!");
        signupForm.submit(); // 최종적으로 폼 제출
    } else {
        alert("이메일 인증을 완료해주세요.");
    }
} catch (error) {
    if (error.message.includes("이미 존재하는 아이디입니다") || error.message.includes("중복된 번호입니다")) {
        console.warn("중복 확인 예외 처리:", error.message);
    } else {
        alert("서버와의 통신 중 문제가 발생했습니다.");
        console.error("Error verifying email status:", error);
    }
}
    });
}

handleFormErrors();

    // 에러 메시지 처리 함수
    function handleFormErrors() {
      const errorMessageElement = document.getElementById("errorMessage");

    if (errorMessageElement) {
        const errorField = errorMessageElement.getAttribute("data-field");
        const errorText = errorMessageElement.innerText.trim();

        console.log("에러 필드:", errorField);
        console.log("에러 메시지:", errorText);

        // 특정 필드에 맞춰 처리
        const targetFields = {
            username: document.getElementById("username"),
            phone: document.getElementById("phone2")
        };

        if (errorField && errorText && targetFields[errorField]) {
            const inputField = targetFields[errorField];

            // 포커스를 해당 필드로 이동
            inputField.focus();

            // 기존 메시지 제거 후 새 메시지 추가
            let errorMessage = inputField.nextElementSibling;
            if (!errorMessage || !errorMessage.classList.contains("error-message")) {
                errorMessage = document.createElement("div");
                errorMessage.classList.add("error-message");
                inputField.parentNode.appendChild(errorMessage);
            }
            errorMessage.textContent = errorText;
            errorMessage.style.color = "red";
            errorMessage.style.display = "block";

            // 스타일 적용
            inputField.classList.add("error-highlight");
        } else {
            alert(errorText);
        }
    }

    // 에러 강조 스타일 추가
    const style = document.createElement('style');
    style.innerHTML = `
        #username.error-highlight 
        
    `;
    document.head.appendChild(style);
     }
});

