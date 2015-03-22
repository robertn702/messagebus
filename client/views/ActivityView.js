var ActivityView = Backbone.View.extend({
  el: '#activity-chart',
  className: 'activity-view',
  initialize: function(params){
    console.log('Activity View this: ', this);
    chart = nv.models.lineChart()
      .margin({left: 100})  //Adjust chart margins to give the x-axis some breathing room.
      .useInteractiveGuideline(true)  //We want nice looking tooltips and a guideline!
      .showLegend(true)
      .showYAxis(true)
      .showXAxis(true);

    chart.xAxis     //Chart x-axis settings
      .axisLabel('Date')
      .tickFormat(function(d) { return d3.time.format('%x')(new Date(d)) })
      .rotateLabels(-45);

    chart.yAxis     //Chart y-axis settings
      .axisLabel('Activity (%)')
      .tickFormat(d3.format(".0%"));

    this.chart = chart;
    this.formatData(params.data);

    nv.utils.windowResize(function() { this.chart.update() });

    this.render();
  },
  formatData: function(data) {
    var dateGroupedData = _.groupBy(data, 'Date');
    var activityValues = [];

    for (key in dateGroupedData) {
      activityValues.push({
        x: new Date(key),
        y: _.where(dateGroupedData[key], {Activity: 1}).length/dateGroupedData[key].length
      })
    }
    var sortedValues = _.sortBy(activityValues, 'x');
    // console.log('sortedValues: ', sortedValues);

    this.data = [{values: sortedValues}];
  },
  updateData: function(data) {
    this.formatData(data);
    this.render();
  },
  render: function(){
    d3.select(this.el)    //Select the <svg> element you want to render the chart in.
      .datum(this.data)         //Populate the <svg> element with chart data...
      .call(this.chart);          //Finally, render the chart!
  }
});
