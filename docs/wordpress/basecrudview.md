---
title: "BaseCrudView"
---

&lt;h2&gt;BaseCrudView&lt;/h2&gt;
&lt;p&gt;Licrus IQ platformunda bir tanım ekranı geliştirmek istiyorsanız, &lt;strong&gt;BaseCrudView&lt;/strong&gt; sınıfından kalıtım alan bir View eklemeniz işlerinizi kolaylaştıracaktır.&lt;/p&gt;
&lt;p&gt;Tanım ekranı uygulamanın işlem ekranları tarafından kullanılan veri tanımlarının yapıldığı ekranlardır.Örnek olarak Ürün grubu ekranında iş kuralları veya hesaplamalar yer almaz, sadece bir ürün grubu oluşturmak, silmek, güncellemek veya var olan ürün gruplarını listelemek için kullanılır.&lt;/p&gt;
&lt;p&gt;Bu 4 temel veri işlemine CRUD &lt;strong&gt;C&lt;/strong&gt;reate, &lt;strong&gt;R&lt;/strong&gt;ead &lt;strong&gt;U&lt;/strong&gt;pdate, &lt;strong&gt;D&lt;/strong&gt;elete&lt;/p&gt;
&lt;p&gt;Aşağıdaki kod örneği işçilik grupları için kullanılan LaborGroupCRUDView&#8217;ı göstermektedir. Ürün Grubu, Hizmet Tipi, Çağrı Tipi, İşçilik Grubu View&#8217;larını inceleyebilirsiniz.&lt;/p&gt;
&lt;pre&gt;&lt;code&gt;class LaborGroupCrudView extends BaseCrudView &#123;
    constructor() &#123;
        var view = new ViewParameter();
        view.pageTitle = "İşçilik Grupları";
        view.route = "modules/LaborModule/LaborGroup";
        view.type = "laborGroup";
        super(parameter);
    &#125; 
&#125;&lt;/code&gt;&lt;/pre&gt;

