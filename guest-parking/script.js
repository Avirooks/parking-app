document.addEventListener("DOMContentLoaded", function () {
    const path = window.location.pathname;
    const now = new Date();
  
    // פונקציית עזר לפורמט תאריך עבור input
    const formatDateTimeLocal = (date) => {
      const pad = (n) => (n < 10 ? '0' + n : n);
      return date.getFullYear() + '-' +
        pad(date.getMonth() + 1) + '-' +
        pad(date.getDate()) + 'T' +
        pad(date.getHours()) + ':' +
        pad(date.getMinutes());
    };
  
    // index.html - תצוגת מצב חניה
    if (path.includes("index.html") || path === "/") {
      const updateStatus = (key, cardId, statusId) => {
        const item = localStorage.getItem(key);
        if (item) {
          const data = JSON.parse(item);
          const until = new Date(data.to);
          if (until > now) {
            const formatted = until.toLocaleString('he-IL', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            });
  
            document.getElementById(statusId).textContent =
              `תפוס עד ${formatted} - ע"י ${data.name}, טלפון: ${data.phone}`;
            document.getElementById(cardId).classList.add("occupied");
          } else {
            localStorage.removeItem(key);
          }
        }
      };
  
      updateStatus("guest1", "guest1-card", "guest1-status");
      updateStatus("guest2", "guest2-card", "guest2-status");
    }
  
    // orach1.html - שמירת טופס אורח 1
    if (path.includes("orach1.html")) {
      const form = document.querySelector("form");
      if (form) {
        const nowFormatted = formatDateTimeLocal(new Date());
        document.getElementById("from").value = nowFormatted;
        document.getElementById("to").value = nowFormatted;
  
        form.addEventListener("submit", function (e) {
          e.preventDefault();
  
          const from = new Date(document.getElementById("from").value);
          const to = new Date(document.getElementById("to").value);
          const now = new Date();
  
          if (from < now || to <= from) {
            alert("יש להזין תאריך עתידי חוקי בלבד");
            return;
          }
  
          const reservation = {
            name: document.getElementById("name").value,
            building: document.getElementById("building").value,
            apartment: document.getElementById("apartment").value,
            phone: document.getElementById("phone").value,
            from: document.getElementById("from").value,
            to: document.getElementById("to").value
          };
          localStorage.setItem("guest1", JSON.stringify(reservation));
          window.location.href = "index.html";
        });
      }
    }
  
    // orach2.html - שמירת טופס אורח 2
    if (path.includes("orach2.html")) {
      const form = document.querySelector("form");
      if (form) {
        const nowFormatted = formatDateTimeLocal(new Date());
        document.getElementById("from").value = nowFormatted;
        document.getElementById("to").value = nowFormatted;
  
        form.addEventListener("submit", function (e) {
          e.preventDefault();
  
          const from = new Date(document.getElementById("from").value);
          const to = new Date(document.getElementById("to").value);
          const now = new Date();
  
          if (from < now || to <= from) {
            alert("יש להזין תאריך עתידי חוקי בלבד");
            return;
          }
  
          const reservation = {
            name: document.getElementById("name").value,
            building: document.getElementById("building").value,
            apartment: document.getElementById("apartment").value,
            phone: document.getElementById("phone").value,
            from: document.getElementById("from").value,
            to: document.getElementById("to").value
          };
          localStorage.setItem("guest2", JSON.stringify(reservation));
          window.location.href = "index.html";
        });
      }
    }
  });
  