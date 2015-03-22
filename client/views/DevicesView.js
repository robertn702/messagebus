var DevicesView = Backbone.View.extend({
  template: _.template('<h2>DevicesView</h2><svg id="devices-chart"></svg>'),
  className: 'devices-view',
  initialize: function(params) {
    var chart = nv.models.pieChart()
      .x(function(d) { return d.label })
      .y(function(d) { return d.value })
      .labelType("percent")
      .showLabels(true);

    this.chart = chart;
    this.formatData(params.data);
    this.render();
  },
  formatData: function(data) {
    var deviceGroupedData = _.groupBy(data, 'Device');
    var deviceValues = [];

    for (key in deviceGroupedData) {
        deviceValues.push({
            label: key,
            value: deviceGroupedData[key].length/data.length
        })
    }
    this.data = deviceValues;
  },
  updateData: function(data) {
    this.formatData(data);
    this.render();
  },
  render: function(){
    d3.select("#devices-chart")
      .datum(this.data)
      .transition().duration(350)
      .call(this.chart);
  }

})
