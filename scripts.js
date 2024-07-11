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
];

let hintIndex = 0;

function verifyPassword() {
    const passwordInput = document.getElementById('password').value;
    const hintDiv = document.getElementById('hint');

    if (passwordInput === correctPassword) {
        alert("Thành công! Bạn sẽ nhận món quà này chứ?");
        hintDiv.textContent = "Chúc mừng! Món quà được gửi tới bạn!";
        hideElements();
    } else {
        if (hintIndex < hints.length) {
            hintDiv.textContent = hints[hintIndex];
            hintIndex++;
        } else {
            hintDiv.textContent = "Sai ò=))) Có muốn làm lại không!";
        }

        setTimeout(() => {
            hintDiv.textContent = "";
            document.getElementById('password').value = "";
        }, 1500);
    }
}

function hideElements() {
    const passwordInput = document.getElementById('password');
    const verifyButton = document.getElementById('verify-button');

    passwordInput.style.display = 'none';
    verifyButton.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
    const verifyButton = document.getElementById('verify-button');
    // Xử lý khi input mất focus (bàn phím trên điện thoại được đóng lại)
    if (window.innerWidth <= 768) { // Giả sử màn hình có chiều rộng nhỏ hơn hoặc bằng 768px là điện thoại
        passwordInput.blur(); // Đóng bàn phím khi input mất focus
    }

    verifyButton.addEventListener('click', verifyPassword);
});
