document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("#contact-form");

    // Set the action dynamically from the config.js
    form.action = GETFORM_ENDPOINT;

    if (form) {
        form.addEventListener("submit", async function (event) {
            event.preventDefault(); // Prevent default form submission

            const recaptchaResponse = await grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: 'submit' });

            if (!recaptchaResponse) {
                alert("Please complete the reCAPTCHA.");
                return;
            }

            const formData = new FormData(form);
            formData.append("g-recaptcha-response", recaptchaResponse); // Add reCAPTCHA to form data

            try {
                const response = await fetch(form.action, {
                    method: "POST",
                    body: formData,
                });

                if (response.ok) {
                    alert("Message sent successfully!");
                    form.reset();
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