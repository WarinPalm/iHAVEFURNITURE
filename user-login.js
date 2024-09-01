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
        const securityQuestionContainer = document.getElementById("securityQuestionContainer");
        const closeModalButton = document.getElementById("closeModalButton"); // ปุ่มปิด modal
    
        // แสดงคำถามเมื่อ username ถูกต้อง
        usernameInput.addEventListener("blur", function() {
            const username = this.value;
            
            if (username === "warinpalm") {
                securityQuestionContainer.style.display = "block";
            } else {
                securityQuestionContainer.style.display = "none";
                alert("Username ไม่ถูกต้อง กรุณาลองใหม่");
                usernameInput.value = "";
            }
        });
    
        // รีเซ็ตฟอร์มเมื่อปิด modal
        closeModalButton.addEventListener("click", function() {
            // รีเซ็ตค่า input และซ่อน security question container
            usernameInput.value = "";
            securityQuestionContainer.style.display = "none";
        });
    
    });

    var formForgotPass = document.getElementsByClassName("forgot-password-form")[0];
    var formResetPass = document.getElementsByClassName("reset-password-form")[0];
    var submitButton = document.getElementById("submit-button");

    function ChangeForm() {
        formForgotPass.style.display = "none";
        formResetPass.style.display = "block";
    }
    submitButton.addEventListener("click", ChangeForm);


})();