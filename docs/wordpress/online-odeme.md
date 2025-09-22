---
title: "Online Ödeme"
---

Licrus uygulamalarıyla satış işlemleri gerçekleştirebilirsiniz. Örneğin ürün, yedek parça, ek garanti satışı ve ön ödemeli servis hizmet gibi çeşitli satış işlemlerini farklı ödeme kanallarıyla destekleyebilirsiniz. Ödeme işlemi için iki farklı yöntem bulunmaktadır. Anlık tahsilat veya Gecikmeli tahsilat. Anlık tahsilatlarda tüm süreç ilgili Licrus uygulaması üzerinden yürütümektedir. Gecikmeli tahsilatlarda ise ilgili satış işlemi yapıldıktan sonra ödeme onayı için bekletilir. Bu durumda ödeme işleminin 3. Partı bir uygulama tarafından tetiklenmesi beklenir. Örneğin IVR kanalı üzerinden müşterinin kredi kartı bilgileri alınarak ek garanti satışı yapılması.

Sipariş onayı verilmiş bir işlemin tahsilat işleminin yapılması için öncelikle Licrus tarafından bir Ödeme İstek Kodu oluşturulması gerekiyor. Bu ödeme istek koduyla aşağıdaki ödeme metodu çağrılarak işlemler tamamlanır.

Müşterilerden alınan kredi kartı veya banka kartı bilgileri IVR kanalı üzerinden Licrus’a gönderilerek ödeme/tahsilat işelemlerini yapmak için  aşağıdaki API metodunu kullanabilirsiniz.

Ödeme işlem için PaymentRequest nesnesi kullanılır.

**Fonksiyon**

\`\`\`text PaymentResponse Paymnet(PaymnetRequest request) \`\`\`

**Örnek**

\`\`\`text // web service için istemci oluşturulyor var licrusService = new Integration(); //istek nesnesi var request = new PaymentRequest(); // Login metoduyla alınmış ticket. request.AuthTicket = ticket; //ödeme işleminin yapılacağı kredi/banka kartı nesnesi var card = new PaymentCard(); card.CardHolderName = "SAMPLE CUSTOMER"; card.Number = "1234-1234-1234-1234"; card.ExpireYear = 07; card.ExpireMonth = 2020; card.SecurityCode = "123"; card.CardVendor = PaymentCardVendor.Unknow; //kart bilgisi ödeme istek nesnesine setleniyor. request.Card = card; //ödeme işlemi için Licrus tarafından verilen Ödeme Talep Kodu. request.PaymentRequestCode = "ec38e9381d1440f0a3bb83ab47c37e11"; //ödeme işlemi yapılıyor var response = svc.Payment(request); // Herhangi bir hata varsa if (response.HasError) { // Detaylar için (bkz:Api Kullanım) } else { //işlem başarılı gerçekleşti. } \`\`\`
