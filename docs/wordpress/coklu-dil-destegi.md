---
title: "Çoklu Dil Desteği"
---

&lt;h3&gt;HTML İçeriklerde Çoklu Dil Desteği&lt;/h3&gt;
&lt;p&gt;Uygulama arayüzünde string bir ifadenin kullanıcı dilinde görünmesi için &lt;strong&gt;&#123;res:&lt;ifade&gt;&#125;&lt;/ifade&gt;&lt;/strong&gt; anahtarını kullanırız.&lt;/p&gt;
&lt;p&gt;Yazıldığı gibi görünür&lt;/p&gt;
&lt;pre&gt;&lt;code&gt;&lt;span&gt;Adı&lt;span&gt;&lt;/code&gt;&lt;/pre&gt;
&lt;p&gt;Kullanıcı dilinde görünür. Örneğin ingilizce dil paketinde &#8220;Adı&#8221; ifadesinin karşılığı &#8220;Name&#8221; olduğu için arayüzde Name olarak görünür.&lt;/p&gt;
&lt;pre&gt;&lt;code&gt;&lt;span&gt;&#123;res:Adı&#125;&lt;span&gt;&lt;/code&gt;&lt;/pre&gt;
&lt;h3&gt;TypeScript/JavaScript Kodunda Dil Desteği&lt;/h3&gt;
&lt;p&gt;Dinamik bir içerik üretiyorsanız yine arayüzde dil desteğini kullanabilirsiniz.&lt;/p&gt;
&lt;p&gt;Dil ve kültür paketlerinin yönetimi için BaseCulture nesnesi kullanılır. Bu nesnesinin bir örneğini almanız gerekmez. Bunun yerine app ve view instance üzerinden doğrudan kullanabilirsiniz.&lt;/p&gt;
&lt;p&gt;Kullanacağımız function prototype &lt;code&gt;tryTranslate&lt;/code&gt; olacaktır.&lt;/p&gt;
&lt;pre&gt;&lt;code&gt;BaseCulture.prototype.tryTranslate = function (value) &#123;
   //do somethings
&#125;;&lt;/code&gt;&lt;/pre&gt;
&lt;p&gt;&lt;strong&gt;Global Kullanım&lt;/strong&gt;&lt;br /&gt;
Herhan bir kod bloğunda bir metnin dil paketindeki karşılığını erişmek içim &lt;strong&gt;app&lt;/strong&gt; nesnesini kullanabiliriz.&lt;/p&gt;
&lt;pre&gt;&lt;code&gt;app.getCulture().tryTranslate("Adı");
console.log(value); //ingilizce için çıktı "Name" olacaktır&lt;/code&gt;&lt;/pre&gt;
&lt;p&gt;&lt;strong&gt;View&#8217;da Kullanım&lt;/strong&gt;&lt;br /&gt;
BaseView&#8217;lardan türeyen bir view içerisinde çalışıyorsak bu durumda &lt;strong&gt;this&lt;/strong&gt; anahtar kelimesiyle tryTranslate metoduna erişebiliriz&lt;/p&gt;
&lt;pre&gt;&lt;code&gt;let value = this.tryTranslate("Adı");
console.log(value); //ingilizce için çıktı "Name" olacaktır&lt;/code&gt;&lt;/pre&gt;
&lt;p&gt;&lt;em&gt;NOT: Bir ifadenin kullanıcı dil paketinde karşılığı yoksa tryTranslate metodu geriye orjinal metni döner.&lt;/em&gt;&lt;/p&gt;

