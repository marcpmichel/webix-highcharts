//=require highcharts_standalone
//=require highcharts
//=require highcharts-more

webix.protoUI({ name:"highcharts",

    updateSeries: function() {
        // remove previous series
        while(this.chart.series.length > 0) { this.chart.series[0].remove(false); }

        // add new series
        this.data.each( function(series) { this.chart.addSeries( series, false, false ); }, this );
        this.chart.redraw();
    },

    reset: function() {
        this.data.clearAll();
    },

    setParams: function(params) {
        if(params && params.x_axis_min && params.x_axis_max )
            this.chart.xAxis[0].setExtremes(params.x_axis_min, params.x_axis_max);
    },

    getOptions: function() {
      return this.chart.options;
    },

    $init:function(config){

        this._autoreset = (config.autoreset === undefined) ? true : config.autoreset;

        // need some kind of deep merge
        if(!config.chart) config.chart = {};
        config.chart.renderTo = this.$view;
        if(!config.plotOptions) config.plotOptions = {};
        if(!config.plotOptions.series) config.plotOptions.series = {};
        config.plotOptions.series.animation = false;

        this.chart = new Highcharts.Chart(config);
        this.$ready.push(this._after_init_call);
    },

    defaults: {
          chart:{ renderTo: this.$view },
          plotOptions: { series: { animation: false } }
    },

    _after_init_call: function() {
        this.data.attachEvent("onStoreUpdated", webix.bind(this.updateSeries, this) );
        if(this._autoreset) {
            this.attachEvent("onBeforeLoad", webix.bind(this.reset, this) );
        }
        if(this.config.data) { this.parse(this.config.data);  }
    },

    $setSize: function() {
        webix.ui.view.prototype.$setSize.apply(this, arguments);
        if(this.chart) this.chart.reflow();
    }

}, webix.DataLoader, webix.EventSystem, webix.ui.view);

