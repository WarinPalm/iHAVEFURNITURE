(function() {
    document.getElementById('forgot-password-btn').addEventListener('click', function() {
        // ซ่อน modal
        let modal = bootstrap.Modal.getInstance(document.getElementById('user-login'));
        modal.hide();

        // Show the forgot password modal after the login modal is completely hidden
        modal._element.addEventListener('hidden.bs.modal', function() {
            let forgotPasswordModal = new bootstrap.Modal(document.getElementById('forgot-password-modal'));
            forgotPasswordModal.show();
        }, { once: true });
    });

    document.addEventListener('DOMContentLoaded', function() {
        const usernameInput = document.getElementById("usernameInput");
        const questionContainer = document.getElementById("question");
        const closeModalButton = document.getElementById("closeModalButton"); // ปุ่มปิด modal
    
        // แสดงคำถามเมื่อ username ถูกต้อง
        usernameInput.addEventListener("blur", function() {
            const username = this.value;
            
            if (username === "warinpalm") {
                questionContainer.style.display = "block";
            } else {
                questionContainer.style.display = "none";
                alert("Username ไม่ถูกต้อง กรุณาลองใหม่");
                usernameInput.value = "";
            }
        });
    
        // รีเซ็ตฟอร์มเมื่อปิด modal
        closeModalButton.addEventListener("click", function() {
            // รีเซ็ตค่า input และซ่อน security question container
            usernameInput.value = "";
            questionContainer.style.display = "none";
        });
    
    });

    var questionSelect = document.getElementById('question-select');
        questionSelect?.addEventListener('change', () => {
        document.getElementById('answer-container').style.display = questionSelect.value ? 'block' : 'none';
    });

    
    document.getElementById("submit-button")?.addEventListener("click", () => {
        document.getElementsByClassName("forgotpass-form")[0].style.display = "none";
        document.getElementsByClassName("resetpass-form")[0].style.display = "block";
    });


})();