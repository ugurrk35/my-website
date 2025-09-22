---
title: "BaseFilterView"
---

&lt;h1&gt;BaseFilterView&lt;/h1&gt;
&lt;p&gt;Licrus IQ platformunda geliştirdiğiniz liste ekranlarında bazı durumlarda arama kriterleri (filterler) kullanmak isteyebilirsiniz. BaseFilterView, ayrı bir bileşen olarak liste ekranınıza filtre paneli eklemenizi kolaylaştıracaktır. Bu sayede uygulama genelinde benzer fonksiyonlara ve görünümlere sahip filtre panelleri oluşacaktır.&lt;/p&gt;
&lt;p&gt;Aşağıdaki kod örneğinde Çağrı listesine kullanılan CallIndexViewFilter inceleyebilirsiniz.&lt;/p&gt;
&lt;pre&gt;&lt;code&gt;class CallIndexViewFilter extends BaseFilterView &#123;
    constructor(selector: string) &#123;
        super(selector, "#filter-row");
    &#125;

    public dateRangeChange(e) &#123;
        var value = &lt;DateRange&gt;parseInt(e.currentTarget.value);
        var $target = $(e.currentTarget.getAttribute("data-target"));
        if (value == DateRange.Custom) &#123;
            $target.show();
        &#125;
        else &#123;
            $target.hide();
            $target.find("input").val("");
            $target.find("input").change();
        &#125;
    &#125;

&#125;
_viewFilter = new CallIndexViewFilter("#view-filter-wrapper");&lt;/code&gt;&lt;/pre&gt;
&lt;h2&gt;Attributes&lt;/h2&gt;
&lt;table&gt;
&lt;thead&gt;
&lt;tr&gt;
&lt;th&gt;Attribute Adı&lt;/th&gt;
&lt;th&gt;Açıklaması&lt;/th&gt;
&lt;/tr&gt;
&lt;/thead&gt;
&lt;tbody&gt;
&lt;tr&gt;
&lt;td&gt;data-filter&lt;/td&gt;
&lt;td&gt;HTML elementin bir filtre alanı olduğunu belirtir.&lt;/td&gt;
&lt;/tr&gt;
&lt;tr&gt;
&lt;td&gt;data-clear&lt;/td&gt;
&lt;td&gt;Filtre alanı için temizleme butonun eklenmesi isteniyorsa true değer verilir. İstenmiyorsa false değer verilir. Varsayılan değeri true&#8217;dur. Özellikle temizle butonu istenmeyen alanların belirtilmesi için kullanılır.&lt;/td&gt;
&lt;/tr&gt;
&lt;/tbody&gt;
&lt;/table&gt;
&lt;h2&gt;Methods&lt;/h2&gt;
&lt;p&gt;Filter bileşeninde kullanılan metodların listesini aşağıda görebilirsiniz. Metodlar çoğu zaman filtre panel tarafından yönetilir.&lt;/p&gt;
&lt;h3&gt;constructor&lt;/h3&gt;
&lt;table&gt;
&lt;thead&gt;
&lt;tr&gt;
&lt;th&gt;BaseFilterView&#8217;ı miras alan sınıf (inherited), mutlaka BaseFilterView&#8217;a ait constructor&#8217;ı çağırmalıdır. Constructor iki paremtre almaktadır.&lt;/th&gt;
&lt;th&gt;Parametre&lt;/th&gt;
&lt;th&gt;Açıklama&lt;/th&gt;
&lt;/tr&gt;
&lt;/thead&gt;
&lt;tbody&gt;
&lt;tr&gt;
&lt;td&gt;&lt;code&gt;target: string&lt;/code&gt;&lt;/td&gt;
&lt;td&gt;Filter alanlarının alınacağı container için selector. #id veya .classname kullanılabilir. ID kullanılması tavsiye edilir.&lt;/td&gt;
&lt;/tr&gt;
&lt;tr&gt;
&lt;td&gt;&lt;code&gt;badgeTarget: string&lt;/code&gt;&lt;/td&gt;
&lt;td&gt;Filter alanlarından seçilenlerin label ve value şeklinde badge olarak gösterilecekleri seçili filtreler paneli. Selector olarak #id veya .classname olarak kullanılabilir. ID kullanılması tavsiye edilmektedir.&lt;/td&gt;
&lt;/tr&gt;
&lt;/tbody&gt;
&lt;/table&gt;
&lt;h3&gt;clear&lt;/h3&gt;
&lt;p&gt;Tüm filter seçeneklerini temizlemek için kullanılır.&lt;/p&gt;
&lt;pre&gt;&lt;code&gt;public clear();&lt;/code&gt;&lt;/pre&gt;
&lt;h3&gt;search&lt;/h3&gt;
&lt;p&gt;Filtre panelinin kullanıldığı parent view&#8217;da yer alan search fonksiyonunu tetikler. FiltreView bileşenin kullanıldığı Parent View&#8217;da diğer bir deyişle liste ekranında mutlaka &lt;code&gt;pulic search():void&lt;/code&gt; şeklinde bir fonksiyon tanımı olmalıdır.&lt;/p&gt;
&lt;pre&gt;&lt;code&gt;public search();&lt;/code&gt;&lt;/pre&gt;
&lt;h3&gt;getField&lt;/h3&gt;
&lt;p&gt;Id değeri verilen alan için FilterViewField tipinde filtre bilgilerini verir. Geri dönüş tipinin detayları için &lt;code&gt;FilterViewField&lt;/code&gt; sınıfını inceleyin.&lt;/p&gt;
&lt;pre&gt;&lt;code&gt;public getField(filterId: string): FilterViewField&lt;/code&gt;&lt;/pre&gt;
&lt;h3&gt;fieldAdded&lt;/h3&gt;
&lt;p&gt;Bir filter nesnesi eklendikten sonra tetiklenir. Parametre olarak eklenmek istenen filter nesnesini alır.&lt;/p&gt;
&lt;pre&gt;&lt;code&gt;public fieldAdded(field: FilterViewField);&lt;/code&gt;&lt;/pre&gt;
&lt;h3&gt;fieldRemoved&lt;/h3&gt;
&lt;p&gt;Bir filter nesnesi kaldırıldıktan sonra tetiklenir. Parametre olarak silinmek istenen filter nesnesini alır.&lt;/p&gt;
&lt;pre&gt;&lt;code&gt;public fieldRemoved(field: FilterViewField);&lt;/code&gt;&lt;/pre&gt;
&lt;h3&gt;toggleFilter&lt;/h3&gt;
&lt;p&gt;Filtre seçeneklerini göstermek ve gizlemek için kullanılır. Verilen parametrenin değerine göre işlem yapar. Eğer değer verilmeden çağrılırsa kapalı paneli gösterir, panel açıksa gizler. İşlem sonucu için FakePromise nesnesinin metodları kullanılır.&lt;/p&gt;
&lt;pre&gt;&lt;code&gt;public toggleFilter(hide: boolean = false): FakePromise;&lt;/code&gt;&lt;/pre&gt;
&lt;h3&gt;showFilter&lt;/h3&gt;
&lt;p&gt;Filtre paneli göstermek için kullanılır. Filter paneli zaten açıksa bir işlem yapmaz.&lt;/p&gt;
&lt;pre&gt;&lt;code&gt;public showFilter();&lt;/code&gt;&lt;/pre&gt;
&lt;h3&gt;isOpen&lt;/h3&gt;
&lt;p&gt;Filter panelinin açık olup olmadığını kontrol etmek için kullanılır. Filter paneli açıksa true diğer durumda false değer verir.&lt;/p&gt;
&lt;pre&gt;&lt;code&gt;public isOpen();&lt;/code&gt;&lt;/pre&gt;
&lt;h2&gt;Events&lt;/h2&gt;
&lt;p&gt;Şu an için desteklenen bir event bulunmuyor.&lt;/p&gt;
&lt;h2&gt;Örnek&lt;/h2&gt;
&lt;h3&gt;filter.ts&lt;/h3&gt;
&lt;pre&gt;&lt;code&gt;class SampleIndexViewFilter extends BaseFilterView &#123;
    constructor(selector: string) &#123;
        super(selector, "#filter-row");
    &#125;
&#125;
_viewFilter = new SampleIndexViewFilter("#view-filter-wrapper");
&lt;/code&gt;&lt;/pre&gt;
&lt;h3&gt;filter.html&lt;/h3&gt;
&lt;pre&gt;&lt;code&gt;&lt;div class="panel filter" id="view-filter-wrapper"&gt;
    &lt;div class="panel-body"&gt;
        &lt;div class="row"&gt;
            &lt;div class="col-12 form-group"&gt;
                &lt;div class="input-group input-group-icon"&gt;
                    &lt;span class="input-group-addon"&gt;
                        &lt;span class="icon wb-search" aria-hidden="true"&gt;&lt;/span&gt;
                    &lt;/span&gt;
                    &lt;input type="search" id="entiity-list-filter-box" class="form-control input-sm" data-filter="true" data-clear="false" data-model="Keywords" placeholder="&#123;res:Anahtar Kelime&#125;" /&gt;
                    &lt;span class="input-group-addon" ng-click="_viewFilter.toggleFilter()"&gt;
                        &lt;i class="icon wb-more-horizontal"&gt;&lt;/i&gt;
                        &lt;i class="icon wb-close"&gt;&lt;/i&gt;
                    &lt;/span&gt;
                &lt;/div&gt;
            &lt;/div&gt;
        &lt;/div&gt;
        &lt;div class="filter-body-wrapper"&gt;
            &lt;div class="filter-body"&gt;
                &lt;div class="row"&gt;
                    &lt;div class="col-6 form-group"&gt;
                        &lt;input class="form-control" type="text" id="filter-callid" data-filter="true" data-model="Id" placeholder="&#123;res:Çağrı No&#125;" /&gt;
                    &lt;/div&gt;
                    &lt;div class="col-6 form-group"&gt;
                        &lt;input class="form-control" type="text" id="filter-customer" data-model="CustomerName" placeholder="&#123;res:Müşteri (Ad, Ünvan, Telefon vs.)&#125;" data-filter="true" /&gt;
                    &lt;/div&gt;
                &lt;/div&gt;
                &lt;div class="row filter-footer"&gt;
                    &lt;div class="col-10"&gt;
                    &lt;/div&gt;
                    &lt;div class="col-2 form-group"&gt;
                        &lt;button type="button" class="btn btn-primary" ng-click="search()"&gt;
                            &lt;i class="icon wb-search" aria-hidden="true"&gt;&lt;/i&gt;&#123;res:Listele&#125;
                        &lt;/button&gt;
                    &lt;/div&gt;
                &lt;/div&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;
&lt;/code&gt;&lt;/pre&gt;
&lt;h3&gt;index.html&lt;/h3&gt;
&lt;pre&gt;&lt;code&gt;&lt;!-- seçili filtre kriterlerinin gösterileceği alan --&gt;
&lt;div class="badge-filter-row" id="filter-row"&gt;&lt;/div&gt;

&lt;!-- filter panelinin gösterileceği alan --&gt;
&lt;div id="view-filter"&gt; &lt;/div&gt;
&lt;/code&gt;&lt;/pre&gt;
&lt;h3&gt;index.ts&lt;/h3&gt;
&lt;pre&gt;&lt;code&gt;class SamplIndexView extends BaseIndexView &#123;

    constructor() &#123;
        var parameter = new ViewParameter();
        //diğer view paremetreleri
        super(parameter);
    &#125;

    private filter: any;
    public onInit() &#123;
        ViewEngine.loadView(&lt;LoadViewArgs&gt;&#123;
            route: "full/path/index-filter",
            target: "#view-filter",
            instanceVariable: "_viewFilter",
            data: this.filter
        &#125;);

        this.filter = &#123;&#125;;

        DataBinder.connect(this.filter, "#view-filter");
    &#125;

    public search() &#123;
        _viewFilter.toggleFilter(true);
        //arama fonksiyonu çağrılır.
    &#125;
&#125;
_co = new SamplIndexView();&lt;/code&gt;&lt;/pre&gt;

