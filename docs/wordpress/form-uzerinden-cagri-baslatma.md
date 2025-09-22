---
title: "Form Üzerinden Çağrı Başlatma"
---

“Servis Devreye Alma” talebi için web sitenizdeki form ile Licrus üzerinde çağrı açabilirsiniz. Son kullanıcı sitenizdeki çağrı formunu doldurup gönderme işlemi yaptığında Licrus sistemine iletilip otomatik olarak ilgili bayi üzerine çağrı talebi oluşturabilmektedir.

**Form Üzerindeki Alanlar**

*   **AuthTicket**: Tarafımızca gönderilecek olup kullanıcı doğrulama işlemi için gereklidir.
*   **DealerCompanyName**: Bayinin adı.
*   **DealerContactPerson**: Bayi yetkili kişisi
*   **DealerMobilePhone**: Bayi cep telefonu
*   **DealerWorkPhone**: Bayi iş telefonu
*   **DealerEmail**: Bayi mail adresi
*   **CustomerCompanyName**: Müşteri eğer bir şirket ise bulunduğu şirketin adın
*   **CustomerFullName**: Müşteri ad-soyad bilgisi
*   **CustomerMobilePhone**: Müşteri cep telefonu
*   **CustomerWorkPhone**: Müşteri iş telefonu
*   **CustomerEmail**: Müşteri mail adresi
*   **CustomerCity**: Müşterinin bulunduğu şehir
*   **CustomerDistrict**: Müşterinin bulunduğu ilçe
*   **CustomerAddress**: Müşterinin açık adresi
*   **ProductNameList**: Devreye alınması istenen ürün bilgisi
*   **ProductGroupName**: Devreye alınması istenen ürün grubu bilgisi
*   **ProductSerialNumberList**: Devreye alınması istenen seri numara bilgisi
*   **DeviceCount**: Devreye alınması istenen ürün sayısı

**Test Ortamı Bilgileri**

**Endpoint**: https://test-ecostar-api.licrus.com/api  
**Metot** **Adı**: /ExternalCall/Create  
**Metot** **Tipi**: POST

**Örnek Request Bilgisi**

\`\`\`json { "AuthTicket": "aa1c99300ccd452aa518a52aa565\*\*\*\*", "DealerCompanyName": "Test Bayi", "DealerContactPerson": "MUTLU ÖZCAN", "DealerMobilePhone": "3546546757", "DealerWorkPhone": "", "DealerEmail": "dealeremail@dealer.com", "CustomerCompanyName": "", "CustomerFullName": "Deneme Müşteri", "CustomerMobilePhone": "5301231212", "CustomerWorkPhone": "", "CustomerEmail": "customerEmail@customer.com", "CustomerCity": "Istanbul", "CustomerDistrict": "Umraniye", "CustomerAddress": "Fatih Sultan Mehmet mahallesi", "ProductNameList": "ECODENSE WT 65", "ProductGroupName": "ECODENSE DUVAR- YER TİPİ KAZAN", "ProductSerialNumberList": "99958,99959", "DeviceCount": 2 } \`\`\`

**Örnek Response Bilgisi**

\`\`\`json { "Results": \[\], "Entity": null, "HasResult": false, "Count": 0, "TotalCount": 0, "Id": 0, "Meta": null, "MessageList": \[ { "Type": 2, "Message": "Verdiğiniz bilgilere göre çağrı oluşturulmuştur. Çağrı numarası: 43090" } \], "HasError": false, "HasMessage": true, "RrpTag": null } \`\`\`
