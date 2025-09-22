# İlk Çalıştırma Çağrı Entegrasyonu

Licrus'da, ilk çalıştırma belgesi oluşturmak için kullanılan servistir.Bu servis ihtiyaç duyulan 3 servise daha ihtiyaç vardır.Ürün grup Id leri,il ve ilçe Idleri licrus'un ihtiyaç duyduğu şekilde göndermek için.  
Bunlar:

> [Ürün Grubu Entegrasyonu](http://docs.onerov.com/2025/02/13/urun-grubu-entegrasyonu/)

> [il ve ilçe Entegrasyonu](http://docs.onerov.com/2025/02/13/il-ve-ilce-entegrasyonu/)

## Fonksiyon

## Servis Nesneleri

Servis üzerinden yayınlanan tüm metotlar, Request nesnesi alır ve Response nesnesi döner. Request ve Response nesneleri kullanıldığı metoda özgü alanlar içermekle birlikte ortak bazı alanlar da içerirler;

## Request (İstek)

| Alan | Açıklama | Değer |
|------|------|------|
| AuthTicket | Kimlik doğrulaması için kullanılacak ticket | (Zorunlu) |
| SerialNumber | seri numarasına | (Zorunlu) |
| RequestReason | ilk çalıştırma | 1 (Zorunlu) |
| ServiceType | Servis tipi | 32 (Zorunlu) |
| Description | Açıklama | (Zorunlu) |
| Customer | Müşteri bilgileri | (Zorunlu) |
| ContactInfos | İletişim bilgileri | (Zorunlu) |
| Address | Adres bilgileri | (Zorunlu) |
| ProductMainGroup | Ürün ana grubu | (Zorunlu) |
| GasSafeCertificateNumber | Gaz güvenlik sertifika numarası | (Zorunlu) |
| AppSource | Uygulama kaynağı | 66292(Zorunlu) |
| AppPlatform | Uygulama platformu | 2(Zorunlu) |
| AppCulture / Culture | Dil ve kültür bilgisi | TR(Zorunlu) |

## Response (Cevap)

| Alan | Açıklama |
|------|------|
| HasError | İşlem sonucunda bir hata oluştuysa true değer döner. Yapılan işlem başarılıysa false değer alır. |
| HasMessage | İşlem sonucunda paylaşılan bir bilgi mesajı varsa true değer verir. |
| MessageList | HasError veya HasMessage alanlarından herhangi bir true ise hata veya bilgi mesajı buradan alınabilir. |
**Response.MessageList**  
Mesaj nesnesini barındıran listedir ve içerisinde yer alan Message nesnesinin detayları aşağıdaki gibidir.

| Alan | Açıklama |
|------|------|
| Message | Hata veya Bilgi mesajı metin olarak buradan alınabilir. |
| Url | https://simpleweburl.com/OperationForms/ServiceForm/Create |
| Type | Servis tarafından gönderilen mesajın tipini verir. ServiceResponseMessageType tipinde bir enum değeri taşır. Bu alan 3 tip değer alabilir, bunlar;Error: HataInfo: BilgiWarning: Uyarı |
Create **JSON Request Modeli**

```json
{"AutoClose": false,
	"Form":{
	"RequestReason":{
	"Id": 1
},
	"ServiceType":{
	"Id": 32
},
	"Description": "İlk çalıştırma,
	eksik yoktur",
	"AppointmentDateTimeAsString": "11.2.2025 09:00",
	"Customer":{
	"FirstName": "İSİM",
	"LastName": "SOYİSİM",
	"ContactInfos": [
		{
	"Prefix": "533",
	"Content": "999....",
	"IsPrimary": true,
	"ContactInfoType":{
	"Id": 4
}
}\
	],
	"Addresses": [
		{
	"IsPrimary": true,
	"City":{
	"Id": "35"
},
	"District":{
	"Id": "511"
},
	"NeighborhoodName": "Fevzi çakmak",
	"MainStreet": "20 sk",
	"StreetName": "20 sk",
	"Building": "Yok",
	"ApartmentNo": "3",
	"Number": "54",
	"Latitude": null,
	"Longitude": null
}\
	]
},
	"ProductMainGroup":{
	"Id": 220
},
	"ProductSerialNumber1": "",
	"GasSafeCertificateNumber": "."
},
	"AuthTicket": "DEMODEMODEMODEMO",
	"AppSource": "66292",
	"AppPlatform": 2,
	"AppCulture": "TR",
	"Culture": "TR"
}
```