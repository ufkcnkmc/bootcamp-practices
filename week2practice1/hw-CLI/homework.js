const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Kullanıcı bilgilerini alma
rl.question("Adınız nedir? ", (name) => {
  rl.question("Yaşınız kaç? ", (age) => {
    rl.question("Mesleğiniz nedir? ", (job) => {
      const user = { name, age: parseInt(age), job };
      console.log("Kullanıcı Bilgileri:", user);

      startShopping();
    });
  });
});

let cart = [];

// Ürün ekleme fonksiyonu
function addToCart() {
  rl.question(
    "Sepete eklemek istediğiniz ürünün adını yazın: ",
    (productName) => {
      rl.question(
        `${productName} ürününün fiyatını girin: `,
        (productPrice) => {
          cart.push({ name: productName, price: parseFloat(productPrice) });
          console.log(
            `${productName} sepete eklendi. Fiyatı: ${productPrice} TL`
          );
          startShopping();
        }
      );
    }
  );
}

// Sepeti listeleme fonksiyonu
function listCart() {
  console.log("Sepetiniz:");
  cart.forEach((item, index) => {
    console.log(`${index + 1}. Ürün: ${item.name}, Fiyat: ${item.price} TL`);
  });

  let totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
  console.log(`Toplam Fiyat: ${totalPrice} TL`);
  startShopping();
}

// Sepetten ürün çıkarma
function removeFromCart() {
  if (cart.length === 0) {
    console.log("Sepetiniz boş, çıkarılacak ürün yok!");
    startShopping();
    return;
  }

  console.log("Sepetiniz:");
  cart.forEach((item, index) => {
    console.log(`${index + 1}. Ürün: ${item.name}, Fiyat: ${item.price} TL`);
  });

  rl.question(
    "Çıkarmak istediğiniz ürünün numarasını girin: ",
    (removeIndex) => {
      removeIndex = parseInt(removeIndex) - 1;

      if (isNaN(removeIndex) || removeIndex < 0 || removeIndex >= cart.length) {
        console.log("Geçersiz ürün numarası, lütfen tekrar deneyin.");
      } else {
        let removedProduct = cart.splice(removeIndex, 1);
        console.log(`${removedProduct[0].name} sepetten çıkarıldı.`);
      }

      startShopping();
    }
  );
}

// Kullanıcıdan işlem alma fonksiyonu
function startShopping() {
  rl.question(
    "Ne yapmak istersiniz? (1-Ekle/2-Çıkar/3-Listele/4-Çık): ",
    (action) => {
      if (action === "1") {
        addToCart();
      } else if (action === "2") {
        removeFromCart();
      } else if (action === "3") {
        listCart();
      } else if (action === "4") {
        console.log("Çıkış yapılıyor...");
        rl.close();
      } else {
        console.log(
          "Geçersiz komut. (1,2,3,4) komutlarından birisini kullanabilirsiniz."
        );
        startShopping();
      }
    }
  );
}
