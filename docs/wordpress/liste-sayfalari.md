---
title: "Liste Sayfaları"
---

&lt;h1&gt;Liste Sayfası Oluşturmak&lt;/h1&gt;
&lt;p&gt;Licrus uygulamalarında bir veriyi klasik listelemek için yapılacak en hızlı ve standart yöntem bir liste sayfası eklemektir. Bir liste (index) sayfası iki temel bileşenden oluştur.&lt;/p&gt;
&lt;ol&gt;
&lt;li&gt;Backend (Web Api Controller)&lt;/li&gt;
&lt;li&gt;Frontend (HTML+TypeScript+Css)&lt;/li&gt;
&lt;/ol&gt;
&lt;p&gt;Bu bileşenler gelşitirilecek ekranın içeriğinde göre farklı nesneler kod blokları içerebilir. Örneğin kimi arayüzlerde TypeScript kodu veya CSS olmadan çalışabilirsiniz.&lt;/p&gt;
&lt;h2&gt;BackEnd (Controller)&lt;/h2&gt;
&lt;p&gt;Bir liste sayfası eklemek için yapılması gereken ilk işlem Web Api Controller&#8217;In eklenmesidir.&lt;/p&gt;
&lt;p&gt;Eklenecek controller bir veri nesnesiyle çalışacaksa&lt;br /&gt;
&lt;code&gt;BaseApiController&lt;SampleType&gt;&lt;/code&gt;&lt;/p&gt;
&lt;p&gt;Herhangi bir veri işlemi yapmayacaksa&lt;br /&gt;
&lt;code&gt;BaseApiController&lt;/code&gt; sınıflarından türetilmelidir.&lt;/p&gt;
&lt;h3&gt;Örnek&lt;/h3&gt;
&lt;pre&gt;&lt;code&gt;public class SampleTypeController : BaseApiController&lt;SampleType&gt; &#123;
    public override string AuthorizableContentName &#123; get &#123; return "Name Of Controller"; &#125; &#125;
    public override string AuthorizableContentGuid &#123; get &#123; return "Unique GUID Value"; &#125; &#125;
&#125;&lt;/code&gt;&lt;/pre&gt;
&lt;h2&gt;FrontEnd (Controller)&lt;/h2&gt;

