---
title: "Çalışan Cihaz Sorgulama"
---

Licrus Field Service uygulamasıyla devreye alınan cihazların seri numaralarını almak için bu metodu kullanabilirsiniz. Method sadece devreye alınan (ilk çalıştırması yapılan) ve garantisi başlatılan cihazların seri numaralarını verir. Seri Numarası entegrasyon işlemlerinde [DeviceInstallationInfo](http://docs.onerov.com/2020/12/24/cihaz-bilgisi-deviceinstallationinfo/) nesnesi kullanılır. DeviceInstallationInfo nesnesinin detayları için [Veri Modeli](/category/veri-modeli/) başlığına bakınız.

**Fonksiyon**

\`\`\`text ProductSerialNumberResponse GetProductSerialNumbers(ProductSerialNumberRequest request) \`\`\`

**Örnek**

\`\`\`text // web service için istemci oluşturulyor var licrusService = new Integration(); //istek nesnesi var request = new ProductSerialNumberRequest(); // Login metoduyla alınmış ticket. request.AuthTicket = ticket; //istenilen seri numaraları için ilk çalıştırma tarihi. //Belirtilen tarih ve sonrasında devreye alınan cihazlar gelecektir. request.Filter = new BaseFilter(); request.Filter.ReferenceDateTime = new DateTime(2020, 12, 01); //ödeme işlemi yapılıyor var response = svc.GetProductSerialNumbers(request); // Herhangi bir hata varsa if (response.HasError) { // Detaylar için (bkz:Api Kullanım) } else { // Arama kriterleriyle eşleşen tüm kayıtlar // response.Results alanı üzerinde yeralır. foreach (var item in response.Results) { // cihaz bilgileri } } \`\`\`
