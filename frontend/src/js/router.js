async function loadPage(page) {
    const container = document.getElementById("register"); 

    if (!container) {
        console.error("❌ register container not found!");
        return;
    }

    try {
        const response = await fetch(`src/pages/${page}.html`);
        if (!response.ok) throw new Error("Page not found");
        container.innerHTML = await response.text();
    } catch (error) {
        container.innerHTML = "<h2>404 - Page Not Found</h2>";
    }
}

function handleRoute() {
    const path = window.location.pathname.substring(1) || "RegisterForm"; 
    loadPage(path);
}

window.addEventListener("popstate", handleRoute);

document.addEventListener("click", (e) => {
    if (e.target.tagName === "A" && e.target.getAttribute("href").startsWith("/")) {
        e.preventDefault();
        window.history.pushState(null, "", e.target.href);
        handleRoute();
    }
});

handleRoute();
