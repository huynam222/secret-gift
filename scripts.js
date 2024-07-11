const correctPassword = "0708";
const hints = [
    "Vội thế nghĩ mật khẩu đã chứ😗",
    "Nhanh thế! Định nhập là gì á😂",
    "Chắc chắn chưa! Gợi ý nè: 4 kí tự nha",
    // Bạn có thể thêm nhiều gợi ý khác ở đây
];
let hintIndex = 0;
let moveCount = 0;
const maxMoves = 3;
let isMoving = false; // Cờ để kiểm tra xem input có đang di chuyển hay không
let originalPosition = { x: 0, y: 0 }; // Vị trí ban đầu của input

function getRandomPosition(element) {
    const x = Math.floor(Math.random() * (document.documentElement.clientWidth - element.clientWidth));
    const y = Math.floor(Math.random() * (document.documentElement.clientHeight - element.clientHeight));
    return { x, y };
}

function enableInput(enable) {
    const passwordField = document.getElementById('password');
    passwordField.disabled = !enable;
}

function moveInputRandomly() {
    if (isMoving || moveCount >= maxMoves) return; // Nếu đang di chuyển hoặc đã di chuyển đủ 3 lần thì không làm gì

    const passwordField = document.getElementById('password');
    moveCount++;
    isMoving = true;
    enableInput(false); // Vô hiệu hóa input trong quá trình di chuyển

    // Di chuyển ô input
    const newPos = getRandomPosition(passwordField);
    passwordField.style.transform = `translate(${newPos.x}px, ${newPos.y}px)`;

    // Cập nhật gợi ý ngẫu nhiên
    updateHint();

    // Sau 1 giây, kích hoạt lại input và cho phép nhập
    setTimeout(() => {
        isMoving = false;
        passwordField.style.transform = `translate(${originalPosition.x}px, ${originalPosition.y}px)`; // Đặt lại vị trí ban đầu
        enableInput(true); // Kích hoạt lại input
    }, 1000);
}

function updateHint() {
    const hintDiv = document.getElementById('hint');
    if (hintIndex < hints.length) {
        hintDiv.textContent = hints[hintIndex];
        hintIndex++;
    } else {
        hintDiv.textContent = "Hết gợi ý!";
    }
}

function verifyPassword() {
    const passwordInput = document.getElementById('password').value;
    const hintDiv = document.getElementById('hint');
    const bearContainer = document.querySelector('.bear-container');

    if (!isMoving) {
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
            // Hiển thị thông báo lỗi
            hintDiv.textContent = "Sai ò😞 Có muốn làm lại không!";
            // Reset input sau 3 giây
            setTimeout(() => {
                hintDiv.textContent = "";
                resetPasswordField();
            }, 3000);
        }
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
    passwordField.style.transform = `translate(${originalPosition.x}px, ${originalPosition.y}px)`; // Đặt lại vị trí ban đầu
    moveCount = 0; // Đặt lại moveCount để có thể di chuyển lại sau này

    // Đặt lại gợi ý
    hintIndex = 0;
    updateHint();
}

document.addEventListener('DOMContentLoaded', () => {
    // Bắt sự kiện khi input được nhấp vào để di chuyển
    passwordField.addEventListener('click', () => {
        if (!isMoving && moveCount < maxMoves) {
            moveInputRandomly(); // Di chuyển input khi nhấp vào, chỉ khi không di chuyển và chưa đạt maxMoves
        }
    });

    // Bắt sự kiện khi nhấp vào nút "Xác minh"
    const verifyButton = document.getElementById('verify-button');
    verifyButton.addEventListener('click', verifyPassword);
});
