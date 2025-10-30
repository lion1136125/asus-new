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

    try {
      await fetch("https://formsubmit.co/ajax/noteservice@outlook.kr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          "성함": name,
          "연락처": phone,
          "지역/주소": area,
          "고장 증상": issueType,
          "상세 설명": issueDetail,
          "_subject": "홈페이지 신규 A/S 접수",
          "_template": "table",
          "_captcha": "false"
        })
      });
    } catch (err) {
      console.error("전송 오류", err);
    }

    if (successBox) {
      successBox.style.display = "block";
    }

    form.reset();
  });
});

// ===== Desktop: disable tel: links so they do nothing on PC =====
(function(){
  function disableTelOnDesktop(){
    if (window.matchMedia && window.matchMedia('(min-width: 960px)').matches){
      document.querySelectorAll('a[href^="tel:"]').forEach(function(a){
        a.addEventListener('click', function(e){ e.preventDefault(); }, { passive:false });
        a.style.cursor = 'default';
      });
    }
  }
  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', disableTelOnDesktop);
  } else {
    disableTelOnDesktop();
  }
  // Re-run on resize in case viewport crosses breakpoint
  window.addEventListener('resize', disableTelOnDesktop);
})();

