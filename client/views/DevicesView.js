var DevicesView = Backbone.View.extend({
  el: '#char2',
  template: _.template('<h2>DevicesView</h2>'),
  className: 'devices-view',
  initialize: function(params) {

    var chart = nv.models.pieChart()
      .x(function(d) { return d.label })
      .y(function(d) { return d.value })
      .labelType("percent")
      .showLabels(true);

    this.chart = chart;
    console.log('params: ', params);
    this.exampleData = params.data;
    this.render();
  },
  render: function(){
    d3.select("#chart2")
      .datum(this.exampleData)
      .transition().duration(350)
      .call(this.chart);
    // return this.$el.html(this.template({}));
  }

})
