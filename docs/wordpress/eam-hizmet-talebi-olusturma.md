---
title: "EAM &#8211; Hizmet Talebi Oluşturma"
---

Licrus CMMS uygulamasında bir hizmet talebi olutşurmak için bu servis kullanılır. Kurumsal Varlık Yönetim (EAM) sisteminizde bir iş emri oluştuğunda bunu Licrus CMMS sistemine gönderirken aşağıdaki veri yapısını kullanmanız gerekir.  
  

**Fonksiyon**

**Servis Nesneleri**

Servis üzerinden yayınlanan tüm metotlar, Request nesnesi alır ve Response nesnesi döner. Request ve Response nesneleri kullanıldığı metoda özgü alanlar içermekle birlikte ortak bazı alanlar da içerirler;

**Request (İstek)**

| Alan | Açıklama | Değer |
| --- | --- | --- |
| AuthTicket | Kimlik doğrulama bileti | Zorunlu |
| Culture | Dil ve bölge bilgisi | tr-TR |
| AppSource | Uygulama kaynağı | 16573 |
| AppPlatform | Uygulama platformu | 1 |
| Customer.Code | Müşteri kodu | Zorunlu |
| CustomerTicketNo | Müşteri çağrı numarası | Zorunlu |
| CustomerTicketUser | Çağrıyı açan kullanıcı adı/soyad/telefonu | Opsiyonel |
| CallingDate | Çağrının açıldığı tarih ve saat | Zorunlu |
| SubCallType.Id | Alt çağrı türü kimliği | ZorunluArıza : 647 (Varsayılan) Bakım : 648 |
| Description | Çağrı açıklaması | Zorunlu |
| Priority | Çağrı önceliği.Normal= 0 (Varsayılan)Acil=2 | Opsiyonel. |
| ProductSerialNumber | Varlık envanter numarası | Opsiyonel |
| LookupLevel1Value | Varlık Ana Grubu Kodu (LookupLevel1Text’e değer verildiğinde boş geçilebilir) | Opsiyonel |
| LookupLevel1Text | Varlık Ana Grubu Adı | Zorunlu |
| ProductBrandName | Ürün Marka Adı | Opsiyonel |
| ProductModelName | Ürün Model Adı | Opsiyonel |

**Response (Cevap)**

| Alan | Açıklama |
| --- | --- |
| HasError | İşlem sonucunda bir hata oluştuysa true değer döner. Yapılan işlem başarılıysa false değer alır. |
| HasMessage | İşlem sonucunda paylaşılan bir bilgi mesajı varsa true değer verir. |
| MessageList | HasError veya HasMessage alanlarından herhangi bir true ise hata veya bilgi mesajı buradan alınabilir. |
| Id | Licrus’da oluşan Çağrı kaydının numarası. |

**Response.MessageList**  
Mesaj nesnesini barındıran listedir ve içerisinde yer alan Message nesnesinin detayları aşağıdaki gibidir.

| Alan | Açıklama |
| --- | --- |
| Message | Hata veya Bilgi mesajı metin olarak buradan alınabilir. |
| Url | https://simpleweburl.com/OperationForms/ServiceForm/Create |
| Type | Servis tarafından gönderilen mesajın tipini verir. ServiceResponseMessageType tipinde bir enum değeri taşır. Bu alan 3 tip değer alabilir, bunlar;Error: HataInfo: BilgiWarning: Uyarı |

  
Create **JSON Request Modeli**

&#123;
	"AuthTicket": "GUNVELIK\_ANAHTARINIZ",
	"Culture": "tr-TR",
	"AppSource": "16573",
	"AppPlatform": "1",
	"Entity": &#123;
		"Customer": &#123;
			"Code": "SUBE KODU"
		&#125;,
		"CustomerTicketNo": "TEST-999",
		"CustomerTicketUser": "Kemal Kavruk, Tel:599xyzxyzt",
		"CallingDate": "2025-02-13 13:00:00",
		"SubCallType": &#123;
			"Id": "647"
		&#125;,
		"Description": "ŞUBEDEN GELEN ARIZA BİLDİRİMİNE AİT DETAYLI AÇIKLAMA METNİ",
		"ProductSerialNumber": "DAI0002.RAD0001",
		"LookupLevel1Value": "DAI0002",
		"LookupLevel1Text": "ISITICI (DOĞALGAZ RADYANT)",
		"Priority": "0",
		"ProductBrandName": "marka",
		"ProductModelName": "model"
	&#125;
&#125;
