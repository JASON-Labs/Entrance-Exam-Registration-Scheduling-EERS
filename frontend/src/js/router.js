async function loadPage(page) {
    const app = document.getElementById("app");

    try {
        const response = await fetch(`src/pages/${page}.html`);
        if (!response.ok) throw new Error("Page not found");
        app.innerHTML = await response.text();
    } catch (error) {
        app.innerHTML = "<h2>404 - Page Not Found</h2>";
    }
}

function handleRoute() {
    const path = window.location.pathname.substring(1) || "register"; // Default to register page
    loadPage(path);
}

// Listen for browser navigation events
window.addEventListener("popstate", handleRoute);

// Override link navigation
document.addEventListener("click", (e) => {
    if (e.target.tagName === "A" && e.target.getAttribute("href").startsWith("/")) {
        e.preventDefault();
        window.history.pushState(null, "", e.target.href);
        handleRoute();
    }
});

// Load the correct page when the site first loads
handleRoute();
