---
title: "PowerBI Entegrasyonu"
---

Licrus’da, rapor almak  için kullanılan servistir.

**Fonksiyon**

**Servis Nesneleri**

Servis üzerinden yayınlanan tüm metotlar, Request nesnesi alır ve Response nesnesi döner. Request ve Response nesneleri kullanıldığı metoda özgü alanlar içermekle birlikte ortak bazı alanlar da içerirler;

**Ürün grubu Request (İstek)**

| Alan | Açıklama | Değer |
| --- | --- | --- |
| AuthTicket | Kimlik doğrulaması için kullanılacak ticket | (Zorunlu) |
| AppSource | Uygulama kaynağı | 66292 (Zorunlu) |
| AppCulture/ Culture | Dil ve kültür bilgisi | TR (Zorunlu) |
| FreeEntity | Özgür varlık bilgisiVerilen guid e göre kurumsal yada bireysel günlük çağrı sayısını verir. | Bireysel &#123;“Guid”: “ed604414-5f97-d0ee-ff31-c5a3f507f74b”&#125;Kurumsal&#123;“Guid”: “79d8c475-6366-58e6-0b8d-1f96d9f1a739”&#125;(Zorunlu) |
| Filter | Filtreleme bilgileritarih aralığı bilgisi verilerek filtreleme işlemi yapılıyor | &#123;“DynamicFilters”: [&#123;“Name”: “CallDate”, “Value”: &#123;“Start”: “2025-03-13T00:00:00.000Z”, “End”: “2025-03-14T00:00:00.000Z”, “Range”: “1”, “Text”: “Tarih Aralığı”, “Name”: “Tarih Aralığı”&#125;&#125;]&#125; |

**Response (Cevap)**

| Alan | Açıklama |
| --- | --- |
| HasError | İşlem sonucunda bir hata oluştuysa true değer döner. Yapılan işlem başarılıysa false değer alır. |
| HasMessage | İşlem sonucunda paylaşılan bir bilgi mesajı varsa true değer verir. |
| MessageList | HasError veya HasMessage alanlarından herhangi bir true ise hata veya bilgi mesajı buradan alınabilir. |

**Response.MessageList**  
Rapordan dönen nesneyi barındıran listedir ve içerisinde yer alan Message nesnesinin detayları aşağıdaki gibidir.

| Alan | Açıklama |
| --- | --- |
| Message | Hata veya Bilgi mesajı metin olarak buradan alınabilir. |
| Url | https://firma-tr-api-reporting.firma.com.tr/api/GenericReport/load |
| Type | Servis tarafından gönderilen mesajın tipini verir. ServiceResponseMessageType tipinde bir enum değeri taşır. Bu alan 3 tip değer alabilir, bunlar;Error: HataInfo: BilgiWarning: Uyarı |

  
**PowerBI JSON Request Modeli**

&#123;
	"FreeEntity": &#123;
		"Guid": "ed604414-5f97-d0ee-ff31-c5a3f507f74b"
	&#125;,
	"Filter": &#123;
		"DynamicFilters": \[
			&#123;
				"Name": "CallDate",
				"Value": &#123;
					"Start": "2025-04-13T00:00:00.000Z",
					"End": "2025-03-14T00:00:00.000Z",
					"Range": "1",
					
				&#125;
			&#125;
		\]
	&#125;,
	
	"Culture": "TR",
	"AuthTicket": "demodemodemodemodemo"
&#125;

  
**Ürün Grubu Response Modeli**

&#123;
	"Results": \[
		&#123;
			"Çağrı Tarihi": "2025-03-13",
			"Şehir": "TEKİRDAĞ",
			"Çağrı tipi": "\*ŞİKAYETLER",
			"Çağrı Konusu": "CİHAZ VEYA ÜRÜNDEN FAYDALANAMAMA",
			"Bölge Adı": "",
			"Çağrı sayısı": "1"
		&#125;,
		&#123;
			"Çağrı Tarihi": "2025-03-13",
			"Şehir": "KARAMAN",
			"Çağrı tipi": "\*SERVİS TALEBİ",
			"Çağrı Konusu": "İlk Çalıştırma",
			"Bölge Adı": "02-ANKARA",
			"Çağrı sayısı": "8"
			&#125;
	\],
	"Summary": null,
	"HasResult": true,
	"MessageList": \[\],
	"HasError": false,
	"HasMessage": false,
	"RrpTag": null
&#125;
