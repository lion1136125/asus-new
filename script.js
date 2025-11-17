document.getElementById('serviceForm').addEventListener('submit', function () {
    const name = document.getElementById('custName').value;
    const phone = document.getElementById('custPhone').value;
    const area = document.getElementById('custArea').value;
    const issue = document.getElementById('issueType').value;
    const detail = document.getElementById('issueDetail').value;

    const TOKEN = "8349082958:AAEYnQuo8NKw1Ewa0YEo90oGd3aAkeFrnqM"; 
    const CHAT_ID = "8349082958";

const text =
`📌 ASUS 서비스센터 신규 접수

👤 성함: ${name}
📱 연락처: ${phone}
📍 지역: ${area}
💡 증상: ${issue}
📝 상세: ${detail}`;
