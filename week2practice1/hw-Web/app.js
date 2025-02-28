// Kullanıcı bilgilerini alma ve nesne oluşturma
const userInfo = () => {
  const name = prompt("İsminizi giriniz:");
  const age = prompt("Yaşınızı giriniz:");
  const job = prompt("Mesleğinizi giriniz:");

  const user = {
    name,
    age,
    job,
  };

  document.getElementById("userInfo").innerHTML = `
    <h2>Kullanıcı Bilgileri</h2>
    <p><strong>İsim:</strong> ${user.name}</p>
    <p><strong>Yaş:</strong> ${user.age}</p>
    <p><strong>Meslek:</strong> ${user.job}</p>
`;
  console.log("Kullanıcı bilgileri:", user);

  return user;
};

let cart = [];

const addToCart = (productName, productPrice) => {
  cart.push({
    name: productName,
    price: parseFloat(productPrice),
  });
  console.log(`${productName} sepete eklendi.`);
  listCart();
  totalPriceCal();
};

// Sepeti gösterme fonksiyonu
const listCart = () => {
  const productList = document.getElementById("productList");
  let html = "<ul>";

  cart.forEach((urun, index) => {
    html += `
            <li>
                ${index + 1}. ${urun.name} - ${urun.price} TL
            </li>
        `;
  });

  html += "</ul>";
  productList.innerHTML = html;
};

// Toplam fiyat
const totalPriceCal = () => {
  const total = cart.reduce((acc, item) => acc + item.price, 0);

  document.getElementById(
    "total"
  ).innerHTML = `<strong>Toplam Sepet Tutarı: ${total} TL</strong>`;

  console.log(`\nToplam Sepet Tutarı: ${total} TL`);
  return total;
};

// Dinamik ürün ekleme
const dynamicProductaddition = () => {
  const productName = prompt("Eklemek istediğiniz ürünün adını giriniz:");
  const productPrice = prompt("Ürünün fiyatını giriniz:");
  if (productName && productPrice) {
    addToCart(productName, productPrice);
  }
};

// Ürün çıkarma fonksiyonu
const removeFromCart = () => {
  if (cart.length === 0) {
    alert("Sepetiniz boş!");
    return;
  }

  listCart();
  const removeIndex = prompt(
    "Silmek istediğiniz ürünün numarasını giriniz (1, 2, 3...):"
  );

  if (removeIndex) {
    const index = parseInt(removeIndex) - 1;
    if (index >= 0 && index < cart.length) {
      const removedProduct = cart.splice(index, 1)[0];
      listCart();
      totalPriceCal();
    } else {
      alert("Geçersiz ürün numarası!");
    }
  }
};

window.onload = () => {
  console.log("Hoş geldiniz!");
  const user = userInfo();
  console.log("Kullanıcı bilgileri:", user);

  totalPriceCal();
};