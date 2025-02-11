document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("#contact-form");

    if (form) {
        form.addEventListener("submit", async function (event) {
            event.preventDefault(); // Prevent default form submission

            const formData = new FormData(form);
            const recaptchaResponse = grecaptcha.getResponse(); // Get reCAPTCHA token

            if (!recaptchaResponse) {
                alert("Please complete the reCAPTCHA.");
                return;
            }

            formData.append("g-recaptcha-response", recaptchaResponse); // Add reCAPTCHA to form data

            try {
                const response = await fetch(GETFORM_ENDPOINT, {
                    method: "POST",
                    body: formData,
                });

                if (response.ok) {
                    alert("Message sent successfully!");
                    form.reset();
                    grecaptcha.reset(); // Reset reCAPTCHA after successful submission
                } else {
                    alert("Something went wrong. Please try again.");
                }
            } catch (error) {
                console.error("Error submitting the form:", error);
                alert("Network error. Please check your connection.");
            }
        });
    }
});
