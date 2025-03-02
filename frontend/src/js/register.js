document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registerForm");
    const message = document.getElementById("registerMessage");
    const submitBtn = document.getElementById("registerBtn") || { disabled: false, innerText: "" };

    if (!form) {
        console.error("❌ registerForm not found in the DOM!");
        return;
    }

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        // ✅ Form Validation - Ensure all fields are filled
        const phone = document.getElementById("phone").value.trim();
        const ssc_roll = document.getElementById("ssc_roll").value.trim();
        const ssc_board = document.getElementById("ssc_board").value.trim();
        const ssc_passing_year = document.getElementById("ssc_passing_year").value.trim();
        const hsc_roll = document.getElementById("hsc_roll").value.trim();
        const hsc_board = document.getElementById("hsc_board").value.trim();
        const hsc_passing_year = document.getElementById("hsc_passing_year").value.trim();

        if (!phone || !ssc_roll || !ssc_board || !ssc_passing_year || !hsc_roll || !hsc_board || !hsc_passing_year) {
            if (message) {
                message.innerText = "❌ All fields are required!";
                message.style.color = "red";
            }
            return;
        }

        const data = { phone, ssc_roll, ssc_board, ssc_passing_year, hsc_roll, hsc_board, hsc_passing_year };

        console.log("📤 Sending Data:", data);

        // ✅ Disable button to prevent multiple submissions
        submitBtn.disabled = true;
        submitBtn.innerText = "Registering...";

        try {
            const response = await fetch("http://localhost:5000/api/users/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            console.log("✅ Server Response:", result);

            if (message) {
                message.innerText = result.message || result.error;
                message.style.color = response.ok ? "green" : "red";
            }

            if (response.ok) {
                alert(result.message);

                // ✅ Save data in session storage (optional)
                sessionStorage.setItem("registeredPhone", phone);

                // ✅ Redirect to verification page
                window.history.pushState(null, "", "/verification");
                handleRoute(); // Load verification page dynamically

                // ✅ Clear form after submission
                form.reset();
            } else {
                alert(result.error);
            }
        } catch (error) {
            console.error("❌ Fetch error:", error);
            if (message) {
                message.innerText = "❌ Failed to connect to server.";
                message.style.color = "red";
            }
        }

        // ✅ Re-enable button after request completes
        submitBtn.disabled = false;
        submitBtn.innerText = "Register";
    });
});
