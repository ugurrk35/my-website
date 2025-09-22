---
title: "Sipariş Bazında İşçilik Maliyeti"
---

Licrus, Servis maliyetlerinizi doğrudan satış birimlerinize yansıtmanızı sağlayacak kurallar içerir. Bu noktada servis hakedişlerinizi doğrudan seri numarası ve sipariş(teklif) numarası bazında görüntülemek için Masraf Merkezleri Raporu kullanılır. API servisleri üzerinden satış ve cihaz bazında servis maliyetlerinizi ERP sisteminize almak GetLaborCostByQuote metodunu kullanaiblirsiniz.

Rapor entegrasyonu için kullanılacak bilgileri için LaborCostByQuote nesnesi kullanılır. [**LaborCostByQuote**](http://docs.onerov.com/2019/10/25/iscilik-maliyeti-nesnesi/) nesnesinin detayları için **[Veri Modeli](http://docs.onerov.com/category/veri-modeli/)** başlığına bakınız.

**Fonksiyon**

\`\`\`text LaborCostByQuoteResponse GetLaborCostByQuote(LaborCostByQuoteRequest request) \`\`\`

**Örnek**

\`\`\`text // web service için istemci oluşturulyor var licrusService = new Integration(); //istek nesnesi var request = new LaborCostByQuoteRequest(); // Login metoduyla alınmış ticket. request.AuthTicket = ticket; // detayları alınmak istenen hakedişin numarası request.ProgressPaymnetId = 1111; // web servis fonksiyonu çağrılıyor var response = licrusService.LaborCostByQuoteResponse(request); // Herhangi bir hata varsa if (response.HasError) { // Detaylar için (bkz:Api Kullanım) } else { //işlem başarılı gerçekleşti. } \`\`\`
