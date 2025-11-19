document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("serviceForm");
  const successBox = document.getElementById("submitSuccess");

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("custName").value.trim();
    const phone = document.getElementById("custPhone").value.trim();
    const area = document.getElementById("custArea").value.trim();
    const issue = document.getElementById("issueType").value;
    const detail = document.getElementById("issueDetail").value.trim();

    if (!name || !phone) {
      alert("성함과 연락처는 필수입니다.");
      return;
    }

    // ⭐ 제출 즉시 성공 팝업 표시
    if (successBox) {
      successBox.style.display = "block";
    }

    // ⭐ 폼 초기화
    form.reset();

    // ⭐ Google Apps Script로 백그라운드 전송 (CORS 완전 차단 모드)
    fetch("https://script.google.com/macros/s/AKfycbzyCsj1NU0h1LnN-yOOnfUAedPdK_J_weFoWl5z9uBzmK8Ve62Dk4rvEz4X_qSd16j8/exec", {
      method: "POST",
      mode: "no-cors",   // ⛔ 절대 수정 금지 — CORS 완전 무력화
      body: JSON.stringify({
        "성함": name,
        "연락처": phone,
        "지역/주소": area,
        "고장 증상": issue,
        "상세 설명": detail
      })
    }).catch((err) => {
      console.error("전송 오류:", err);
    });
  });
});
