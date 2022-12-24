document.addEventListener("DOMContentLoaded", function() {
    const links = document.querySelectorAll("nav a");
    links.forEach(link => {
      link.addEventListener("click", function(event) {
        event.preventDefault();
        const href = this.getAttribute("href");
        const content = document.querySelector(".container");
        fetch(href).then(response => {
          return response.text();
        }).then(data => {
          content.innerHTML = data;
        }).catch(error => {
          content.innerHTML = `<p>An error occurred: ${error}</p>`;
        });
      });
    });
  });