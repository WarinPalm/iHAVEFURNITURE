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

    var formForgotPass = document.getElementsByClassName("forgot-password-form")[0];
    var formResetPass = document.getElementsByClassName("reset-password-form")[0];
    var submitButton = document.getElementById("submit-button");

    function ChangeForm(event) {
        event.preventDefault(); // ป้องกันการส่งฟอร์มแบบปกติ
        formForgotPass.style.display = "none";
        formResetPass.style.display = "block";
    }

    submitButton.addEventListener("click", ChangeForm);


})();