document.addEventListener('DOMContentLoaded', function () {
    // size buttons for price changing
    let sizeButtons = document.querySelectorAll(".size-btn");
    sizeButtons.forEach(function (button) {
        button.addEventListener("click", function () {

            let targetId = this.dataset.priceTarget;
            let newPrice = this.dataset.priceValue;

            let priceElement = document.getElementById(targetId);
            priceElement.textContent = "BD " + newPrice;

            // removes the active from other button

            let group = this.parentElement.querySelectorAll(".size-btn");
            group.forEach(function (btn) {
                btn.classList.remove("active");
            });

            this.classList.add("active");
        });
    });


    // quiz
    let quizButton = document.getElementById("quiz-submit");
    let resetButton = document.getElementById("quiz-reset");
    quizButton.addEventListener("click", function () {
        let answers = {
            q1: "d",
            q2: "b",
            q3: "b",
            q4: "c"
        };

        let score = 0;

        let feedbackIds = {
            q1: "q1-feedback",
            q2: "q2-feedback",
            q3: "q3-feedback",
            q4: "q4-feedback"
        };

        let blockIds = {
            q1: "q1-block",
            q2: "q2-block",
            q3: "q3-block",
            q4: "q4-block"
        };

        for (let question in answers) {
            let selected = document.querySelector('input[name="' + question +'"]:checked');
            let feedback = document.getElementById(feedbackIds[question]);
            let block = document.getElementById(blockIds[question]);

            feedback.classList.remove("correct", "incorrect");
            block.style.borderLeftColor = "#ffd23f";

            if (!selected) {
                feedback.textContent = "Please choose an answer.";
                feedback.classList.add("incorrect");
            } else if (selected.value === answers[question]) {
                feedback.textContent = "Correct!";
                feedback.classList.add("correct");
                block.style.borderLeftColor = "#2ECC71";
                score++;
            } else {
                feedback.textContent = "Wrong answer.";
                feedback.classList.add("incorrect");
                block.style.borderLeftColor = "#E74C3C"
            }
        }

        document.getElementById("quiz-score").textContent = 
        "You got " + score + " out of 4 correct!";

        resetButton.disabled = false;
    });

    resetButton.addEventListener("click", function () {
        let inputs = document.querySelectorAll('input[type="radio"]');

        inputs.forEach(function (input) {
            input.checked = false;
        });

        let questions = ["q1", "q2", "q3", "q4"];

        questions.forEach(function (q) {
            let feedback = document.getElementById(q + "-feedback");
            let block = document.getElementById(q + "-block");

            feedback.textContent = "";
            feedback.classList.remove("correct", "incorrect");
            block.style.borderLeftColor = "#ffd23f";
        });

        document.getElementById("quiz-score").textContent = "";
        resetButton.disabled = true;
    });


    // Form

    let form = document.getElementById("booking-form");

    let nameInput = document.getElementById("full-name");
    let phoneInput = document.getElementById("phone");

    // Name only letters

    nameInput.addEventListener("input", function () {
        this.value = this.value.replace(/[^A-Za-z\s]/g, "");
    });

    // Numbers only and max numbers 8

    phoneInput.addEventListener("input", function () {
        this.value = this.value.replace(/[^0-9]/g, "");
        this.value = this.value.slice(0, 8);
    });
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        let valid = true;

        let name = document.getElementById("full-name").value.trim();
        let email = document.getElementById("email").value.trim();
        let date = document.getElementById("date").value;
        let guests = document.getElementById("guests").value;


        let nameError = document.getElementById("name-error");
        let emailError = document.getElementById("email-error");
        let dateError = document.getElementById("date-error");
        let guestsError = document.getElementById("guests-error");
        let success = document.getElementById("form-success");

        // reset messages

        nameError.textContent = "";
        emailError.textContent = "";
        dateError.textContent = "";
        guestsError.textContent = "";
        success.textContent = "";

        // validation

        if (name === "") {
            nameError.textContent = "Name is required";
            valid = false;
        }

        if (email === "") {
            emailError.textContent = "Email is required";
            valid = false;
        } else if (!email.includes("@") || !email.includes(".")) {
            emailError.textContent = "Enter a valid email";
            valid = false;
        }

        if (date === "") {
            dateError.textContent = "Select a date";
            valid = false;
        }

        if (guests === "") {
            guestsError.textContent = "Select a number of guests";
            valid = false;
        }

        // success

        if (valid) {
            success.textContent = "Table reserved successfully!";
            form.reset();
        }
    });
});
