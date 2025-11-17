document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("serviceForm");
  const successBox = document.getElementById("submitSuccess");

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("custName").value.trim();
    const phone = document.getElementById("custPhone").value.trim();
    const area = document.getElementById("custArea").value.trim();
    const issueType = document.getElementById("issueType").value;
    const issueDetail = document.getElementById("issueDetail").value.trim();

    if (!name || !phone) {
      alert("성함과 연락처는 필수입니다.");
      return;
    }

    // Google Apps Script Webhook URL
    const GAS_URL = "https://script.google.com/macros/s/AKfycbx94GHuO48pxyyqIuTIhrcznVdBJAXnlqh0UzfY1hUGVcq9kaHFwl5DLDuUqpB3rk32/exec";

    // Telegram 알림 (원하면 끄기 가능)
    const TELEGRAM_TOKEN = "8349082958:AAEYnQuo8NKw1Ewa0YEo90oGd3aAkeFrnqM";  
    const TELEGRAM_CHAT_ID = "8232731852";  

    const message =
`📌 ASUS 서비스센터 신규 접수
-----------------------------
👤 성함: ${name}
📞 연락처: ${phone}
📍 지역: ${area}
💡 증상: ${issueType}
📝 상세: ${issueDetail}
`;

    try {
      // 1) Google Apps Script로 전송 (→ Gmail로 들어옴)
      await fetch(GAS_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          phone,
          area,
          issueType,
          issueDetail
        })
      });

      // 2) Telegram 알림 전송
      fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message
        })
      });

    } catch (err) {
      console.error("전송 오류:", err);
    }

    if (successBox) {
      successBox.style.display = "block";
    }

    form.reset();
  });
});


// ===== 데스크탑에서 tel: 비활성화 =====
(function () {
  function disableTelOnDesktop() {
    if (window.matchMedia && window.matchMedia("(min-width: 960px)").matches) {
      document.querySelectorAll('a[href^="tel:"]').forEach(function (a) {
        a.addEventListener("click", function (e) {
          e.preventDefault();
        }, { passive: false });
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
