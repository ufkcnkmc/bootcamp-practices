function addStyles() {
  const styleElement = document.createElement("style");
  styleElement.textContent = `
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 20px;
      background-color: #f5f5f5;
    }
    
    h1 {
      text-align: center;
      color: #333;
    }
    
    .user-card {
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
      padding: 20px;
      width: 300px;
    }
    
    .user-card h3 {
      margin-top: 0;
      color: #2c3e50;
    }
    
    .delete-btn {
      background-color: #e74c3c;
      color: white;
      border: none;
      padding: 8px 12px;
      border-radius: 4px;
      cursor: pointer;
      margin-top: 10px;
    }
    
    .delete-btn:hover {
      background-color: #c0392b;
    }
    
    #refresh-button {
      background-color: #3498db;
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
      margin: 20px auto;
      display: block;
    }
    
    #refresh-button:hover {
      background-color: #2980b9;
    }
  `;
  document.head.appendChild(styleElement);
}

// Selector değişkeni
const appendLocation = document.getElementById("ufuk");

let expirationTime = Date.now() + 60 * 60 * 1000; 

async function fetchUsers() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await response.json();
    displayUsers(users);
    localStorage.setItem("users", JSON.stringify(users));
  } catch (error) {
    console.error("Kullanıcı verileri çekilirken hata oluştu:", error);
  }
}

function displayUsers(users) {
  appendLocation.innerHTML = "";

  if (users.length === 0) {
    showRefreshButton();
    return;
  }

  users.forEach((user) => {
    const userCard = document.createElement("div");
    userCard.classList.add("user-card");
    userCard.dataset.userId = user.id;

    userCard.innerHTML = `
      <h3>${user.name}</h3>
      <p>E-posta: ${user.email}</p>
      <p>Kullanıcı Adı: ${user.username}</p>
      <p>Telefon: ${user.phone}</p>
      <button class="delete-btn" data-id="${user.id}">Kullanıcıyı Sil</button>
    `;

    appendLocation.appendChild(userCard);
  });

  document.querySelectorAll(".delete-btn").forEach((button) => {
    button.addEventListener("click", function () {
      const userId = this.dataset.id;
      deleteUser(userId);
    });
  });
}

function deleteUser(userId) {
  let users = JSON.parse(localStorage.getItem("users") || "[]");

  users = users.filter((user) => user.id.toString() !== userId.toString());
  localStorage.setItem("users", JSON.stringify(users));
  displayUsers(users);
}

function showRefreshButton() {
  if (sessionStorage.getItem("refreshButtonClicked")) {
    appendLocation.innerHTML =
      "<p>Oturum süresi doldu. Lütfen sayfayı yenileyin.</p>";
    return;
  }

  const refreshButton = document.createElement("button");
  refreshButton.textContent = "Kullanıcıları Yeniden Yükle";
  refreshButton.id = "refresh-button";
  refreshButton.addEventListener("click", function () {
    sessionStorage.setItem("refreshButtonClicked", "true");
    fetchUsers();
  });

  appendLocation.innerHTML = "";
  appendLocation.appendChild(refreshButton);
}

window.addEventListener("DOMContentLoaded", function () {
  addStyles();
  const usersData = localStorage.getItem("users");

  if (usersData && Date.now() < expirationTime) {
    displayUsers(JSON.parse(usersData));
  } else {
    fetchUsers();
  }
});

const observer = new MutationObserver(function (mutations) {
  mutations.forEach(function (mutation) {
    if (mutation.type === "childList") {
      const usersData = JSON.parse(localStorage.getItem("users") || "[]");
      const refreshButton = document.getElementById("refresh-button");

      if (usersData.length === 0 && !refreshButton) {
        showRefreshButton();
      }
    }
  });
});

observer.observe(appendLocation, { childList: true, subtree: true });
