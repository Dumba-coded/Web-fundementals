document.addEventListener("DOMContentLoaded", function () {

    fetch("nav.html")
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to load nav.html");
            }
            return response.text();
        })
        .then(data => {
            document.getElementById("header").innerHTML = data;
        })
        .catch(error => console.error("Error loading header:", error));

    fetch("footer.html")
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to load footer.html");
            }
            return response.text();
        })
        .then(data => {
            document.getElementById("footer").innerHTML = data;
        })
        .catch(error => console.error("Error loading footer:", error));

});
