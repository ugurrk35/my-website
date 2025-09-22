---
title: "Yedek Parça Entegrasyonu"
---

Licrus’da, yedek parça bilgilerini doğrudan tanımlayıp kullanabilirsiniz Bazı durumlarda Yedek Parça bilgilerini farklı bir sistemden almak veya aktarmak istediğinizde ilgili sistem tarafından Licrus’u aşağıdaki entegrasyon metodları kullanılarak bağlantı kurabilirsiniz. Yedek Parça entegrasyon işlemlerinde SparePart nesnesi kullanılır. [SparePart](http://docs.onerov.com/yedek-parca-nesnesi) [](http://docs.onerov.com/urun-nesneleri)nesnesinin detayları için **[Veri Modeli](http://docs.onerov.com/category/veri-modeli/)** başlığına bakınız.

  
**Yeni Yedek Parça Kaydetmek veya Ürün Güncellemek**  
Aşağıdaki fonksiyonu kullanarak yeni bir yedek parçayı Licrus’a aktarabilir veya Code alanıyla eşleşen mevcut bir yedek parçanın bilgilerini güncelleyebilirsiniz.

**Fonksiyon**

SparePartResponse SaveSparePart(SparePartRequest request)

**Örnek**

// web service için istemci oluşturulyor
var licrusService = new Integration();

//istek nesnesi
var request = new ProductRequest();

// Login metoduyla alınmış ticket.
request.AuthTicket = ticket;

// kaydedilmek istenen yedek parça ve bilgileri.
var card = new SparePart();
// yedek parça kodu daha önce gönderilmiş bir kod ise güncelleme yapılır
// diğer durumda yeni kayıt olarak eklenecektir
card.Code = "PART-001";
// yedek parça adı
card.Name = "ABC01";
// ... diğer bilgileri 

// web servis fonksiyonu çağrılıyor
var response = licrusService.SaveSparePart(request);

// Herhangi bir hata varsa
if (response.HasError) &#123;
    // Detaylar için (bkz:Api Kullanım)
&#125;
else &#123;
    //işlem başarılı gerçekleşti.
&#125;

  
**Kayıtlı Yedek Parçaları Almak**  
Aşağıdaki fonksiyonu kullanarak daha önce Licrus’a kaydedilmiş yedek parçaları alabilirsiniz. Code değeri verildiğinde sadece eşleşen yedek parça alınır. Diğer durumda tüm yedek parça bilgileri gelecektir

**Fonksiyon**

SparePartResponse GetSparePart(SparePartRequest request)

**Örnek**

// web service için istemci oluşturulyor
var licrusService = new Integration();

//istek nesnesi
var request = new ProductRequest();

// Login metoduyla alınmış ticket.
request.AuthTicket = ticket;

// filtre nesnesi.
request.Filter = new SparePartFilter();

// alınmak istenen yedek parça kodu
// boş bırakıldığında tüm yedek parçaları getirir.
request.Filter.Code = "PART-001";

var response = licrusService.GetSparePart(request);
// Herhangi bir hata varsa
if (response.HasError) &#123;
    // Detaylar için (bkz:Api Kullanım)
&#125;
else &#123;
    // Arama kriterleriyle eşleşen tüm kayıtlar    
    // response.Results alanı üzerinde yeralır.    
    foreach (var item in response.Results) &#123;
        // yedek parça bilgileri
    &#125;
&#125;

**Servis Nesneleri**  

Servis üzerinden yayınlanan tüm metotlar, Request nesnesi alır ve Response nesnesi döner. Request ve Response nesneleri kullanıldığı metoda özgü alanlar içermekle birlikte ortak bazı alanlar da içerirler;

**Request (İstek)**

| Alan | Açıklama | Değer |
| --- | --- | --- |
| AuthTicket | Kimlik doğrulaması için kullanılacak ticket | Zorunlu |
| Filter | Bu, sorguyu daraltmak için kullanılan bir dizi filtre içeren bir nesne özelliğidir. Bu durumda, “Code” adlı bir özelliğe sahiptir. | Zorunlu |
| Code | “Filter” nesnesi altında bir özelliktir. Yedek parçayla  ilgili bilgileri almak için kullanılmaktadır | Zorunlu |

**Response (Cevap)**

| Alan | Açıklama |
| --- | --- |
| HasError | İşlem sonucunda bir hata oluştuysa true değer döner. Yapılan işlem başarılıysa false değer alır. |
| HasMessage | İşlem sonucunda paylaşılan bir bilgi mesajı varsa true değer verir. |
| MessageList | HasError veya HasMessage alanlarından herhangi bir true ise hata veya bilgi mesajı buradan alınabilir. |

**Response.MessageList**  
Mesaj nesnesini barındıran listedir ve içerisinde yer alan Message nesnesinin detayları aşağıdaki gibidir.

| Alan | Açıklama |
| --- | --- |
| Message | Hata veya Bilgi mesajı metin olarak buradan alınabilir. |
| Url | https://simpleweburl.com/api/ERP/GetPart |
| Type | Servis tarafından gönderilen mesajın tipini verir. ServiceResponseMessageType tipinde bir enum değeri taşır. Bu alan 3 tip değer alabilir, bunlar;Error: HataInfo: BilgiWarning: Uyarı |

**GetPart JSON Request Modeli**

&#123;
	"AuthTicket": "demodemodemodemodemodemodemodemodemo",
  "Filter": &#123;
    "Code": "700699064576"
  &#125;
&#125;

**GetPart JSON Response Modeli**

&#123;
	"Results": \[
		&#123;
			"Code": "Test1",
			"Name": "Test yedek parça",
			"Description": "test",
			"CustomerPrice": 100.00,
			"ServicePrice": 100.00,
			"WarrantyPeriod": 0,
			"Products": null,
			"Labors": null,
			"Id": 0,
			"IsActive": true,
			"Text": null
		&#125;
	\],
	"MessageList": \[\],
	"HasError": false,
	"HasMessage": false
&#125;

**Yeni Yedek Parça Kaydetmek** 

  
**SavePart  Request (İstek)**

| Alan | Açıklama | Değer |
| --- | --- | --- |
| AuthTicket | Kimlik doğrulaması için kullanılacak ticket | Zorunlu |
| Entity | Parça ile ilgili bilgilerin olduğu alan Nesne | Zorunlu |
| EntityList | Toplu olarak işlem yapılacaksa entity yerine liste biçimde kullanılır | isteğe bağlı |
| Code | “Entity” nesnesi altında bir özelliktir. Yedek parça Kodu | Zorunlu |
| Description | Yedek parça açıklama alanı | Zorunlu |
| IsActive | Nesnenin geçerlilik durumu. | Zorunlu |
| Name | Yedek parça ismi | Zorunlu |
| WarrantyPeriod | Garanti süresi | Zorunlu |
| ServicePrice | Servis fiyatı | Zorunlu |
| CustomerPrice | Müşteri fiyatı | Zorunlu |
| AvailableToOrder | Siparişe açık mı ? | Zorunlu |
| IsGivingBack | İade edilebilir mi  ? | Zorunlu |
| AllowUseInServiceForm | True değer verilmesi durumunda. Bu yedek parça servis formlarında kullanılabilir. False değer verildiğinde servis formlarında bu parça eklenemeyecektir. | Zorunlu |
| RelatedParts.Child.Code | İlişkili olduğu parça kodu .Verilen koda ait parça kodu yoksa hata döndürecektir. | Zorunlu |
| RelatedParts.RelationType | Bağlantı/İlişki türü | Zorunlu |
| Products.Code | Bağlı olduğu ürün koduBağlı Parça ise => “bagliparca”Muadil Parça ise =>”muadil”Satış ALternatifi ise =>  satisaltarnatif” | Zorunlu |
| RelatedParts | İlişikili  parçalar | isteğe bağlı |
| Labors.Code | Bağlı olduğu işçilik kodu | Zorunlu |
| Labors.IsActive | Bağlı olduğu işçilikdurumu false | Zorunlu |
| Labors.Quantity | Bağlı olduğu işçilikadeti | Zorunlu || Alan | Açıklama |
| --- | --- |
| Message | Hata veya Bilgi mesajı metin olarak buradan alınabilir. |
| Url | https://simpleweburl.com/api/ERP/SavePart |
| Type | Servis tarafından gönderilen mesajın tipini verir. ServiceResponseMessageType tipinde bir enum değeri taşır. Bu alan 3 tip değer alabilir, bunlar;Error: HataInfo: BilgiWarning: Uyarı |

**SavePart JSON Request Modeli**

&#123;
	"AuthTicket": "demodemodemodemodemodemo",
  "Entity":&#123;
	"Code": "RelationType6",
  "Description": "RelationType6",
  "IsActive": true,
  "Name": "RelationType6",
  "WarrantyPeriod": 12,
  "ServicePrice": 330.0,
  "CustomerPrice": 220.0,
		"AvailableToOrder":true,
		"IsGivingBack":true,
	"AllowUseInServiceForm":true,
  "Products": \[

    &#123;
      "Code": "8216368100"
    &#125;,
    &#123;
      "Code": "8216376100"
    &#125;

  \],
  "RelatedParts": \[
	
    &#123;
		"Child":&#123;
      "Code": "7006990002"
    &#125;,
		"RelationType":&#123;
				"Code":"muadil"
			&#125;,
		"IsActive":1
&#125;
 
  \],
  "Labors": \[
    &#123;
      "Code": "36-40",
      "IsActive": true,
      "Quantity": 2
    &#125;,
    &#123;
      "Code": "31-35",
      "IsActive": false,
      "Quantity": 1
    &#125;

  \]
&#125;
&#125;

  
  

**Toplu olarak kaydetme veya güncelleme SavePart JSON Request Modeli**

&#123;
	"AuthTicket": "demodemodemodemodemodemo",
	"EntityList": \[
&#123;
	"Code": "RelationType6",
  "Description": "RelationType6",
  "IsActive": true,
  "Name": "RelationType6",
  "WarrantyPeriod": 12,
  "ServicePrice": 330.0,
  "CustomerPrice": 220.0,
		"AvailableToOrder":true,
		"IsGivingBack":true,
	"AllowUseInServiceForm":true,
  "Products": \[

    &#123;
      "Code": "8216368100"
    &#125;,
    &#123;
      "Code": "8216376100"
    &#125;

  \],
  "RelatedParts": \[
	
    &#123;
		"Child":&#123;
      "Code": "7006990002"
    &#125;,
		"RelationType":&#123;
				"Code":"muadil"
			&#125;,
		"IsActive":1
&#125;
 
  \],
  "Labors": \[
    &#123;
      "Code": "36-40",
      "IsActive": true,
      "Quantity": 2
    &#125;,
    &#123;
      "Code": "31-35",
      "IsActive": false,
      "Quantity": 1
    &#125;

  \]

&#125;,
&#123;
	"Code": "CODEPART",
  "Description": "CODEPART",
  "IsActive": true,
  "Name": "NAMEPART",
  "WarrantyPeriod": 12,
  "ServicePrice": 330.0,
  "CustomerPrice": 220.0,
		"AvailableToOrder":true,
		"IsGivingBack":true,
	"AllowUseInServiceForm":true,
  "Products": \[

    &#123;
      "Code": "8216368100"
    &#125;,
    &#123;
      "Code": "8216376100"
    &#125;

  \],
  "RelatedParts": \[
	
    &#123;
		"Child":&#123;
      "Code": "7006990002"
    &#125;,
		"RelationType":&#123;
				"Code":"muadil"
			&#125;,
		"IsActive":1
&#125;
 
  \],
  "Labors": \[
    &#123;
      "Code": "36-40",
      "IsActive": true,
      "Quantity": 2
    &#125;,
    &#123;
      "Code": "31-35",
      "IsActive": false,
      "Quantity": 1
    &#125;

  \]

&#125;
\]
&#125;

**SavePart JSON Response Modeli**

&#123;
	"Results": \[\],
	"MessageList": \[\],
	"HasError": false,
	"HasMessage": false
&#125;

**Örnek hata response**

ürün kodu hatalı verildiği durumda

&#123;
	"Results": \[\],
	"MessageList": \[
		&#123;
			"Type": 0,
			"Message": "345 Koduyla eşleşen bir ürün tanımı bulunamadı"
		&#125;
	\],
	"HasError": true,
	"HasMessage": true
&#125;

**  
Yedek Parça Güncellemek**  
  
  
Güncelleme işleminde Yedek parça Koduna göre işlem yapm aktadır.Bu alan eşleşen bir yedek parça kodu verilmediği zamanda yeni bir yedek parça kaydı açacaktır.Aynı metod ve url kullanılmaktadır  

  
**SavePart  Request (İstek)**﻿

| Alan | Açıklama | Değer |
| --- | --- | --- |
| AuthTicket | Kimlik doğrulaması için kullanılacak ticket | Zorunlu |
| Entity | Parça ile ilgili bilgilerin olduğu alan Nesne | Zorunlu |
| Code | “Entity” nesnesi altında bir özelliktir. Yedek parça Kodu.Bu alan eşleşen bir yedek parça kodu verilmediği zamanda yeni bir yedek parça kaydı açacaktır. | Zorunlu |
| Description | Yedek parça açıklama alanı | Zorunlu |
| IsActive | Nesnenin geçerlilik durumu. | Zorunlu |
| Name | Yedek parça ismi | Zorunlu |
| WarrantyPeriod | Garanti süresi | Zorunlu |
| ServicePrice | Servis fiyatı | Zorunlu |
| CustomerPrice | Müşteri fiyatı | Zorunlu |
| Products.Code | Bağlı olduğu ürün kodu | Zorunlu |
| Labors.Code | Bağlı olduğu işçilik kodu | Zorunlu |
| Labors.IsActive | Bağlı olduğu işçilikdurumu false | Zorunlu |
| Labors.Quantity | Bağlı olduğu işçilikadeti | Zorunlu || Alan | Açıklama |
| --- | --- |
| Message | Hata veya Bilgi mesajı metin olarak buradan alınabilir. |
| Url | https://simpleweburl.com/api/ERP/SavePart |
| Type | Servis tarafından gönderilen mesajın tipini verir. ServiceResponseMessageType tipinde bir enum değeri taşır. Bu alan 3 tip değer alabilir, bunlar;Error: HataInfo: BilgiWarning: Uyarı |

**Update işlemi için**  
**SavePart JSON Request Modeli**

&#123;
	"AuthTicket": "demodemodemodemodemodemo",
  "Entity":&#123;
	"Code": "RelationType6",
  "Description": "RelationType6",
  "IsActive": true,
  "Name": "RelationType6",
  "WarrantyPeriod": 12,
  "ServicePrice": 330.0,
  "CustomerPrice": 220.0,
		"AvailableToOrder":true,
		"IsGivingBack":true,
	"AllowUseInServiceForm":true,
  "Products": \[

    &#123;
      "Code": "8216368100"
    &#125;,
    &#123;
      "Code": "8216376100"
    &#125;

  \],
  "RelatedParts": \[
	
    &#123;
		"Child":&#123;
      "Code": "7006990002"
    &#125;,
		"RelationType":&#123;
				"Code":"muadil"
			&#125;,
		"IsActive":1
&#125;
 
  \],
  "Labors": \[
    &#123;
      "Code": "36-40",
      "IsActive": true,
      "Quantity": 2
    &#125;,
    &#123;
      "Code": "31-35",
      "IsActive": false,
      "Quantity": 1
    &#125;

  \]
&#125;
&#125;

**Update işlemi için**  
**SavePart JSON Reponse Modeli**

&#123;
	"Results": \[\],
	"MessageList": \[\],
	"HasError": false,
	"HasMessage": false
&#125;
