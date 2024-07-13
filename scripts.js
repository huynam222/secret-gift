const correctPassword = "1";
const hints = [
    "Vội thế nghĩ mật khẩu đã chứ😗",
    "Gợi ý nè: nhiều người nghe đã mê rồi!",
    "Bắt đầu bằng chữ L =))",
    "Thế có thích Lương không?😏😏",
    "Không, trả lời câu hỏi cơ! Có thích Lương không?",
    "Hihi! Mật khẩu là thích 🙂🙂",
];

let hintIndex = 0;

function verifyPassword() {
    const passwordInput = document.getElementById('password');
    const verifyButton = document.getElementById('verify-button');
    const hintDiv = document.getElementById('hint');
    const bearContainer = document.querySelector('.bear-container');
    const questionContainer = document.getElementById('question-container');

    if (passwordInput.value === correctPassword) {
        // Hiển thị phần chúc mừng
        bearContainer.style.display = 'none';
        questionContainer.style.display = 'block'; // Hiển thị câu hỏi

        // Ẩn ô nhập và nút xác minh
        passwordInput.style.display = 'none'; // Ẩn input
        verifyButton.style.display = 'none'; // Ẩn nút xác minh
    } else {
        // Nếu nhập sai mật khẩu, hiển thị gợi ý
        if (hintIndex < hints.length) {
            hintDiv.textContent = hints[hintIndex];
            hintIndex++;
        } else {
            hintDiv.textContent = "Sai ò=))) Có muốn làm lại không!";
        }

        // Vô hiệu hóa ô nhập và nút xác minh trong 3 giây
        disableInputs(true);
        setTimeout(() => {
            hintDiv.textContent = "";
            resetPasswordField();
            disableInputs(false); // Bật lại ô nhập và nút xác minh
        }, 3000);
    }
}

// Xử lý sự kiện cho nút "Có"
document.getElementById('yes-button').addEventListener('click', function () {
    showVideo(); // Gọi hàm để hiển thị video
});

// Lấy phần tử nút "Không"
const noBtn = document.getElementById('no-button');
const container = document.querySelector('.container'); // Thay thế '.container' bằng lớp của container của bạn

// Hiệu ứng di chuyển cho nút "Không"
noBtn.addEventListener("mouseover", () => {
    const containerRect = container.getBoundingClientRect();
    const noBtnRect = noBtn.getBoundingClientRect();

    const maxX = containerRect.width - noBtnRect.width;
    const maxY = containerRect.height - noBtnRect.height;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    noBtn.style.position = 'absolute'; // Đặt vị trí tuyệt đối
    noBtn.style.left = randomX + "px";
    noBtn.style.top = randomY + "px";
});

function showVideo() {
    const congratsDiv = document.getElementById('congratulations');
    const congratsVideo = document.getElementById('congratsVideo');
    const videoSource = document.getElementById('videoSource');
    const bearContainer = document.querySelector('.bear-container');
    const questionContainer = document.getElementById('question-container');

    // Ẩn tất cả các phần tử khác
    bearContainer.style.display = 'none'; // Ẩn hình gấu
    questionContainer.style.display = 'none'; // Ẩn câu hỏi
    congratsDiv.style.display = 'block'; // Hiển thị video

    // Cập nhật video và chúc mừng
    videoSource.setAttribute('src', 'fan.mp4');
    congratsVideo.volume = 0.1; // Thiết lập âm lượng video
    congratsVideo.load(); // Tải lại video mới
    congratsVideo.play(); // Phát video

    disableInputs(true); // Vô hiệu hóa ô nhập và nút xác minh
}

function disableInputs(disable) {
    const passwordInput = document.getElementById('password');
    const verifyButton = document.getElementById('verify-button');

    passwordInput.disabled = disable; // Vô hiệu hóa ô nhập
    verifyButton.disabled = disable; // Vô hiệu hóa nút xác minh
}

function resetPasswordField() {
    const passwordField = document.getElementById('password');
    passwordField.value = ""; // Xóa nội dung trong input
    passwordField.removeAttribute('readonly'); // Bỏ thuộc tính readonly để có thể nhập lại
}

document.addEventListener('DOMContentLoaded', () => {
    const verifyButton = document.getElementById('verify-button');
    const backgroundAudio = document.getElementById('backgroundAudio');

    // Thiết lập âm lượng mặc định
    backgroundAudio.volume = 0.2; // Ví dụ âm lượng là 20%

    // Xử lý khi input mất focus (bàn phím trên điện thoại được đóng lại)
    const passwordInput = document.getElementById('password');
    if (window.innerWidth <= 768) { // Giả sử màn hình có chiều rộng nhỏ hơn hoặc bằng 768px là điện thoại
        passwordInput.addEventListener('blur', () => {
            window.scrollTo(0, 0); // Cuộn lên đầu trang để đóng bàn phím
        });
    }

    verifyButton.addEventListener('click', verifyPassword);

    // Phát nhạc nền khi trang được tải lên và có tương tác của người dùng
    passwordInput.addEventListener('focus', () => {
        if (backgroundAudio.paused) {
            backgroundAudio.play();
        }
    });
});
