$(document).ready(function () {
  const API_URL = "https://jsonplaceholder.typicode.com/users";

  const styles = `
    .ins-api-users {
      max-width: 800px;
      margin: 80px auto;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 8px;
      box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
    }
    .ins-api-users li {
      background: #f9f9f9;
      margin: 5px 0;
      padding: 8px;
      border-radius: 5px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .delete-btn {
      background: #ff4d4d;
      color: white;
      border: none;
      padding: 5px 10px;
      border-radius: 5px;
      cursor: pointer;
    }
    .delete-btn:hover {
      background: #cc0000;
    }
  `;
  $("head").append(`<style>${styles}</style>`);

  function fetchUsers() {
    const cachedData = JSON.parse(localStorage.getItem("users") || "[]"); //Burada boş olup olmamasını da kontrol ediyoruz çünkü null dönebilir.
    const cachedTime = parseInt(localStorage.getItem("users_time")); //localStorage'da string olarak saklandığı için integer'a çeviriyoruz.
    if (cachedData.length > 0 && cachedTime) {
      const now = new Date().getTime();
      const oneDay = 24 * 60 * 60 * 1000; // 1 gün(ms cinsinden)
      if (now - cachedTime < oneDay) {
        console.log("Veriler localStorage'dan alındı.");
        renderUsers(cachedData);
        return;
      } else {
        console.log("LocalStorage süresi doldu. Veriler yeniden alınıyor.");
        localStorage.removeItem("users");
        localStorage.removeItem("users_time");
      }
    }
    fetch(API_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error: API'den veri alınırken hata oluştu.");
        }
        return response.json();
      })
      .then((data) => {
        console.log("API'den gelen veri: ", data);
        localStorage.setItem("users", JSON.stringify(data));
        localStorage.setItem("users_time", new Date().getTime());
        renderUsers(data);
      })
      .catch((error) => {
        console.log("Hata: ", error);
        $(".ins-api-users").html(`<p style='color:red;'>${error.message}</p>`);
      });
  }

  function renderUsers(users) {
    let userList = "<ul>";
    users.forEach((user, index) => {
      userList += `
      <li>
      <strong>${index + 1}. Kullanıcı : ${user.name} </strong> - ${
        user.email
      } - ${user.address.city}
      <button class="delete-btn" data-index="${index}">Sil</button>
      </li>
      `;
    });
    userList += "</ul>";
    $(".ins-api-users").html(userList);
    $(".delete-btn").on("click", function () {
      const userIndex = $(this).data("index");
      deleteUser(userIndex);
    });
  }
  function deleteUser(index) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.splice(index, 1);
    localStorage.setItem("users", JSON.stringify(users));
    renderUsers(users);
  }
  fetchUsers();
});
