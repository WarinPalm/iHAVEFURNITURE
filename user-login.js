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

    document.getElementById('securityQuestionSelect').addEventListener('change', function() {
        var answerContainer = document.getElementById('answer-container');
        var selectedValue = this.value;
        
        switch (selectedValue) {
            case 'fav-dog':
                answerContainer.innerHTML = `
                    <label for="favdog" class="form-label">Your Answer for Favorite Dog</label>
                    <input type="text" class="form-control" id="favdog" placeholder="Enter your answer" required>
                `;
                break;
            case 'fav-song':
                answerContainer.innerHTML = `
                    <label for="favsong" class="form-label">Your Answer for Favorite Song</label>
                    <input type="text" class="form-control" id="favsong" placeholder="Enter your answer" required>
                `;
                break;
            case 'fav-person':
                answerContainer.innerHTML = `
                    <label for="favperson" class="form-label">Your Answer for Favorite Person</label>
                    <input type="text" class="form-control" id="favperson" placeholder="Enter your answer" required>
                `;
                break;
            case 'hobby':
                answerContainer.innerHTML = `
                    <label for="hobby" class="form-label">Your Answer for Hobby</label>
                    <input type="text" class="form-control" id="hobby" placeholder="Enter your answer" required>
                `;
                break;
            default:
                answerContainer.innerHTML = ''; 
        }
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