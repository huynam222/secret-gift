const correctPassword = "0708";
const hints = [
    "Vội thế nghĩ mật khẩu đã chứ😗",
    "Chắc chắn chưa! Định nhập là gì á😂",
    "Gợi ý nè: 4 kí tự nha",
    "Gợi ý tiếp nhé: mật khẩu là số!",
    "Gợi ý tiếp nhé: đầu tiên là số 0!",
    "Gợi ý tiếp nhé: số 7!",
    "Gợi ý tiếp nhé: số 0!",
    "Còn số cuối thôi đó =)))!",
    // Bạn có thể thêm nhiều gợi ý khác ở đây
];
let hintIndex = 0;

function verifyPassword() {
    const passwordInput = document.getElementById('password').value;
    const hintDiv = document.getElementById('hint');
    const bearContainer = document.querySelector('.bear-container');

    if (passwordInput === correctPassword) {
        alert("Thành công! Bạn sẽ nhận món quà này chứ?");
        hintDiv.textContent = "Chúc mừng! Món quà được gửi tới bạn!";
        // Thực hiện các hành động tiếp theo khi xác minh thành công
        // Hiển thị video và đoạn chữ chúc mừng
        bearContainer.innerHTML = `
            <video controls class="congrats-video" autoplay>
                <source src="fan.mp4" type="video/mp4">
                Trình duyệt của bạn không hỗ trợ thẻ video.
            </video>
            `;
        hideElements();
    } else {
        // Nếu nhập sai mật khẩu, hiển thị thông báo "Sai ò😞 Có muốn làm lại không!"
        if (hintIndex < hints.length) {
            hintDiv.textContent = hints[hintIndex];
            hintIndex++;
        } else {
            hintDiv.textContent = "Sai ò=))) Có muốn làm lại không!";
        }

        // Reset input sau 1 giây
        setTimeout(() => {
            hintDiv.textContent = "";
            resetPasswordField();
        }, 1500);
    }
}

function hideElements() {
    const passwordInput = document.getElementById('password');
    const verifyButton = document.querySelector('button');

    passwordInput.style.display = 'none'; // Ẩn input password
    verifyButton.style.display = 'none'; // Ẩn button xác minh
}

function resetPasswordField() {
    const passwordField = document.getElementById('password');
    passwordField.value = ""; // Xóa nội dung trong input
}

document.addEventListener('DOMContentLoaded', () => {
    // Bắt sự kiện khi nhấp vào nút "Xác minh"
    const verifyButton = document.getElementById('verify-button');
    verifyButton.addEventListener('click', verifyPassword);
});
