---
title: "BaseReportView"
---

&lt;h2&gt;BaseReportView&lt;/h2&gt;
&lt;p&gt;BaseReportView rapor ekranlarını tasarlamak için kullanılır.&lt;/p&gt;
&lt;p&gt;Licrus IQ&#8217;da yeni bir rapor geliştirmek istediğinizde veri okuma ve görüntüleme fonskiyonları size hazır olarak sunulur. Bu sayede hızlıca verilerinizi alıp rapor görünümlerinizi hazırlayabilirsiniz. Üzerinde çalışmanız gereken yerler rapor tasarımını yapmak ve veri kümesinin hazırlanması olacaktır.&lt;/p&gt;
&lt;p&gt;Aşağıdaki kod bloğu &#8220;Bölge Bazında Servis Adetleri&#8221; raporunun class tanımını göstermektedir.&lt;/p&gt;
&lt;pre&gt;&lt;code&gt;class ServiceCountByRegionReport extends BaseReportView &#123;
    constructor() &#123;
        var view = new ViewParameter();
        view.route = "reporting/servicemanager/ServiceCountByRegion";
        view.type = "serviceCountByRegion";
        view.pageTitle = "Bölge Bazında Servis Adetleri";
        super(view);
    &#125;
&#125;&lt;/code&gt;&lt;/pre&gt;

