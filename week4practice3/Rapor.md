# Debug Raporu: Alışveriş Sepeti Uygulaması

## 1. Giriş

Bu rapor, verilen HTML ve JavaScript dosyalarında yer alan Alışveriş Sepeti uygulamasının debuglanması amacıyla hazırlanmıştır. Kod akışı incelenmiş, çeşitli mantıksal ve yapısal hatalar tespit edilmiş ve çözüm önerileri geliştirilmiştir.

## 2. Tespit Edilen Hatalar ve Sorunlar

### 2.1. Stok Kontrolü

- **Sorun:** `addItem` metodunda stok kontrolü `if (product.stock <= quantity)` şeklinde yapılmış. Bu durumda, tam stok miktarındaki ürün eklenmeye çalışıldığında hata alınır.
- **Etkisi:** Kullanıcı, stokta bulunan tam miktarda ürünü ekleyemeyebilir.
- **Çözüm:** Kontrol, `if (product.stock < quantity)` şeklinde düzeltilmelidir.

### 2.2. Stok Güncelleme Eksikliği

- **Sorun:** Ürün sepete eklenirken, `product.stock` değeri azaltılmıyor.
- **Etkisi:** Stok yönetimi hatalı çalışır; sepete eklenen ürün miktarı yansıtılmamaktadır.
- **Çözüm:** Ürün eklendiğinde, ilgili ürünün stok değeri eklenen miktar kadar azaltılmalıdır.

### 2.3. Toplam Fiyat Hesaplama Hatası

- **Sorun:** `calculateTotal` metodunda toplam hesaplanırken sadece ürün fiyatı ekleniyor, `quantity` dikkate alınmıyor.
- **Etkisi:** Toplam tutar hatalı hesaplanır.
- **Çözüm:** Hesaplama, her ürün için `item.price * item.quantity` şeklinde düzeltilmelidir.

### 2.4. Sepetten Ürün Silme Hatası

- **Sorun:** `removeItem` metodunda, ürün silindiğinde stok değeri sabit olarak 1 artırılıyor. Ancak, sepette birden fazla adet ürün olabilir.
- **Etkisi:** Stok güncellemesi doğru oranda yapılmaz.
- **Çözüm:** Silinen ürün adedi kadar (`item.quantity`) stok değeri artırılmalıdır.

### 2.5. UI Güncellemesi ve Fiyat Gösterimi

- **Sorun:** `updateUI` metodunda, sepetteki ürünlerin fiyatı yalnızca birim fiyat olarak gösteriliyor; toplam fiyatlandırma yapılmıyor.
- **Etkisi:** Kullanıcıya hatalı veya eksik fiyat bilgisi sunulabilir.
- **Çözüm:** Ürün detaylarında fiyat bilgisi, `item.price * item.quantity` olarak hesaplanabilir veya UI açıklamaları buna göre güncellenmelidir.

## 3. Debug Adımları ve Akış Diyagramı

### 3.1. Adım Adım Debug Süreci

1. **Kod İncelemesi:** HTML ve JavaScript dosyaları satır satır incelendi.
2. **Sorunların Belirlenmesi:** Her metodda oluşabilecek mantıksal ve yapısal hatalar not edildi.
3. **Hata Mesajları ve Yorumlar:** Kod içerisindeki yorumlar (örneğin, "// < yerine <= kullanıldı") referans alınarak sorunlar tespit edildi.
4. **Çözüm Önerilerinin Geliştirilmesi:** Her hata için uygun çözüm yolları belirlendi.
5. **Test Senaryoları:** Ürün ekleme, silme ve indirim uygulama işlemleri farklı senaryolarla test edilerek hata etkileri doğrulandı.

## 4. Sonuç
Tespit edilen hatalar ve önerilen çözümler doğrultusunda:

- Stok kontrolü ve güncellemesinin düzeltilmesi,
- Toplam fiyat hesaplamasının quantity ile çarpılarak yapılması,
- İndirim hesaplamasının doğru oranda uygulanması,
- Sepetten ürün silme işleminde doğru stok güncellemesinin yapılması
gibi adımların uygulanması gerekmektedir.
    
 --- 
 ![image-1](<Ekran Resmi 2025-03-16 20.15.35.png>)
 ![image-2](<Ekran Resmi 2025-03-16 20.17.55.png>)