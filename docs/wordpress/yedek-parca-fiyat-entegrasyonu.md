# Yedek Parça Fiyat Entegrasyonu

Licrus'da, yedek parça fiyat bilgilerini doğrudan tanımlayıp kullanabilirsiniz Bazı durumlarda Yedek Parça fiyat bilgilerini farklı bir sistemden almak veya aktarmak istediğinizde ilgili sistem tarafından Licrus'u aşağıdaki entegrasyon metodları kullanılarak bağlantı kurabilirsiniz.  
Rapor entegrasyonu için kullanılacak bilgileri için LaborCostByQuote nesnesi kullanılır. SavePriceListnesnesinin detayları için  
[VERİ MODELİ](http://docs.onerov.com/2023/11/21/fiyat-listesi-nesneleripricelist/) başlığına bakınız.

**Yeni Yedek Parça Fiyatı, Kaydetmek veya Güncellemek**  
Aşağıdaki fonksiyonu kullanarak yeni bir yedek parça listesi Licrus'a aktarabilir.

```
PriceListResponse SavePriceList(PriceListRequest request)
```

## Örnek

## Servis Nesneleri

Servis üzerinden yayınlanan tüm metotlar, Request nesnesi alır ve Response nesnesi döner. Request ve Response nesneleri kullanıldığı metoda özgü alanlar içermekle birlikte ortak bazı alanlar da içerirler;

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
| Url | https://simpleweburl.com/api/ERP/SavePriceList |
| Type | Servis tarafından gönderilen mesajın tipini verir. ServiceResponseMessageType tipinde bir enum değeri taşır. Bu alan 3 tip değer alabilir, bunlar;Error: HataInfo: BilgiWarning: Uyarı |

## SavePriceList JSON Request Modeli
```json
{
    "authticket": "demodemoedmodemo",
	"entitypricelist": [
		{
	"Code":"r45u",
	"circulartype": "3",
	"price": "662.05 ",
	"startdate": "2023-02-08T00:00:00",
	"enddate": "2024-06-30T00:00:00",
	"part":{
	"code": "102126797"
}
},
	{
	"Code":"r45u",
	"circulartype": "3",
	"price": "26.25 ",
	"startdate": "2023-02-08T00:00:00",
	"enddate": "2024-06-30T00:00:00",
	"part":{
	"code": "102199479"
}
}
	]
}
```

## GetPart JSON Response Modeli

```json
{
    "MessageList": [],
	"HasError": false,
	"HasMessage": false
}
```
