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
    const congratsDiv = document.getElementById('congratulations');
    const congratsText = document.getElementById('congratsText');
    const congratsVideo = document.getElementById('congratsVideo');
    const videoSource = document.getElementById('videoSource');
    const backgroundAudio = document.getElementById('backgroundAudio');

    if (passwordInput === correctPassword) {
        alert("Thành công! Bạn sẽ nhận món quà này chứ?");
        hintDiv.textContent = "Chúc mừng! Món quà được gửi tới bạn!";

        // Hiển thị phần chúc mừng và video
        bearContainer.style.display = 'none';
        congratsDiv.style.display = 'block';

        // Cập nhật video và chúc mừng
        videoSource.setAttribute('src', 'fan.mp4');
        congratsVideo.volume = 0; // Thiết lập âm lượng video
        congratsVideo.load(); // Tải lại video mới
        congratsVideo.play(); // Phát video

        hideElements();
    } else {
        // Nếu nhập sai mật khẩu, hiển thị gợi ý
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
    const verifyButton = document.getElementById('verify-button');

    passwordInput.style.display = 'none'; // Ẩn input password
    verifyButton.style.display = 'none'; // Ẩn button xác minh
}

function resetPasswordField() {
    const passwordField = document.getElementById('password');
    passwordField.value = ""; // Xóa nội dung trong input
}

document.addEventListener('DOMContentLoaded', () => {
    const verifyButton = document.getElementById('verify-button');
    const backgroundAudio = document.getElementById('backgroundAudio');

    // Thiết lập âm lượng mặc định
    backgroundAudio.volume = 0.2; // Ví dụ âm lượng là 30%

    // Xử lý khi input mất focus (bàn phím trên điện thoại được đóng lại)
    const passwordInput = document.getElementById('password');
    if (window.innerWidth <= 768) { // Giả sử màn hình có chiều rộng nhỏ hơn hoặc bằng 768px là điện thoại
        passwordInput.addEventListener('blur', () => {
            window.scrollTo(0, 0); // Cuộn lên đầu trang để đóng bàn phím
        });
    }

    verifyButton.addEventListener('click', verifyPassword);

    // Phát nhạc nền khi trang được tải lên và có tương tác của người dùng
    if (backgroundAudio) {
        passwordInput.addEventListener('focus', () => {
            if (backgroundAudio.paused) {
                backgroundAudio.play();
            }
        });
    }
});
