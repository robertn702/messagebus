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
    this.data = this.formatData(params.data);
    this.render();
  },
  formatData: function(data) {
    var deviceGroupedData = _.groupBy(data, 'Device');
    var deviceValues = [];

    for (key in deviceGroupedData) {
        console.log('deviceGroupedData: ', deviceGroupedData);
        deviceValues.push({
            label: key,
            value: deviceGroupedData[key].length/data.length
        })
    }
    // console.log('deviceValues: ', deviceValues);
    return deviceValues;
  },
  render: function(){
    d3.select("#chart2")
      .datum(this.data)
      .transition().duration(350)
      .call(this.chart);
    // return this.$el.html(this.template({}));
  }

})
