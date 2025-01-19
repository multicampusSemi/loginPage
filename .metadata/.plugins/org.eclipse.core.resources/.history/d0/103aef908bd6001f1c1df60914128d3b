const findIdTab = document.getElementById("find-id-tab");
const findPwTab = document.getElementById("find-pw-tab");
const findIdForm = document.getElementById("find-id-form");
const findPwForm = document.getElementById("find-pw-form");

// 탭 클릭 이벤트
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

// 인증 방법 선택 라디오 버튼 (아이디 찾기)
const emailRadio = document.getElementById("email");
const phoneNumberRadio = document.getElementById("phone-number");

// 입력 필드 그룹 (아이디 찾기)
const defaultFields = document.getElementById("default-fields");
const phoneFields = document.getElementById("phone-fields");

// 라디오 버튼 클릭 이벤트 (아이디 찾기)
emailRadio.addEventListener("click", () => {
  defaultFields.classList.remove("hidden");
  phoneFields.classList.add("hidden");  // 휴대폰 번호 입력 필드 숨기기
  document.getElementById("email-search").parentElement.classList.remove("hidden"); // 이메일 입력 보이기
});

phoneNumberRadio.addEventListener("click", () => {
  defaultFields.classList.remove("hidden");
  phoneFields.classList.remove("hidden");  // 휴대폰 번호 입력 필드 보이기
  document.getElementById("email-search").parentElement.classList.add("hidden"); // 이메일 입력 숨기기
});

// 인증 방법 선택 라디오 버튼 (비밀번호 찾기)
const emailRadioPw = document.getElementById("email-pw");
const phoneNumberRadioPw = document.getElementById("phone-number-pw");

// 입력 필드 그룹 (비밀번호 찾기)
const defaultFieldsPw = document.getElementById("default-fields-pw");
const nameFieldsPw = document.getElementById("name-fields-pw");
const phoneFieldsPw = document.getElementById("phone-fields-pw");

// 라디오 버튼 클릭 이벤트 (비밀번호 찾기)
emailRadioPw.addEventListener("click", () => {
  defaultFieldsPw.classList.remove("hidden");
  nameFieldsPw.classList.remove("hidden");
  phoneFieldsPw.classList.add("hidden");  // 휴대폰 번호 입력 필드 숨기기
  document.getElementById("email-search-pw").parentElement.classList.remove("hidden"); // 이메일 입력 보이기
});

phoneNumberRadioPw.addEventListener("click", () => {
  defaultFieldsPw.classList.remove("hidden");
  nameFieldsPw.classList.remove("hidden");
  phoneFieldsPw.classList.remove("hidden");  // 휴대폰 번호 입력 필드 보이기
  document.getElementById("email-search-pw").parentElement.classList.add("hidden"); // 이메일 입력 숨기기
});