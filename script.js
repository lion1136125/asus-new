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

    // ✅ 제출하자마자 팝업 즉시 표시
    if (successBox) {
      successBox.style.display = "block";
    }

    // 폼 리셋
    form.reset();

    // 서버로 전송은 백그라운드에서 비동기로 처리
    fetch(
      "https://script.google.com/macros/s/AKfycbx94GHuO48pxyyqIuTIhrcznVdBJAXnlqh0UzfY1hUGVcq9kaHFwl5DLDuUqpB3rk32/exec",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          "성함": name,
          "연락처": phone,
          "지역/주소": area,
          "고장 증상": issue,
          "상세 설명": detail,
        }),
      }
    ).catch((err) => {
      console.error("전송 오류:", err);
    });
  });
});
