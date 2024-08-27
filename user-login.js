(function() {
    document.getElementById('forgot-password-btn').addEventListener('click', function() {
        // Hide the login modal
        var loginModal = bootstrap.Modal.getInstance(document.getElementById('user-login'));
        loginModal.hide();

        // Show the forgot password modal after the login modal is completely hidden
        loginModal._element.addEventListener('hidden.bs.modal', function() {
            var forgotPasswordModal = new bootstrap.Modal(document.getElementById('forgot-password-modal'));
            forgotPasswordModal.show();
        }, { once: true });
    });

    document.getElementById('question-select').addEventListener('change', function() {

        var answerContainer = document.getElementById('answer-container');
        var selectedValue = this.value;

        // ลบฟอร์มเก่าออก
        answerContainer.innerHTML = '';

        // สร้างฟอร์มใหม่ตามตัวเลือกที่เลือก
        if (selectedValue) {
            var formHtml = `
                <form>
                    <div class="mb-3">
                        <input style= "margin-top:20px" type="text" placeholder="กรอกคำตอบของคุณที่นี่" class="form-control" required>
                    </div>
                </form>
            `;
            answerContainer.innerHTML = formHtml;
        }
    });


})();