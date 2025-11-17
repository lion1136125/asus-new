document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("serviceForm");
  const successBox = document.getElementById("submitSuccess");

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("custName").value.trim();
    const phone = document.getElementById("custPhone").value.trim();
    const area = document.getElementById("custArea").value.trim();
    const issue = document.getElementById("issueType").value; // 고장증상
    const detail = document.getElementById("issueDetail").value.trim(); // 상세내용

    if (!name || !phone) {
      alert("성함과 연락처는 필수입니다.");
      return;
    }

    // 🔵 즉시 팝업 표시 (지연 없음)
    if (successBox) {
      successBox.style.display = "block";
    }

    // 🔵 폼 초기화
    form.reset();

    // 🔵 서버(GAS)로 비동기 전송
    fetch(
      "https://script.google.com/macros/s/AKfycbx94GHuO48pxyyqIuTIhrcznVdBJAXnlqh0UzfY1hUGVcq9kaHFwl5DLDuUqpB3rk32/exec",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          "성함": name,
          "연락처": phone,
          "지역": area,
          "고장증상": issue,
          "상세내용": detail,
        }),
      }
    ).catch((err) => {
      console.error("전송 오류:", err);
    });
  });
});
