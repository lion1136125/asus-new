// ===== Desktop: disable tel: links so they do nothing on PC =====
(function () {
  function disableTelOnDesktop() {
    if (window.matchMedia && window.matchMedia("(min-width: 960px)").matches) {
      document.querySelectorAll('a[href^="tel:"]').forEach(function (a) {
        a.addEventListener("click", function (e) {
          e.preventDefault();
        });
        a.style.cursor = "default";
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", disableTelOnDesktop);
  } else {
    disableTelOnDesktop();
  }

  window.addEventListener("resize", disableTelOnDesktop);
})();

// ===== Form Submit 처리 =====
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("serviceForm");
  const successBox = document.getElementById("submitSuccess");

  if (!form) return;

  form.addEventListener("submit", async (e) => {
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

    try {
      await fetch(
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
      );
    } catch (err) {
      console.error("전송 오류:", err);
      alert("서버 전송 중 오류가 발생했습니다.");
      return;
    }

    // 성공 메시지 표시
    if (successBox) {
      successBox.style.display = "block";
    }

    // 폼 리셋
    form.reset();
  });
});
