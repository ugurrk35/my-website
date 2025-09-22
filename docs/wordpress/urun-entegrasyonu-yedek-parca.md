---
title: "Ürün Entegrasyonu (Bağlı Yedek parça )"
---

Licrus’da, ürün bilgileri doğrudan tanımlamak ve kullanmak mümkündür. Aynı zamanda ürünlerin bir ERP/MRP sisteminde alınması isteniyorsa ilgili sistem tarafından Licrus’u aşağıdaki entegrasyon metodları kullanılarak veri aktarımı yapmak mümkündür. Ürün entegrasyon işlemlerinde Product nesnesi kullanılır. [Product](http://docs.onerov.com/urun-nesneleri) nesnesinin detayları için **[Veri Modeli](http://docs.onerov.com/category/veri-modeli/)** başlığına bakınız.

**Ürün (Product)**

| Alan | Açıklama | Değer |
| --- | --- | --- |
| Code | Ürün Kodu | Zorunlu |
| Name | Ürün Adı | Zorunlu |
| Description | Ürün hakkında bir açıklayıcı bilgiler içeren metin | Zorunlu |
| IsActive | Geçerli durumdaki ürünler için true değer verilir. Herhangi bir ürünü pasif duruma almak için false değer verilir. | Zorunlu |
| Brand | Ürün markassı.Değer verildiğinde Marka Kodu verilmesi gerekir. | Opsiyonel |
| Manufacturer | Üretici Firma | Opsiyonel |
| ProductDetailGroupCode | Ürün detay grubu | Opsiyonel |
| Model | Ürün modeli.Değer verildiğinde Model Kodu verilmesi gerekir. | Opsiyonel |
| MainGroup | Ürünün yer aldığı ürün ana grubu.Değer verildiğinde Ürün Grubu Kodu verilmesi gerekir. | Zorunlu |
| CreateMissingPart | Ürüne bağlı yedek parça gönderilirken olmayan yedek parçaların kayıt yapılması isteniyorsa true değeri verilmeli | Zorunlu |
| WarrantyPeriod | Cihaz için üretici tarafından verilen garanti süresi (yıl) | Zorunlu |
| SerialNumberCount | Cihazda bulunan seri numarası sayısı.Varsayılan değeri 1’dir | Zorunlu |
| Origin | Cihazın menşeei;Bilinmiyor=0İthal=1Yerli=2 | Opsiyonel |
| SpareParts | Ürüne bağlı yedek parça nesnesi |  |

**Ürün bağlı yedek parça**

| Code | Yedek Parça Kodu | Zorunlu |
| --- | --- | --- |
| Name | Yedek Parça Adı | Zorunlu |
| Description | Yedek Parça hakkında açıklama alanı. | Zorunlu |
| Mainpartgroupcode | Yedek parça ana grup kodu | Zorunlu |
| PartGroupCode | Yedek parça grup kodu | Zorunlu |
| ManufacturerCode | Yedek parça üretici kodu | Zorunlu |
| IsActive | Geçerli durumdaki Yedek Parça için true değer verilir. Herhangi bir yedek parçayı pasif duruma almak için false değer verilir. | Zorunlu |
| WarrantyPeriod | Yedek parça için üretici tarafından verilen garanti süresi (yıl) | Opsiyonel |
| AvailabletoOrder | Yedek parçanın siparişte kullanılıp kullanılmayacağını elirtir(true/false) | Zorunlu |
| AllowUseİnServiceForm | Yedek parçanın hizmet formlarında kullanıp kulllanılmyacağını belirtir (true/false) | Zorunlu |
| IsGivingBack | Yedek parçanın iade ye açıkmı  (true/false) | Zorunlu |
| UnitOfMesureCode | Ölçü birimi (örnek Adet kodu => ADT ) |  |
| MinRequestQuantity | Siparişte kalem bazında istenecek minum adet.Örnek-1: MinOrderCount=5, MinRequestQuantity=5 sepete her ekleme yapıldığında 5 ve katları şeklinde olacaktır.Örnek-2: MinOrderCount=4, MinRequestQuantity=2 sepete her ekleme yapıldığında 2 ve katları şeklinde olacaktır ve en az 4 adet sipariş edilmek zorundadır. | Opsiyonel |
| MinOrderCount | Minimum sipariş sayısı | Opsiyonel |

**Custom Alanlar**

| KW | KW | İsteğe Bağlı |
| --- | --- | --- |
| StageCount | Kademe sayısı | İsteğe Bağlı |
| ElectricPumpCount | Elektrikli pompa sayısı | İsteğe Bağlı |
| DieselPumpCount | Dizel pompa sayısı | İsteğe Bağlı |
| PumpCount | Pompa Sayısı | İsteğe Bağlı |
| ConfigurationContent | Konfigurasyon İçeriği | İsteğe Bağlı |
| Genio |  | İsteğe Bağlı |

  
**Yeni Ürün Kaydetmek veya Ürün Güncellemek**  
Aşağıdaki fonksiyonu kullanarak yeni bir ürün bilgisini Licrus’a aktara bilir veya Code alanıyla eşleşen mevcut bir ürünün bilgilerini güncelleyebilirsiniz.

**Servis Nesneleri**

Servis üzerinden yayınlanan tüm metotlar, Request nesnesi alır ve Response nesnesi döner. Request ve Response nesneleri kullanıldığı metoda özgü alanlar içermekle birlikte ortak bazı alanlar da içerirler;

**Request (İstek)**

| Alan | Açıklama | Değer |
| --- | --- | --- |
| AuthTicket | Kimlik doğrulaması için kullanılacak ticket | Zorunlu |
| Filter | Bu, sorguyu daraltmak için kullanılan bir dizi filtre içeren bir nesne özelliğidir. Bu durumda, “Code” adlı bir özelliğe sahiptir. | Zorunlu |
| Code | “Filter” nesnesi altında bir özelliktir. Ürünle ilgili bilgileri almak için kullanılmaktadır | Zorunlu değildir.Verilmediği takdirde tüm ürünleri getirir. |

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
| Url | https://simpleweburl.com/api/ERP/GetProduct    // SaveProduct |
| Type | Servis tarafından gönderilen mesajın tipini verir. ServiceResponseMessageType tipinde bir enum değeri taşır. Bu alan 3 tip değer alabilir, bunlar;Error: HataInfo: BilgiWarning: Uyarı |

**SaveProduct JSON Request Modeli**

&#123;
	"authticket": "demodemodemodemodemo",
	"entity": &#123;
		"code": "TESTCOD8",
		"name": "testtUrun8",
		"manufacturercode": "001",
		"productdetailgroupcode": "14064",
		"description": "test ürün",
		"isactive": true,
		"brand": &#123;
			"code": "masdaf"
		&#125;,
		"model": &#123;
			"code": "1084"
		&#125;,
		"maingroup": &#123;
			"code": "G0014"
		&#125;,
		"warrantyperiod": 3,
		"serialnumbercount": 1,
		"origin": 2,
                "Kw": 1,
		"StageCount": 2,
		"Genio": 3,
		"ElectricPumpCount": 1,
		"DieselPumpCount": 2,
		"PumpCount": 3,
		"ConfigurationContent": "test"
		"CreateMissingPart":true,
		"SpareParts": \[
			&#123;
				"code": "11testm-3",
				"description": "11testm-3",
				"partgroupcode": "G004",
				"isactive": true,
				"name": "test999m-2",
				"availabletoorder": true,
				"ManufacturerCode": "001",
				"isgivingback": false,
				"allowuseinserviceform": true,
				"minordercount": 5,
				"minrequestquantity": 5,
				"unitofmesurecode": "ADT"
			&#125;,
			&#123;
				"code": "232test",
				"description": "232test",
				"mainpartgroupcode": "G005",
				"partgroupcode": "5025",
				"isactive": true,
				"name": "test999m-2",
				"availabletoorder": true,
				"ManufacturerCode": "001",
				"isgivingback": false,
				"allowuseinserviceform": true,
				"minordercount": 5,
				"minrequestquantity": 5,
				"unitofmesurecode": "ADT"
			&#125;
		\]
	&#125;
&#125;

  
**SaveProduct JSON response Modeli**

&#123;
	"Results": \[\],
	"MessageList": \[
		&#123;
			"Type": 0,
			"Message": "INT-PRD1001:TESTCOD8 Kodlu ürün aktif bir ürün olduğu için, Licrus ürün bilgileri güncellenmedi."
		&#125;,
		&#123;
			"Type": 2,
			"Message": "11testm-3 kodlu yedek parça kaydedildi."
		&#125;,
		&#123;
			"Type": 2,
			"Message": "TESTCOD8 ürününe 11testm-3 kodlu yedek parça eklendi."
		&#125;,
		&#123;
			"Type": 2,
			"Message": "232test kodlu yedek parça kaydedildi."
		&#125;,
		&#123;
			"Type": 2,
			"Message": "TESTCOD8 ürününe 232test kodlu yedek parça eklendi."
		&#125;
	\],
	"HasError": true,
	"HasMessage": true
&#125;

**GetProduct JSON Request Modeli**

&#123;
  "AuthTicket": "demodemodemodemodemodemodemodemo",
  "Filter": &#123;
    "Code": "PRODUCT-001"
  &#125;
&#125;

 **GetProduct** **Response Modeli**

&#123;
	"Results": \[
		&#123;
			"Code": "PRODUCT-001",
			"Name": "demo ürün",
			"MainGroup": &#123;
				"Code": "A.B1",
				"Name": "YOĞUŞMALI KOMBİ",
				"IsMainGroup": false,
				"UseInQuote": false,
				"ParentGroup": null,
				"CssStyle": null,
				"CssClass": null,
				"PreviewImageUrl": null,
				"DisplayOrder": null,
				"SubGroups": null,
				"IsTrackVersion": false,
				"Id": 0,
				"IsActive": false,
				"Text": null
			&#125;,
			"Point": 0.0,
			"Brand": &#123;
				"Code": "Marka",
				"Name": "Marka",
				"Id": 0,
				"IsActive": false,
				"Text": null
			&#125;,
			"Model": &#123;
				"Code": "8406450010",
				"Name": "Demo",
				"Id": 0,
				"IsActive": false,
				"Text": null
			&#125;,
			"Manufacturer": null,
			"Price": 0.0,
			"Currency": null,
			"PreviewImage": null,
			"Description": "demo ürün bilgisi",
			"Images": null,
			"WarrantyPeriod": 3,
			"SerialNumberCount": 1,
			"Width": 0.0,
			"Height": 0.0,
			"Id": 0,
			"IsActive": false,
			"Text": null
		&#125;
	\],
	"MessageList": \[\],
	"HasError": false,
	"HasMessage": false
&#125;
