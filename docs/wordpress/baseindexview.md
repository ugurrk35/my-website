---
title: "BaseIndexView"
---

&lt;h2&gt;BaseIndexView&lt;/h2&gt;
&lt;p&gt;Bir view sadece veri listeleme için kullanılacaksa, yazılacak view bu sınıftan kalıtım almalıdır. Çağrı listesi, Belge Listesi, Onay Listesi gibi ekranların (view) tamamı bu BaseView&#8217;ı kullanır.&lt;/p&gt;
&lt;p&gt;Servis formları için kullanılan için ServiceFormIndexView sınıfı&lt;/p&gt;
&lt;pre&gt;&lt;code&gt;class ServiceFormIndexView extends BaseIndexView &#123;

    constructor() &#123;
        var view = new ViewParameter();
        view.pageTitle = "Servis Formları";
        view.route = "modules/operationforms/serviceform";
        view.type = "serviceForm";
        view.loadData = false;
        super(view);
    &#125;

&#125;&lt;/code&gt;&lt;/pre&gt;

