document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("#contact-form");

    if (form) {
        form.addEventListener("submit", async function (event) {
            event.preventDefault(); // Prevent default form submission

            const recaptchaResponse = await grecaptcha.execute('6LfrYdMqAAAAAMsjaJzIEOgJSPHRRKeN2H9s7Uyv', { action: 'submit' });

            if (!recaptchaResponse) {
                alert("Please complete the reCAPTCHA.");
                return;
            }

            const formData = new FormData(form);
            formData.append("g-recaptcha-response", recaptchaResponse); // Add reCAPTCHA to form data

            try {
                const response = await fetch(GETFORM_ENDPOINT, {
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
