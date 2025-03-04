async function waitForElement(selector, timeout = 5000) {
    return new Promise((resolve, reject) => {
        const startTime = Date.now();
        const checkInterval = setInterval(() => {
            const element = document.querySelector(selector);
            if (element) {
                clearInterval(checkInterval);
                resolve(element);
            } else if (Date.now() - startTime > timeout) {
                clearInterval(checkInterval);
                reject(new Error(`Timeout: Element ${selector} not found`));
            }
        }, 100);
    });
}

async function initRegisterForm() {
    try {
        const form = await waitForElement("#registerForm");
        const message = document.getElementById("registerMessage");
        const submitBtn = document.getElementById("registerBtn");

        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            const data = {
                phone: document.getElementById("phone").value.trim(),
                ssc_roll: document.getElementById("ssc_roll").value.trim(),
                ssc_board: document.getElementById("ssc_board").value.trim(),
                ssc_passing_year: document.getElementById("ssc_passing_year").value.trim(),
                hsc_roll: document.getElementById("hsc_roll").value.trim(),
                hsc_board: document.getElementById("hsc_board").value.trim(),
                hsc_passing_year: document.getElementById("hsc_passing_year").value.trim(),
            };

            if (Object.values(data).some(value => !value)) {
                message.innerText = "❌ All fields are required!";
                message.style.color = "red";
                return;
            }

            submitBtn.disabled = true;
            submitBtn.innerText = "User Registered Successfully";

            try {
                const response = await fetch("http://localhost:5000/api/users/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                });

                const result = await response.json();
                message.innerText = result.message || result.error;
                message.style.color = response.ok ? "green" : "red";

                if (response.ok) {
                    sessionStorage.setItem("registeredPhone", data.phone);
                    window.history.pushState(null, "", "/verification");
                    handleRoute();
                    form.reset();
                }
            } catch (error) {
                console.error("❌ Fetch error:", error);
                message.innerText = "❌ Failed to connect to server.";
                message.style.color = "red";
            }

            submitBtn.disabled = false;
            submitBtn.innerText = "Register";
        });
    } catch (error) {
        console.error(error.message);
    }
}

initRegisterForm();
