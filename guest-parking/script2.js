document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    if (!form) return;
  
    form.addEventListener("submit", function (e) {
      e.preventDefault();
  
      const data = {
        name: document.getElementById("name").value,
        phone: document.getElementById("phone").value,
        building: document.getElementById("building").value,
        apartment: document.getElementById("apartment").value,
        from: document.getElementById("from").value,
        to: document.getElementById("to").value,
        parking: window.location.pathname.includes("orach1") ? "guest1" : "guest2"
      };
  
      fetch("https://script.google.com/macros/s/AKfycbxEwKlaNgCIalamEA9gE3scttmrk-IFiLsMr2VyUY5TqGN9vMmKhCpqMo7CRWsNdXtS/exec", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(response => {
        if (response.ok) {
          alert("החניה נשריינה בהצלחה!");
          window.location.href = "index.html";
        } else {
          alert("אירעה שגיאה בשליחה");
        }
      })
      .catch(error => {
        console.error("Error:", error);
        alert("שגיאה בשליחה");
      });
    });
  });
  